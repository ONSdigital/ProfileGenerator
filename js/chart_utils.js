/*
 * Javascript Functions to control the Charts produced using JQPlot Javascript library plugin for JQuery
 * Examples include a Line Chart, Bar Chart and Doughnut
 *
 * NOTE: jqPlot is open source and is does not always behave perfectly.
 *       There can be a memory leak problem when producing lots of charts again and again.
 *       This did not appear to occur in IE(7), but did in Firefox, Chrome and Safari.
 *       To get around it I have used a single global variable 'plotA' to draw each chart,
 *       plus store plotA into a separate variable specific to the chart profile, eg,
 *       plot0_0 for the chart for profile 0 main table, plot5_0 for the chart for profile 5 main table.
 *       Then each time 'Preview' is called and use the destroy() method on each one of the
 *       plots, eg, plot0_0.destroy(). If this isn't done, the memory use goes up each time
 *       'Preview' is pressed (despite various other ways I tried) and will eventually crash
 *       the browser. The time taken depends on the number of charts and number of times
 *       'Preview' is pressed. I also have to do it then as the charts are drawn asynchronously
 *       and trying to clear after plotA was drawn appeared to prevent them appearing with
 *       none IE browsers, or just not fix the memory leak.
 *
 *       There appears also to be an issue with the windowResize function in IE. It does not
 *       appear to be a memory leak. Viewing in Task Manager, the memory keeps going up and
 *       down, but it never completes.
 *
 *       IE appears to lock the browser whilst drawing and can take 1.5mins to do 17 charts
 *       Firefox, Chrome and Safari don't appear to do this and you can see the tables/charts
 *       appear and move the scrollbar. Plus it completes much faster.
 *
 * URL for jqPlot website: http://www.jqplot.com/
 * Useful link on styling jqPlot charts: http://www.prodevtips.com/2011/05/25/how-to-style-jqplot-and-format-labels/
 *
 * Author: Neil Sillitoe (ONS)
 */

// variable used for repetative drawing of charts (asynchronous)
var plotA = null;
// variables used to store each chart separately, so the .destroy()
// method can be used to free resouces up and prevent memory leak.
var plot0_0 = null;
var plot0_1 = null;
var plot1_0 = null;
var plot1_1 = null;
var plot2_0 = null;
var plot2_1 = null;
var plot3_0 = null;
var plot3_1 = null;
var plot4_0 = null;
var plot4_1 = null;
var plot5_0 = null;
var plot5_1 = null;
var plot6_0 = null;
var plot6_1 = null;
var plot7_0 = null;
var plot7_1 = null;
var plot8_0 = null;
var plot8_1 = null;
var plot9_0 = null;
var plot9_1 = null;
var plot10_0 = null;
var plot10_1 = null;
var plot11_0 = null;
var plot11_1 = null;
var plot12_0 = null;
var plot12_1 = null;
var plot13_0 = null;
var plot13_1 = null;
var plot14_0 = null;
var plot14_1 = null;
var plot15_0 = null;
var plot15_1 = null;
var plot16_0 = null;
var plot16_1 = null;
var plot17_0 = null;
var plot17_1 = null;

//chart width set in css
var doughnutChartHeight = "500px";
var chartHeight = "900px";
var chartHeight = "900px";

var pctstring = "Percent";

/*
 * Function to create a doughnut chart for the supplied
 * profile.
 *
 * @param positionProfile - which profile this relates to
 * @param subTable - is it the main table or the sub table (wards)
 * @param heading - string heading for chart
 */
