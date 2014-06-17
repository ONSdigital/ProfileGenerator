/*
  * This code example is provided by the Office for National Statistics under the terms of the 
  * Open Government Licence http://www.nationalarchives.gov.uk/doc/open-government-licence/
  *
  * NOTE: For live API calls please change the apikey= value in the query string to your own API Key
  *
  * Functions for manipulating the JSON data returned from calls
  * to the ONS API and outputting the results as html tables and charts.
  * Requires the libraries: jQuery, jqPlot, tablesorter and uses Google Maps.
  *
  * Author: Neil Sillitoe (ONS)
  *
  */
var ENV_PREPROD = "PREPROD";
var ENV_LIVE = "LIVE";

var firstColumn = [];

//################################
//    Current Environment        #
//							   //#
var environment = ENV_LIVE;    //#
//                             //#
//################################

var endpointProfileLIVE = "http://data.ons.gov.uk/ons/api/data/dataset/";

var apiKeyLIVE = "0YOH4UDkTJ";

// 2011WARDH on Live
// Demography
var dataLIVE2011WARDH1 = "QS102EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Population Density - Concept_???
var dataLIVE2011WARDH2 = "QS103EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Age profile - Concept_1
var dataLIVE2011WARDH3 = "KS103EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Marital Status - Concept_???
// Ethnicity, Identity, Language and Religion (EILR)
var dataLIVE2011WARDH4 = "QS201EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Ethnic Group - Concept_33
var dataLIVE2011WARDH5 = "KS209EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Religion - Concept_???
// Migration
var dataLIVE2011WARDH6 = "KS204EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Country of Birth - Concept_???
var dataLIVE2011WARDH7 = "KS205EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Passports Held - Concept_???
// Health
var dataLIVE2011WARDH8 = "QS302EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // General Health - Concept_43
var dataLIVE2011WARDH9 = "QS301EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Unpaid Care - Concept_41
// Housing
var dataLIVE2011WARDH10 = "QS401EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Accommodation Type - Concept_45
var dataLIVE2011WARDH11 = "QS403EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Tenure - Concept_57
var dataLIVE2011WARDH12 = "KS404EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Car or van availability - Concept_???
var dataLIVE2011WARDH13 = "QS406EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Household size - Concept_50
// Labour Market
var dataLIVE2011WARDH14 = "QS601EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Economic Activity - Concept_62
var dataLIVE2011WARDH15 = "KS605EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Industry - Concept_???
var dataLIVE2011WARDH16 = "QS607EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/CL_0000066=CI_0000668,CI_0000681,CI_0000670,CI_0000673,CI_0000674,CI_0000676,CI_0000671,CI_0000669,CI_0000679&dm/2011WARDH="; // NS-SeC - Concept_65
var dataLIVE2011WARDH17 = "KS608EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Occupation - Concept_???
// Travel to Work
var dataLIVE2011WARDH18 = "QS701EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011WARDH&totals=false&dm/2011WARDH="; // Method of travel to work - Concept_70

// Concept ID of the non-location dimension for each profile (in order) LIVE - 2011 Ward Profile
var firstColumn_LIVE_2011WARDH = [["Concept_???"],["Concept_1"],["Concept_???"],["Concept_33"],["Concept_???"],["Concept_???"],["Concept_???"],["Concept_41"],["Concept_43"],["Concept_45"],["Concept_57"],["Concept_???"],["Concept_50"],["Concept_62"],["Concept_???"],["Concept_65"],["Concept_???"],["Concept_70"]];

// Age Ranges for summary profile
var sumProfile_LIVE_2011WARDH_2 = [[0,0],[0,4],[5,9],[10,15],[16,24],[25,44],[45,64],[65,74],[75,79],[80,84],[85,100]];


// 2011PCONH on Live
// Demography
var dataLIVE2011PCONH1 = "QS102EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Population Density - Concept_???
var dataLIVE2011PCONH2 = "QS103EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Age profile - Concept_1
var dataLIVE2011PCONH3 = "KS103EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Marital Status - Concept_???
// Ethnicity, Identity, Language and Religion (EILR)
var dataLIVE2011PCONH4 = "QS201EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Ethnic Group - Concept_33
var dataLIVE2011PCONH5 = "KS209EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Religion - Concept_???
// Migration
var dataLIVE2011PCONH6 = "KS204EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Country of Birth - Concept_???
var dataLIVE2011PCONH7 = "KS205EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Passports Held - Concept_???
// Health
var dataLIVE2011PCONH8 = "QS302EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // General Health - Concept_43
var dataLIVE2011PCONH9 = "QS301EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Unpaid Care - Concept_41
// Housing
var dataLIVE2011PCONH10 = "QS401EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Accommodation Type - Concept_45
var dataLIVE2011PCONH11 = "QS403EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Tenure - Concept_57
var dataLIVE2011PCONH12 = "KS404EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Car or van availability - Concept_???
var dataLIVE2011PCONH13 = "QS406EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Household size - Concept_50
// Labour Market
var dataLIVE2011PCONH14 = "QS601EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Economic Activity - Concept_62
var dataLIVE2011PCONH15 = "KS605EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Industry - Concept_???
var dataLIVE2011PCONH16 = "QS607EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/CL_0000066=CI_0000668,CI_0000681,CI_0000670,CI_0000673,CI_0000674,CI_0000676,CI_0000671,CI_0000669,CI_0000679&dm/2011PCONH="; // NS-SeC - Concept_65
var dataLIVE2011PCONH17 = "KS608EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Occupation - Concept_???
// Travel to Work
var dataLIVE2011PCONH18 = "QS701EW.json?context=Census&apikey=" + apiKeyLIVE + "&geog=2011PCONH&totals=false&dm/2011PCONH="; // Method of travel to work - Concept_70

// Concept ID of the non-location dimension for each profile (in order) LIVE - 2011 Parliamentary Constituency
// NOTE: Health concepts revervsed for QS302 and QS301 - others all the same!!!
var firstColumn_LIVE_2011PCONH = [["Concept_???"],["Concept_1"],["Concept_???"],["Concept_33"],["Concept_???"],["Concept_???"],["Concept_???"],["Concept_41"],["Concept_43"],["Concept_45"],["Concept_57"],["Concept_???"],["Concept_50"],["Concept_62"],["Concept_???"],["Concept_65"],["Concept_???"],["Concept_70"]];

// Age Ranges for summary profile
var sumProfile_LIVE_2011PCONH_2 = [[0,0],[0,4],[5,9],[10,15],[16,24],[25,44],[45,64],[65,74],[75,79],[80,84],[85,100]];



// Context (census, economic, etc)
//var context = "&context=Census";
var geog = "&geog=2011STATH";
var total = "&totals=false";

var dataset1 = "DC2102EW";

var filterAreaSelectionTest = "00HBNM,00HB,727";

//var filterArea = "reft/area=";
var filterArea = "dm/2011STATH=";
var filterAge = "dm/Age=";
var filterSex = "dm/Sex=";
var filterResidentType = "reft/resident_type=NA";

var c_England_And_Wales = "K04000001";

var formatJSON = ".json";

var rows;
var cols;
// Number of decimal places to display percentages to
var c_DecimalPlaces = 2;

var sortedAreaCodes = null;
var sortedRowCodes = null;

var areadata = [];

var filterSubAreaSelection = null;

var totals = [];
var areaLabels0 = []; // For main table
var areaLabels1 = []; // For sub-table (wards)
// Language 0 = English, 1 = Welsh
var language = "0";

// [positionProfile( eg, 0,1,2,etc)  ,  data ]
var jsonObject = [[0,null],[1,null],[2,null],[3,null],[4,null],[5,null],[6,null],[7,null],[8,null],[9,null],[10,null],[11,null],[12,null],[12,null],[14,null],[15,null],[16,null],[17,null]];
var completedProfiles = 0;
var profileContainingData = null;

var htmlProfileResults = new Array(18); // Array to hold html tables for generate page
var XstrSeriesData = []; // Array to hold counts and percentages data for generate page (line/bar charts)
var XstrSeriesDataPie = []; // Array to hold counts and percentages data for generate page (pie/doughnug charts)
for(a = 0; a < 19; a++)
{
   // Arrays to hold html tables for generate page
   htmlProfileResults[a] = [];
   htmlProfileResults[a][0] = [];
   htmlProfileResults[a][1] = [];
   
   // Arrays to hold counts and percentages data for generate page (line/bar charts)
   XstrSeriesData[a] = [];
   XstrSeriesData[a][0] = [];
   XstrSeriesData[a][1] = [];
   
   // Arrays to hold counts and percentages data for generate page (pie/doughnug charts)
   XstrSeriesDataPie[a] = [];
   XstrSeriesDataPie[a][0] = [];
   XstrSeriesDataPie[a][1] = [];
}
var htmlTableCounts = "";

// Charts
var strLabs0 = null;
var strLabs1 = null;
var strLabs2 = null;
var strLabs3 = null;
var strLabs4 = null;
var strLabs5 = null;
var strLabs6 = null;
var strLabs7 = null;
var strLabs8 = null;
var strLabs9 = null;
var strLabs10 = null;
var strLabs11 = null;
var strLabs12 = null;
var strLabs13 = null;
var strLabs14 = null;
var strLabs15 = null;
var strLabs16 = null;
var strLabs17 = null;

// keydim = list of areas 0_0 = first profile and table 1  (selected area, parent area, England and Wales)
//                        0_1 = first profile and table 2 (wards)
var strKeyDim0_0 = null;
var strKeyDim0_1 = null;
var strKeyDim1_0 = null;
var strKeyDim1_1 = null;
var strKeyDim2_0 = null;
var strKeyDim2_1 = null;
var strKeyDim3_0 = null;
var strKeyDim3_1 = null;
var strKeyDim4_0 = null;
var strKeyDim4_1 = null;
var strKeyDim5_0 = null;
var strKeyDim5_1 = null;
var strKeyDim6_0 = null;
var strKeyDim6_1 = null;
var strKeyDim7_0 = null;
var strKeyDim7_1 = null;
var strKeyDim8_0 = null;
var strKeyDim8_1 = null;
var strKeyDim9_0 = null;
var strKeyDim9_1 = null;
var strKeyDim10_0 = null;
var strKeyDim10_1 = null;
var strKeyDim11_0 = null;
var strKeyDim11_1 = null;
var strKeyDim12_0 = null;
var strKeyDim12_1 = null;
var strKeyDim13_0 = null;
var strKeyDim13_1 = null;
var strKeyDim14_0 = null;
var strKeyDim14_1 = null;
var strKeyDim15_0 = null;
var strKeyDim15_1 = null;
var strKeyDim16_0 = null;
var strKeyDim16_1 = null;
var strKeyDim17_0 = null;
var strKeyDim17_1 = null;

// Maps
var strAreaCode = null;
var strAreaType = null;
var strParentAreaCode = null;
var strParentAreaType = null;
var strSelectedAreaName = null;

/*
 * Call an external resize function in LifeRay page
 * to resize the iFrame the profile generator is
 * inserted into, so that we do not end up with
 * double scrollbars (for browser and for iFrame).
 *
 */
function externalResize()
{
   try 
   {
     var h = $(document).height() + 100;
     var w = $(document).width();

     // call a function in LifeRay to see if can
     // 'talk to' this function and resize iFrame.
     parent.resizeLifeRayIFrame(h,w);
   }
   catch(e)
   {
      // Ignore if function not present, or cannot see it.
   }
}

/**
   * Reset variables, clear previous information
   * output to the page.
   */
function resetPageProfile()
{
document.getElementById("generate").disabled = false; 
document.getElementById('codebox').style.display = 'none';
document.getElementById('codebox').style.visibility = 'hidden';  
document.getElementById('results').style.display = 'block';
document.getElementById('results').style.visibility = 'visible';
document.getElementById('maintitle').innerHTML = document.getElementById('areaName').value + ' Area Profile Preview'; 
   rows = null;
   cols = null;

   areadata = [];

   totals = [];
   //areaLabels = [];
   areaLabels0 = []; // main table
   areaLabels1 = []; // sub-table (wards)
   sortedAreaCodes = null;
   sortedRowCodes = null;

   completedProfiles = 0;

   //htmlProfileResults = [];
   htmlTableCounts = "";

   firstColumn = [];

   profileContainingData = null;

   //labs = [];
}

function reset2()
{
   var jsonObject = [[0,null],[1,null],[2,null],[3,null],[4,null],[5,null],[6,null],[7,null],[8,null],[9,null],[10,null],[11,null],[12,null],[12,null],[14,null],[15,null],[16,null],[17,null]];

   htmlProfileResults = new Array(18); // Array to hold html tables for generate page
   XstrSeriesData = []; // Array to hold counts and percentages data for generate page (line/bar charts)
   XstrSeriesDataPie = []; // Array to hold counts and percentages data for generate page (pie/doughnug charts)

   for(a = 0; a < 19; a++)
   {
      // Arrays to hold html tables for generate page
      htmlProfileResults[a] = [];
      htmlProfileResults[a][0] = [];
      htmlProfileResults[a][1] = [];

      // Arrays to hold counts and percentages data for generate page (line/bar charts)
      XstrSeriesData[a] = [];
      XstrSeriesData[a][0] = [];
      XstrSeriesData[a][1] = [];
      
      // Arrays to hold counts and percentages data for generate page (pie/doughnug charts)
      XstrSeriesDataPie[a] = [];
      XstrSeriesDataPie[a][0] = [];
      XstrSeriesDataPie[a][1] = [];
   }
   profileContainingData = null;
}

/**
   * Calls the getData function by building up a string of
   * getDataProfile(n) calls for each profile selected.
   * Once complete, if selected, the mapping code is called
   * to display a map with appropriate boundaries (for
   * selected area and it's parent area).
   *
   */
