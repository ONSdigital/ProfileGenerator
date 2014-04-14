/*
  * Functions for manipulating the JSON data returned from a call
  * to the ONS API and outputting the results as an expandable tree.
  * The data used is the areas.
  * The tree is initialised with a call to the ONS API that
  * retrieves the top level area 'England and Wales'.
  * The areas relate to specific hierarchies, eg, 2011WARDH
  * or 2011STATH, so a hierarchy needs to be supplied in the URI
  * Also, different hierarchies are available for different datasets,
  * so a dataset id also needs to be supplied in the URI.
  * Here we have arbitrarily picked a dataset id and corresponding
  * hierarchy id. 
  * Pick a hierarchy and then hit the 'Initialise Area Tree' button
  * to initialise the tree with the top level area.
  * When an area node is expanded for a particular area, that
  * area's sub-areas are retrieved and displayed as children
  * of the parent area. Once retrieved they do not need to be
  * re-retrieved via the ONS API if a node (area) is closed and
  * then re-opened again.
  *
  * This works in both IE and Firefox and uses the JQuery and JSTree
  * javascript library plug-ins, which are free open source libraries.
  *
  * URL format for top level areas
  * http://fa1rvlapxx055:7003/ons/api/data/hierarchy/QS611EW.json?context=Census&apikey=XqL126djgi&geog=2011WARDH&parent=&levels=0
  *
  * URL format for getting sub-areas of a parent area
  * http://fa1rvlapxx055:7003/ons/api/data/hierarchy/QS611EW/parent/PARENT_AREA_CODE_GOES_HERE.json?context=Census&apikey=XqL126djgi&geog=2011WARDH
  *
  * Author: Neil Sillitoe for Office for National Statistics
  */

 var endpointAreaLIVE = "http://www.onstest.statistics.gov.uk/ons/api/data/hierarchy/";
//var endpointAreaLIVE = "http://data.ons.gov.uk/ons/api/data/hierarchy/";
// API_KEY picked up from profile_utils

// Context (census, economic, etc)
var context = "?context=Census";

// Geographical Hierarchy
var hierarchy = "&geog=";

// Get top level areas to initially populate area tree with
var filterTopLevelAreas = "&parent=&levels=0"; //top level

// Get areas under a specific parent area
var filterSubAreas = "/parent/";

var formatXML = ".xml";
var formatJSON = ".json";

var jsonAreaObject;
var jsonAreaData = "";

var highestLevelNumber = 0;
var gotMaxLevelNumber = false;

var hierarchyId = "2011WARDH";
var datasetId = "QS418EW";

// display language - English or Welsh ('en' or 'cy')
var language = '0';

/**
   * When document loaded, set a handler on the click event
   * for the 'go' button. When clicked, display the 'twirly'
   * in the area tree box, to show something processing is
   * occurring, call the resetPage function and then 
   * the getAreaData function.
   */
$(document).ready(function()
{
   $("#preview").click(function (event){
      //alert("go clicked - call getReportData");
      if($("#areaCode").val() == "" || $("#parentAreaCode").val() == "")
      {
         alert("Area code and Parent area code fields are empty.\n\nYou must select an area for these fields to be populated before you can preview,\nor you can type in the codes if you know them.");
         return;
      }
      if( ($("#areaName").val().indexOf("England") != -1 && $("#areaName").val().indexOf("East of") == -1) || $("#areaName").val().indexOf("Wales") != -1)
      {
         alert("The results are presented for your selected area, it's parent area and for England and Wales.\n\nWe do not have data at UK level, so you need to select an area below country");
         return;
      }
      resetPageProfile();
      clearProfiles();
      reset2();
      getReportData();
   });
   repopulate();
})

function repopulate()
{
   resetPageArea();
   $("#areaTree").attr('class', 'demo_init2');

   $("#areaCode").val("");
   $("#areaName").val("");
   $("#areaType").val("");
   $("#parentAreaCode").val("");
   $("#parentAreaName").val("");
   $("#parentAreaType").val("");
   getAreaData(null);

   $("#generate").click(function (event){
      document.getElementById('codeTextArea').value = "";
      generate();
   });
}