function displayDoughnutChart(positionProfile, subTable, heading)
{
   $.jqplot.config.enablePlugins = true;

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   if (language == 1)
   {
     pctstring = 'Canran';
   }

   var s1 = new Array();
   var s2 = new Array();
   var s3 = new Array();
   var s4 = new Array();
   var s5 = new Array();
   var s6 = new Array();
   var s7 = new Array();
   var s8 = new Array();
   var s9 = new Array();
   var s10 = new Array();
   var s11 = new Array();
   var s12 = new Array();
   var s13 = new Array();
   var s14 = new Array();
   var s15 = new Array();
   var s16 = new Array();
   var s17 = new Array();
   var s18 = new Array();
   var s19 = new Array();
   var s20 = new Array();
   var s21 = new Array();
   var s22 = new Array();
   var s23 = new Array();
   var s24 = new Array();
   var s25 = new Array();
   var s26 = new Array();
   var s27 = new Array();
   var s28 = new Array();
   var s29 = new Array();
   var s30 = new Array();
   var s31 = new Array();
   var s32 = new Array();
   var s33 = new Array();
   var s34 = new Array();
   var s35 = new Array();
   var s36 = new Array();
   var s37 = new Array();
   var s38 = new Array();
   var s39 = new Array();
   var s40 = new Array();
   var s41 = new Array();
   var s42 = new Array();
   var s43 = new Array();
   var s44 = new Array();
   var s45 = new Array();
   var s46 = new Array();
   var s47 = new Array();
   var s48 = new Array();
   var s49 = new Array();
   var s50 = new Array();
   var s51 = new Array();
   var s52 = new Array();
   var s53 = new Array();
   var s54 = new Array();
   var s55 = new Array();
   var s56 = new Array();
   var s57 = new Array();
   var s58 = new Array();
   var s59 = new Array();
   var s60 = new Array();
   var s61 = new Array();
   var s62 = new Array();
   var s63 = new Array();
   var s64 = new Array();
   var s65 = new Array();
   var s66 = new Array();
   var s67 = new Array();
   var s68 = new Array();
   var s69 = new Array();
   var s70 = new Array();

   // Convert string array into number array for data values
   for (var a=1; a <= XstrSeriesDataPie[positionProfile][identifier].length; a++)
   {
      var str = eval("XstrSeriesDataPie[" + positionProfile + "][identifier][a-1]").split("*");
      
      for( var b=0; b < str.length; b++)
      {
         // split label and data value
         var temp = str[b].split("#");

         // Store each item in an array (s1 for area 1, s2 for area 2, etc)
         eval("s" + a).push([temp[0],parseFloat(temp[1])]);
      }
   }

   // Create a string of the series array to supply to the chart
   // Again done in reverse order as using horizontal bar chart)
   // Format: [s3,s2,s1]
   var strSeriesArray = "[";
   for( var b=1; b <= XstrSeriesDataPie[positionProfile][identifier].length; b++)
   {
      if(b < XstrSeriesDataPie[positionProfile][identifier].length)
      {
         strSeriesArray = strSeriesArray + "s" + b + ",";
      }
      else
      {
         strSeriesArray = strSeriesArray + "s" + b;
      }
   }
   strSeriesArray = strSeriesArray + "]";
   
//alert('strSeriesArray = ' + strSeriesArray);
   
   var sKD = null;
   // Convert back to array (initially string array)
   if(!subTable)
   {
      sKD = eval("strKeyDim" + positionProfile + "_0").split("*");
   }
   else
   {
      sKD = eval("strKeyDim" + positionProfile + "_1").split("*");
   }
   
   var strLabelArray = "";
   for (var a = 0; a < sKD.length; a++)
   {
      if(a == 0)
      {
         strLabelArray = strLabelArray + "[{label:sKD[" + a + "]}";
      }
      else
      {
         strLabelArray = strLabelArray + ",{label:sKD[" + a + "]}";
      }
   }
   strLabelArray = strLabelArray + "]";

   var seriesCol = getSeriesColours(s1.length, "DOUGHNUT");

   plotA = $.jqplot(eval("'chartProfile" + positionProfile + "_" + identifier + "'"), eval(strSeriesArray), {

      title: heading,

      // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
      animate: !$.jqplot.use_excanvas,

      // Provide a custom seriesColors array to override the default colours.
      seriesColors: eval(seriesCol),

      // The "seriesDefaults" option is an options object that will
      // be applied to all series in the chart.
      seriesDefaults: {      // make this a donut chart.
         renderer:$.jqplot.DonutRenderer,
         rendererOptions:{        // Donut's can be cut into slices like pies.
            sliceMargin: 3,        // Pies and donuts can start at any arbitrary angle.
            startAngle: -90,        
            showDataLabels: true,        // By default, data labels show the percentage of the donut/pie.
            // You can show the data 'value' or data 'label' instead.
            //dataLabels: 'value'
         }
      },
      height: doughnutChartHeight,
      series:
              eval(strLabelArray) // {label:sKD[0]}, {label:sKD[1]}, {label:sKD[2]}
      ,

      legend: { show:true, location: 'e' },
      
      // Cannot get tooltip to position with compass notation for Pie/Doughnut chart
      // it only seems to move up and down from top left of chart div using the tooltipOffset,
      // although 'n' and 's' have some effect.
      highlighter: {
         show: true,
         sizeAdjust: 10,
         tooltipContentEditor: tooltipContentEditorPie,
         tooltipLocation: "sw",
         fadeTooltip: true,
         tooltipFadeSpeed: "slow",
         tooltipOffset: 70,
         useAxesFormatters: false
      }
    });

   // Store plots into separate variables to enable them to be
   // destroyed successfully - IMPORTANT as there is a memory
   // leak in Firefox, Chrome and Safari and it will crash the
   // browser if producing lots of charts numerous times!
   storePlotsSeparately(positionProfile, subTable);

   // Commented out as seems to cause problem in IE, so that never completes
   // Doesn't appear to be a memory leak looking in Task Manager
   //windowResize(plotA, positionProfile, "DOUGHNUT");
}

