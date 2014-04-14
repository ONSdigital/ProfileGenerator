/*
 * Mapping Utils
 * Fetches boundaries from ONS Open Geography API for the selected area
 * and it's parent area. Converts easting/northing coordinates to
 * latitude/longitude coordinates (required by google maps). Boundaries
 * may contain more than one "ring", or polygon, to define an area,
 * espcially around the coast and islands. So a number of polygons may
 * be drawn to define a boundary, rather than just one.
 * Uses Google Maps to display the area and shade the selected area and
 * it's parent area.
 *
 * NOTE: The coordinates are returned as easting/northing and need to be
 *       converted to latitude/longitude. A formula has been used here,
 *       but is not 'perfect', as it can be quite complex to do it due
 *       to the curvature of the earth. We think it is accurate enough
 *       for this demo.
 *
 * Useful URLs
 *
 * ONS Open Geography Information:-
 * https://geoportal.statistics.gov.uk/geoportal/catalog/main/home.page
 * Google Maps for developers:-
 * https://developers.google.com/maps/
 *
 * Authors: Neil Sillitoe (ONS), Richard Smith (ONS) + easting/northing to
 *          lat/long conversion aquired off internet (unknown author).
 */

var ens;

// Open Geography URL to search for a ward and return its boundaries. Search string goes between the two variables
var opengepEndPoint =  "https://mapping.statistics.gov.uk/arcgis/rest/services/";
// Service name relates to a particular geography, eg, Ward, Metropolitan County
var opengepServiceName = "";
var opengepServer = "/MapServer/find?searchText=";
var opengep1 = "&contains=true&searchFields=&sr=&layers=";
// Layer name relates to a particular geography, eg, Ward, Metropolitan County
var opengepLayerName = "";
var opengep2 = "&layerDefs=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=false&returnM=false&gdbVersion=&f=json&callback=callback";

var parentArea = false;
var storeAreaCode = "";
var storeAreaType = "";
var numberOfParentRings = 0;
var latlons = new Array();

/* 
 * getBoundaries - Initial set-up of call to get boundaries from ONS Open Geography API.
 *
 * Receives the area code and the area type, plus the parent area code and parent area type.
 * Initially gets the parent area boundaries, then the selected area (separate API calls).
 * Stores the area code and area type whilst it does the parent area.
 * The service name and layer name are set, based on the area type,
 * eg, GOR (Government Office Region), UA (Unitary Authority), etc.
 *
 * @param String areaCode - the id of the selected area
 * @param String areaType - the type of the selected area, eg, WD (ward), MD (metropolitan district), etc.
 * @param String parentAreaCode - the id of the parent area to the selected area
 * @param String parentAreaType - the type of the parent area, eg, CTY (County), MCTY (Metropolitan County), etc.
 * @parem boolean parent - whether operating on the parent area. First time through will be true.
 */