function getReportData()
{
   //jsonObject = [[0,null],[1,null],[2,null],[3,null]];
   jsonObject = [[0,null],[1,null],[2,null],[3,null],[4,null],[5,null],[6,null],[7,null],[8,null],[9,null],[10,null],[11,null],[12,null],[12,null],[14,null],[15,null],[16,null],[17,null]];
   var profiles_to_fetch = "";
   language = $("#language").val();
   hierarchyId = $("#hierarchy").val();
   
   var currentAreaType = $("#areaType").val();
   var fetchSubAreas = false;

   if(hierarchyId == '2011WARDH')
   {
      if(currentAreaType != "WD")
      {
         fetchSubAreas = true;
      }
      else
      {
         fetchSubAreas = false;
      }
   }
   if(hierarchyId == '2011PCONH')
   {
      if(currentAreaType != "WPC")
      {
         fetchSubAreas = true;
      }
      else
      {
         fetchSubAreas = false;
      }
   }

   //if($("#table0").prop("checked") || $("#chart0").val() > 0)
   if($("#table0").prop("checked") || $("#chart0").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = "getDataProfile(0,false);getDataProfile(0,true);";
      }
      else
      {
         profiles_to_fetch = "getDataProfile(0,false);";
      }
   }
   //if($("#table1").prop("checked") || $("#chart1").val() > 0)
   if($("#table1").prop("checked") || $("#chart1").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(1,false);getDataProfile(1,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(1,false);";
      }
   }
   //if($("#table2").prop("checked") || $("#chart2").val() > 0)
   if($("#table2").prop("checked") || $("#chart2").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(2,false);getDataProfile(2,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(2,false);";
      }
   }
   //if($("#table3").prop("checked") || $("#chart3").val() > 0)
   if($("#table3").prop("checked") || $("#chart3").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(3,false);getDataProfile(3,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(3,false);";
      }
   }
   //if($("#table4").prop("checked") || $("#chart4").val() > 0)
   if($("#table4").prop("checked") || $("#chart4").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(4,false);getDataProfile(4,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(4,false);";
      }
   }
   //if($("#table5").prop("checked") || $("#chart5").val() > 0)
   if($("#table5").prop("checked") || $("#chart5").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(5,false);getDataProfile(5,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(5,false);";
      }
   }
   //if($("#table6").prop("checked") || $("#chart6").val() > 0)
   if($("#table6").prop("checked") || $("#chart6").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(6,false);getDataProfile(6,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(6,false);";
      }
   }
   //if($("#table7").prop("checked") || $("#chart7").val() > 0)
   if($("#table7").prop("checked") || $("#chart7").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(7,false);getDataProfile(7,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(7,false);";
      }
   }
   //if($("#table8").prop("checked") || $("#chart8").val() > 0)
   if($("#table8").prop("checked") || $("#chart8").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(8,false);getDataProfile(8,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(8,false);";
      }
   }
   //if($("#table9").prop("checked") || $("#chart9").val() > 0)
   if($("#table9").prop("checked") || $("#chart9").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(9,false);getDataProfile(9,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(9,false);";
      }
   }
   //if($("#table10").prop("checked") || $("#chart10").val() > 0)
   if($("#table10").prop("checked") || $("#chart10").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(10,false);getDataProfile(10,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(10,false);";
      }
   }
   //if($("#table11").prop("checked") || $("#chart11").val() > 0)
   if($("#table11").prop("checked") || $("#chart11").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(11,false);getDataProfile(11,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(11,false);";
      }
   }
   //if($("#table12").prop("checked") || $("#chart12").val() > 0)
   if($("#table12").prop("checked") || $("#chart12").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(12,false);getDataProfile(12,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(12,false);";
      }
   }
   //if($("#table13").prop("checked") || $("#chart13").val() > 0)
   if($("#table13").prop("checked") || $("#chart13").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(13,false);getDataProfile(13,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(13,false);";
      }
   }
   //if($("#table14").prop("checked") || $("#chart14").val() > 0)
   if($("#table14").prop("checked") || $("#chart14").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(14,false);getDataProfile(14,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(14,false);";
      }
   }
   //if($("#table15").prop("checked") || $("#chart15").val() > 0)
   if($("#table15").prop("checked") || $("#chart15").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(15,false);getDataProfile(15,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(15,false);";
      }
   }
   //if($("#table16").prop("checked") || $("#chart16").val() > 0)
   if($("#table16").prop("checked") || $("#chart16").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(16,false);getDataProfile(16,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(16,false);";
      }
   }
   //if($("#table17").prop("checked") || $("#chart17").val() > 0)
   if($("#table17").prop("checked") || $("#chart17").prop("checked"))
   {
      if(fetchSubAreas)
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(17,false);getDataProfile(17,true);";
      }
      else
      {
         profiles_to_fetch = profiles_to_fetch + "getDataProfile(17,false);";
      }
   }

   hideMapDiv();

   filterSubAreaSelection = null;
   if(fetchSubAreas)
   {
      identifier = 1;
      filterToUse = datasetId + filterSubAreas + $("#areaCode").val() + formatJSON + context + "&apikey=" + eval("apiKey" + environment) + hierarchy + hierarchyId;
      initialiseTree = false;
      $.when(getDataArea(filterToUse)).done
      (
         function(data) {
            filterSubAreaSelection = processData(data, initialiseTree, true);
            //alert('got sub areas ' + filterSubAreaSelection);
            //alert('profiles_to_fetch ' + profiles_to_fetch);
            $.when(eval(profiles_to_fetch)).done(
               function(){
                  if($("#showMap").prop("checked"))
                  {
                     //alert('show map called');
                     resetMapDiv();
                     strAreaCode = $("#areaCode").val();
                     strAreaType = $("#areaType").val();
                     strParentAreaCode = $("#parentAreaCode").val();
                     strParentAreaType = $("#parentAreaType").val();
                     strSelectedAreaName = $("#areaName").val();
                     strAreaType = $("#areaType").val();
         
                     // Call function to get boundaries for selected area and parent area and display on a map
                     getBoundaries(strAreaCode, strAreaType, strParentAreaCode, strParentAreaType, true);
                  }
                  else
                  {
                     hideMapDiv();
                  }
                  // Issue knowing when page fully populated with asynchronous ajax, hence timeout
                  setTimeout('externalResize()',2000);
               }
            );
         }
      )
   }
   else
   {
      $.when(eval(profiles_to_fetch)).done(
         function(){
            if($("#showMap").prop("checked"))
            {
               //alert('show map called');
               resetMapDiv();
               strAreaCode = $("#areaCode").val();
               strAreaType = $("#areaType").val();
               strParentAreaCode = $("#parentAreaCode").val();
               strParentAreaType = $("#parentAreaType").val();
               strSelectedAreaName = $("#areaName").val();
               strAreaType = $("#areaType").val();
   
               // Call function to get boundaries for selected area and parent area and display on a map
               getBoundaries(strAreaCode, strAreaType, strParentAreaCode, strParentAreaType, true);
            }
            else
            {
               hideMapDiv();
            }
            // Issue knowing when page fully populated with asynchronous ajax, hence timeout
            setTimeout('externalResize()',2000);
         }
      );
   }
}

/**
   * Makes the API call, requesting the data in JSON format and returns the data,
   * or reports any error.
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   */
function getDataProfile(positionProfile, subTable)
{
   var identifier = 0;
   var filterAreaSelection = "";
   if(!subTable)
   {
      identifier = 0;
      initialise(positionProfile);
      filterAreaSelection = $("#areaCode").val() + "," + $("#parentAreaCode").val() + "," +  c_England_And_Wales;
      return makeCall(positionProfile, subTable, filterAreaSelection);
   }
   else
   {
      return makeCall(positionProfile, subTable, filterSubAreaSelection);
   }
}

/**
   * Makes the API call, requesting the data in JSON format and returns the data,
   * or reports any error.
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   * @param filterAreaSelection - string containing 3 area codes separated by commas
   */
function makeCall(positionProfile, subTable, filterAreaSelection)
{
   var url = "";
   var summaryProfile = null;

   if(positionProfile == 1)
   {
      //url = eval("endpointProfile" + environment) + eval("data" + environment + hierarchyId + "1") + filterAreaSelection;
      //alert('environment = ' + environment + 'hierarchyId = ' + hierarchyId);
      if(environment == ENV_LIVE && hierarchyId == '2011WARDH' )
      {
         summaryProfile = eval("sumProfile_" + environment + "_" + hierarchyId + "_2");
      }
      if(environment == ENV_LIVE && hierarchyId == '2011PCONH' )
      {
         summaryProfile = eval("sumProfile_" + environment + "_" + hierarchyId + "_2");
      }
   }

   url = eval("endpointProfile" + environment) + eval("data" + environment + hierarchyId + (positionProfile+1).toString()) + filterAreaSelection;
   //alert("url = " + url);

   return $.ajax({

      data: {},
   			dataType: "jsonp",
   			cache: true,
			xhrFields: {
     			withCredentials: true
   			},
   			crossDomain: true,
   		url: url,
   		timeout: 90000, // 90 second timout because Firefox not firing event handlers for some errors that IE is and request doesn't terminate (although Firebug doesn't show request) - timeout just in case
      success: function(data,status,xhr){
         //alert('success profile = ' + positionProfile + ' subTable = ' + subTable + ' data = ' + data);

         if(!subTable)
         {
            jsonObject[positionProfile][0] = data;
         }
         else
         {
            jsonObject[positionProfile][1] = data;
         }

         resetPageProfile();
         success = validateJsonProfile(positionProfile, data, subTable, false);
         if(success)
         {
            firstColumn = eval("firstColumn_" + environment + "_" + hierarchyId);
            reformatJSONData(positionProfile,jsonObject,firstColumn[positionProfile],subTable);
            // use true for 5th parameter in outputTable() for pivot table (areas down side and other dimension across top)
            outputTable(positionProfile,0,summaryProfile, subTable, true); // table with counts (true = pivot - areas as row heading, other dimension as column heading)
            outputTable(positionProfile,1,summaryProfile, subTable, true); // table with percentages (true = pivot - areas as row heading, other dimension as column heading)
            outputChart(positionProfile, subTable);
            if(profileContainingData != null)
            {
               profileContainingData = positionProfile;
            }
         }
         else
         {
            $(eval('"#profile' + positionProfile + '"')).append("<p><b>The data returned is not valid JSON format. Cannot proceed.<b></p>");
         }
      },
      //success: function(result,status,xhr){alert("result = " + result);},
      error: function(xhr,status,error){
         //alert("Error! status: " + status + " xhr: " + xhr + " error: " + error);
         $(eval('"#profile' + positionProfile + '"')).attr('class', '');
         $(eval('"#profile' + positionProfile + '"')).append("<p>Unable to retrieve data - cannot proceed</p>")
      }
   })
   //.done(function() {)
   //.fail(function(jqXHR, textStatus, errorThrown) { alert("fail: error - textStatus: " + textStatus + " error thrown: " + errorThrown); })
   //.always(function() { alert("complete"); });
}

/**
   * Output the category heading for the profile to be output and display the 'twirly' to indicate
   * that the data for that profile is in the process of being retrieved.
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   */
function initialise(positionProfile)
{
   
  if (language == 0)
  {   
// Output category heading for profile
   if(positionProfile >= 0 && positionProfile < 3 && $("#profile0").html().length < 1)
   {
      $(eval('"#profile' + 0 + '"')).append("<h3 class='profileTitle'>&nbsp;Demography</h3>");
   }
   if(positionProfile >= 3 && positionProfile < 5 && $("#profile1").html().length < 1)
   {
      $(eval('"#profile' + 1 + '"')).append("<h3 class='profileTitle'>&nbsp;Ethnicity, Identity, Language and Religion (EILR)</h3>");
   }
   if(positionProfile >= 5 && positionProfile < 7 && $("#profile2").html().length < 1)
   {
      $(eval('"#profile' + 2 + '"')).append("<h3 class='profileTitle'>&nbsp;Migration</h3>");
   }
   if(positionProfile >= 7 && positionProfile < 9 && $("#profile3").html().length < 1)
   {
      $(eval('"#profile' + 3 + '"')).append("<h3 class='profileTitle'>&nbsp;Health</h3>");
   }
   if(positionProfile >= 9 && positionProfile < 13 && $("#profile4").html().length < 1)
   {
      $(eval('"#profile' + 4 + '"')).append("<h3 class='profileTitle'>&nbsp;Housing and Accommodation</h3>");
   }
   if(positionProfile >= 13 && positionProfile < 17 && $("#profile5").html().length < 1)
   {
      $(eval('"#profile' + 5 + '"')).append("<h3 class='profileTitle'>&nbsp;Labour Market</h3>");
   }
   if(positionProfile == 17 && $("#profile6").html().length < 1)
   {
      $(eval('"#profile' + 6 + '"')).append("<h3 class='profileTitle'>&nbsp;Travel to Work</h3>");
   }
  }
  else
  {
    //welsh
   if(positionProfile >= 0 && positionProfile < 3 && $("#profile0").html().length < 1)
   {
      $(eval('"#profile' + 0 + '"')).append("<h3 class='profileTitle'>&nbsp;Demograffeg</h3>");
   }
   if(positionProfile >= 3 && positionProfile < 5 && $("#profile1").html().length < 1)
   {
      $(eval('"#profile' + 1 + '"')).append("<h3 class='profileTitle'>&nbsp;Ethnigrwydd, Hunaniaeth, Iaith a Chrefydd (EHIC)</h3>");
   }
   if(positionProfile >= 5 && positionProfile < 7 && $("#profile2").html().length < 1)
   {
      $(eval('"#profile' + 2 + '"')).append("<h3 class='profileTitle'>&nbsp;Ymfudo</h3>");
   }
   if(positionProfile >= 7 && positionProfile < 9 && $("#profile3").html().length < 1)
   {
      $(eval('"#profile' + 3 + '"')).append("<h3 class='profileTitle'>&nbsp;Iechyd</h3>");
   }
   if(positionProfile >= 9 && positionProfile < 13 && $("#profile4").html().length < 1)
   {
      $(eval('"#profile' + 4 + '"')).append("<h3 class='profileTitle'>&nbsp;Tai a Llety</h3>");
   }
   if(positionProfile >= 13 && positionProfile < 17 && $("#profile5").html().length < 1)
   {
      $(eval('"#profile' + 5 + '"')).append("<h3 class='profileTitle'>&nbsp;Y Farchnad Lafur</h3>");
   }
   if(positionProfile == 17 && $("#profile6").html().length < 1)
   {
      $(eval('"#profile' + 6 + '"')).append("<h3 class='profileTitle'>&nbsp;Y dull o deithio i’r gwaith</h3>");
   }
  }

   // Display enclosing div that holds table/chart divs for profile being displayed.
   // NOTE: it is set to not display on reset so no blank lines appear and toggle doesn't cause table to shift.
   $(eval('"#enclose' + positionProfile + '"')).attr('style', 'display: block;');

   // Output 'twirly' to indicate that data is being retrieved
   $(eval('"#tableProfile' + positionProfile + '_0_0_VIS' + '"')).attr('class', 'initialising');
}

/**
   * Clear any profiles that are present on the page.
   * Also destroys the charts.
   *
   * IMPORTANT: destroying the plots is essential, otherwise
   *            there is a memory leak with JQPlot in Firefox,
   *            Chrome and Safari (seems ok in IE). The browsers
   *            will run out of memory and crash if all charts
   *            selected and successively called. Only closing
   *            the browser seems to release the memory.
   *
   */