/*
 * Function to create a bar chart for the supplied
 * profile.
 *
 * @param positionProfile - which profile this relates to
 * @param subTable - is it the main table or the sub table (wards)
 * @param heading - string heading for chart
 */
function displayBarChart(positionProfile, subTable, heading)
{
   // default to horizontal bar chart
   // this requires reversing some of the series data
   // and labels to achieve the required display order.
   var horizontal = true;

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }

   if (language == 1)
   {
     pctstring = 'Canran';
   }

   $.jqplot.config.enablePlugins = true;

   var labsArray = eval("strLabs" + positionProfile).split("*");
   //alert(labsArray);
   // Ticks should match up one for each y value (category) in the series.
   var ticks = labsArray;
   if(horizontal)
   {
      ticks.reverse();
   }

   var s1 = new Array();
   var s2 = new Array();
   var s3 = new Array();
   var s4 = new Array();
   var s5 = new Array();
   var s6 = new Array();
   var s7 = new Array();
   var s8 = new Array();
   var s9 = new Array();
   var s10 = new Array();
   var s11 = new Array();
   var s12 = new Array();
   var s13 = new Array();
   var s14 = new Array();
   var s15 = new Array();
   var s16 = new Array();
   var s17 = new Array();
   var s18 = new Array();
   var s19 = new Array();
   var s20 = new Array();
   var s21 = new Array();
   var s22 = new Array();
   var s23 = new Array();
   var s24 = new Array();
   var s25 = new Array();
   var s26 = new Array();
   var s27 = new Array();
   var s28 = new Array();
   var s29 = new Array();
   var s30 = new Array();
   var s31 = new Array();
   var s32 = new Array();
   var s33 = new Array();
   var s34 = new Array();
   var s35 = new Array();
   var s36 = new Array();
   var s37 = new Array();
   var s38 = new Array();
   var s39 = new Array();
   var s40 = new Array();
   var s41 = new Array();
   var s42 = new Array();
   var s43 = new Array();
   var s44 = new Array();
   var s45 = new Array();
   var s46 = new Array();
   var s47 = new Array();
   var s48 = new Array();
   var s49 = new Array();
   var s50 = new Array();
   var s51 = new Array();
   var s52 = new Array();
   var s53 = new Array();
   var s54 = new Array();
   var s55 = new Array();
   var s56 = new Array();
   var s57 = new Array();
   var s58 = new Array();
   var s59 = new Array();
   var s60 = new Array();
   var s61 = new Array();
   var s62 = new Array();
   var s63 = new Array();
   var s64 = new Array();
   var s65 = new Array();
   var s66 = new Array();
   var s67 = new Array();
   var s68 = new Array();
   var s69 = new Array();
   var s70 = new Array();

   // Convert string array into number array for data values
   for (var a=1; a <= XstrSeriesData[positionProfile][identifier].length; a++)
   {
      str = eval("XstrSeriesData[" + positionProfile + "][identifier][a-1]").split("*");

      for( var b=0; b < str.length; b++)
      {
         // Store each item in an array (s1 for area 1, s2 for area 2, etc)
         eval("s" + a).push(parseFloat(eval("str")[b]));
      }

      // Issue with horizontal bar chart displaying series & legend opposite way around
      // to vertical bar chart. Have to supply data in reverse order (fix to reverse
      // order of the legend done separately)
      if(horizontal)
      {
         eval("s" + a).reverse();
      }
   }