function getBoundaries(areaCode, areaType, parentAreaCode, parentAreaType, parent) {

    var currentAreaType = "";
    var currentAreaCode = "";

    // ********************************************************
    // Override to prevent it drawing the boundary for country.
    // This works ok in Firefox and Chrome, but causes slow
    // script warning popups in IE (although still works if
    // click no and allow to continue).
    if(parent && parentAreaType == 'CTRY')
    {
       parent = false; // draw selected area boundary only
    }
    // ********************************************************

    if(parent)
    {
       parentArea = true;
       currentAreaCode = parentAreaCode;
       currentAreaType = parentAreaType;
       storeAreaCode = areaCode;
       storeAreaType = areaType;
    }
    else
    {
       parentArea = false;
       currentAreaCode = areaCode;
       currentAreaType = areaType;
    }

    //alert('currentAreaCode = ' + currentAreaCode + " currentAreaType = " + currentAreaType);

    if(currentAreaType == 'CTRY')
    {
       opengepServiceName = "CTRY/CTRY_DEC_2012_EW_BGC";
       opengepLayerName = "CTRY_DEC_2012_EW_BGC";
    }
    if(currentAreaType == 'GOR' || currentAreaType == 'RGN')
    {
       opengepServiceName = "GOR/GOR_DEC_2010_EN_BGC";
       opengepLayerName = "GOR_DEC_2010_EN_BGC";
    }
    if(currentAreaType == 'CTY'|| currentAreaType == 'MCTY')
    {
       opengepServiceName = "LMCTYUA/LMCTYUA_2011_EW_BGC";
       opengepLayerName = "LMCTYUA_2011_EW_BGC";
    }
    if(currentAreaType == 'UA' || currentAreaType == 'LONB' || currentAreaType == 'IOL')
    {
       opengepServiceName = "LMCTYUA/LMCTYUA_2011_EW_BGC";
       opengepLayerName = "LMCTYUA_2011_EW_BGC";
    }
    if(currentAreaType == 'MD' || currentAreaType == 'NMD')
    {
       opengepServiceName = "LAD/LAD_DEC_2011_GB_BGC";
       opengepLayerName = "LAD_DEC_2011_GB_BGC";
    }
    if(currentAreaType == 'WD')
    {
       opengepServiceName = "WD/WD_DEC_2011_EW_BGC";
       opengepLayerName = "WD_DEC_2011_EW_BGC";
    }
    if(currentAreaType == 'PAR')
    {
       opengepServiceName = "PAR/PAR_DEC_2011_EW_BGC";
       opengepLayerName = "PAR_DEC_2011_EW_BGC";
    }
    if(currentAreaType == 'MSOA')
    {
       opengepServiceName = "MSOA/MSOA_2011_EW_BGC";
       opengepLayerName = "MSOA_2011_EW_BGC";
    }
    if(currentAreaType == 'LSOA')
    {
       opengepServiceName = "LSOA/LSOA_2011_EW_BGC";
       opengepLayerName = "LSOA_2011_EW_BGC";
    }
    if(currentAreaType == 'OA')
    {
       opengepServiceName = "OA/OA_2011_EW_BGC";
       opengepLayerName = "OA_2011_EW_BGC";
    }
    if(currentAreaType == 'WPC')
    {
       opengepServiceName = "PCON/PCON_DEC_2012_EW_BGC";
       opengepLayerName = "PCON_DEC_2012_EW_BGC";
    }

    if(opengepServiceName == "" && opengepLayerName == "")
    {
       alert("No service name/layer match found for area code: " + currentAreaCode + " area type: " + currentAreaType + ". Cannot retrieve map.");
    }
    else
    {
       var openGeographyURL = opengepEndPoint + opengepServiceName + opengepServer + currentAreaCode + opengep1 + opengepLayerName + opengep2;
       //alert(openGeographyURL);
   
       try 
       {
          callOpenGeog(openGeographyURL);
       }
       catch(e)
       {
          //alert("error = " + e);
          mapError();
       }
    }
}

/**
   * Makes the API call, requesting the data
   * in JSON format and returns the data,
   * or reports any error.
   *
   * @param filt - various parameters that form part of the ONS API call
   *
   * @return data - the JSON data returned by the ONS API call
   */
function callOpenGeog(url)
{
   //alert('url = ' + url);
   var data;

   return $.ajax({
      url: url,
      data: {},
      dataType: "jsonp",
      xhrFields: {
			   withCredentials: true
      },
      jsonpCallback: "callback",
      crossDomain: true,
      timeout: 60000, // 60 second timout because Firefox not firing event handlers for some errors that IE is and request doesn't terminate (although Firebug doesn't show request) - timeout just in case
      //success: function(result,status,xhr){alert("Success! result: " + result + " status: " + status + " xhr = " + xhr);},
      //error: function(xhr,status,error){alert("Error! status: " + status + " xhr: " + xhr.status + " error: " + error);}
      error: function(xhr,status,error){mapError();}
   })
}

/*
 * Callback
 *
 * Deals with the response from the ONS Open Geography API.
 * The response is in JSON format and the boundaries can contain
 * one or more rings (polygons used to define the area).
 * The polygons are built up into an array of latitude and longitude values,
 * first time through for the parent area and then calling getBoundaries a
 * second time to get the selected area and storing these boundaries too.
 * The response from the ONS Open Geography API returns coordinates as
 * eastings and northings. These have to be converted to latitude and longitude
 * for Google Maps. Some APIs exist that do this. We have used some code to
 * convert the values.
 *
 * @param response - the JSON response from the ONS Open Geograph API
 */