function clearProfiles()
{
   try
   {
      // destroy plot to release resources
      // and prevent memory leak in Firefox, Chrome and Safari
      plotA.destroy();
   }
   catch(error)
   {
      // Ignore - plot didn't exist
   }
   for (z = 0; z < 18; z++)
   {
      try
      {
         // destroy plot to release resources
         // and prevent memory leak in Firefox, Chrome and Safari
         eval('plot' + z + '_0').destroy();
      }
      catch(error)
      {
         // Ignore - plot didn't exist
      }
      
      // Do not display divs for tables/charts of profile not being shown
      // to prevent blank lines and shifting of table when toggling.
      $(eval('"#enclose' + z + '"')).attr('style', 'display: none;');

      $(eval('"#profile' + z + '"')).html("");
      $(eval('"#profile' + z + '"')).text("");
      $(eval('"#tableProfile' + z + '_0_0_VIS"')).html("");
      $(eval('"#tableProfile' + z + '_0_0_HID"')).html("");
      $(eval('"#tableProfile' + z + '_0_1_VIS"')).html("");
      $(eval('"#tableProfile' + z + '_0_1_HID"')).html("");
      $(eval('"#tableProfile' + z + '_1_0_VIS"')).html("");
      $(eval('"#tableProfile' + z + '_1_0_HID"')).html("");
      $(eval('"#tableProfile' + z + '_1_1_VIS"')).html("");
      $(eval('"#tableProfile' + z + '_1_1_HID"')).html("");
      $(eval('"#chartProfile' + z + '_0"')).html("");
      $(eval('"#chartProfile' + z + '_0"')).text("");
      $(eval('"#chartProfile' + z + '_0"')).attr('style', 'height: 0px;');
      $(eval('"#chartProfile' + z + '_1"')).html("");
      $(eval('"#chartProfile' + z + '_1"')).text("");
      $(eval('"#chartProfile' + z + '_1"')).attr('style', 'height: 0px;');
   }
   
   
   // Reset profiles to original settings
   for (z = 0; z < 18; z++)
   {
      $("#tableProfile" + z + "_0_0_" + "HID").attr("id","tableProfile" + z + "_0_0_" + "VIS");
      $("#tableProfile" + z + "_0_1_" + "VIS").attr("id","tableProfile" + z + "_0_1_" + "HID");
      $("#tableProfile" + z + "_1_0_" + "HID").attr("id","tableProfile" + z + "_1_0_" + "VIS");
      $("#tableProfile" + z + "_1_1_" + "VIS").attr("id","tableProfile" + z + "_1_1_" + "HID");
   }


}

/**
   * Call function in chartUtils to display the appropriate chart (if selected
   * to display a chart for this profile).
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   */
function outputChart(positionProfile, subTable)
{
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   // Stop drawing chart for sub-table due to memory issue!
   if(!subTable)
   {
      // Has user selected to display a chart for this profile?
      //var chartType = $(eval('"#chart' + positionProfile + '"')).val();
      //if(chartType > 0)
      if($(eval('"#chart' + positionProfile + '"')).prop("checked"))
      {
         var chartType = $(eval('"#chart' + positionProfile + '"')).val();
         var heading = getHeading(positionProfile, subTable, true);

         if(chartType == 1)
         {
            displayLineChart(positionProfile, subTable, heading);
         }
         if(chartType == 2)
         {
            displayBarChart(positionProfile, subTable, heading);
         }
         if(chartType == 3)
         {
            displayDoughnutChart(positionProfile, subTable, heading);
         }
      }
   }
}

/*
 * Loops through the columns, which hold the dimensions, to
 * look for a match on the supplied codelist id. When a match
 * is found, the conceptRef for this dimension is returned.
 *
 * @param positionProfile - which profile this relates to
 * @param codelist id - the codelist id to find
 *
 * @return conceptRef - string value of matching conceptRef
 */
function getConceptRefFromCodelistId(positionProfile, codelistid)
{
   var match = "";
   for (z = 0; z < cols.length; z++)
   {
      if(cols[z].dim["@codelist"] == codelistid)
      {
         match = cols[z].dim["@conceptRef"];
         break;
      }
   }
   return match;
}

/**
   * Receives the data from the ONS API call and validates it.
   * If the data is valid it is stored on the jsonObject.
   * Optionally alerts the user via a popup of the result.
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param data - the json data returned from the ONS API call
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   * @param alertUser - boolean whether to display if the data is valid, or not, in a popup
   *
   * @return boolean - whether the data was valid json format
   */