//alert('s1 = ' + s1);
//alert('s1 = ' + eval("s" + XstrSeriesData[positionProfile][identifier].length));
   // Create a string of the series array to supply to the chart
   // Again done in reverse order as using horizontal bar chart)
   // Format: [s3,s2,s1]
   var strSeriesArrayReversed = "[";
   for( var b=XstrSeriesData[positionProfile][identifier].length; b > 0; b--) // reversed order
   //for( var b=1; b <= XstrSeriesData[positionProfile][identifier].length; b++)
   {
      //alert('b=' + b);
      if(b > 0)  // reversed
      //if(b < XstrSeriesData[positionProfile][identifier].length)
      {
         strSeriesArrayReversed = strSeriesArrayReversed + "s" + b + ",";
      }
      else
      {
         strSeriesArrayReversed = strSeriesArrayReversed + "s" + b;
      }
   }
   strSeriesArrayReversed = strSeriesArrayReversed + "]";

   //alert('strSeriesArrayReversed = ' + strSeriesArrayReversed);
   var sKD = null;
   // Convert back to array (initially string array)
   if(!subTable)
   {
      sKD = eval("strKeyDim" + positionProfile + "_0").split("*");
   }
   else
   {
      sKD = eval("strKeyDim" + positionProfile + "_1").split("*");
   }
   var strLabelArray = "";

   //alert('sKD.length = ' + sKD.length);
   for (var a = sKD.length-1; a > -1; a--) // reversed
   //for (var a = 0; a < sKD.length; a++)
   {
      //alert('a='+a);
      if(a == sKD.length-1) // reversed
      //if(a == 0)
      {
         strLabelArray = strLabelArray + "[{label:sKD[" + a + "]}";
      }
      else
      {
         strLabelArray = strLabelArray + ",{label:sKD[" + a + "]}";
      }
   }
   strLabelArray = strLabelArray + "]";
   //alert(strLabelArray);

   var chartHeightValue = 55;
   var minChartHeightValue = 300;
   if(!subTable)
   {
      chartHeightValue = s1.length * 55;
   }
   else
   {
      chartHeightValue = (s1.length + sKD.length) * 75;
   }
   if(chartHeightValue >= minChartHeightValue)
   {
      chartHeight = chartHeightValue + "px";
   }
   else
   {
      chartHeight = minChartHeightValue + "px";
   }

   //alert(sKD.length);
   var seriesCol = getSeriesColours(sKD.length, "BAR");
   //alert(seriesCol.toString());

   //plot = $.jqplot(eval("'chartProfile" + positionProfile + "'"), [s1, s2, s3], {     // order for vertical bar chart
   plotA = $.jqplot(eval("'chartProfile" + positionProfile + "_" + identifier + "'"), eval(strSeriesArrayReversed), {       // order for horizontal bar chart
   //plot = $.jqplot(eval("'" + plotname + "'"), eval(strSeriesArrayReversed), {       // order for horizontal bar chart
      title: heading,

      // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
      animate: !$.jqplot.use_excanvas,

      // Provide a custom seriesColors array to override the default colours.
      seriesColors: eval(seriesCol),

      // The "seriesDefaults" option is an options object that will
      // be applied to all series in the chart.
      seriesDefaults:{renderer:$.jqplot.BarRenderer,
                      rendererOptions: {fillToZero: true, barHeight: 10 },
                      pointLabels: {show: false},
                      rendererOptions: {barDirection: 'horizontal', barWidth:9, barMargin:4, barPadding:1},
                      shadow: false
      },
      // Custom labels for the series are specified with the "label"
      // option on the series option.  Here a series option object
      // is specified for each series.
      series:
              eval(strLabelArray)     //{label:sKD[0]}, {label:sKD[1]}, {label:sKD[2]}   // order for vertical bar chart {label:sKD[2]}, {label:sKD[1]}, {label:sKD[0]}     // order for horizontal bar chart
      ,
      // Show the legend and put it outside the grid, but inside the
      // plot container, shrinking the grid to accomodate the legend.
      // A value of "outside" would not shrink the grid and allow
      // the legend to overflow the container.
      legend: { show: true, 
                placement: 'insideGrid',
		location: 'e'
      },
      sortData: false,
      height: chartHeight,
      axes: {
         // Use a category axis on the x axis and use our custom ticks.
         yaxis: { renderer: $.jqplot.CategoryAxisRenderer,
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                  markerRenderer: $.jqplot.MarkerRenderer( {shadow:false} ),
                  ticks: ticks,
                  tickOptions: {
                     angle: 0,
                     //fontSize: '10pt',
                     showTickMarks: false,
                     textColor: "black"
                  }
         },
         // Pad the y axis just a little so bars can get close to, but
         // not touch, the grid boundaries.  1.2 is the default padding.
         xaxis: {
                   labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                   tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                   markerRenderer: $.jqplot.MarkerRenderer( {shadow:false} ),
                   label: pctstring,
                   tickOptions: {
                      formatString:'%.0f', // use whole numbers on axis scale
                      textColor: "black"
                   },
                   pad: 1.5,
                   min: 0,
                   //max: 100
         }
      },

      highlighter: {
         show: true,
         sizeAdjust: 10,
         tooltipContentEditor: tooltipContentEditorBar,
         tooltipLocation: 'n',
         fadeTooltip: true,
         tooltipFadeSpeed: "slow",
         tooltipOffset: 2
      }
   });

   // Store plots into separate variables to enable them to be
   // destroyed successfully - IMPORTANT as there is a memory
   // leak in Firefox, Chrome and Safari and it will crash the
   // browser if producing lots of charts numerous times!
   storePlotsSeparately(positionProfile, subTable);

   // Commented out as seems to cause problem in IE, so that never completes
   // Doesn't appear to be a memory leak looking in Task Manager
   //windowResize(plotA, positionProfile, "BAR");
   
   reverseChartLegend(positionProfile, identifier);
}