function callback(response) {
   // get boundaries
   if (response.results != null && response.results.length > 0)
   {
     var ens = new Array();
     for (var k = 0; k < response.results[0].geometry.rings.length; k++) {
        ens[k] = response.results[0].geometry.rings[k];
     }

     // approximate datum correction, good enough for this demo
     var latmeters = 50;
     var lonmeters = -100;

     var minlat = 360.0;
     var maxlat = -360.0;
     var minlon = 360.0;
     var maxlon = -360.0;

     //alert('numberOfParentRings = ' + numberOfParentRings + ' ens.length = ' + ens.length);

     // create array of points converted to lat/lon (from easting/northing) and capture mins and maxes
     for (var j = numberOfParentRings; j < ens.length + numberOfParentRings; j++) {
        //latlons[j].length = 0;
        latlons[j] = new Array();
        for (var i = 0; i < ens[j-numberOfParentRings].length; i++) {
            var testpoint = ens[j-numberOfParentRings][i];
            var grid = new OsGridRef(testpoint[0] + lonmeters, testpoint[1] + latmeters);
            var latlon = OsGridRef.osGridToLatLong(grid);
            if (latlon.lon < minlon) {
                minlon = latlon.lon;
            }
            if (latlon.lon > maxlon) {
                maxlon = latlon.lon;
            }
            if (latlon.lat < minlat) {
                minlat = latlon.lat;
            }
            if (latlon.lat > maxlat) {
                maxlat = latlon.lat;
            }
            latlons[j][i] = latlon;
        }
     }

     // calculate zoom level (presently based on selected area, rather than parent area)
     var zoomLevel = getZoom(minlon, maxlon, minlat, maxlat, 512, 512);

     // calculate centroid
     var centroid = getCentroid(minlon, maxlon, minlat, maxlat);
     if(!parentArea)
     {
        initialize(centroid.lat, centroid.lon, zoomLevel, latlons);
     }
   }
   else
   {
        alert("No matching area found in ONS Open Geography API.");
   }

   // If this was the parent area, now go and get the boundaries for the selected area
   if(parentArea)
   {
      parentArea = false;
      if(ens != null)
      {
         numberOfParentRings = ens.length;
      }
      else
      {
         numberOfParentRings = 0;
      }
      getBoundaries(storeAreaCode, storeAreaType, null, null, parentArea)
   }
}

/*
 * calculate zoom level to fit boundaries on screen
 *
 * @param minLng
 * @param maxLng
 * @param minLat
 * @param maxLat
 * @param pixelWidth
 * @param pixelHeight
 *
 * @return zoom
 */
function getZoom(minLng, maxLng, minLat, maxLat, pixelWidth, pixelHeight) {
    var GLOBE_HEIGHT = 256; // Height of a google map that displays the entire world when zoomed all the way out
    var GLOBE_WIDTH = 256; // Width of a google map that displays the entire world when zoomed all the way out
    var latAngle = maxLat - minLat;
    if (latAngle < 0) {
        latAngle += 360;
    }
    latAngle = latAngle * 1.6;
    var lngAngle = maxLng - minLng;
    var latZoomLevel = Math.floor(Math.log(pixelHeight * 360 / latAngle / GLOBE_HEIGHT) / Math.LN2);
    var lngZoomLevel = Math.floor(Math.log(pixelWidth * 360 / lngAngle / GLOBE_WIDTH) / Math.LN2);
    return (latZoomLevel < lngZoomLevel) ? latZoomLevel : lngZoomLevel;
}

/*
 * get the centre point of a rectangle
 *
 * @param minLng
 * @param maxLng
 * @param minLat
 * @param maxLat
 *
 * @return LatLon - coordinate of centre of rectangle
 */
function getCentroid(minLng, maxLng, minLat, maxLat) {
    var avLng = (minLng + maxLng) / 2;
    var avLat = (minLat + maxLat) / 2;
    return new LatLon(avLat, avLng);
}

/*
 * lat / long object (holds latitude and longitude coordinates)
 *
 * @param lat - latitude coordinate
 * @param lon - longitude coordinate
 */
function LatLon(lat, lon) {
    this.lat = lat;
    this.lon = lon;
}

/*
 * Grid Ref object (holds easting and northing coordinates)
 *
 * @param easting coordinate
 * @param northing coordinate
 */
function OsGridRef(easting, northing) {
    this.easting = parseInt(easting, 10);
    this.northing = parseInt(northing, 10);
}

/*
 * Convert degrees to radians
 *
 * @param degrees
 *
 * @return radians
 */
function deg2rad(deg) {
    conv_factor = (2.0 * Math.PI) / 360.0;
    return (deg * conv_factor);
}

/*
 * Convert radians to degrees
 *
 * @param radians
 *
 * @return degrees
 */