function validateJsonProfile(positionProfile, data, subTable, alertUser)
{
   var identifier = 0;

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

  try
  {
     //$.parseJSON(data + "]");
     jQuery.parseJSON(jsonObject[positionProfile][identifier]);

     //jsonObject[positionProfile][1] = data;

	  if (alertUser)
	  {
        alert("Valid JSON");
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

/**
   * Output the table column headins for a non-pivoted table (areas as columns, other dimension, eg, ages, as rows).
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param tableType 0 = counts, 1 = percentages
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   *
   * @return html String - the html string for the table column headings
   */
function outputColumnHeadings(positionProfile, tableType, subTable)
{
   var html = "";
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   for (i = 0; i < jsonObject[positionProfile][identifier].cols.length; i++)
   {
      //alert("column id = " + jsonObject.cols[i].id + " column label = " + jsonObject.cols[i].label + " column type = " + jsonObject.cols[i].type);
      //alert("column id = " + jsonObject.cols[i].dim.codelist);
      //alert("jsonObject.cols[i].id = " + jsonObject.cols[i].id);

      var dimUnit = "";

      // Is this the first column, used for rows?
      if(jsonObject[positionProfile][identifier].cols[i].dim["@conceptRef"] == firstColumn[positionProfile])
      {
	if (language == 0)
	{
         html = html + "<th title='click on column heading to sort table by this column'>";
	}
	else
	{
	html = html + "<th title='cliciwch i drefnu data yn ôl y golofn hon'>";
	}

         var concepts = jsonObject[positionProfile][identifier]["ons.dataPackage"]["ons.structureData"]["message.Concepts"]["structure.ConceptScheme"]["structure.Concept"];
         for(j = 0; j < concepts.length; j++)
         {
           if(concepts[j]["@id"] == firstColumn[positionProfile])
           {
              html = html + concepts[j]["structure.Name"][language]["$"];
           }
         }
         html = html + "</th>";
      }

      // All other columns are for the chosen areas
      if(jsonObject[positionProfile][identifier].cols[i].dim["@conceptRef"] == "Location")
      {
         var areas = [];

         // Output area column headings in sorted order
         for(q = 0; q < jsonObject[positionProfile][identifier].sortedAreaCodes.length; q++)
         {
            html = html + "<th>" + jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][language]["$"] + "</th>";
            areas.push(jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][language]["$"]);
         }

         // set key dimensions and area labels for charts
         setKeyDimensions(positionProfile, subTable, areas);
      }
   }
   return html;
}

/**
   * Output the table column headins for a pivoted table (areas as rows, other dimension - ages - as column).
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param tableType 0 = counts, 1 = percentages
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   * @param summaryProfile array - array containing age ranges for summing, eg, [0,4],[5,9] means sum ages 0 to 4 and 5 to 9 and give total for age range
   *
   * @return html String - the html string for the table column headings
   */
function outputColumnHeadingsPivot(positionProfile, tableType, subTable, summaryProfile)
{
   var html = "";
   var dimUnit = "";
   var labs = [];

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   html = html + "<th>Location</th>";

   if(summaryProfile != null)
   {
      // Start at 1 for percentages table, as first column is total column (100%)
      for(x=tableType; x < summaryProfile.length; x++)
      {
         startVal = summaryProfile[x][0];
         endVal = summaryProfile[x][1];

         // If start value of range equals end value of range then no summing required for this row
         if(startVal == endVal && x == 0)
         {
            // row name for first column (use English if Welsh not present)
            var rowName = jsonObject[positionProfile][identifier].sortedRowCodes[0]["structure.Description"][language]["$"];
            if(typeof(rowName) === "undefined")
            {
               // No welsh name present - use English
               rowName = jsonObject[positionProfile][identifier].sortedRowCodes[0]["structure.Description"][0]["$"];
            }
            // output row name

	    if (language == 0)
	    {           
	   	html = html + "<th title='click on column heading to sort table by this column'>" + rowName + "</th>";
	    }
	    else
   	    {           
	        html = html + "<th title='cliciwch i drefnu data yn ôl y golofn hon'>" + rowName + "</th>";
	    }      
         }
         else
         {
            if(endVal == "100")
            {
	       if (language == 0)
	       {            
                  html = html + "<th title='click on column heading to sort table by this column'>" + startVal + " and over</th>";
	       }
	       else
	       {	
                  html = html + "<th title='cliciwch i drefnu data yn ôl y golofn hon'>" + startVal + " and over</th>";
	       }      
            }
            else
            {
		if (language == 0)
		{      
          	    html = html + "<th title='click on column heading to sort table by this column'>" + startVal + " to " + endVal + "</th>";
      		}
		else
		{
         	    html = html + "<th title='cliciwch i drefnu data yn ôl y golofn hon'>" + startVal + " to " + endVal + "</th>";
		}    
            }
         }
         var label = "";
         // chart data
         if(endVal == "100")
         {
            label = startVal + " and over";
         }
         else
         {
            label = startVal + " to " + endVal;
         }
	
         // chart labels
         labs.push(label);
      }
      jsonObject[positionProfile][identifier].labs = labs;
   }
   else
   {
      // Output non-location column headings in sorted order
      // Start at 1 for percentages table, as first column is total column (100%)
      for(q = tableType; q < jsonObject[positionProfile][identifier].areadata[0].length; q++)
      {
         var rowDesc = getRowCodeDescription(positionProfile, identifier, jsonObject[positionProfile][identifier].areadata[0][q]);
 
   	 // insert special break character to table heading only (not chart)     
      	 var rowDescBreak = rowDesc.replace(/\//g, "/&#x200B;");  

	 if (language == 0)
	 {
         html = html + "<th title='click on column heading to sort table by this column'>" + rowDescBreak + "</th>";
	 }
	 else
	 {
         html = html + "<th title='cliciwch i drefnu data yn ôl y golofn hon'>" + rowDescBreak + "</th>";
	 }
         var label = rowDesc;
	 if(label.length > 85) {
    		label = label.substring(0,80) + "...";
	}
    
         // chart labels
         labs.push(label);
      }
      jsonObject[positionProfile][identifier].labs = labs;
   }
   // set labels for charts
   setLabs(positionProfile,labs);

   var areas = [];
   // Get areas and store for use in chart
   for(p = 0; p < jsonObject[positionProfile][identifier].sortedAreaCodes.length; p++)
   {
      areas.push(jsonObject[positionProfile][identifier].sortedAreaCodes[p]["structure.Description"][language]["$"]);
   }
   
   // set key dimensions and area labels for charts
   setKeyDimensions(positionProfile, subTable, areas);
   return html;
}

/**
   * Returns the name of a non-location dimenison
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param identifier 0 = main table, 1 = sub-table (wards)
   * @param series array - optional array containing age ranges for summing, eg, [0,4],[5,9] means sum ages 0 to 4 and 5 to 9 and give total for age range
   *
   * @return dimension name string - the name of the dimension, eg, 'Age 4' or 'Economically Active', etc.
   */
function getRowCodeDescription(positionProfile, identifier, series)
{
   var codeVal = "";
   var dimensionName = "";
   try
   {
      // Find the non-location codevalu in the series
      for(s1 = 0; s1 < series["dataRow"][0]["data"]["generic.SeriesKey"]["generic.Value"].length;s1++)
      {
         if(series["dataRow"][0]["data"]["generic.SeriesKey"]["generic.Value"][s1]["@concept"] != "Location")
         {
            codeVal = series["dataRow"][0]["data"]["generic.SeriesKey"]["generic.Value"][s1]["@value"];
            break;
         }
      }
      // Loop through the sortedRowCodes and find the same dimension here and get it's name for the description
      for(s2 = 0; s2 < jsonObject[positionProfile][identifier].sortedRowCodes.length; s2++)
      {
         if(jsonObject[positionProfile][identifier].sortedRowCodes[s2]["@value"] == codeVal)
         {
            dimensionName = jsonObject[positionProfile][identifier].sortedRowCodes[s2]["structure.Description"][language]["$"];
            if(typeof(dimensionName) === "undefined" || dimensionName == null)
            {
               // No welsh name present - use English
               dimensionName = jsonObject[positionProfile][identifier].sortedRowCodes[s2]["structure.Description"][0]["$"];
            }
            break;
         }
      }
   }
   catch(e)
   {
      // ignore - return empty string
   }
   return dimensionName;
}

/*
 * Return the appropriate heading for a specific profile,
 * to be used for a table or chart.
 *
 * @param postionProfile int - which profile, eg, 0, 1, 2 etc
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 * @param chart boolean - is heading for the chart or table?
 *
 * @return heading String - heading for table or chart for specified profile
 */
function getHeading(positionProfile, subTable, chart)
{
   var headingTitle = "";
   var heading = "";
   var headingW = "";

   var htmlTagOpen = "<h4 class='tableHeading'>";
   var htmlTagClose = "</h4>";

   if(positionProfile == 0)
   {
      heading = "Population Density (QS102EW)";
      headingW = "Population Density (QS102EW)";
   }
   if(positionProfile == 1)
   {
      heading = "Age Profile (QS103EW)";
      headingW = "Oedran fesul blwyddyn unigol (QS103EW)";
   }
   if(positionProfile == 2)
   {
      heading = "Marital Status (KS103EW)";
      headingW = "Marital Status (KS103EW)";
   }
   if(positionProfile == 3)
   {
      heading = "Ethnic Group (QS201EW)";
      headingW = "Grŵp ethnig (QS201EW)";
   }
   if(positionProfile == 4)
   {
      heading = "Religion (KS209EW)";
      headingW = "Religion (KS209EW)";
   }
   if(positionProfile == 5)
   {
      heading = "County of Birth (KS204EW)";
      headingW = "County of Birth (KS204EW)";
   }
   if(positionProfile == 6)
   {
      heading = "Passports Held (KS205EW)";
      headingW = "Passports Held (KS205EW)";
   }
   if(positionProfile == 7)
   {
      heading = "General Health (QS302EW)";
      headingW = "Iechyd cyffredinol (QS302EW)";
   }
   if(positionProfile == 8)
   {
      heading = "Unpaid Care (QS301EW)";
      headingW = "Darparu gofal di-dâl (QS301EW)";
   }
   if(positionProfile == 9)
   {
      heading = "Accommodation Type (QS401EW)";
      headingW = "Math o lety - Pobl (QS401EW)";
   }
   if(positionProfile == 10)
   {
      heading = "Tenure (QS403EW)";
      headingW = "Deiliadaeth - Pobl (QS403EW)";
   }
   if(positionProfile == 11)
   {
      heading = "Car or Van Availability (KS404EW)";
      headingW = "Car or Van Availability (KS404EW)";
   }
   if(positionProfile == 12)
   {
      heading = "Household Size (QS406EW)";
      headingW = "Maint y cartref (QS406EW)";
   }
   if(positionProfile == 13)
   {
      heading = "Economic Activity (QS601EW)";
      headingW = "Gweithgarwch Economaidd (QS601EW)";
   }
   if(positionProfile == 14)
   {
      heading = "Industry (KS605EW)";
      headingW = "Industry (KS605EW)";
   }
   if(positionProfile == 15)
   {
      heading = "NS-SeC (QS607EW)";
      headingW = "NS-SeC (QS607EW)";
   }
   if(positionProfile == 16)
   {
      heading = "Occupation (KS608EW)";
      headingW = "Occupation (KS608EW)";
   }
   if(positionProfile == 17)
   {
      heading = "Method of Travel to Work (QS701EW)";
      headingW = "Y dull o deithio i’r gwaith (QS701EW)";
   }
   
   if(!chart)
   {
   if (language == 0)
      {      
        headingTitle = htmlTagOpen + heading + htmlTagClose;
      }
      else
      {
        headingTitle = htmlTagOpen + headingW + htmlTagClose;
      } 
   }
   else
   {
   if (language == 0)
      {      
   	headingTitle = heading + " percentage of people";
      }
      else
      {
        headingTitle = headingW + " canran y pobl";
      } 
   }
   return headingTitle;
}

/**
   * Outputs the data in an HTML table and also outputs the
   * uri used to make the API call.
   *
   * @param postionProfile int - which profile, eg, 0, 1, 2 etc
   * @param tableType 0 = counts, 1 = percentages
   * @param summaryProfile array - optional array containing age ranges for summing, eg, [0,4],[5,9] means sum ages 0 to 4 and 5 to 9 and give total for age range
   * @param subTable boolean - is it the main table or the sub-table (wards)?
   */
function outputTable(positionProfile, tableType, summaryProfile, subTable, pivot)
{
   //alert('outputTable ' + positionProfile);
   var html = "";
   var toggle = "";
   var identifier = 0;

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   if(tableType == 0)
   {
      html = getHeading(positionProfile,subTable,false);
      html = html + "<table id='profileTable" + positionProfile + "_" + identifier + "_" + tableType + "_" + "VIS' class='tablesorter'>";
      toggle = "<p><input type='button' value='counts/percentages' title='toggle cells between counts and percentages' onclick='toggleTable(" + positionProfile + "," + identifier + ");'/></p>";
      if (language == 1)
      {
       toggle = "<p><input type='button' value='rhifo/canran' title='rhifo neu canran' onclick='toggleTable(" + positionProfile + "," + identifier + ");'/></p>";
      }   
   }
   else
   {
      html = getHeading(positionProfile,subTable,false);
      html = html + "<table id='profileTable" + positionProfile + "_" + identifier + "_" + tableType + "_" + "HID' class='tablesorter'>";
      toggle = "<p><input type='button' value='counts/percentages' title='toggle cells between counts and percentages' onclick='toggleTable(" + positionProfile + "," + identifier + ");'/></p>"; 
      if (language == 1)
      {   
   	toggle = "<p><input type='button' value='rhifo/canran' title='rhifo neu canran' onclick='toggleTable(" + positionProfile + "," + identifier + ");'/></p>";
      }	  

 }
   // Output the column headings
   //alert("number of columns to get = " + jsonObject.cols.length);
   html = html + "<thead><tr>";

   // Are we outputting the areas as column headings (pivot) or the other dimension as column headings (not pivotted)?
   if(!pivot)
   {
      html = html + outputColumnHeadings(positionProfile, tableType, subTable);
   }
   else
   {
      html = html + outputColumnHeadingsPivot(positionProfile, tableType, subTable, summaryProfile);
   }

   //alert("column id = " + jsonObject.cols[5].id + " column label = " + jsonObject.cols[5].label + " column type = " + jsonObject.cols[5].type);
   html = html + "</tr></thead>";
   //alert('html after columns = ' + html);

   //alert("number of rows to get = " + jsonObject.rows.length);
   html = html + "<tbody>";
   
   // Output the data
   if(summaryProfile != null)
   {
      if(!pivot)
      {
         html = outputRowsWithSumming(html, positionProfile, tableType, summaryProfile, subTable);
      }
      else
      {
         html = outputRowsWithSummingPivot(html, positionProfile, tableType, summaryProfile, subTable);
      }
   }
   else
   {
      if(!pivot)
      {
         html = outputRows(html,positionProfile, tableType, subTable);
      }
      else
      {
         html = outputRowsPivot(html,positionProfile, tableType, subTable);
      }
   }
   html = html + "</tbody>"
   html = html + "</table>";

   html = html + toggle;

   if(tableType == 0)
   {
      htmlTableCounts = "";
      htmlTableCounts = html;

      // Has user selected to display a table for this profile (needed to do processing here as results used for charts)?
      if($(eval('"#table' + positionProfile + '"')).prop("checked"))
      {
         // insert table into correct div, so that main table displayed above wards table
         // default is counts table visible and percentages hidden
         $(eval('"#tableProfile' + positionProfile + '_' + identifier + '_' + tableType + '_VIS"')).append(htmlTableCounts);
      }

      htmlProfileResults[positionProfile][identifier][tableType] = "<div class=\"tables\" id=\"tableProfile" + positionProfile + "_" + identifier + "_" + tableType + "_VIS" + "\">" + htmlTableCounts + "</div>\n";
   }
   else
   {
      //html = htmlTableCounts + html;
      htmlTablePercentages = html;

      // Has user selected to display a table for this profile (needed to do processing here as results used for charts)?
      if($(eval('"#table' + positionProfile + '"')).prop("checked"))
      {
         //$(eval('"#tableProfile' + positionProfile + '_1"')).append(htmlTablePercentages);
         // insert table into correct div, so that main table displayed above wards table
         // default is counts table visible and percentages hidden
         $(eval('"#tableProfile' + positionProfile + '_' + identifier + '_' + tableType + '_HID"')).append(htmlTablePercentages);
      }
      //htmlProfileResults[positionProfile][identifier][tableType] = "<div id=\"profile" + positionProfile + "\">" + htmlTablePercentages + "</div>\n";
      htmlProfileResults[positionProfile][identifier][tableType] = "<div class=\"tables\" id=\"tableProfile" + positionProfile + "_" + identifier + "_" + tableType + "_HID" + "\">" + htmlTablePercentages + "</div>\n";
      $(eval('"#tableProfile' + positionProfile + '_0_0_VIS' + '"')).attr('class', ''); // switch off twirly

      // Set up a custom parser for tablesorter called 'commaNumber'
      // This will remove commas from numbers before sorting them,
      // otherwise the ordering will be incorrect.
      $.tablesorter.addParser({
          id: "commaNumber",
          is: function(s) {
              return /^[\d-]?[\d,]*(\.\d+)?$/.test(s);
          },
          format: function(s) {
              return s.replace(/,/g,'');
          },
          type: 'numeric'
      });

      //alert("number of columns = " + jsonObject[positionProfile][identifier].sortedAreaCodes.length);
      var strHeader = "";
      for(a=0;a < jsonObject[positionProfile][identifier].sortedAreaCodes.length;a++)
      {
         strHeader = strHeader + (a+1) + ": {sorter: 'commaNumber'}";
         if(a < jsonObject[positionProfile][identifier].sortedAreaCodes.length - 1)
         {
            strHeader = strHeader + ",";
         }
      }
      strHeader = strHeader + "";
      //alert('strHeader = ' + strHeader);

      // Initialise sort for table containing counts (with commas in numbers) (tableType=0)
      $(eval('"#profileTable' + positionProfile + "_" + identifier + "_" + '0_VIS' + '"')).tablesorter({

         // [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending
         sortlist:[[0,1]],

        // add custom sort (zero-based index)  this will sort the 2nd, 3rd and 4th columns (the area)
        // using the parser to remove the commas, so the numbers are ordered correctly
        // Calls the custom parser by it's name 'commaNumber'.
        // NOTE: Could not get it to dynamically evaluate a string containing the correct number of columns,
        //       so had to insert more columns than expected maximum!!!
        headers: {
          1: {
            sorter: 'commaNumber'
          },
          2: {
            sorter: 'commaNumber'
          },
          3: {
            sorter: 'commaNumber'
          },
          4: {
            sorter: 'commaNumber'
          },
          5: {
            sorter: 'commaNumber'
          },
          6: {
            sorter: 'commaNumber'
          },
          7: {
            sorter: 'commaNumber'
          },
          8: {
            sorter: 'commaNumber'
          },
          9: {
            sorter: 'commaNumber'
          },
          10: {
            sorter: 'commaNumber'
          },
          11: {
            sorter: 'commaNumber'
          },
          12: {
            sorter: 'commaNumber'
          },
          13: {
            sorter: 'commaNumber'
          },
          14: {
            sorter: 'commaNumber'
          },
          15: {
            sorter: 'commaNumber'
          },
          16: {
            sorter: 'commaNumber'
          },
          17: {
            sorter: 'commaNumber'
          },
          18: {
            sorter: 'commaNumber'
          },
          19: {
            sorter: 'commaNumber'
          },
          20: {
            sorter: 'commaNumber'
          },
          21: {
            sorter: 'commaNumber'
          },
          22: {
            sorter: 'commaNumber'
          },
          23: {
            sorter: 'commaNumber'
          },
          24: {
            sorter: 'commaNumber'
          },
          25: {
            sorter: 'commaNumber'
          },
          26: {
            sorter: 'commaNumber'
          },
          27: {
            sorter: 'commaNumber'
          },
          28: {
            sorter: 'commaNumber'
          },
          29: {
            sorter: 'commaNumber'
          },
          30: {
            sorter: 'commaNumber'
          },
          31: {
            sorter: 'commaNumber'
          },
          32: {
            sorter: 'commaNumber'
          },
          33: {
            sorter: 'commaNumber'
          },
          34: {
            sorter: 'commaNumber'
          },
          35: {
            sorter: 'commaNumber'
          },
          36: {
            sorter: 'commaNumber'
          },
          37: {
            sorter: 'commaNumber'
          },
          38: {
            sorter: 'commaNumber'
          },
          39: {
            sorter: 'commaNumber'
          },
          40: {
            sorter: 'commaNumber'
          },
          41: {
            sorter: 'commaNumber'
          },
          42: {
            sorter: 'commaNumber'
          },
          43: {
            sorter: 'commaNumber'
          },
          44: {
            sorter: 'commaNumber'
          },
          45: {
            sorter: 'commaNumber'
          },
          46: {
            sorter: 'commaNumber'
          },
          47: {
            sorter: 'commaNumber'
          },
          48: {
            sorter: 'commaNumber'
          },
          49: {
            sorter: 'commaNumber'
          },
          50: {
            sorter: 'commaNumber'
          },
          51: {
            sorter: 'commaNumber'
          },
          52: {
            sorter: 'commaNumber'
          },
          53: {
            sorter: 'commaNumber'
          },
          54: {
            sorter: 'commaNumber'
          },
          55: {
            sorter: 'commaNumber'
          },
          56: {
            sorter: 'commaNumber'
          },
          57: {
            sorter: 'commaNumber'
          },
          58: {
            sorter: 'commaNumber'
          },
          59: {
            sorter: 'commaNumber'
          },
          60: {
            sorter: 'commaNumber'
          },
          61: {
            sorter: 'commaNumber'
          },
          62: {
            sorter: 'commaNumber'
          },
          63: {
            sorter: 'commaNumber'
          },
          64: {
            sorter: 'commaNumber'
          },
          65: {
            sorter: 'commaNumber'
          },
          66: {
            sorter: 'commaNumber'
          },
          67: {
            sorter: 'commaNumber'
          },
          68: {
            sorter: 'commaNumber'
          },
          69: {
            sorter: 'commaNumber'
          },
          70: {
            sorter: 'commaNumber'
          }
        }

        //headers: {eval(strHeader)}

      });

      // Initialise sort for table containing percentages (tableType=1)
      $(eval('"#profileTable' + positionProfile + "_" + identifier + "_" + '1_HID' + '"')).tablesorter({
         // [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending
         sortlist:[[0,1]]
      });
      //NOTE: above activates tablesorter on table, but doesn't apply sort - user has to click on a column header to apply sort
   }

}

/*
 * Output the table (no pivot) - with other dimension as row headings
 * and areas column headings.
 * Plus store data in format that can be
 * used by the charting code. Calculates percentage values
 * for each data item against the total for that area, to
 * aid display on line and bar charts. Doughnut charts
 * automatically convert all the values to percentages.
 *
 * @param html - string containing html code
 * @param positionProfile int - the numeric id of the profile
 * @param tableType 0 = counts, 1 = percentages
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @returns the html for the table
 */
function outputRows(html, positionProfile, tableType, subTable)
{
   // Array to hold series data for line/bar charts
   var seriesDataT1 = []; // counts for bar charts, line graphs
   var seriesDataT2 = []; // counts for bar charts, line graphs
   // Array to hold series data for pie/doughnut(donut) charts
   var seriesDataT1Pie = []; // counts for pie and doughnut charts (needs to be in a different format)
   var seriesDataT2Pie = []; // counts for pie and doughnut charts (needs to be in a different format)
   
   var labs = [];
   var identifier = 0;

   if(!subTable)
   {
      identifier = 0;
      jsonObject[positionProfile][identifier].keyDim0 = [];
   }
   else
   {
      identifier = 1;
      jsonObject[positionProfile][identifier].keyDim1 = [];
   }

   for(z = 0; z < jsonObject[positionProfile][identifier].areadata.length; z++)
   {
      seriesDataT1[z] = [];
      seriesDataT1Pie[z] = [];
      seriesDataT2[z] = [];
      seriesDataT2Pie[z] = [];
   }
   var counter = 0;
   if(tableType == 1)
   {
      counter = 1;
   }

   if(jsonObject[positionProfile][identifier].sortedRowCodes != null)
   {
      // Loop through each of the row codes (non-location dimensions)
      for(q = 0; q < jsonObject[positionProfile][identifier].sortedRowCodes.length; q++)
      {
         // Is there a data match for the current row (matching it's codelist value in sorted row codes against unsorted series data codelist value? If so, data exists.
         if(jsonObject[positionProfile][identifier].sortedRowCodes[q]["@value"] == getValueNonLocation(positionProfile,jsonObject[positionProfile][identifier].areadata[0][counter]))
         {
            var items = [];

            // loop through each areadata
            for(areaCounter4 = 0; areaCounter4 < jsonObject[positionProfile][identifier].areadata.length; areaCounter4++)
            {
               // check data stored for current areadata
               if(jsonObject[positionProfile][identifier].areadata[areaCounter4] != null && jsonObject[positionProfile][identifier].areadata[areaCounter4].length > 0)
               {
                  // store data value into items array for current area
                  try{
                     items[areaCounter4] = jsonObject[positionProfile][identifier].areadata[areaCounter4][counter]["dataRow"][0]["data"]["generic.Obs"]["generic.ObsValue"]["@value"];
                  }
                  catch(e)
                  {
                     //alert('error = ' + e);
                  }
               }
            }
            // row name for first column (use English if Welsh not present)
            var rowName = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][language]["$"];
            if(typeof(rowName) === "undefined")
            {
               // No welsh name present - use English
               rowName = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][0]["$"];
            }
   
            // output row name
            html = html + "<tr><td>" + rowName + "</td>";

            // chart label data
            var label = rowName;
            if(label === "undefined")
            {
               label = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][0]["$"];
            }

            // chart labels
            labs.push(label);

            for(areaCounter5 = 0; areaCounter5 < jsonObject[positionProfile][identifier].areadata.length; areaCounter5++)
            {
               // tableType = 0 is for counts
               if(tableType == 0)
               {
                  // data for area
                  html = html + "<td class='number'>" + addCommas(items[areaCounter5]) + "</td>";
               }
               // tableType = 1 is for percentages
               if(tableType == 1)
               {
                  // data for area
                  html = html + "<td class='number'>" + roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[areaCounter5]*100),c_DecimalPlaces) + "</td>";
               }
               
               // Store data for charts
               // Are we dealing with the main table, or the sub-table (wards)?
               if(!subTable)
               {
                  // convert data value to a percentage and store in array for percentage table for main table
                  // This is the format used for line and bar charts
                  seriesDataT1[areaCounter5].push(roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[areaCounter5]*100),c_DecimalPlaces));
               
                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT1Pie[areaCounter5].push([label, parseFloat(items[areaCounter5])]);
               }
               else
               {
                  // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                  // This is the format used for line and bar charts
                  seriesDataT2[areaCounter5].push(roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[areaCounter5]*100),c_DecimalPlaces));
                  
                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT2Pie[areaCounter5].push([label, parseFloat(items[areaCounter5])]);
               }
            }
            html = html + "</tr>";

            counter = counter + 1;
         }
      }
   }
   else
   {
      html = html + "<tr><td colspan='4'>No row data returned by API!</td>";
   }

   if(!subTable)
   {
      jsonObject[positionProfile][identifier].seriesDataT1 = seriesDataT1;
      //alert('positionProfile = ' + positionProfile + ' identifier = ' + identifier + 'seriesDataT1 = ' + seriesDataT1);
      jsonObject[positionProfile][identifier].seriesDataT1Pie = seriesDataT1Pie;
      //alert('positionProfile = ' + positionProfile + ' identifier = ' + identifier + 'seriesDataT1Pie = ' + seriesDataT1Pie);
      jsonObject[positionProfile][identifier].keyDim0 = areaLabels0;
   }
   else
   {
      jsonObject[positionProfile][identifier].seriesDataT2 = seriesDataT2;
      jsonObject[positionProfile][identifier].seriesDataT2Pie = seriesDataT2Pie;
      jsonObject[positionProfile][identifier].keyDim1 = areaLabels1;
   }

   jsonObject[positionProfile][identifier].labs = labs;

   // set labels for charts
   setLabs(positionProfile,labs);

   // Is this the main table or the sub-table (wards)
   if(!subTable)
   {
      // Store series data for each of the three areas in the main table
      // to be used by line/bar charts
      XstrSeriesData[positionProfile][0][0] = createAsteriskSepList(seriesDataT1[0]);
      XstrSeriesData[positionProfile][0][1] = createAsteriskSepList(seriesDataT1[1]);
      XstrSeriesData[positionProfile][0][2] = createAsteriskSepList(seriesDataT1[2]);
      
      // Store series data for each of the three areas in the main table
      // to be used by pie/doughnut charts
      XstrSeriesDataPie[positionProfile][0][0] = createAsteriskSepListPie(seriesDataT1Pie[0]);
      XstrSeriesDataPie[positionProfile][0][1] = createAsteriskSepListPie(seriesDataT1Pie[1]);
      XstrSeriesDataPie[positionProfile][0][2] = createAsteriskSepListPie(seriesDataT1Pie[2]);
   }
   else
   {
      // sub-table contains variable number of wards
      for(XX = 0; XX < jsonObject[positionProfile][identifier].areadata.length; XX++)
      {
         // Store series data for each of the three areas in the main table
         // to be used by line/bar charts
         XstrSeriesData[positionProfile][1][XX] = createAsteriskSepList(seriesDataT2[XX]);
         
         // Store series data for each of the three areas in the main table
         // to be used by pie/doughnut charts
         XstrSeriesDataPie[positionProfile][1][XX] = createAsteriskSepListPie(seriesDataT2Pie[XX]);
      }
   }

   return html;
}