/*
 * Function to create a line chart for the supplied
 * profile.
 *
 * @param positionProfile - which profile this relates to
 * @param subTable - is it the main table or the sub table (wards)
 * @param heading - string heading for chart
 */
function displayLineChart(positionProfile, subTable, heading)
{
   $.jqplot.config.enablePlugins = true;

   var labsArray = eval("strLabs" + positionProfile).split("*");

   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
   
   if (language == 1)
   {
     pctstring = 'Canran';
   }

   // Ticks should match up one for each y value (category) in the series.
   var ticks = labsArray;

   var s1 = new Array();
   var s2 = new Array();
   var s3 = new Array();
   var s4 = new Array();
   var s5 = new Array();
   var s6 = new Array();
   var s7 = new Array();
   var s8 = new Array();
   var s9 = new Array();
   var s10 = new Array();
   var s11 = new Array();
   var s12 = new Array();
   var s13 = new Array();
   var s14 = new Array();
   var s15 = new Array();
   var s16 = new Array();
   var s17 = new Array();
   var s18 = new Array();
   var s19 = new Array();
   var s20 = new Array();
   var s21 = new Array();
   var s22 = new Array();
   var s23 = new Array();
   var s24 = new Array();
   var s25 = new Array();
   var s26 = new Array();
   var s27 = new Array();
   var s28 = new Array();
   var s29 = new Array();
   var s30 = new Array();
   var s31 = new Array();
   var s32 = new Array();
   var s33 = new Array();
   var s34 = new Array();
   var s35 = new Array();
   var s36 = new Array();
   var s37 = new Array();
   var s38 = new Array();
   var s39 = new Array();
   var s40 = new Array();
   var s41 = new Array();
   var s42 = new Array();
   var s43 = new Array();
   var s44 = new Array();
   var s45 = new Array();
   var s46 = new Array();
   var s47 = new Array();
   var s48 = new Array();
   var s49 = new Array();
   var s50 = new Array();
   var s51 = new Array();
   var s52 = new Array();
   var s53 = new Array();
   var s54 = new Array();
   var s55 = new Array();
   var s56 = new Array();
   var s57 = new Array();
   var s58 = new Array();
   var s59 = new Array();
   var s60 = new Array();
   var s61 = new Array();
   var s62 = new Array();
   var s63 = new Array();
   var s64 = new Array();
   var s65 = new Array();
   var s66 = new Array();
   var s67 = new Array();
   var s68 = new Array();
   var s69 = new Array();
   var s70 = new Array();

   // Convert string array into number array for data values
   for (var a=1; a <= XstrSeriesData[positionProfile][identifier].length; a++)
   {
      str = eval("XstrSeriesData[" + positionProfile + "][identifier][a-1]").split("*");

      for( var b=0; b < str.length; b++)
      {
         // Store each item in an array (s1 for area 1, s2 for area 2, etc)
         eval("s" + a).push(parseFloat(eval("str")[b]));
      }
   }
   
   // Create a string of the series array to supply to the chart
   // Again done in reverse order as using horizontal bar chart)
   // Format: [s3,s2,s1]
   var strSeriesArray = "[";
   for( var b=1; b <= XstrSeriesData[positionProfile][identifier].length; b++)
   {
      if(b < XstrSeriesData[positionProfile][identifier].length)
      {
         strSeriesArray = strSeriesArray + "s" + b + ",";
      }
      else
      {
         strSeriesArray = strSeriesArray + "s" + b;
      }
   }
   strSeriesArray = strSeriesArray + "]";
   
//alert('strSeriesArray = ' + strSeriesArray);
   
   var sKD = null;
   // Convert back to array (initially string array)
   if(!subTable)
   {
      sKD = eval("strKeyDim" + positionProfile + "_0").split("*");
   }
   else
   {
      sKD = eval("strKeyDim" + positionProfile + "_1").split("*");
   }

   var strLabelArray = "";
   for (var a = 0; a < sKD.length; a++)
   {
      if(a == 0)
      {
         strLabelArray = strLabelArray + "[{label:sKD[" + a + "]}";
      }
      else
      {
         strLabelArray = strLabelArray + ",{label:sKD[" + a + "]}";
      }
   }
   strLabelArray = strLabelArray + "]";


   var chartHeightValue = 50;
   if(!subTable)
   {
      chartHeightValue = s1.length * 50;
   }
   else
   {
      chartHeightValue = (s1.length + sKD.length) * 75;
   }
   chartHeight = chartHeightValue + "px";

   var seriesCol = getSeriesColours(sKD.length, "LINE");

   //alert('colour array size = ' + seriesCol.length);

   plotA = $.jqplot(eval("'chartProfile" + positionProfile + "_" + identifier + "'"), eval(strSeriesArray), {

      title: heading,

      // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
      animate: !$.jqplot.use_excanvas,

      // Provide a custom seriesColors array to override the default colours.
      //seriesColors:['#E0CCF5', '#A366E0', '#5200A3'],

      // Provide a custom seriesColors array to override the default colours.
      seriesColors: eval(seriesCol),

      // The "seriesDefaults" option is an options object that will
      // be applied to all series in the chart.
      seriesDefaults:{
         pointLabels: {show: false,}
      },
      // Custom labels for the series are specified with the "label"
      // option on the series option.  Here a series option object
      // is specified for each series.
      series:
              eval(strLabelArray) //{label:sKD[0]}, {label:sKD[1]}, {label:sKD[2]}
      ,
      // Show the legend and put it outside the grid, but inside the
      // plot container, shrinking the grid to accomodate the legend.
      // A value of "outside" would not shrink the grid and allow
      // the legend to overflow the container.
      legend: { show: true, 
                placement: 'insideGrid',
		location: 'e'
      },
      sortData: true,
      height: chartHeight,
      axes: {
         // Use a category axis on the x axis and use our custom ticks.
         xaxis: { renderer: $.jqplot.CategoryAxisRenderer,
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                  ticks: ticks,
                  tickOptions: {
                     angle: -45,
                     //fontSize: '16px',
                     showTickMarks: false,
                     formatString:'%.0f' // use whole numbers on axis scale
                  }
         },
         // Pad the y axis just a little so bars can get close to, but
         // not touch, the grid boundaries.  1.2 is the default padding.
         yaxis: {
                   //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                   //tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                   label: pctstring,
		   pad: 1.5,
                   min: 0,
                   //max: 100,
         }
      },

      highlighter: {
         show: true,
         sizeAdjust: 10,
         tooltipContentEditor: tooltipContentEditorLine,
         tooltipLocation: 'n',
         fadeTooltip: true,
         tooltipFadeSpeed: "slow",
         tooltipOffset: 2
      }
   });

   // Store plots into separate variables to enable them to be
   // destroyed successfully - IMPORTANT as there is a memory
   // leak in Firefox, Chrome and Safari and it will crash the
   // browser if producing lots of charts numerous times!
   storePlotsSeparately(positionProfile, subTable);

   // Commented out as seems to cause problem in IE, so that never completes
   // Doesn't appear to be a memory leak looking in Task Manager
   //windowResize(plot, positionProfile, "LINE");

   // *** FIX for highlighter not working with line charts ***
   // Otherwise binding datahighlighter below does not work
   for (i = 0; i < plotA.series.length; i++)
   {
      plotA.series[i].highlightMouseOver = true;
   }
}