function rad2deg(rad) {
    conv_factor = 360 / (2.0 * Math.PI);
    return (rad * conv_factor);
}

/* Convert degrees to metres for known latitude
 *
 * @param latdeg
 *
 * @return latlen (metres for known latitude)
 */
function degtometerslat(latdeg) {
    lat = deg2rad(latdeg);
    m1 = 111132.92; // latitude calculation term 1
    m2 = -559.82; // latitude calculation term 2
    m3 = 1.175; // latitude calculation term 3
    m4 = -0.0023; // latitude calculation term 4
    latlen = m1 + (m2 * Math.cos(2 * lat)) + (m3 * Math.cos(4 * lat)) + (m4 * Math.cos(6 * lat));
    return latlen;
}

/* Convert degrees to metres for known longitude
 *
 * @param latdeg
 *
 * @return latlen (metres for known longitude)
 */
function degtometerslon(latdeg) {
    lat = deg2rad(latdeg);
    p1 = 111412.84; // longitude calculation term 1
    p2 = -93.5; // longitude calculation term 2
    p3 = 0.118; // longitude calculation term 3
    longlen = (p1 * Math.cos(lat)) + (p2 * Math.cos(3 * lat)) + (p3 * Math.cos(5 * lat));
    return longlen;
}

 // convert degrees to radians
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

// convert radians to degrees (signed)
Number.prototype.toDeg = function () {
    return this * 180 / Math.PI;
}

Number.prototype.padLZ = function (w) {
    var n = this.toString();
    for (var i = 0; i < w - n.length; i++) n = '0' + n;
    return n;
}

/**
 * Convert Ordnance Survey grid reference easting/northing coordinate to (OSGB36) latitude/longitude
 *
 * @param {OsGridRef} easting/northing to be converted to latitude/longitude
 *
 * @return {LatLon} latitude/longitude (in OSGB36) of supplied grid reference
 */
OsGridRef.osGridToLatLong = function (gridref) {
    var E = gridref.easting;
    var N = gridref.northing;

    var a = 6377563.396,
        b = 6356256.910; // Airy 1830 major & minor semi-axes
    var F0 = 0.9996012717; // NatGrid scale factor on central meridian
    var lat0 = 49 * Math.PI / 180,
        lon0 = -2 * Math.PI / 180; // NatGrid true origin
    var N0 = -100000,
        E0 = 400000; // northing & easting of true origin, metres
    var e2 = 1 - (b * b) / (a * a); // eccentricity squared
    var n = (a - b) / (a + b),
        n2 = n * n,
        n3 = n * n * n;

    var lat = lat0,
        M = 0;
    do {
        lat = (N - N0 - M) / (a * F0) + lat;

        var Ma = (1 + n + (5 / 4) * n2 + (5 / 4) * n3) * (lat - lat0);
        var Mb = (3 * n + 3 * n * n + (21 / 8) * n3) * Math.sin(lat - lat0) * Math.cos(lat + lat0);
        var Mc = ((15 / 8) * n2 + (15 / 8) * n3) * Math.sin(2 * (lat - lat0)) * Math.cos(2 * (lat + lat0));
        var Md = (35 / 24) * n3 * Math.sin(3 * (lat - lat0)) * Math.cos(3 * (lat + lat0));
        M = b * F0 * (Ma - Mb + Mc - Md); // meridional arc

    } while (N - N0 - M >= 0.00001); // ie until < 0.01mm

    var cosLat = Math.cos(lat),
        sinLat = Math.sin(lat);
    var nu = a * F0 / Math.sqrt(1 - e2 * sinLat * sinLat); // transverse radius of curvature
    var rho = a * F0 * (1 - e2) / Math.pow(1 - e2 * sinLat * sinLat, 1.5); // meridional radius of curvature
    var eta2 = nu / rho - 1;

    var tanLat = Math.tan(lat);
    var tan2lat = tanLat * tanLat,
        tan4lat = tan2lat * tan2lat,
        tan6lat = tan4lat * tan2lat;
    var secLat = 1 / cosLat;
    var nu3 = nu * nu * nu,
        nu5 = nu3 * nu * nu,
        nu7 = nu5 * nu * nu;
    var VII = tanLat / (2 * rho * nu);
    var VIII = tanLat / (24 * rho * nu3) * (5 + 3 * tan2lat + eta2 - 9 * tan2lat * eta2);
    var IX = tanLat / (720 * rho * nu5) * (61 + 90 * tan2lat + 45 * tan4lat);
    var X = secLat / nu;
    var XI = secLat / (6 * nu3) * (nu / rho + 2 * tan2lat);
    var XII = secLat / (120 * nu5) * (5 + 28 * tan2lat + 24 * tan4lat);
    var XIIA = secLat / (5040 * nu7) * (61 + 662 * tan2lat + 1320 * tan4lat + 720 * tan6lat);

    var dE = (E - E0),
        dE2 = dE * dE,
        dE3 = dE2 * dE,
        dE4 = dE2 * dE2,
        dE5 = dE3 * dE2,
        dE6 = dE4 * dE2,
        dE7 = dE5 * dE2;
    lat = lat - VII * dE2 + VIII * dE4 - IX * dE6;
    var lon = lon0 + X * dE - XI * dE3 + XII * dE5 - XIIA * dE7;

    return new LatLon(lat.toDeg(), lon.toDeg());
}