/**
   * Reset variables, clear previous information
   * output to the page.
   */
function resetPageArea()
{
   //alert("reset page");
   jsonAreaObject = null;
   jsonAreaData = "";
   data = [];
   highestLevelNumber = 0;
   gotMaxLevelNumber = false;
}

/**
   * Select the filter to use in the ONS API call
   * to extract the appropriate data. If a parent code
   * is supplied then it uses the filter to fetch sub-areas
   * of the parent area using the parent area code.
   * If no parent area is supplied then the top level areas:
   * UK and England and Wales are retrieved.
   * The json data returned is then processed, to convert to
   * the required json format for jstree to use, and then
   * used to populate the area tree.
   *
   * @param parentCode the code (id) of the parent area
   * @param fetchChildAreas - overide to get the child area codes for selected area to use in process_utils
   */
function getAreaData(parentCode, fetchChildAreas)
{
   var filterToUse = "";
   var initialiseTree = true;
   language = $("#language").val();
   hierarchyId = $("#hierarchy").val();
   if(environment == ENV_LIVE)
   {
      if(hierarchyId == "2011WARDH" || hierarchyId == "2011PCONH")
      {
         datasetId = "QS418EW";
      }
      if(hierarchyId == "2011STATH")
      {
         datasetId = "DC1102EW";
      }
   }

   if(parentCode == null)
   {
      filterToUse = datasetId + formatJSON + context + "&apikey=" + eval("apiKey" + environment) + hierarchy + hierarchyId + filterTopLevelAreas;
      initialiseTree = true;
   }
   else
   {
      filterToUse = datasetId + filterSubAreas + parentCode + formatJSON + context + "&apikey=" + eval("apiKey" + environment) + hierarchy + hierarchyId;
      initialiseTree = false;
   }
   var result = "";
   $.when(getDataArea(filterToUse)).done
   (
      function(data) {
         result = processData(data, initialiseTree, fetchChildAreas);
      }
   )
   if(fetchChildAreas)
   {
      return result;
   }
}

/**
  * Calls functions to validate the json data and if it is
  * a valid format, reformat it so that it can be used by
  * jsTree to display the data in the area tree. If the
  * initialiseTree parameter is true then the data is added
  * assuming that the top level areas are being added to the
  * tree, otherwise this isn't called. If the data is not
  * of valid json format then a message is displayed to
  * this effect.
  *
  * @param data - the JSON data returned by the ONS API call
  * @param boolean - whether to initialise the tree
  */