/*
 * Store each plot to it's own global variable, so that the plots
 * can be destroyed when 'Preview' is pressed to create a new set
 * of tables and charts. This is needed to prevent a memory leak
 * issue with JQPlot and Firefox, Chrome and Safari, which will
 * result in the browser crashing. Only closing and opening the
 * browser seems to release the memory if plot.destroy() method
 * not used.
 *
 * @param positionProfile - which profile this relates to
 * @param subTable - is it the main table or the sub table (wards)
 */
function storePlotsSeparately(positionProfile, subTable)
{
   if(positionProfile == 0)
   {
      if(!subTable)
      {
         plot0_0 = plotA;
      }
      else
      {
         plot0_1 = plotA;
      }
   }
   if(positionProfile == 1)
   {
      if(!subTable)
      {
         plot1_0 = plotA;
      }
      else
      {
         plot1_1 = plotA;
      }
   }
   if(positionProfile == 2)
   {
      if(!subTable)
      {
         plot2_0 = plotA;
      }
      else
      {
         plot2_1 = plotA;
      }
   }
   if(positionProfile == 3)
   {
      if(!subTable)
      {
         plot3_0 = plotA;
      }
      else
      {
         plot3_1 = plotA;
      }
   }
   if(positionProfile == 4)
   {
      if(!subTable)
      {
         plot4_0 = plotA;
      }
      else
      {
         plot4_1 = plotA;
      }
   }
   if(positionProfile == 5)
   {
      if(!subTable)
      {
         plot5_0 = plotA;
      }
      else
      {
         plot5_1 = plotA;
      }
   }
   if(positionProfile == 6)
   {
      if(!subTable)
      {
         plot6_0 = plotA;
      }
      else
      {
         plot6_1 = plotA;
      }
   }
   if(positionProfile == 7)
   {
      if(!subTable)
      {
         plot7_0 = plotA;
      }
      else
      {
         plot7_1 = plotA;
      }
   }
   if(positionProfile == 8)
   {
      if(!subTable)
      {
         plot8_0 = plotA;
      }
      else
      {
         plot8_1 = plotA;
      }
   }
   if(positionProfile == 9)
   {
      if(!subTable)
      {
         plot9_0 = plotA;
      }
      else
      {
         plot9_1 = plotA;
      }
   }
   if(positionProfile == 10)
   {
      if(!subTable)
      {
         plot10_0 = plotA;
      }
      else
      {
         plot10_1 = plotA;
      }
   }
   if(positionProfile == 11)
   {
      if(!subTable)
      {
         plot11_0 = plotA;
      }
      else
      {
         plot11_1 = plotA;
      }
   }
   if(positionProfile == 12)
   {
      if(!subTable)
      {
         plot12_0 = plotA;
      }
      else
      {
         plot12_1 = plotA;
      }
   }
   if(positionProfile == 13)
   {
      if(!subTable)
      {
         plot13_0 = plotA;
      }
      else
      {
         plot13_1 = plotA;
      }
   }
   if(positionProfile == 14)
   {
      if(!subTable)
      {
         plot14_0 = plotA;
      }
      else
      {
         plot14_1 = plotA;
      }
   }
   if(positionProfile == 15)
   {
      if(!subTable)
      {
         plot15_0 = plotA;
      }
      else
      {
         plot15_1 = plotA;
      }
   }
   if(positionProfile == 16)
   {
      if(!subTable)
      {
         plot16_0 = plotA;
      }
      else
      {
         plot16_1 = plotA;
      }
   }
   if(positionProfile == 17)
   {
      if(!subTable)
      {
         plot17_0 = plotA;
      }
      else
      {
         plot17_1 = plotA;
      }
   }
}