/*
 * Output the table (pivot) - with areas as row headings
 * and other dimension as column headings.
 * Plus store data in format that can be
 * used by the charting code. Calculates percentage values
 * for each data item against the total for that area, to
 * aid display on line and bar charts. Doughnut charts
 * automatically convert all the values to percentages.
 *
 * @param html - string containing html code
 * @param positionProfile int - the numeric id of the profile
 * @param tableType 0 = counts, 1 = percentages
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @returns the html for the table
 */
function outputRowsPivot(html,positionProfile, tableType, subTable)
{
   // Array to hold series data for line/bar charts
   var seriesDataT1 = []; // counts for bar charts, line graphs
   var seriesDataT2 = []; // counts for bar charts, line graphs
   // Array to hold series data for pie/doughnut(donut) charts
   var seriesDataT1Pie = []; // counts for pie and doughnut charts (needs to be in a different format)
   var seriesDataT2Pie = []; // counts for pie and doughnut charts (needs to be in a different format)

   var labs = [];
   var identifier = 0;

   if(!subTable)
   {
      identifier = 0;
      jsonObject[positionProfile][identifier].keyDim0 = [];
   }
   else
   {
      identifier = 1;
      jsonObject[positionProfile][identifier].keyDim1 = [];
   }

   for(z = 0; z < jsonObject[positionProfile][identifier].sortedAreaCodes.length; z++)
   {
      seriesDataT1[z] = [];
      seriesDataT1Pie[z] = [];
      seriesDataT2[z] = [];
      seriesDataT2Pie[z] = [];
   }
   var counter = 0;
   var startCountAt = 0;
   if(tableType == 1)
   {
      counter = 1;
      startCountAt = 1;
   }

   var counter2 = 0;
   if(tableType == 1)
   {
      counter2 = 1;
   }

   if(jsonObject[positionProfile][identifier].sortedAreaCodes != null)
   {
      // Loop through each of the area codes (location dimensions)
      for(q = 0; q < jsonObject[positionProfile][identifier].sortedAreaCodes.length; q++)
      {
         var items = [];

         // loop through each areadata
         for(rowCounter4 = startCountAt; rowCounter4 < jsonObject[positionProfile][identifier].areadata[q].length; rowCounter4++)
         {
            // check data stored for current areadata
            if(jsonObject[positionProfile][identifier].areadata[q] != null && jsonObject[positionProfile][identifier].areadata[q].length > 0)
            {
               // store data value into items array for current area
               try{
                  items[rowCounter4] = jsonObject[positionProfile][identifier].areadata[q][rowCounter4]["dataRow"][0]["data"]["generic.Obs"]["generic.ObsValue"]["@value"];
               }
               catch(e)
               {
                  //alert('error = ' + e);
               }
            }
         }
         // row name for first column (use English if Welsh not present)
         var rowName = jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][language]["$"];
         if(typeof(rowName) === "undefined")
         {
            // No welsh name present - use English
            rowName = jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][0]["$"];
         }

         // output row name
         html = html + "<tr><td>" + rowName + "</td>";

         for(areaCounter5 = startCountAt; areaCounter5 < jsonObject[positionProfile][identifier].areadata[q].length; areaCounter5++)
         {
            // tableType = 0 is for counts
            if(tableType == 0)
            {
               // data for area
               html = html + "<td class='number'>" + addCommas(items[areaCounter5]) + "</td>";
            }
            // tableType = 1 is for percentages
            if(tableType == 1)
            {
               // data for area
               html = html + "<td class='number'>" + roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces) + "</td>";
            }

            // Store data for charts
            // Are we dealing with the main table, or the sub-table (wards)?
            if(!subTable)
            {
               // convert data value to a percentage and store in array for percentage table for main table
               // This is the format used for line and bar charts
               seriesDataT1[q].push(roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

               // The series data for a pie chart needs to be in the following format:-
               // [["dimension1", 123],["dimension2,456], etc]
               // The eval function returns the count in quotes, as a string, so convert to a number
               // and store in the format ["name of dimension", 12345], which is required
               // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
               seriesDataT1Pie[q].push([labs[areaCounter5], parseFloat(items[areaCounter5])]);
            }
            else
            {
               // convert data value to a percentage and store in array for percentage table for sub-table (wards)
               // This is the format used for line and bar charts
               seriesDataT2[q].push(roundNumber((items[areaCounter5]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

               // The series data for a pie chart needs to be in the following format:-
               // [["dimension1", 123],["dimension2,456], etc]
               // The eval function returns the count in quotes, as a string, so convert to a number
               // and store in the format ["name of dimension", 12345], which is required
               // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
               seriesDataT2Pie[q].push([labs[areaCounter5], parseFloat(items[areaCounter5])]);
            }
         }
         html = html + "</tr>";

         counter = counter + 1;
      }
   }
   else
   {
      html = html + "<tr><td colspan='4'>No row data returned by API!</td>";
   }

   if(!subTable)
   {
      jsonObject[positionProfile][identifier].seriesDataT1 = seriesDataT1;
      jsonObject[positionProfile][identifier].seriesDataT1Pie = seriesDataT1Pie;
      jsonObject[positionProfile][identifier].keyDim0 = areaLabels0;
   }
   else
   {
      jsonObject[positionProfile][identifier].seriesDataT2 = seriesDataT2;
      jsonObject[positionProfile][identifier].seriesDataT2Pie = seriesDataT2Pie;
      jsonObject[positionProfile][identifier].keyDim1 = areaLabels1;
   }

   // Is this the main table or the sub-table (wards)
   if(!subTable)
   {
      // Store series data for each of the three areas in the main table
      // to be used by line/bar charts
      XstrSeriesData[positionProfile][0][0] = createAsteriskSepList(seriesDataT1[0]);
      XstrSeriesData[positionProfile][0][1] = createAsteriskSepList(seriesDataT1[1]);
      XstrSeriesData[positionProfile][0][2] = createAsteriskSepList(seriesDataT1[2]);

      // Store series data for each of the three areas in the main table
      // to be used by pie/doughnut charts
      XstrSeriesDataPie[positionProfile][0][0] = createAsteriskSepListPie(seriesDataT1Pie[0]);
      XstrSeriesDataPie[positionProfile][0][1] = createAsteriskSepListPie(seriesDataT1Pie[1]);
      XstrSeriesDataPie[positionProfile][0][2] = createAsteriskSepListPie(seriesDataT1Pie[2]);
   }
   else
   {
      // sub-table contains variable number of wards
      for(XX = 0; XX < jsonObject[positionProfile][identifier].areadata.length; XX++)
      {
         // Store series data for each of the three areas in the main table
         // to be used by line/bar charts
         XstrSeriesData[positionProfile][1][XX] = createAsteriskSepList(seriesDataT2[XX]);

         // Store series data for each of the three areas in the main table
         // to be used by pie/doughnut charts
         XstrSeriesDataPie[positionProfile][1][XX] = createAsteriskSepListPie(seriesDataT2Pie[XX]);
      }
   }

   return html;
}

/*
 * Output the table with summing (no pivot) - with other dimension as row headings
 * and areas as column headings. Receives an array containing ranges to sum and is really
 * for use with age ranges, eg, [0,4],[5,9],[10,19],[20,20] would mean some the counts for
 * ages 0 to 4 and 5 to 9 and 10 to 19, but just output the count for age 20.
 * Plus store data in format that can be
 * used by the charting code. Calculates percentage values
 * for each data item against the total for that area, to
 * aid display on line and bar charts. Doughnut charts
 * automatically convert all the values to percentages.
 *
 * @param html - string containing html code
 * @param positionProfile int - the numeric id of the profile
 * @param tableType 0 = counts, 1 = percentages
 * @param summaryProfile array - optional array containing age ranges for summing, eg, [0,4],[5,9] means sum ages 0 to 4 and 5 to 9 and give total for age range
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @returns the html for the table
 */
function outputRowsWithSumming(html, positionProfile, tableType, summaryProfile, subTable)
{
   var startVal = 0;
   var endVal = 0;
   var counterA = 0;
   var counterB = 0;
   var sumCounter = 0;

   var outputValues = [];

   var reset = true;
   var seriesDataCount = 0;

   // Array to hold series data for line/bar charts
   var seriesDataT1 = []; // counts for bar charts, line graphs
   var seriesDataT1Pie = []; // counts for pie and doughnut charts (needs to be in a different format)
   // Array to hold series data for pie/doughnut(donut) charts
   var seriesDataT2 = []; // counts for bar charts, line graphs
   var seriesDataT2Pie = []; // counts for pie and doughnut charts (needs to be in a different format)

   var labs = [];

   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   for(z = 0; z < jsonObject[positionProfile][identifier].areadata.length; z++)
   {
      seriesDataT1[z] = [];
      seriesDataT1Pie[z] = [];
      seriesDataT2[z] = [];
      seriesDataT2Pie[z] = [];
   }

   jsonObject[positionProfile][identifier].keyDim = [];

   var counter = 0;
   if(tableType == 1)
   {
      counter = 1;
      counterA = 1;
   }
   if(jsonObject[positionProfile][identifier].sortedRowCodes != null)
   {
      // Loop through all data rows (already sorted into display order)
      for(q = 0; q < jsonObject[positionProfile][identifier].sortedRowCodes.length; q++)
      {
         if(reset)
         {
            startVal = summaryProfile[counterA][0];
            endVal = summaryProfile[counterA][1];
            counterA = counterA + 1;
            counterB = endVal;

            outputValues = [];
            sumCounter = startVal;
            reset = false;
         }

         // Is there a data match for the current row? If so, data exists.
         // Just use areadata[0] as each areadata[n] contains the same list of non-location dimension codes, but with the data for that area.
         // Should be same number for each area.
         if(jsonObject[positionProfile][identifier].sortedRowCodes[q]["@value"] == getValueNonLocation(positionProfile,jsonObject[positionProfile][identifier].areadata[0][counter]))
         {
            var items = [];
            // Loop through each area's set of data
            for(areaCounter4 = 0; areaCounter4 < jsonObject[positionProfile][identifier].areadata.length; areaCounter4++)
            {
               // Is there any data for the current area?
               if(jsonObject[positionProfile][identifier].areadata[areaCounter4] != null && jsonObject[positionProfile][identifier].areadata[areaCounter4].length > 0)
               {
                  try
                  {
                     // store the count for each area for the current row dimension
                     items[areaCounter4] = jsonObject[positionProfile][identifier].areadata[areaCounter4][counter]["dataRow"][0]["data"]["generic.Obs"]["generic.ObsValue"]["@value"];
                     //var value = outputValues[areaCounter4];
                     // build the outputValues array containing all the items for the current area
                     // when summing, new row dimension data is added to existing value in the array for that area
                     if(isNumber(outputValues[areaCounter4]))
                     {
                        outputValues[areaCounter4] = outputValues[areaCounter4] + parseInt(items[areaCounter4]);
                     }
                     else
                     {
                        outputValues[areaCounter4] = parseInt(items[areaCounter4]);
                     }
                  }
                  catch(e)
                  {
                     //alert('error = ' + e);
                  }
               }
            }
            // Summing complete for range, eg [0,4], or no summing, eg, age range entered as [0,0]
            if(sumCounter == counterB)
            {
               // If start value of range equals end value of range then no summing required for this row
               if(startVal == endVal)
               {
                  // row name for first column (use English if Welsh not present)
                  var rowName = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][language]["$"];
                  if(typeof(rowName) === "undefined")
                  {
                     // No welsh name present - use English
                     rowName = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][0]["$"];
                  }

                  // output row name
                  html = html + "<tr><td>" + rowName + "</td>";

                  // tableType = 0 is for counts
                  if(tableType == 0)
                  {
                     for(areaCounter5 = 0; areaCounter5 < jsonObject[positionProfile][identifier].areadata.length; areaCounter5++)
                     {
                        // data for area
                        html = html + "<td class='number'>" + addCommas(outputValues[areaCounter5]) + "</td>";
                        
                        if(!subTable)
                        {
                           // convert data value to a percentage and store in array for percentage table for main table
                           // This is the format used for line and bar charts
                           seriesDataT1[areaCounter5].push(roundNumber((outputValues[areaCounter5]/jsonObject[positionProfile][identifier].totals[areaCounter5]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT1Pie[areaCounter5].push([label, parseFloat(outputValues[areaCounter5])]);
                        }
                        else
                        {
                           // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                           // This is the format used for line and bar charts
                           seriesDataT2[areaCounter5].push(roundNumber((outputValues[areaCounter5]/jsonObject[positionProfile][identifier].totals[areaCounter5]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT2Pie[areaCounter5].push([label, parseFloat(outputValues[areaCounter5])]);
                        }
                     }
                  }
                  // tableType = 1 is for percentages
                  if(tableType == 1)
                  {
                     for(areaCounter6 = 0; areaCounter6 < jsonObject[positionProfile][identifier].areadata.length; areaCounter6++)
                     {
                        // data for area
                        html = html + "<td class='number'>" + roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[areaCounter6]*100),c_DecimalPlaces) + "</td>";
                        
                        if(!subTable)
                        {
                           // convert data value to a percentage and store in array for percentage table for main table
                           // This is the format used for line and bar charts
                           seriesDataT1[areaCounter6].push(roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[areaCounter6]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT1Pie[areaCounter6].push([label, parseFloat(outputValues[areaCounter6])]);
                        }
                        else
                        {
                           // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                           // This is the format used for line and bar charts
                           seriesDataT2[areaCounter6].push(roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[areaCounter6]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT2Pie[areaCounter6].push([label, parseFloat(outputValues[areaCounter6])]);
                        }
                     }
                  }

                  html = html + "</tr>";

                  var label = rowName;
                  // chart data
                  if(label === "undefined")
                  {
                     label = jsonObject[positionProfile][identifier].sortedRowCodes[q]["structure.Description"][0]["$"];
                  }

                  // chart labels
                  labs.push(label);
               }
               // Summing occurred here so output start and end value in column, ie, age range from and to
               else
               {
                  if(endVal == "100")
                  {
                     // output row name as range, eg, '4 to 9'
                     html = html + "<tr><td>" + startVal + " and over</td>";
                  }
                  else
                  {
                     // output row name as range, eg, '4 to 9'
                     html = html + "<tr><td>" + startVal + " to " + endVal + "</td>";
                  }

                  // tableType = 0 is for counts
                  if(tableType == 0)
                  {
                     for(areaCounter7 = 0; areaCounter7 < jsonObject[positionProfile][identifier].areadata.length; areaCounter7++)
                     {
                        // data for area
                        html = html + "<td class='number'>" + addCommas(outputValues[areaCounter7]) + "</td>";

                        if(!subTable)
                        {
                           // convert data value to a percentage and store in array for percentage table for main table
                           // This is the format used for line and bar charts
                           seriesDataT1[areaCounter7].push(roundNumber((outputValues[areaCounter7]/jsonObject[positionProfile][identifier].totals[areaCounter7]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT1Pie[areaCounter7].push([label, parseFloat(outputValues[areaCounter7])]);
                        }
                        else
                        {
                           // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                           // This is the format used for line and bar charts
                           seriesDataT2[areaCounter7].push(roundNumber((outputValues[areaCounter7]/jsonObject[positionProfile][identifier].totals[areaCounter7]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT2Pie[areaCounter7].push([label, parseFloat(outputValues[areaCounter7])]);
                        }
                     }
                  }
                  // tableType = 1 is for percentages
                  if(tableType == 1)
                  {
                     for(areaCounter8 = 0; areaCounter8 < jsonObject[positionProfile][identifier].areadata.length; areaCounter8++)
                     {
                        // data for area
                        html = html + "<td class='number'>" + roundNumber((outputValues[areaCounter8]/jsonObject[positionProfile][identifier].totals[areaCounter8]*100),c_DecimalPlaces) + "</td>";
                     
                        if(!subTable)
                        {
                           // convert data value to a percentage and store in array for percentage table for main table
                           // This is the format used for line and bar charts
                           seriesDataT1[areaCounter8].push(roundNumber((outputValues[areaCounter8]/jsonObject[positionProfile][identifier].totals[areaCounter8]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT1Pie[areaCounter8].push([label, parseFloat(outputValues[areaCounter8])]);
                        }
                        else
                        {
                           // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                           // This is the format used for line and bar charts
                           seriesDataT2[areaCounter8].push(roundNumber((outputValues[areaCounter8]/jsonObject[positionProfile][identifier].totals[areaCounter8]*100),c_DecimalPlaces));
   
                           // The series data for a pie chart needs to be in the following format:-
                           // [["dimension1", 123],["dimension2,456], etc]
                           // The eval function returns the count in quotes, as a string, so convert to a number
                           // and store in the format ["name of dimension", 12345], which is required
                           // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                           seriesDataT2Pie[areaCounter8].push([label, parseFloat(outputValues[areaCounter8])]);
                        }
                     }
                  }
                  html = html + "</tr>";

                  var label = rowName;
                  // chart data
                  label = "";
                  if(endVal == "100")
                  {
                     label = startVal + " and over";
                  }
                  else
                  {
                     label = startVal + " to " + endVal;
                  }

                  // chart labels
                  labs.push(label);
               }
               reset = true;
            }
            sumCounter = sumCounter + 1;
            counter = counter + 1;
         }
      }
   }
   else
   {
      html = html + "<tr><td colspan='4'>No row data returned by API!</td>";
   }

   if(!subTable)
   {
      jsonObject[positionProfile][identifier].seriesDataT1 = seriesDataT1;
      jsonObject[positionProfile][identifier].seriesDataT1Pie = seriesDataT1Pie;
      jsonObject[positionProfile][identifier].keyDim0 = areaLabels0;
   }
   else
   {
      jsonObject[positionProfile][identifier].seriesDataT2 = seriesDataT2;
      jsonObject[positionProfile][identifier].seriesDataT2Pie = seriesDataT2Pie;
      jsonObject[positionProfile][identifier].keyDim1 = areaLabels1;
   }

   jsonObject[positionProfile][identifier].labs = labs;

   // set labels for charts
   setLabs(positionProfile,labs);

   // Is this the main table or the sub-table (wards)
   if(!subTable)
   {
      // Store series data for each of the three areas in the main table
      // to be used by line/bar charts
      XstrSeriesData[positionProfile][0][0] = createAsteriskSepList(seriesDataT1[0]);
      XstrSeriesData[positionProfile][0][1] = createAsteriskSepList(seriesDataT1[1]);
      XstrSeriesData[positionProfile][0][2] = createAsteriskSepList(seriesDataT1[2]);
      //alert(XstrSeriesData[positionProfile][0][0]);
      // Store series data for each of the three areas in the main table
      // to be used by pie/doughnut charts
      XstrSeriesDataPie[positionProfile][0][0] = createAsteriskSepListPie(seriesDataT1Pie[0]);
      XstrSeriesDataPie[positionProfile][0][1] = createAsteriskSepListPie(seriesDataT1Pie[1]);
      XstrSeriesDataPie[positionProfile][0][2] = createAsteriskSepListPie(seriesDataT1Pie[2]);
   }
   else
   {
      // sub-table contains variable number of wards
      for(XX = 0; XX < jsonObject[positionProfile][identifier].areadata.length; XX++)
      {
         // Store series data for each of the three areas in the main table
         // to be used by line/bar charts
         XstrSeriesData[positionProfile][1][XX] = createAsteriskSepList(seriesDataT2[XX]);
         
         // Store series data for each of the three areas in the main table
         // to be used by pie/doughnut charts
         XstrSeriesDataPie[positionProfile][1][XX] = createAsteriskSepListPie(seriesDataT2Pie[XX]);
      }
   }

   return html;
}

/*
 * Output the table with summing (pivot) - with areas as row headings
 * and other dimension as column headings. Receives an array containing ranges to sum and is really
 * for use with age ranges, eg, [0,4],[5,9],[10,19],[20,20] would mean some the counts for
 * ages 0 to 4 and 5 to 9 and 10 to 19, but just output the count for age 20.
 * Plus store data in format that can be
 * used by the charting code. Calculates percentage values
 * for each data item against the total for that area, to
 * aid display on line and bar charts. Doughnut charts
 * automatically convert all the values to percentages.
 *
 * @param html - string containing html code
 * @param positionProfile int - the numeric id of the profile
 * @param tableType 0 = counts, 1 = percentages
 * @param summaryProfile array - optional array containing age ranges for summing, eg, [0,4],[5,9] means sum ages 0 to 4 and 5 to 9 and give total for age range
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @returns the html for the table
 */
function outputRowsWithSummingPivot(html, positionProfile, tableType, summaryProfile, subTable)
{
   var startVal = 0;
   var endVal = 0;
   var counterA = 0;
   var counterB = 0;
   var sumCounter = 0;

   var outputValues = [];

   var reset = true;
   var seriesDataCount = 0;

   // Array to hold series data for line/bar charts
   var seriesDataT1 = []; // counts for bar charts, line graphs
   var seriesDataT1Pie = []; // counts for pie and doughnut charts (needs to be in a different format)
   // Array to hold series data for pie/doughnut(donut) charts
   var seriesDataT2 = []; // counts for bar charts, line graphs
   var seriesDataT2Pie = []; // counts for pie and doughnut charts (needs to be in a different format)

   var labs = [];

   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   for(z = 0; z < jsonObject[positionProfile][identifier].areadata[0].length; z++)
   {
      seriesDataT1[z] = [];
      seriesDataT1Pie[z] = [];
      seriesDataT2[z] = [];
      seriesDataT2Pie[z] = [];
   }

   jsonObject[positionProfile][identifier].keyDim = [];

   var counter = 0;
   if(tableType == 1)
   {
      counter = 1;
      counterA = 1;
   }
   if(jsonObject[positionProfile][identifier].sortedRowCodes != null)
   {
      // Loop through all data rows (already sorted into display order)
      for(q = 0; q < jsonObject[positionProfile][identifier].sortedAreaCodes.length; q++)
      {
         if(reset)
         {
            startVal = summaryProfile[counterA][0];
            endVal = summaryProfile[counterA][1];
            counterA = counterA + 1;
            counterB = endVal;

            outputValues = [];
            sumCounter = startVal;
            reset = false;
         }

         var items = [];
         var counterC = 0;
         // Loop through this area's set of data
         for(areaDataCounter = counter; areaDataCounter < jsonObject[positionProfile][identifier].areadata[q].length; areaDataCounter++)
         {
            // Is there any data for the current area?
            //if(jsonObject[positionProfile][identifier].areadata[q][areaCounter4] != null && jsonObject[positionProfile][identifier].areadata[q][areaCounter4].length > 0)
            if(jsonObject[positionProfile][identifier].areadata[q][areaDataCounter] != null)
            {
               try
               {
                  // store the count for each area for the current row dimension
                  items[areaDataCounter] = jsonObject[positionProfile][identifier].areadata[q][areaDataCounter]["dataRow"][0]["data"]["generic.Obs"]["generic.ObsValue"]["@value"];
                  //var value = outputValues[areaCounter4];
                  // build the outputValues array containing all the items for the current area
                  // when summing, new row dimension data is added to existing value in the array for that area
                  if(isNumber(outputValues[counterC]))
                  {
                     outputValues[counterC] = outputValues[counterC] + parseInt(items[areaDataCounter]);
                  }
                  else
                  {
                     outputValues[counterC] = parseInt(items[areaDataCounter]);
                  }

                  if(sumCounter == counterB)
                  {
                     //counterA = counterA + 1;
                     startVal = summaryProfile[counterA][0];
                     endVal = summaryProfile[counterA][1];
                     counterA = counterA + 1;
                     counterB = endVal;

                     //outputValues = [];
                     sumCounter = startVal;
                     //reset = false;
                     counterC = counterC + 1;
                  }
                  else
                  {
                     sumCounter = sumCounter + 1;
                  }
               }
               catch(e)
               {
                  //alert('error = ' + e);
               }
            }
         }

         // row name for first column (use English if Welsh not present)
         var rowName = jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][language]["$"];
         if(typeof(rowName) === "undefined")
         {
            // No welsh name present - use English
            rowName = jsonObject[positionProfile][identifier].sortedAreaCodes[q]["structure.Description"][0]["$"];
         }

         // output row name
         html = html + "<tr><td>" + rowName + "</td>";

         // tableType = 0 is for counts
         if(tableType == 0)
         {
            for(areaCounter5 = 0; areaCounter5 < outputValues.length; areaCounter5++)
            {
               // data for area
               html = html + "<td class='number'>" + addCommas(outputValues[areaCounter5]) + "</td>";

               var label = jsonObject[positionProfile][identifier].labs[areaCounter5];

               if(!subTable)
               {
                  // convert data value to a percentage and store in array for percentage table for main table
                  // This is the format used for line and bar charts
                  seriesDataT1[q].push(roundNumber((outputValues[areaCounter5]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT1Pie[q].push([label, parseFloat(outputValues[areaCounter5])]);
               }
               else
               {
                  // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                  // This is the format used for line and bar charts
                  seriesDataT2[q].push(roundNumber((outputValues[areaCounter5]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT2Pie[q].push([label, parseFloat(outputValues[areaCounter5])]);
               }
            }
         }
         // tableType = 1 is for percentages
         if(tableType == 1)
         {
            for(areaCounter6 = 0; areaCounter6 < outputValues.length; areaCounter6++)
            {
               // data for area
               html = html + "<td class='number'>" + roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces) + "</td>";

               var label = jsonObject[positionProfile][identifier].labs[areaCounter6];

               if(!subTable)
               {
                  // convert data value to a percentage and store in array for percentage table for main table
                  // This is the format used for line and bar charts
                  seriesDataT1[q].push(roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT1Pie[q].push([label, parseFloat(outputValues[areaCounter6])]);
               }
               else
               {
                  // convert data value to a percentage and store in array for percentage table for sub-table (wards)
                  // This is the format used for line and bar charts
                  seriesDataT2[q].push(roundNumber((outputValues[areaCounter6]/jsonObject[positionProfile][identifier].totals[q]*100),c_DecimalPlaces));

                  // The series data for a pie chart needs to be in the following format:-
                  // [["dimension1", 123],["dimension2,456], etc]
                  // The eval function returns the count in quotes, as a string, so convert to a number
                  // and store in the format ["name of dimension", 12345], which is required
                  // for jqPlot to output in a doughnut or bar chart, parseFloat is also applied.
                  seriesDataT2Pie[q].push([label, parseFloat(outputValues[areaCounter6])]);
               }
            }
         }

         html = html + "</tr>";

         reset = true;
         startVal = 0;
         endVal = 0;
         counterA = 0;
         counterB = 0;
         sumCounter = 0;
         
         outputValues = [];
         counter = 0;
         if(tableType == 1)
         {
            counter = 1;
            counterA = 1;
         }
      }
   }
   else
   {
      html = html + "<tr><td colspan='4'>No row data returned by API!</td>";
   }

   if(!subTable)
   {
      jsonObject[positionProfile][identifier].seriesDataT1 = seriesDataT1;
      jsonObject[positionProfile][identifier].seriesDataT1Pie = seriesDataT1Pie;
      jsonObject[positionProfile][identifier].keyDim0 = areaLabels0;
   }
   else
   {
      jsonObject[positionProfile][identifier].seriesDataT2 = seriesDataT2;
      jsonObject[positionProfile][identifier].seriesDataT2Pie = seriesDataT2Pie;
      jsonObject[positionProfile][identifier].keyDim1 = areaLabels1;
   }

   // Is this the main table or the sub-table (wards)
   if(!subTable)
   {
      // Store series data for each of the three areas in the main table
      // to be used by line/bar charts
      XstrSeriesData[positionProfile][0][0] = createAsteriskSepList(seriesDataT1[0]);
      XstrSeriesData[positionProfile][0][1] = createAsteriskSepList(seriesDataT1[1]);
      XstrSeriesData[positionProfile][0][2] = createAsteriskSepList(seriesDataT1[2]);

      // Store series data for each of the three areas in the main table
      // to be used by pie/doughnut charts
      XstrSeriesDataPie[positionProfile][0][0] = createAsteriskSepListPie(seriesDataT1Pie[0]);
      XstrSeriesDataPie[positionProfile][0][1] = createAsteriskSepListPie(seriesDataT1Pie[1]);
      XstrSeriesDataPie[positionProfile][0][2] = createAsteriskSepListPie(seriesDataT1Pie[2]);
   }
   else
   {
      // sub-table contains variable number of wards
      for(XX = 0; XX < jsonObject[positionProfile][identifier].areadata.length; XX++)
      {
         // Store series data for each of the three areas in the main table
         // to be used by line/bar charts
         XstrSeriesData[positionProfile][1][XX] = createAsteriskSepList(seriesDataT2[XX]);
         
         // Store series data for each of the three areas in the main table
         // to be used by pie/doughnut charts
         XstrSeriesDataPie[positionProfile][1][XX] = createAsteriskSepListPie(seriesDataT2Pie[XX]);
      }
   }
   return html;
}

/*
 * Calls the functions to create columns and rows and stores the
 * results on the jsonObject for each profile.
 *
 * @param positionProfile int - the numeric id of the profile
 * @param jsonDataset - the data returned from the ONS API
 * @param firstColumn string - the name of the first column dimension
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 */
function reformatJSONData(positionProfile, jsonDataset, firstColumn, subTable)
{
   //alert('reformatJSONData pos = ' + positionProfile + ' firstColumn = ' + firstColumn);
   //alert("jsonDataset = " + jsonDataset);
   //	The JSON Object containing the Dataset from a Read API call
   //this.jsonDataset = jQuery.parseJSON(jsonDataset);

   cols = createColumns(positionProfile,jsonDataset,firstColumn,subTable);
   rows = createRows(positionProfile,jsonDataset,subTable);

   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   // Store the columns and rows on the jsonObject against
   // the current profile.
   jsonObject[positionProfile][identifier].cols = cols;
   jsonObject[positionProfile][identifier].rows = rows;
}

/*
 * Calls function to create headers (containing the dimensions used
 * in the table, ie, location and one other, eg, age).
 * Loops through the headers and calls a function to create a
 * sorted list of codelist codes for each dimension: one for the
 * first column (the row codes) and one for the location (the
 * area codes).
 *
 * @param positionProfile int - the numeric id of the profile
 * @param jsonDataset - the data returned from the ONS API
 * @param firstColumn string - the name of the first column dimension
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @return cols - the headers held in an array
 */
function createColumns(positionProfile, jsonDataset, firstColumn, subTable)
{
   var cols = [];
   var headers = getColumnHeaders(positionProfile, jsonDataset, firstColumn, subTable);
   for (i = 0; i < headers.length; i++)
   {
      cols.push(createHeader(headers[i]));
      if(headers[i]["@conceptRef"] == firstColumn)
      {
         sortedRowCodes = createSortedCodeList(positionProfile, headers[i], subTable);
      }
      if(headers[i]["@conceptRef"] == "Location")
      {
         sortedAreaCodes = createSortedCodeList(positionProfile, headers[i], subTable);
      }
   }

   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   jsonObject[positionProfile][identifier].sortedRowCodes = sortedRowCodes;
   jsonObject[positionProfile][identifier].sortedAreaCodes = sortedAreaCodes;

   return cols;
}

/*
 * Return sorted list of codes (by display order) for the codelist that
 * relates to the supplied dimension
 * NOTE: The displayorder can be a common annotation on it's own, or
 *       there may be more than one common annotation. This can be
 *       true even for the same codelist, so all the ages have a
 *       single common annotation EXCEPT the total, which has two
 *       common annotations. The position of the display order common
 *       annotation also not always the same. So have to check if one
 *       or more than one and loop through (if more than one) to find it.
 *
 * @param positionProfile int - the numeric id of the profile
 * @param dimension the dimension to return a sorted codelist for
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @return codelist - the sorted codelist
 */
function createSortedCodeList(positionProfile, dimension, subTable)
{
   var annot = "DisplayOrder";
   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
	if (dimension["@conceptRef"] == "Location")
	{
		annot = "LEVEL";
	} 
   }
   else
   {
      identifier = 1;
   }

   // Get all the codelist
   var codelist = jsonObject[positionProfile][identifier]["ons.dataPackage"]["ons.structureData"]["message.CodeLists"]["structure.CodeList"];

   var codes = null;

   for(p = 0; p < codelist.length; p++)
   {
      // Is this the codelist relating to the supplied dimension?
      if(codelist[p]["@id"] == dimension["@codelist"])
      {
         // Get all the codes for this dimension's codelist
         codes = codelist[p]["structure.Code"];
         //alert("number of codes = " + codes.length);

	// remove "_Z" from codelist
	
     	for(var i = codes.length; i--;) {
          if(codes[i]["@value"] === "_Z") {
              codes.splice(i, 1);
          }
      }

         // Sort codes into ascending display order
         codes.sort(function(a, b){

             var a1 = null;
             var b1 = null;

             // Is there more than one common annotation for sort object (code) a?
             if(a["structure.Annotations"]["common.Annotation"].length > 0)
             {
                // Loop through common annotations to find the display order
                for(z1 = 0; z1 < a["structure.Annotations"]["common.Annotation"].length; z1++)
                {
                   if(a["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationType"] == annot)
                   {
                      // Get the display order for sort object (code) a
                      a1= a["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationText"]["$"];
                   }
                }
             }
             else
             {
                // Get the display order for sort object (code) a
                a1= a["structure.Annotations"]["common.Annotation"]["common.AnnotationText"]["$"];
             }
             // Is there more than one common annotation for sort object (code) b?
             if(b["structure.Annotations"]["common.Annotation"].length > 0)
             {
                // Loop through common annotations to find the display order
                for(z2 = 0; z2 < b["structure.Annotations"]["common.Annotation"].length; z2++)
                {
                   if(b["structure.Annotations"]["common.Annotation"][z2]["common.AnnotationType"] == annot)
                   {
                      // Get the display order for sort object (code) b
                      b1= b["structure.Annotations"]["common.Annotation"][z2]["common.AnnotationText"]["$"];
                   }
                }
             }
             else
             {
                // Get the display order for sort object (code) b
                b1= b["structure.Annotations"]["common.Annotation"]["common.AnnotationText"]["$"];
             }

             // Sort by ascending display order of code object
             // (Need to convert display order string to number for correct sorting!)
             if((parseInt(a1)) == (parseInt(b1))) return 0;
             return (parseInt(a1)) > (parseInt(b1)) ? 1: -1;
         });
      }
   }
   // return the sorted codes
   return codes;
}

/*
 * Gets the dimensions from the key families (there will only be two: location and one other, eg, age).
 * Stores these in a headers object array.
 *
 * @param positionProfile int - the numeric id of the profile
 * @param jsonObect - holds the data returned from the ONS API and other information
 * @param firstColumnstring - the name of the first column dimension
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 * @return headers - an object array containing the dimensions used in the table
 */
function getColumnHeaders(positionProfile, jsonObject, firstColumn, subTable)
{
   var identifier = 0;
   
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   var dimensions =   jsonObject[positionProfile][identifier]["ons.dataPackage"]["ons.structureData"]["message.KeyFamilies"]["structure.KeyFamily"]["structure.Components"]["structure.Dimension"];

   var headers = new Array();

   for (i = 0; i < dimensions.length; i++)
   {
      // Choose pre-selected first column as first element
      //alert(dimensions[i].codelist);
      if(dimensions[i]["@conceptRef"] == firstColumn)
      {
         headers[headers.length] = dimensions[i];
      }
   }
   for (j = 0; j < dimensions.length; j++)
   {
      // Columns other than that pre-selected as first element (should only be one: location)
      if(dimensions[j]["@conceptRef"] == "Location")
      {
         headers[headers.length] = dimensions[j];
      }
   }
   return headers;
}

/**
   * Stores the dimension passed in (the key family structure$Dimensions and
   * and structure$TimeDimension).
   *
   * @param dim object - the dimension object from the key family
   *
   * @return header - an array
   */
function createHeader(dim)
{
   var header = {
      "dim": dim
   };
   //alert("header id = " + dim);
   return header;
}

/*
 * Loop through the series data and see if a matching
 *
 * @param positionProfileint - the numeric id of the profile
 * @param series - json object containing series data
 *
 * @return match - the matching data value
 */
function getValueNonLocation(positionProfile, series)
{
   var match = "";
   var things = series["dataRow"][0]["data"]["generic.SeriesKey"]["generic.Value"];

   for (i = 0; i < things.length; i++)
   {
      if(things[i]["@concept"] == firstColumn[positionProfile])
      {
         match = (things[i]["@value"]);
         break;
      }
   }
   return match;
}

/*
 * Gets the data observation values and identifying information and loops through this
 * storing the data for each location into a separate array.
 * It also uses the non-location dimension's concept value as the key to find the matching
 * code in the codelist for that dimension. It then gets that code's display order and stores
 * it along with the data information in separate three separate arrays: one for each location.
 * Finally it performs a sort on these arrays, ordering on ascending display order.
 *
 * @param positionProfileint - the numeric id of the profile
 * @param jsonObject - holds the data returned from the ONS API and other information
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 */
function createRows(positionProfile,jsonObject,subTable)
{
   //var descriptions = populateDescriptions(positionProfile, jsonObject);
   var rows = [];

   areadata = [];

   totals = [];

   var sections = null;
   var identifier = 0;

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   for(areaCounter = 0;areaCounter < jsonObject[positionProfile][identifier].sortedAreaCodes.length; areaCounter++)
   {
      areadata[areaCounter] = [];
   }

   sections = jsonObject[positionProfile][identifier]["ons.dataPackage"]["ons.genericData"]["message.DataSet"]["generic.Group"]["generic.Series"];

   //alert('A positionProfile = ' + positionProfile + ' identifier = ' + identifier + ' sections.length = ' + sections.length + ' sortedRowCodes.length = ' + jsonObject[positionProfile][identifier].sortedRowCodes.length);
   // Loop through all generic series data
   for (i = 0; i < sections.length; i++)
   {
      // Get key values for current data
      var keys = sections[i]["generic.SeriesKey"]["generic.Value"];

      var key1 = null;
      var key2 = null;
      var area = [];

      // Loop through each key (only two keys: location and other dimension, eg, age) as we are only dealing with 2 dimensions
      for (j = 0; j < keys.length; j++)
      {
         // Match on area key
         if(keys[j]["@concept"] == "Location")
         {
            key1 = keys[j]["@value"];

            // Loop through each area from areas sorted by display order
            for(areaCounter = 0;areaCounter < jsonObject[positionProfile][identifier].sortedAreaCodes.length; areaCounter++)
            {
               // Does the current area key (key1) match the area code from the sorted list?
               if(keys[j]["@value"] == jsonObject[positionProfile][identifier].sortedAreaCodes[areaCounter]["@value"])
               {
                  // Store data into separate arrays for matching area
                  area[areaCounter] = sections[i];
               }
            }
         }

         try
         {
            // NOTE: if slicing multi-dimensional datasets, more than 2 keys present, but the url should be constructed
            //       to only get data for one of the dimensions and for locations. Other dimensions the total should be
            //       used, so there is only one of these dimensions per location/first column dimension combination.
            if(keys[j]["@concept"] == firstColumn[positionProfile])
            {
               for (k = 0; k < jsonObject[positionProfile][identifier].sortedRowCodes.length; k++)
               {
   
                  if(keys[j]["@value"] == jsonObject[positionProfile][identifier].sortedRowCodes[k]["@value"])
                  {
                     // Need to store totals separately (one for each area, on each profile) for use in calculating percentages.
   
                     // Is there more than one common annotation for this code?
                     if(jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"].length > 0)
                     {
                        var tempStore = null;
                        var isSubTot = false;
                        var isTot = false;
                        // Loop through common annotations to see if 'IsTotal' present - Store totals, but not sub-totals
                        // NOTE: there may be more than one annotation, one saying it is a total 'IsTotal' and another that it is a sub-total 'SubTotal'.
                        //       there is also the annotation text for 'SubTotal' - not sure if checking for this is 'Y' necessary, as don't think
                        //       those that aren't would have 'SubTotal' and 'N' - but doing additional check just in case!
                        for(z1 = 0; z1 < jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"].length; z1++)
                        {
                           var annType = jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationType"];
                           var annText = jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationText"]["$"];
   
                           if(annType.toUpperCase() == "SUBTOTAL" && annText.toUpperCase() == "Y")
                           {
                              // This value is a sub-total - set flag and break out of loop as don't need to check further annotations
                              isSubTot = true;
                              break;
                           }
                           if(annType.toUpperCase() == "ISTOTAL")
                           {
                              // This value is a total (but might be a sub-total) - store temporarily
                              isTot = true;
                              tempStore = sections[i]["generic.Obs"]["generic.ObsValue"]["@value"];
                           }
                        }
                        if(!isSubTot && isTot)
                        {
                           // This value is the main total (and not a sub-total) - store
                           totals.push(tempStore);
                        }
                     }
                     else
                     {
                        if(jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"]["common.AnnotationType"].toUpperCase() == "ISTOTAL")
                        {
                           // This value is a total - store
                           totals.push(sections[i]["generic.Obs"]["generic.ObsValue"]["@value"]);
                        }
                     }
                  }
               }
               // Get the value of the non-location dimension and hold to use as a key
               key2 = keys[j]["@value"];
            }
         }
         catch(e)
         {
            //alert('error doing totals ' + e);
         }
      }

      var dispOrd = null;

      try
      {
         // Now have both key values - find display order of non-location dimension
         // by looping through the codes for the codelist for that dimension.
         for (k = 0; k < jsonObject[positionProfile][identifier].sortedRowCodes.length; k++)
         {
            if(jsonObject[positionProfile][identifier].sortedRowCodes[k]["@value"] == key2)
            {
               // Get display order for current code (relating to non-location dimension)

               // Is there more than one common annotation for this code?
               if(jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"].length > 0)
               {
                  // Loop through common annotations to find the display order
                  for(z1 = 0; z1 < jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"].length; z1++)
                  {
                     if(jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationType"].toUpperCase() == "DISPLAYORDER")
                     {
                        // Store the display order for this code
                        dispOrd = jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"][z1]["common.AnnotationText"]["$"];
                     }
                  }
               }
               else
               {
                  // Store the display order for this code
                  dispOrd = jsonObject[positionProfile][identifier].sortedRowCodes[k]["structure.Annotations"]["common.Annotation"]["common.AnnotationText"]["$"];
               }
               break;
            }
         }
      }
      catch(e)
      {
         //alert('error doing display order ' + e);
         // Don't output error message -  will cause numerous alerts for each row in each profile
         // Error here should not occur and is happening when the API is not returning correct areas in codelist
         // in early version.
      }

      // Store each generic series data item along with it's display order, together, in separate arrays,
      // one for each area. Allows data to be reordered for output.
      for(areaCounter2 = 0; areaCounter2 < jsonObject[positionProfile][identifier].sortedAreaCodes.length; areaCounter2++)
      {
         if(area[areaCounter2] != null)
         {
            areadata[areaCounter2].push(createRow(area[areaCounter2], dispOrd));
         }
      }
   }

   // Loop through each area's data and sort into ascending order by display order
   for(areaCounter3 = 0; areaCounter3 < jsonObject[positionProfile][identifier].sortedAreaCodes.length; areaCounter3++)
   {
      // Sort data for area[n] into ascending display order
      areadata[areaCounter3].sort(function(a, b){

         var a1 = a["dataRow"][1]["dispOrder"];
         var b1 = b["dataRow"][1]["dispOrder"];

         // Sort by ascending display order of code object
         if((parseInt(a1)) == (parseInt(b1))) return 0;
         // Need to convert display order string to number for correct sorting!
         return (parseInt(a1)) > (parseInt(b1)) ? 1: -1;
      });
   }

   // Store the sorted data for each area and totals on the jsonObject
   //  for the profile it relates to
   jsonObject[positionProfile][identifier].areadata = areadata;
   jsonObject[positionProfile][identifier].totals = totals;
   //return rows;
}

/*
 * Create an object containing both the series data,
 * and the display order of the series data based on
 * the non-location dimension, eg, age.
 *
 *@param series - the generic series object
 *@param displayOrder - the display order for the series object
 *
 *@return dataRow - an object combining the generic series data and it's display order
 */
function createRow(series, dispOrder)
{
   dataRow = {"dataRow" : [{"data" : series}, {"dispOrder" : dispOrder}]}

   return dataRow;
}

/*
 * Takes an array of items (the data values and labels) and creates a
 * string list that can be used on the generated page to retain the
 * information. Asterisk is used as the separator because some labels
 * contain commas. These strings can then be converted back to arrays
 * before being passed into the charting code.
 *
 * @param arr - the array to be converted to a sting list
 * @return str - a string list, items separated by an '*'
 */
function createAsteriskSepList(arr)
{
   var str = "";
if(arr == null)
{
  return arr;
}
   for (var x = 0; x < arr.length; x++)
   {
      if(x > 0)
      {
         str = str + "*" + arr[x];
      }
      else
      {
         str = str + arr[x];
      }
   }
   return str;
}

/*
 * Takes an array of items (the data values and labels) and creates a
 * string list that can be used on the generated page to retain the
 * information. Asterisk is used as the separator because some labels
 * contain commas. These strings can then be converted back to arrays
 * before being passed into the charting code.
 *
 * @param arr - the array to be converted to a sting list
 * @return str - a string list, items separated by an '*'
 */
function createAsteriskSepListPie(arr)
{
   var str = "";

   for (var x = 0; x < arr.length; x++)
   {
      var cut = arr[x].toString().lastIndexOf(",");
      if(x > 0)
      {
         str = str + "*" + arr[x].toString().substring(0,cut) + "#" + arr[x].toString().substring(cut+1);
      }
      else
      {
         str = str + arr[x].toString().substring(0,cut) + "#" + arr[x].toString().substring(cut+1);
      }
   }
   return str;
}

/*
 * Takes a number and rounds it to required number of decimal places.
 * Example original number = 43.1234567 to 2 decimal places:-
 * So multiply by 10 to the power of 2 (10x10 = 100), which shifts
 * the decimal place to places to the right by 2, then round the number,
 * then divide by the same amount to shift the decimal places back
 * by the same amount to the left.
 *
 * @param originalNumber - the number to be rounded
 * @param numOfDP - the number of decimal places to round to
 *
 * @return the number rounded to the required number of decimal places
 */
function roundNumber(originalNumber, numOfDP)
{
  return Math.round(originalNumber*Math.pow(10,numOfDP))/Math.pow(10,numOfDP);
}

/*
 * Format numbers to put commas in to define 1000's,
 * eg, convert 45456789 to 45,456,789
 *
 */
function addCommas(nStr)
{
	if(isNumber(nStr))
	{
      nStr += '';
   	x = nStr.split('.');
   	x1 = x[0];
   	x2 = x.length > 1 ? '.' + x[1] : '';
   	var rgx = /(\d+)(\d{3})/;
   	while (rgx.test(x1)) {
   		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	   }
	   return x1 + x2;
	}
	else
	{
      return nStr;
   }
}

/*
 * Returns true or false whether supplied value is
 * a number.
 *
 * @param number/string
 * @return boolean true or false
 */
function isNumber(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * toggle between counts and percentages table
 *
 * @param positionProfile int - the numeric id of the profile
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 *
 */
function toggleTable(positionProfile, subTable)
{
//$(eval('"#tableProfile' + positionProfile + '_' + identifier + '_' + tableType + '_VIS"'))
 window.status = "toggling count and percent"; 
  var identifier = 0;
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   //alert('positionProfile = ' + positionProfile);
   test1 = $("#tableProfile" + positionProfile + "_" + identifier + "_0_" + "VIS").attr("id");
   //test2 = $("#profileTable" + positionProfile + "_0" + identifier + "HID").attr("id");
   if(typeof(test1) !== "undefined")
   {
      $("#tableProfile" + positionProfile + "_" + identifier + "_0_" + "VIS").attr("id","tableProfile" + positionProfile + "_" + identifier + "_0_" + "HID");
      $("#tableProfile" + positionProfile + "_" + identifier + "_1_" + "HID").attr("id","tableProfile" + positionProfile + "_" + identifier + "_1_" + "VIS");
   }
   else
   {
      $("#tableProfile" + positionProfile + "_" + identifier + "_0_" + "HID").attr("id","tableProfile" + positionProfile + "_" + identifier + "_0_" + "VIS");
      $("#tableProfile" + positionProfile + "_" + identifier + "_1_" + "VIS").attr("id","tableProfile" + positionProfile + "_" + identifier + "_1_" + "HID");
   }
}

/*
 * Set the labels used in charts
 *
 * @param positionProfile int - the numeric id of the profile
 * @param labs array of lables
 */
function setLabs(positionProfile, labs)
{
   //alert(positionProfile + "=" + labs);
   if(positionProfile == 0)
   {
      strLabs0 = createAsteriskSepList(labs);
   }
   if(positionProfile == 1)
   {
      strLabs1 = createAsteriskSepList(labs);
   }
   if(positionProfile == 2)
   {
      strLabs2 = createAsteriskSepList(labs);
   }
   if(positionProfile == 3)
   {
      strLabs3 = createAsteriskSepList(labs);
   }
   if(positionProfile == 4)
   {
      strLabs4 = createAsteriskSepList(labs);
   }
   if(positionProfile == 5)
   {
      strLabs5 = createAsteriskSepList(labs);
   }
   if(positionProfile == 6)
   {
      strLabs6 = createAsteriskSepList(labs);
   }
   if(positionProfile == 7)
   {
      strLabs7 = createAsteriskSepList(labs);
   }
   if(positionProfile == 8)
   {
      strLabs8 = createAsteriskSepList(labs);
   }
   if(positionProfile == 9)
   {
      strLabs9 = createAsteriskSepList(labs);
   }
   if(positionProfile == 10)
   {
      strLabs10 = createAsteriskSepList(labs);
   }
   if(positionProfile == 11)
   {
      strLabs11 = createAsteriskSepList(labs);
   }
   if(positionProfile == 12)
   {
      strLabs12 = createAsteriskSepList(labs);
   }
   if(positionProfile == 13)
   {
      strLabs13 = createAsteriskSepList(labs);
   }
   if(positionProfile == 14)
   {
      strLabs14 = createAsteriskSepList(labs);
   }
   if(positionProfile == 15)
   {
      strLabs15 = createAsteriskSepList(labs);
   }
   if(positionProfile == 16)
   {
      strLabs16 = createAsteriskSepList(labs);
   }
   if(positionProfile == 17)
   {
      strLabs17 = createAsteriskSepList(labs);
   }
}

/*
 * Set the key dimensions and labels used in charts
 *
 * @param positionProfile int - the numeric id of the profile
 * @param subTable boolean - is it the main table or the sub-table (wards)?
 * @param areas array of area names
 */
function setKeyDimensions(positionProfile, subTable, areas)
{
   if(positionProfile == 0)
   {
      if(!subTable)
      {
         strKeyDim0_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim0_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 1)
   {
      if(!subTable)
      {
         strKeyDim1_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim1_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 2)
   {
      if(!subTable)
      {
         strKeyDim2_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim2_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 3)
   {
      if(!subTable)
      {
         strKeyDim3_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim3_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 4)
   {
      if(!subTable)
      {
         strKeyDim4_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim4_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 5)
   {
      if(!subTable)
      {
         strKeyDim5_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim5_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 6)
   {
      if(!subTable)
      {
         strKeyDim6_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim6_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 7)
   {
      if(!subTable)
      {
         strKeyDim7_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim7_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 8)
   {
      if(!subTable)
      {
         strKeyDim8_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim8_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 9)
   {
      if(!subTable)
      {
         strKeyDim9_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim9_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 10)
   {
      if(!subTable)
      {
         strKeyDim10_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim10_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 11)
   {
      if(!subTable)
      {
         strKeyDim11_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim11_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 12)
   {
      if(!subTable)
      {
         strKeyDim12_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim12_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 13)
   {
      if(!subTable)
      {
         strKeyDim13_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim13_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 14)
   {
      if(!subTable)
      {
         strKeyDim14_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim14_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 15)
   {
      if(!subTable)
      {
         strKeyDim15_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim15_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 16)
   {
      if(!subTable)
      {
         strKeyDim16_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim16_1 = createAsteriskSepList(areas);
      }
   }
   if(positionProfile == 17)
   {
      if(!subTable)
      {
         strKeyDim17_0 = createAsteriskSepList(areas);
      }
      else
      {
         strKeyDim17_1 = createAsteriskSepList(areas);
      }
   }
   if(!subTable)
   {
      areaLabels0 = areas;
   }
   else
   {
      areaLabels1 = areas;
   }
}

// flip visiblity of items
    function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
       var f = document.getElementById(id + "link");
       if(f.innerHTML == '+'){
          f.innerHTML = '-';
	  f.style.fontSize = '1.5em';}
       else
          {f.innerHTML = '+';
    	  f.style.fontSize = '1.3em';}
    }