function processData(data, initialiseTree, fetchChildAreas) {

  // test if data is valid json format and if so,
  // the the data is stored on the jsonAreaObject
  var success = validateJson(jsonAreaObject, data, false);

  if(success)
  {
     if(!fetchChildAreas)
     {
        reformatJSONDataArea(jsonAreaObject);
        if(initialiseTree)
        {
           populateTreeInit_API(jsonAreaObject);
        }
     }
     else
     {
        // Get child areas of selected area
        // but not for tree - to use as further filter on data
        // in process_utils.
        var result = extractAreaDataToFetchChildren(jsonAreaObject);

        return result;
     }
  }
  else
  {
     $("#areaTree").attr('class', 'demo');
     $("#areaTree").append("<p>JSON data not a valid format - cannot proceed</p>");
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
function getDataArea(filt)
{
   var url = eval("endpointArea" + environment) + filt;

   //alert('data area url = ' + url);
   var data;

   //jQuery.support.cors = true;
   $.ajaxSetup({
			//type: "GET",
         data: {},
         cache: true,
         //contentType: "application/json",
         dataType: "jsonp",
         xhrFields: {
			   withCredentials: true
			},
			crossDomain: true
   });

   return $.ajax({
      url: url,
      timeout: 40000, // 40 second timout because Firefox not firing event handlers for some errors that IE is and request doesn't terminate (although Firebug doesn't show request) - timeout just in case
      //success: function(result,status,xhr){alert("Success! result: " + result + " status: " + status + " xhr = " + xhr);},
      error: function(xhr,status,error){alert("Error! status: " + status + " xhr: " + xhr.status + " error: " + error);$("#areaTree").attr('class', 'demo');$("#areaTree").append("<p>Unable to retrieve data - cannot proceed</p>");}
   })
}

/**
   * Takes the json data and creates the json structure needed
   * for elements within the jstree structure.
   *
   * @param jsonDataset object - the json data received from the api call
   */
function reformatJSONDataArea(obj)
{
   var tree = [];

   tree = extractAreaData(obj);

   obj.tree = tree;
}

/*
 * Used to create a string jsonAreaObject for the supplied area details,
 * in this case just used for the initial area in the tree, UK.
 *
 * @param areaName - the name of the area
 * @param parentCode - name of the parent code for that area
 * @param isParent - boolean whether this area has child areas (sub areas)
 *
 * @return string json for that area
 */
function jsonAreaUK(areaName, parentCode, isParent)
{
   var stringJSON = "";

   if(isParent)
   {
       stringJSON = '{"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '"}, "state" : "open"';
   }
   else
   {
       stringJSON = '{"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '"}';
   }

   return stringJSON;
}

/*
 * Used to create a string jsonAreaObject for the supplied area details.
 *
 * @param areaName - the name of the area
 * @param parentCode - name of the parent code for that area
 * @param isParent - boolean whether this area has child areas (sub areas)
 *
 * @return string json for that area
 */
function jsonArea(areaName, parentCode, areaType, isParent)
{
   var stringJSON = "";

   if(isParent)
   {
       stringJSON = '{"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '", "rel": "' + areaType + '", "title": "' + areaType + '"}, "state" : "closed"}';
   }
   else
   {
       stringJSON = '{"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '", "rel": "' + areaType + '", "title": "' + areaType + '"}}';
   }
   return stringJSON;
}

/*
 * Used to create a string jsonAreaObject for the supplied area details,
 * as a child of previous area. Used for England and Wales to create
 * the initial tree with UK at the top and England and Wales as a 
 * child (sub-area) of the UK.
 *
 * @param areaName - the name of the area
 * @param parentCode - name of the parent code for that area
 * @param isParent - boolean whether this area has child areas (sub areas)
 *
 * @return string json for that area
 */
function jsonAreaChild(areaName, parentCode, isParent)
{
   var stringJSON = null;
   if(isParent)
   {
      stringJSON = '"children" : [[ {"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '"}, "state" : "closed"} ]]}';
   }
   else
   {
      stringJSON = '"children" : [[ {"data": "' + areaName + '" , "attr": {"id": "' + parentCode + '"} } ]]}';
   }
   return stringJSON;
}

/*
 * Used to create a string list of area codes for the
 * child areas of the selected area. Added to allow
 * profile utils to add another table of just the child
 * areas of the selected area (if there are any).
 *
 * @param obj - jsonAreaObject holding the data
 *
 * @return sting - list of area codes, eg, E0100001, E0100002, etc.
 */
function extractAreaDataToFetchChildren(obj)
{
   // Get the list of area items
   var items = obj.ons.geographyList.item;
   var strAreaCodes = "";

   // More than one geography item
   for (i = 0; i < items.length; i++)
   {
      // Get area code
      var itemCode = items[i].itemCode;
      strAreaCodes = strAreaCodes + itemCode;
      if(i < items.length - 1)
      {
         strAreaCodes = strAreaCodes + ",";
      }
   }
   return strAreaCodes;
}

/*
 * Loops through the areas held in the JSON data held in the jsonAreaObject
 * and builds up a string of json data in the format required by jstree
 * to populate the tree with the individual areas.
 * and stores the areas name and level type, eg, LA, Ward (if level type present)
 * into an array to be used to output on the chart in, eg, the legend.
 *
 * @param obj - jsonAreaObject holding the data
 *
 * @return  jsonAreaData - string of json data
 */
function extractAreaData(obj)
{
   // Get the list of area items
   var items = obj.ons.geographyList.item;
   jsonAreaData = "";
   var isAParent = true;

   if(items.length == undefined)
   {
      // Top level area (England and Wales)
      var areaDetails = items.labels.label[language].$;
      var itemCode = items.itemCode;
      var areaType = items.areaType.abbreviation;

      jsonAreaData = jsonAreaData + jsonArea(areaDetails, itemCode, areaType, isAParent);
   }
   else
   {
      // More than one geography item
      for (i = 0; i < items.length; i++)
      {
         // Get English area name
         var areaDetails = items[i].labels.label[language].$;
         // Get parent area code
         var itemCode = items[i].itemCode;
         // Get area type abbreviated
         var areaType = items[i].areaType.abbreviation;
         // Get area type full
         var areaTypeFull = items[i].areaType.codename;
         // Get current area level number
         var currentLevel = items[i].areaType.level;

         //var test = getMaxLevelForAreaTypes(obj);
         //alert('currentLevel = ' + currentLevel + ' getMaxLevelForAreaTypes(obj) = ' + test);
         if(currentLevel < getMaxLevelForAreaTypes(obj))
         {
             isAParent = true;
         }
         else
         {

       //      isAParent = true;
             isAParent = false;
         }

         if(i > 0)
         {
            jsonAreaData = jsonAreaData + ", " + jsonArea(areaDetails, itemCode, areaType, isAParent);
         }
         else
         {
            jsonAreaData = jsonAreaData + jsonArea(areaDetails, itemCode, areaType, isAParent);
         }
      }
   }
   return jsonAreaData;
}

/**
   * Receives xml object and extracts the area types list.
   * Loops through the area types that relate to this hierarchy
   * and gets the level number for each, retaining the highest
   * level number retrieved. This is the maximum area level
   * number that can be expanded to, eg, 'England & Wales' is 0,
   * 'England' is 1, 'South' (a region) is 2, etc.
   * This is used to decide when an area is added to the area tree,
   * whether it has any sub areas, or whether we are at the lowest 
   * level (whether to make it expandable).
   *
   */
function getMaxLevelForAreaTypes(obj)
{
//   if(!gotMaxLevelNumber)
//   {
 //     var areaType = obj.ons.geographyList.areaTypes.areaType;
   
 //     for (var i = 0; i < areaType.length; i++)
  //    {
   //       if (highestLevelNumber < areaType[i].level)
  //        {
  //           highestLevelNumber = areaType[i].level;
   //       }
   //   }
      //alert('highest level number = ' + highestLevelNumber);
    //  gotMaxLevelNumber = true;
 //  }

      if(hierarchyId == "2011WARDH")
	{
	highestLevelNumber = 5;
	}

 	if (hierarchyId == "2011PCONH")
	{
	highestLevelNumber = 3;
	}


   return highestLevelNumber;
}

/**
   * Receives the data from the ONS API call and validates it.
   * If the data is valid it is stored on the jsonAreaObject.
   * Optionally alerts the user via a popup of the result.
   *
   * @param jsonAreaObject - object used to hold the parsed JSON data
   * @param data - the json data returned from the ONS API call
   * @param alertUser - boolean whether to display if the data is valid, or not, in a popup
   *
   * @return boolean - whether the data was valid json format
   */
function validateJson(obj, data, alertUser)
{
  try
  {
     obj = jsonAreaObject;
     var json_str = JSON.stringify(data);

     jsonAreaObject = jQuery.parseJSON(json_str);
     //jsonAreaObject = JSON.parse(json_str);
     //alert('json_str = ' + json_str);
     //alert('jsonAreaObject = ' + jsonAreaObject);

     jsonAreaObject = data;

	  if (alertUser)
	  {
        alert("Valid JSON" + json_str);
	  }
	  return true;
  }
  catch (error)
  {
 	  if (alertUser)
	  {
        alert("Validation failed with error: " + error);
     }
     return false;
  }
}

/*
 * This function is called to initially populate the area tree
 * with the top level area England and Wales. This is done using the
 * jsonAreaData string object passed in with that data in the correct
 * format for jsTree.
 * It also places the separate AJAX call and pre-processing to
 * fetch further data. This is done via the click event. When a
 * node in the tree is clicked and is not already populated with
 * sub-areas, the node is passed through to the function and the
 * parent code attribute is extracted and used to make a further
 * call to the ONSAPI to fetch all sub-areas of that parent code.
 * These are then processed into the required json string structure,
 * as with the top level area, and the json string is parsed as JSON
 * to populate the tree.
 *
 * @param jsonAreaObject
 */
function populateTreeInit_API(obj)
{
   // Remove 'twirly' now the data has been retrieved.
   // The twirly was set as a background with the css class 'demo_init'
   $("#areaTree").attr('class', 'demo');

   //var hierarchy_dataset = $("#hierarchy").val();
   //var arr = hierarchy_dataset.split(":");

   // Initialise tree
   $("#areaTree").jstree(
   {
      "json_data" : {
            "data" : [
            $.parseJSON("[" + jsonAreaData + "]")
            ],
            "ajax" : {
               "url": function(node) {
                  var nodeId = node.attr("id");
                  //var url = endpoint + "." + formatJSON + context + hierarchy + $("#hierarchy").val() + filterSubAreas + nodeId;
                  var url = eval("endpointArea" + environment) + datasetId + filterSubAreas + nodeId + formatJSON + context + "&apikey=" + eval("apiKey" + environment) + hierarchy + hierarchyId;
                  //alert('fetching sub area where node id = ' + nodeId + ' url = ' + url);
                  return url;
               },
               "dataType": "jsonp",
               "success": function (new_data) {
                  //alert('new_data = ' + new_data);
                  processData(new_data, false);
                  //alert('jsonAreaData now = ' + jsonAreaData);
                  return $.parseJSON("[" + jsonAreaData + "]");
               },
               error: function (xhr, textstatus, errorThrown) {
                    alert("xhr = " + xhr + " textstatus = " + textstatus + " errorThrown = " + errorThrown);
               }
            }
         },
         "ui" : {

             "select_limit" : 1,
         },
         // This section swaps the default folder icon for a customised one, if the type matches that of the node
         // uncomment out to display icons for type matches, eg, tye='WD' will display the ward image rather than
         // the standard folder icon. Add more types, or replace the images with better ones, as required.
         /* ### UNCOMMENT HERE TO DISPLAY IMAGES ###
         "types" : {
            "types" : {
               "GOR" : {
                  "icon" : {
                     "image" : "img/folder_GOR.bmp"
                  }
               },
               "CTY" : {
                  "icon" : {
                     "image" : "img/folder_COUNTY.bmp"
                  }
               },
               "LA" : {
                  "icon" : {
                     "image" : "img/folder_LA.bmp"
                  }
               },
               "WD" : {
                  "icon" : {
                        "image" : "img/folder_WARD.bmp"
                     }
               },
               "OA" : {
                  "icon" : {
                        "image" : "img/folder_OA.bmp"
                     }
               }
            }
         },
         */ // ### UNCOMMENT HERE TO DISPLAY IMAGES ###
         "plugins" : [ "themes", "json_data", "types", "ui" ]
   });

   // This function requires the 'ui' plugin to be referenced in jsTree
   // and is used to respond to a particular area being clicked. I have
   // set the maximum number that can be selected to 1. You can also add
   // checkboxes to the tree nodes and deal with a number of selections.
   $(function () {
      $("#areaTree")
      .bind("select_node.jstree", function (event, data) {
         var selectedObj = data.rslt.obj;
         var parentOfSelectedObj = data.inst._get_parent(selectedObj);
	//alert(selectedObj.attr("rel"));
	if (selectedObj.attr("rel") == "CTRY" || selectedObj.attr("rel") == "NAT " )
	{
	         alert("The results are presented for your selected area, it's parent area and for England and Wales.\n\nWe do not have data at UK level, so you need to select an area below country");
	}
        //alert("Area Id (parent code): " + selectedObj.attr("id") + "\nArea details: " + data.inst.get_text(selectedObj)); // ID and Node Text
         $("#areaCode").val(selectedObj.attr("id"));
         $("#areaName").val(data.inst.get_text(selectedObj));
         $("#parentAreaCode").val(parentOfSelectedObj.attr("id"));
         $("#parentAreaName").val(data.inst.get_text(parentOfSelectedObj));
         $("#areaType").val(selectedObj.attr("rel"));
         $("#parentAreaType").val(parentOfSelectedObj.attr("rel"));
         })
   });
}