/*
 * Allow charts to redraw to fit new window size.
 * NOTE: now using horizontal bar chart and needed
 *       to reverse order of series/labels for 
 *       desired order on chart. Replot would remove
 *       this, so need to call reverseChartLegend
 *       function again if a resize occurs.
 *
 * @param plot - the plot the resize relates to
 * @param positionProfile - which profile this relates to
 * @param chartType - String "BAR", "LINE" or "DOUGHNUT"
 */
function windowResize(plot, positionProfile, chartType)
{
   $(window).resize(function() {
        if(plot != null)
        {
           plot.replot( {resetAxes: true } );
           if(chartType == "BAR")
           {
              //reverseChartLegend(positionProfile, 0);
              //reverseChartLegend(positionProfile, 1);
           }
        }
    });
    //alert('resize called');
    //reverseChartLegend(positionProfile);
}

/*
 *  Custom version of tooltip text displayed at the cursor as the 
 *  mouse pointer rolls over a data point.
 *
 */
function tooltipContentEditorBar(str, seriesIndex, pointIndex, plot)
{
   //return "Area: " + plot.series[seriesIndex]["label"]+ ", Status: " + plot.options.axes.yaxis.ticks[pointIndex] + ", Percentage: " + plot.data[seriesIndex][pointIndex] + "%";

   if (language == 1)
   {
   return "Canran: " + plot.data[seriesIndex][pointIndex] + "%";
   }
   return "Percentage: " + plot.data[seriesIndex][pointIndex] + "%";
}

/*
 *  Custom version of tooltip text displayed at the cursor as the 
 *  mouse pointer rolls over a data point.
 *
 */
function tooltipContentEditorLine(str, seriesIndex, pointIndex, plot)
{
   //return "Area: " + plot.series[seriesIndex]["label"]+ ", Status: " + plot.options.axes.xaxis.ticks[pointIndex] + ", Percentage: " + plot.data[seriesIndex][pointIndex] + "%";
   return "Percentage: " + plot.data[seriesIndex][pointIndex] + "%";
}