/* 
 * Initialize - Create Google Map
 *
 * @param myLat
 * @param myLong
 * @param myZoom
 * @param latlons
 */
function initialize(myLat, myLong, myZoom, latlons) {
   
 //   alert("Lat = " + myLat);
        var myLatLng = new google.maps.LatLng(myLat, myLong);
    var mapOptions = {
        zoom: myZoom,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var adminAreaBoundary = null;
    var adminParentAreaBoundary = null;
    var adminBoundaryParentArea = null;
    var adminBoundaryArea = null;
    var map = null;

    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    if (latlons != null) {
        var adminCoordsParentArea = new Array();
        var adminCoordsArea = new Array();

        for (var j = 0; j < numberOfParentRings;j++)
        {
           var adminCoordsParentArea = new Array();
           var count = 0;
           for (var i = 0; i < latlons[j].length; i++) {
               adminCoordsParentArea[i] = new google.maps.LatLng(latlons[j][i].lat, latlons[j][i].lon);
               count++;
           }

           // Construct the polygon for parent area
           adminBoundaryParentArea = new google.maps.Polygon({
               paths: adminCoordsParentArea,
               strokeColor: '#FF0000',
               strokeOpacity: 0.8,
               strokeWeight: 1,
               fillColor: 'red',
               fillOpacity: 0.20
           });

           adminBoundaryParentArea.setMap(map);
        }

        for (var j = numberOfParentRings; j < latlons.length;j++)
        {
           var adminCoordsArea = new Array();
           var count = 0;
           for (var i = 0; i < latlons[j].length; i++) {
               adminCoordsArea[i] = new google.maps.LatLng(latlons[j][i].lat, latlons[j][i].lon);
               count++;
           }

           // Construct the polygon for selected area
           adminBoundaryArea = new google.maps.Polygon({
               paths: adminCoordsArea,
               strokeColor: '#FF0000',
               strokeOpacity: 0.8,
               strokeWeight: 1,
               fillColor: 'blue',
               fillOpacity: 0.20
           });

           adminBoundaryArea.setMap(map);
        }
    }
   // Reset latlons and parent area count
   try
   {
      // clear the array
      latlons.length = 0;
   }
   catch(e)
   {
      // do nothing
   }
   latlons = new Array();
   numberOfParentRings = 0;
}

// Initialise google mapping when the page loads
//try
//{
//   google.maps.event.addDomListener(window, 'load', initialize);
//}
//catch(error)
//{
 //  mapError2();
//}

function mapError() {
   $("#mapTitle").html("<h3 class='profileTitle'>Map</h3>");
   $("#map").css("height",50);
   $("#map").css("borderStyle","none");
   $("#map").html("<p class='message'>Could not display a map of the area. May have timed out trying to retrieve boundary information.</p>");
}

function mapError2() {
   $("#mapTitle").html("<h3 class='profileTitle'>Map</h3>");
   $("#map").css("height",50);
   $("#map").css("borderStyle","none");
   $("#map").html("<p class='message'>An error occurred trying to initialise google mapping.</p>");
}

function hideMapDiv() {
   $("#mapTitle").html("");
   $("#map").css("height",0);
   $("#map").css("borderStyle","none");
}

function resetMapDiv() {
   $("#mapTitle").html("<h3 class='profileTitle'>Map</h3>");
   $("#map").css("height",600);
   $("#map").css("borderStyle","solid");
}