/*
 *  Custom version of tooltip text displayed at the cursor as the 
 *  mouse pointer rolls over a data point.
 *
 */
function tooltipContentEditorPie(str, seriesIndex, pointIndex, plot)
{
   return "Area: " + plot.series[seriesIndex]["label"]+ ", Status: " + plot.data[seriesIndex][pointIndex][0] + ", Count: " + addCommas(plot.data[seriesIndex][pointIndex][1]);
   //return "Count: " + addCommas(plot.data[seriesIndex][pointIndex][1]);
}

/*
 * Format numbers to put commas in to define 1000's,
 * eg, convert 45456789 to 45,456,789
 *
 * @param nStr - the string value of the number
 */
function addCommas(nStr)
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

/*
 * Hack to reverse the order of the items in the legend.
 * Used for horizontal bar chart (although ok on vertical bar chart).
 * Have to call this function from the window resize function (if used), or the update
 * is removed before you see it.
 *
 * @param positionProfile - which profile this relates to
 */
function reverseChartLegend(positionProfile, identifier)
{
   //alert('positionProfile = ' + positionProfile);
   //var rows = $(eval("'#chartProfile" + positionProfile + " .jqplot-table-legend tr'"));
   var rows = $(eval("'#chartProfile" + positionProfile + "_" + identifier + " .jqplot-table-legend tr'"));
   //alert('identifier = ' + identifier + ' rows = ' + rows.length);
   var newArray0 = [];
   var newArray1 = [];
   var newArray2 = [];
   var newArray3 = [];
   var newArray4 = [];
   var newArray5 = [];
   var newArray6 = [];
   var newArray7 = [];
   var newArray8 = [];
   var newArray9 = [];
   var newArray10 = [];
   var newArray11 = [];
   var newArray12 = [];
   var newArray13 = [];
   var newArray14 = [];
   var newArray15 = [];
   var newArray16 = [];
   var newArray17 = [];

   $.each(rows, function(index, item) {
      eval("newArray" + positionProfile)[index] = item;
   });
   //alert('positionProfile = ' + positionProfile + ' item 0 contains England = ' + eval("newArray" + positionProfile)[0].innerHTML.indexOf("England"));
   if(typeof(eval("newArray" + positionProfile)[0].innerHTML.indexOf("England")) !== "undefined" && eval("newArray" + positionProfile)[0].innerHTML.indexOf("England") < 1)
   {
      eval("newArray" + positionProfile).reverse();
      var strItems = "";
      $.each(eval("newArray" + positionProfile), function(index, item) {
         strItems = strItems + '<tr>' + item.innerHTML + '</tr>';
      });
      $(eval("'#chartProfile" + positionProfile + "_" + identifier + " .jqplot-table-legend tbody'")).html(strItems);
   }
}

/*
 * Return an array of RGB colour values to use in the chart,
 * based on the number of dimensions.
 * NOTE: Because the Bar Chart is Horizontal, some of the parameters
 *       need to be reversed to achieve the required order, relative
 *       to a vertical bar chart or a line chart. Here we want to
 *       start with the darkest colour shade for England and Wales
 *       and then get lighter for parent area and selected area.
 *
 * @param dimCount - the number of dimensions
 * @param chartType - String "BAR", "LINE" or "DOUGHNUT"
 *
 * @return col - an array of RGB colour values
 */
function getSeriesColours(dimCount, chartType)
{
   var col = null;
   if(dimCount <= 3)
   {
      col = seriesColours3 = ['#EBCCFF', '#A319FF', '#3D0066'];
      if(chartType != "BAR")
      {
         col.reverse();
      }
   }
   if(dimCount > 3 && dimCount <= 5)
   {
      col = seriesColours5 = ['#EBCCFF', '#CC80FF', '#A319FF', '#7A00CC', '#3D0066'];
      if(chartType != "BAR")
      {
         col.reverse();
      }
   }
   if(dimCount > 5 && dimCount <= 7)
   {
      col = seriesColours7 = ['#EBCCFF', '#D699FF', '#CC80FF', '#A319FF', '#7A00CC', '#5C0099', '#3D0066'];
      if(chartType != "BAR")
      {
         col.reverse();
      }
   }
   if(dimCount > 7)
   {
      col = ['#EBCCFF','#E0B2FF','#D699FF','#CC80FF','#C266FF','#B84DFF','#AD33FF','#A319FF','#9900FF','#8A00E6','#7A00CC','#6B00B2','#5C0099','#4C0080','#3D0066'];
      if(chartType != "BAR")
      {
         col.reverse();
      }
   }
   return col;
}