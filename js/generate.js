/*
 *  Populate the text area with the html code to display the chosen profiles.
 *  For charts there was an issue trying to put all the javascript libraries
 *  as text in the page, so references are made and comments added to download
 *  and store the required elements within a sub-directory below the page.
 *
 */
function generate() {

//alert ("language = " + language);

var strVar="";

strVar += "<!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD XHTML 1.0 Transitional\/\/EN\" \"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd\">\n";
strVar += "<html xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n";
strVar += "<head>\n";
strVar += "<meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\" \/>\n";
strVar += "<title>" + document.getElementById('areaName').value + " Area Profile<\/title>\n";

// CSS to add basic styling to tables and charts
strVar += "<link class=\"include\" href=\"css\/generated_page.css\" rel=\"stylesheet\" type=\"text\/css\" \/>\n";

// CSS for print
strVar += "<link class=\"include\" media=\"print\" href=\"css\/print.css\" rel=\"stylesheet\" type=\"text\/css\" \/>\n";

strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!-- * You will need to include jquery.jqplot.min.css which is a stylesheet used by the charting software.                * -->\n";
strVar += "<!-- * Put it in a sub-directory called 'css', below where this generated page is held.                                   * -->\n";
strVar += "<!-- * You can get all the files associated with JQPlot (javascript, css) and see examples here: http:\/\/www.jqplot.com\/* -->\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<link class=\"include\" href=\"css\/jquery.jqplot.min.css\" rel=\"stylesheet\" type=\"text\/css\" \/>\n";

strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!-- * You will need to include excanvas.js which is a javascript library used by the charting software.              * -->\n";
strVar += "<!-- * It is needed for the charting to work on pre-IE9 versions of internet explorer                                     * -->\n";
strVar += "<!-- * Put it in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
strVar += "<!-- * You can get all the files associated with JQPlot (javascript, css) and see examples here: http:\/\/www.jqplot.com\/* -->\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!--[if lt IE 9]><script language=\"javascript\" type=\"text\/javascript\" src=\"js\/excanvas.js\"><\/script><![endif]-->\n";

// JQUERY
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!-- * You will need to include jquery javascript library which is needed by JQPlot for the charting to work.             * -->\n";
strVar += "<!-- * Put it in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
strVar += "<!-- * You can get all the files associated with JQuery and see code examples here: http:\/\/jquery.com\/                 * -->\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<script src=\"js\/jquery-1.7.2.min.js\" type=\"text\/javascript\"></script>\n";

// JQPLOT
strVar += "<!-- ************************************************************************************************************************ -->\n";
strVar += "<!-- * You will need to include all these jqplot javascript libraries, which are needed by JQPlot for the charting to work. * -->\n";
strVar += "<!-- * Put them in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
strVar += "<!-- * You can get all the files associated with JQPlot (javascript, css) and see examples here: http:\/\/www.jqplot.com\/  * -->\n";
strVar += "<!-- ************************************************************************************************************************ -->\n";
strVar += "<script src=\"js\/jquery.jqplot.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.barRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.categoryAxisRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.pointLabels.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.canvasAxisTickRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.canvasTextRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.canvasAxisLabelRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.highlighter.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.pieRenderer.min.js\" type=\"text\/javascript\"></script>\n";
strVar += "<script src=\"js\/jqplot.donutRenderer.min.js\" type=\"text\/javascript\"></script>\n";

if($("#showMap").prop("checked"))
{
   // MAPS
   strVar += "<!-- ********************************************************************************************************************** -->\n";
   strVar += "<!-- * You will need to include the online google maps javascript library, which is needed for GoogleMaps to work.        * -->\n";
   strVar += "<!-- * You can find out about Google Maps API here: https:\/\/developers.google.com\/maps\/                               * -->\n";
   strVar += "<!-- * You will also need the mapping_utils file, which makes calls to the ONS Open Geography Portal to aquire the        * -->\n";
   strVar += "<!-- * appropriate boundaries for the area and parent area picked. You can find out more about the ONS Open Geography     * -->\n";
   strVar += "<!-- * here: https:\/\/geoportal.statistics.gov.uk\/geoportal\/catalog\/main\/home.page                                   * -->\n";
   strVar += "<!-- * Put it in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
   strVar += "<!-- ********************************************************************************************************************** -->\n";
   strVar += "<script src=\"http:\/\/maps.googleapis.com\/maps\/api\/js?sensor=false&amp;region=GB\" type=\"text\/javascript\"><\/script>\n";
   strVar += "<script src=\"js\/mapping_utils.js\" type=\"text\/javascript\"></script>\n";
}

// TABLE SORTER
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!-- * You will need to include these javascript libraries which are needed by TableSorter for the ability to click on    * -->\n";
strVar += "<!-- * a table heading and be able to sort the table in ascending or descending order by that column.                     * -->\n";
strVar += "<!-- * Put it in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
strVar += "<!-- * You can get all the files associated with TableSorter here: http:\/\/tablesorter.com/docs\/                        * -->\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<script src=\"js/tablesorter.js\" type=\"text\/javascript\"></script>\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<!-- * You will need to include this css library which are needed by TableSorter for some of the styling when clicking    * -->\n";
strVar += "<!-- * on a table heading and being able to sort the table in ascending or descending order by that column.               * -->\n";
strVar += "<!-- * Put it in a sub-directory called 'js', below where this generated page is held.                                    * -->\n";
strVar += "<!-- * You can get all the files associated with TableSorter here: http:\/\/tablesorter.com/docs\/                        * -->\n";
strVar += "<!-- ********************************************************************************************************************** -->\n";
strVar += "<link class=\"include\" href=\"css/style.css\" rel=\"stylesheet\" type=\"text\/css\" \/>\n";

// TOGGLE FUNCTION FOR TABLES (counts/percentages)
strVar += "<script src=\"js/toggle.js\" type=\"text\/javascript\"></script>\n";

// CHART UTILS
strVar += "<script src=\"js/chart_utils.js\" type=\"text\/javascript\"></script>\n";

strVar += "<script type=\"text/javascript\">\n";

// added cdata so html validator ignores javascript which can cause validation problems
strVar += "\/* <![CDATA[ *\/\n";

strVar += "\/\/ Label information for charts\n";
strVar += "strLabs0 = \"" + strLabs0 + "\";\n";
strVar += "strLabs1 = \"" + strLabs1 + "\";\n";
strVar += "strLabs2 = \"" + strLabs2 + "\";\n";
strVar += "strLabs3 = \"" + strLabs3 + "\";\n";
strVar += "strLabs4 = \"" + strLabs4 + "\";\n";
strVar += "strLabs5 = \"" + strLabs5 + "\";\n";
strVar += "strLabs6 = \"" + strLabs6 + "\";\n";
strVar += "strLabs7 = \"" + strLabs7 + "\";\n";
strVar += "strLabs8 = \"" + strLabs8 + "\";\n";
strVar += "strLabs9 = \"" + strLabs9 + "\";\n";
strVar += "strLabs10 = \"" + strLabs10 + "\";\n";
strVar += "strLabs11 = \"" + strLabs11 + "\";\n";
strVar += "strLabs12 = \"" + strLabs12 + "\";\n";
strVar += "strLabs13 = \"" + strLabs13 + "\";\n";
strVar += "strLabs14 = \"" + strLabs14 + "\";\n";
strVar += "strLabs15 = \"" + strLabs15 + "\";\n";
strVar += "strLabs16 = \"" + strLabs16 + "\";\n";
strVar += "strLabs17 = \"" + strLabs17 + "\";\n";

strVar += "\/\/ Dimension information for charts\n";
strVar += "strKeyDim0_0 = \"" + strKeyDim0_0 + "\";\n";
strVar += "strKeyDim0_1 = \"" + strKeyDim0_1 + "\";\n";
strVar += "strKeyDim1_0 = \"" + strKeyDim1_0 + "\";\n";
strVar += "strKeyDim1_1 = \"" + strKeyDim1_1 + "\";\n";
strVar += "strKeyDim2_0 = \"" + strKeyDim2_0 + "\";\n";
strVar += "strKeyDim2_1 = \"" + strKeyDim2_1 + "\";\n";
strVar += "strKeyDim3_0 = \"" + strKeyDim3_0 + "\";\n";
strVar += "strKeyDim3_1 = \"" + strKeyDim3_1 + "\";\n";
strVar += "strKeyDim4_0 = \"" + strKeyDim4_0 + "\";\n";
strVar += "strKeyDim4_1 = \"" + strKeyDim4_1 + "\";\n";
strVar += "strKeyDim5_0 = \"" + strKeyDim5_0 + "\";\n";
strVar += "strKeyDim5_1 = \"" + strKeyDim5_1 + "\";\n";
strVar += "strKeyDim6_0 = \"" + strKeyDim6_0 + "\";\n";
strVar += "strKeyDim6_1 = \"" + strKeyDim6_1 + "\";\n";
strVar += "strKeyDim7_0 = \"" + strKeyDim7_0 + "\";\n";
strVar += "strKeyDim7_1 = \"" + strKeyDim7_1 + "\";\n";
strVar += "strKeyDim8_0 = \"" + strKeyDim8_0 + "\";\n";
strVar += "strKeyDim8_1 = \"" + strKeyDim8_1 + "\";\n";
strVar += "strKeyDim9_0 = \"" + strKeyDim9_0 + "\";\n";
strVar += "strKeyDim9_1 = \"" + strKeyDim9_1 + "\";\n";
strVar += "strKeyDim10_0 = \"" + strKeyDim10_0 + "\";\n";
strVar += "strKeyDim10_1 = \"" + strKeyDim10_1 + "\";\n";
strVar += "strKeyDim11_0 = \"" + strKeyDim11_0 + "\";\n";
strVar += "strKeyDim11_1 = \"" + strKeyDim11_1 + "\";\n";
strVar += "strKeyDim12_0 = \"" + strKeyDim12_0 + "\";\n";
strVar += "strKeyDim12_1 = \"" + strKeyDim12_1 + "\";\n";
strVar += "strKeyDim13_0 = \"" + strKeyDim13_0 + "\";\n";
strVar += "strKeyDim13_1 = \"" + strKeyDim13_1 + "\";\n";
strVar += "strKeyDim14_0 = \"" + strKeyDim14_0 + "\";\n";
strVar += "strKeyDim14_1 = \"" + strKeyDim14_1 + "\";\n";
strVar += "strKeyDim15_0 = \"" + strKeyDim15_0 + "\";\n";
strVar += "strKeyDim15_1 = \"" + strKeyDim15_1 + "\";\n";
strVar += "strKeyDim16_0 = \"" + strKeyDim16_0 + "\";\n";
strVar += "strKeyDim16_1 = \"" + strKeyDim16_1 + "\";\n";
strVar += "strKeyDim17_0 = \"" + strKeyDim17_0 + "\";\n";
strVar += "strKeyDim17_1 = \"" + strKeyDim17_1 + "\";\n";

strVar += "\/\/ Data information in format for line/bar charts\n";
strVar += "var XstrSeriesData = [];\n";
strVar += "XstrSeriesData[0] = [];\n";
strVar += "XstrSeriesData[0][0] = [];\n";
strVar += "XstrSeriesData[0][1] = [];\n";
strVar += "XstrSeriesData[1] = [];\n";
strVar += "XstrSeriesData[1][0] = [];\n";
strVar += "XstrSeriesData[1][1] = [];\n";
strVar += "XstrSeriesData[2] = [];\n";
strVar += "XstrSeriesData[2][0] = [];\n";
strVar += "XstrSeriesData[2][1] = [];\n";
strVar += "XstrSeriesData[3] = [];\n";
strVar += "XstrSeriesData[3][0] = [];\n";
strVar += "XstrSeriesData[3][1] = [];\n";
strVar += "XstrSeriesData[4] = [];\n";
strVar += "XstrSeriesData[4][0] = [];\n";
strVar += "XstrSeriesData[4][1] = [];\n";
strVar += "XstrSeriesData[5] = [];\n";
strVar += "XstrSeriesData[5][0] = [];\n";
strVar += "XstrSeriesData[5][1] = [];\n";
strVar += "XstrSeriesData[6] = [];\n";
strVar += "XstrSeriesData[6][0] = [];\n";
strVar += "XstrSeriesData[6][1] = [];\n";
strVar += "XstrSeriesData[7] = [];\n";
strVar += "XstrSeriesData[7][0] = [];\n";
strVar += "XstrSeriesData[7][1] = [];\n";
strVar += "XstrSeriesData[8] = [];\n";
strVar += "XstrSeriesData[8][0] = [];\n";
strVar += "XstrSeriesData[8][1] = [];\n";
strVar += "XstrSeriesData[9] = [];\n";
strVar += "XstrSeriesData[9][0] = [];\n";
strVar += "XstrSeriesData[9][1] = [];\n";
strVar += "XstrSeriesData[10] = [];\n";
strVar += "XstrSeriesData[10][0] = [];\n";
strVar += "XstrSeriesData[10][1] = [];\n";
strVar += "XstrSeriesData[11] = [];\n";
strVar += "XstrSeriesData[11][0] = [];\n";
strVar += "XstrSeriesData[11][1] = [];\n";
strVar += "XstrSeriesData[12] = [];\n";
strVar += "XstrSeriesData[12][0] = [];\n";
strVar += "XstrSeriesData[12][1] = [];\n";
strVar += "XstrSeriesData[13] = [];\n";
strVar += "XstrSeriesData[13][0] = [];\n";
strVar += "XstrSeriesData[13][1] = [];\n";
strVar += "XstrSeriesData[14] = [];\n";
strVar += "XstrSeriesData[14][0] = [];\n";
strVar += "XstrSeriesData[14][1] = [];\n";
strVar += "XstrSeriesData[15] = [];\n";
strVar += "XstrSeriesData[15][0] = [];\n";
strVar += "XstrSeriesData[15][1] = [];\n";
strVar += "XstrSeriesData[16] = [];\n";
strVar += "XstrSeriesData[16][0] = [];\n";
strVar += "XstrSeriesData[16][1] = [];\n";
strVar += "XstrSeriesData[17] = [];\n";
strVar += "XstrSeriesData[17][0] = [];\n";
strVar += "XstrSeriesData[17][1] = [];\n";

strVar += "\/\/ Data information in format for line/bar charts\n";
strVar += "var XstrSeriesDataPie = [];\n";
strVar += "XstrSeriesDataPie[0] = [];\n";
strVar += "XstrSeriesDataPie[0][0] = [];\n";
strVar += "XstrSeriesDataPie[0][1] = [];\n";
strVar += "XstrSeriesDataPie[1] = [];\n";
strVar += "XstrSeriesDataPie[1][0] = [];\n";
strVar += "XstrSeriesDataPie[1][1] = [];\n";
strVar += "XstrSeriesDataPie[2] = [];\n";
strVar += "XstrSeriesDataPie[2][0] = [];\n";
strVar += "XstrSeriesDataPie[2][1] = [];\n";
strVar += "XstrSeriesDataPie[3] = [];\n";
strVar += "XstrSeriesDataPie[3][0] = [];\n";
strVar += "XstrSeriesDataPie[3][1] = [];\n";
strVar += "XstrSeriesDataPie[4] = [];\n";
strVar += "XstrSeriesDataPie[4][0] = [];\n";
strVar += "XstrSeriesDataPie[4][1] = [];\n";
strVar += "XstrSeriesDataPie[5] = [];\n";
strVar += "XstrSeriesDataPie[5][0] = [];\n";
strVar += "XstrSeriesDataPie[5][1] = [];\n";
strVar += "XstrSeriesDataPie[6] = [];\n";
strVar += "XstrSeriesDataPie[6][0] = [];\n";
strVar += "XstrSeriesDataPie[6][1] = [];\n";
strVar += "XstrSeriesDataPie[7] = [];\n";
strVar += "XstrSeriesDataPie[7][0] = [];\n";
strVar += "XstrSeriesDataPie[7][1] = [];\n";
strVar += "XstrSeriesDataPie[8] = [];\n";
strVar += "XstrSeriesDataPie[8][0] = [];\n";
strVar += "XstrSeriesDataPie[8][1] = [];\n";
strVar += "XstrSeriesDataPie[9] = [];\n";
strVar += "XstrSeriesDataPie[9][0] = [];\n";
strVar += "XstrSeriesDataPie[9][1] = [];\n";
strVar += "XstrSeriesDataPie[10] = [];\n";
strVar += "XstrSeriesDataPie[10][0] = [];\n";
strVar += "XstrSeriesDataPie[10][1] = [];\n";
strVar += "XstrSeriesDataPie[11] = [];\n";
strVar += "XstrSeriesDataPie[11][0] = [];\n";
strVar += "XstrSeriesDataPie[11][1] = [];\n";
strVar += "XstrSeriesDataPie[12] = [];\n";
strVar += "XstrSeriesDataPie[12][0] = [];\n";
strVar += "XstrSeriesDataPie[12][1] = [];\n";
strVar += "XstrSeriesDataPie[13] = [];\n";
strVar += "XstrSeriesDataPie[13][0] = [];\n";
strVar += "XstrSeriesDataPie[13][1] = [];\n";
strVar += "XstrSeriesDataPie[14] = [];\n";
strVar += "XstrSeriesDataPie[14][0] = [];\n";
strVar += "XstrSeriesDataPie[14][1] = [];\n";
strVar += "XstrSeriesDataPie[15] = [];\n";
strVar += "XstrSeriesDataPie[15][0] = [];\n";
strVar += "XstrSeriesDataPie[15][1] = [];\n";
strVar += "XstrSeriesDataPie[16] = [];\n";
strVar += "XstrSeriesDataPie[16][0] = [];\n";
strVar += "XstrSeriesDataPie[16][1] = [];\n";
strVar += "XstrSeriesDataPie[17] = [];\n";
strVar += "XstrSeriesDataPie[17][0] = [];\n";
strVar += "XstrSeriesDataPie[17][1] = [];\n";

// welsh edit

strVar += "language = " + language + ";\n";

strVar += "\/\/ Chart headings\n";

if (language == 0)
{
  strVar += "heading0 = \"Population Density (QS102EW)\";\n";
  strVar += "heading1 = \"Age Profile (QS103EW)\";\n";
  strVar += "heading2 = \"Marital Status (KS103EW)\";\n";
  strVar += "heading3 = \"Ethnic Group (QS201EW)\";\n";
  strVar += "heading4 = \"Religion (KS209EW)\";\n";
  strVar += "heading5 = \"County of Birth (KS204EW)\";\n";
  strVar += "heading6 = \"Passports Held (KS205EW)\";\n";
  strVar += "heading7 = \"General Health (QS302EW)\";\n";
  strVar += "heading8 = \"Unpaid Care (QS301EW)\";\n";
  strVar += "heading9 = \"Accommodation Type (QS401EW)\";\n";
  strVar += "heading10 = \"Tenure (QS403EW)\";\n";
  strVar += "heading11 = \"Car or Van Availability (KS404EW)\";\n";
  strVar += "heading12 = \"Household Size (QS406EW)\";\n";
  strVar += "heading13 = \"Economic Activity (QS601EW)\";\n";
  strVar += "heading14 = \"Industry (KS605EW)\";\n";
  strVar += "heading15 = \"NS-SeC (QS607EW)\";\n";
  strVar += "heading16 = \"Occupation (KS608EW)\";\n";
  strVar += "heading17 = \"Method of Travel to Work (QS701EW)\";\n";
}
else
{
  strVar += "heading0 = \"Population Density (QS102EW)\";\n";
  strVar += "heading1 = \"Oedran fesul blwyddyn unigol (QS103EW)\";\n";
  strVar += "heading2 = \"Marital Status (KS103EW)\";\n";
  strVar += "heading3 = \"Grŵp ethnig (QS201EW)\";\n";
  strVar += "heading4 = \"Religion (KS209EW)\";\n";
  strVar += "heading5 = \"County of Birth (KS204EW)\";\n";
  strVar += "heading6 = \"Passports Held (KS205EW)\";\n";
  strVar += "heading7 = \"Iechyd cyffredinol (QS302EW)\";\n";
  strVar += "heading8 = \"Darparu gofal di-dâl (QS301EW)\";\n";
  strVar += "heading9 = \"Math o lety - Pobl (QS401EW)\";\n";
  strVar += "heading10 = \"Deiliadaeth - Pobl (QS403EW)\";\n";
  strVar += "heading11 = \"Car or Van Availability (KS404EW)\";\n";
  strVar += "heading12 = \"Maint y cartref (QS406EW)\";\n";
  strVar += "heading13 = \"Gweithgarwch Economaidd (QS601EW)\";\n";
  strVar += "heading14 = \"Industry (KS605EW)\";\n";
  strVar += "heading15 = \"NS-SeC (QS607EW)\";\n";
  strVar += "heading16 = \"Occupation (KS608EW)\";\n";
  strVar += "heading17 = \"Y dull o deithio i’r gwaith (QS701EW)\";\n";
}

  
// Populate the arrays with the data for the chosen profiles
// for the main table
for(XX = 0; XX < 18; XX++)
{
   for(XY = 0; XY < 3; XY++)
   {
      // Store series data for each of the three areas in the main table
      // to be used by line/bar charts
      var temp1 = XstrSeriesData[XX][0][XY];
      if(typeof(temp1) == "undefined")
      {
         temp1 = "''";
      }
      else
      {
         temp1 = "'" + temp1 + "'";
      }
      strVar += "XstrSeriesData[" + XX + "][0][" + XY + "] = " + temp1 + ";\n";
      temp1 = "";
      // Store series data for each of the three areas in the main table
      // to be used by pie/doughnut charts
      var temp2 = XstrSeriesDataPie[XX][0][XY];
      if(typeof(temp2) == "undefined")
      {
         temp2 = "[]";
      }
      else
      {
         temp2 = "[" + temp2 + "]";
      }
      strVar += "XstrSeriesDataPie[" + XX + "][0][" + XY + "] = \"" + temp2 + "\";\n";
      temp2 = "";
   }
}

// Populate the arrays with the data for the chosen profiles
// for the sub-table
for(XX = 0; XX < 18 ; XX++)
{
   if(jsonObject[XX][1] != null && jsonObject[XX][1].areadata != null)
   {
      for(XY = 0; XY < jsonObject[XX][1].areadata.length; XY++)
      {
         // Store series data for each of the three areas in the main table
         // to be used by line/bar charts
         var temp1 = XstrSeriesData[XX][0][XY];
         if(typeof(temp1) == "undefined")
         {
            temp1 = "[]";
         }
               else
         {
            temp1 = "[" + temp1 + "]";
         }
         strVar += "XstrSeriesData[" + XX + "][1][" + XY + "] = \"" + temp1 + "\";\n";
         temp1 = "";
         // Store series data for each of the three areas in the main table
         // to be used by pie/doughnut charts
         var temp2 = XstrSeriesDataPie[XX][0][XY];
         if(typeof(temp2) == "undefined")
         {
            temp2 = "[]";
         }
         else
         {
            temp2 = "[" + temp2 + "]";
         }
         strVar += "XstrSeriesDataPie[" + XX + "][1][" + XY + "] = \"" + temp2 + "\";\n";
         temp2 = "";
      }
   }
}

if($("#showMap").prop("checked"))
{
   strVar += "\/\/ Area details used by mapping \n";
   strVar += "var strAreaCode = \"" + strAreaCode + "\";\n";
   strVar += "var strAreaType = \"" + strAreaType + "\";\n";
   strVar += "var strParentAreaCode = \"" + strParentAreaCode + "\";\n";
   strVar += "var strParentAreaType = \"" + strParentAreaType + "\";\n";
   strVar += "var strSelectedAreaName = \"" + strSelectedAreaName + "\";\n";
}

// added cdata (closed here) so html validator ignores javascript which can cause validation problems
strVar += "\/* ]]> *\/\n";


strVar += "</script>\n";

strVar += "<\/head>\n";
strVar += "<body>\n";
strVar += "<h2 class='title' id='maintitle'>" + document.getElementById('areaName').value + " Area Profile</h2>\n";
//strVar += "	<br \/>\n";

if($("#showMap").prop("checked"))
{
   strVar += "<h3 class='profileTitle'>&nbsp;Map</h3>\n";
   strVar += "<div id=\"map\"></div>\n";
}

var prof0 = false;
var prof1 = false;
var prof2 = false;
var prof3 = false;
var prof4 = false;
var prof5 = false;
var prof6 = false;

// insert profiles Tables and Charts that were produced
for(profCount = 0; profCount < 18 ; profCount++)
{
// welsh edit here

   // Output Headings for profile section
   if($(eval('"#table' + profCount + '"')).prop("checked"))
   {
    if (language == 0)  
     {    
      if(profCount >= 0 && profCount < 3 & !prof0)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Demography</h3>";
         prof0 = true;
      }
      if(profCount >= 3 && profCount < 5 & !prof1)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Ethnicity, Identity, Language and Religion (EILR)</h3>";
         prof1 = true;
      }
      if(profCount >= 5 && profCount < 7 & !prof2)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Migration</h3>";
         prof2 = true;
      }
      if(profCount >= 7 && profCount < 9 & !prof3)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Health</h3>";
         prof3 = true;
      }
      if(profCount >= 9 && profCount < 13 & !prof4)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Housing and Accommodation</h3>";
         prof4 = true;
      }
      if(profCount >= 13 && profCount < 17 & !prof5)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Labour Market</h3>";
         prof5 = true;
      }
      if(profCount == 17 & !prof6)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Travel to Work</h3>";
         prof6 = true;
      }
     }
     else
     {
     if(profCount >= 0 && profCount < 3 & !prof0)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Demograffeg</h3>";
         prof0 = true;
      }
      if(profCount >= 3 && profCount < 5 & !prof1)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Ethnigrwydd, Hunaniaeth, Iaith a Chrefydd (EHIC)</h3>";
         prof1 = true;
      }
      if(profCount >= 5 && profCount < 7 & !prof2)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Ymfudo</h3>";
         prof2 = true;
      }
      if(profCount >= 7 && profCount < 9 & !prof3)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Iechyd</h3>";
         prof3 = true;
      }
      if(profCount >= 9 && profCount < 13 & !prof4)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Tai a Llety</h3>";
         prof4 = true;
      }
      if(profCount >= 13 && profCount < 17 & !prof5)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Y Farchnad Lafur</h3>";
         prof5 = true;
      }
      if(profCount == 17 & !prof6)
      {
         strVar += "<h3 class='profileTitle'>&nbsp;Y dull o deithio i’r gwaith</h3>";
         prof6 = true;
      }
     }
     // Output tables
     strVar += htmlProfileResults[profCount][0][0]; // main table with counts
     strVar += htmlProfileResults[profCount][0][1]; // main table with percentages
     strVar += htmlProfileResults[profCount][1][0]; // sub-table with counts
     strVar += htmlProfileResults[profCount][1][1]; // sub-table with percentages
   }
   if($(eval('"#chart' + profCount + '"')).prop("checked"))
   {
      strVar += "<div class=\"charts\" id=\"chartProfile" + profCount + "_0\"></div>\n";
      if($("#chart0").val() == 1)
      {
         strVar += "<script type=\"text\/javascript\">\ndisplayLineChart(" + profCount + ", 0, heading" + profCount + ");\n<\/script>\n";
      }
      if($("#chart0").val() == 2)
      {
         strVar += "<script type=\"text\/javascript\">\ndisplayBarChart(" + profCount + ", 0, heading" + profCount + ");\n<\/script>\n";
      }
      if($("#chart0").val() == 3)
      {
         strVar += "<script type=\"text\/javascript\">\ndisplayDoughnutChart(" + profCount + ", 0, heading" + profCount + ");\n<\/script>\n";
      }
   }
}

if($("#showMap").prop("checked"))
{
   // Call function to display map with boundaries
   // NOTE: needs to be called after page fully loaded as may be slow to load online google maps javascript libraries - causes problems in non-IE browsers
   //       such as map appears, but cannot zoom/pan/drag, or map appears and then disappears!!!
   strVar += "<script type=\"text\/javascript\">\nwindow.onload=function(){getBoundaries(strAreaCode,strAreaType,strParentAreaCode,strParentAreaType,true);};\n<\/script>\n";
}
else
{
   //strVar += "<script type=\"text\/javascript\">\nhideMapDiv();\n<\/script>\n";
}

// Add scripts for tablesorter
for(profCount = 0; profCount < 18 ; profCount++)
{
   // Output Headings for profile section
   if($(eval('"#table' + profCount + '"')).prop("checked"))
   {
      // main table with counts
      strVar += "<script type=\"text\/javascript\">\n$(\"#profileTable" + profCount + "_0_0_VIS\").tablesorter({\n";
      strVar += "\/\/ [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending\n";
      strVar += "sortlist:[[0,1]],\n";
      strVar += "\/\/ add custom sort (zero-based index)  this will sort the 2nd, 3rd and 4th columns (the area)\n";
      strVar += "\/\/ using the parser to remove the commas, so the numbers are ordered correctly\n";
      strVar += "\/\/ Calls the custom parser by it's name 'commaNumber'.\n";
      strVar += "headers: {1: {sorter: 'commaNumber'},2: {sorter: 'commaNumber'},3: {sorter: 'commaNumber'},4: {sorter: 'commaNumber'},5: {sorter: 'commaNumber'},6: {sorter: 'commaNumber'},7: {sorter: 'commaNumber'},8: {sorter: 'commaNumber'},9: {sorter: 'commaNumber'},10: {sorter: 'commaNumber'},11: {sorter: 'commaNumber'},12: {sorter: 'commaNumber'},13: {sorter: 'commaNumber'},14: {sorter: 'commaNumber'},15: {sorter: 'commaNumber'},16: {sorter: 'commaNumber'},17: {sorter: 'commaNumber'},18: {sorter: 'commaNumber'},19: {sorter: 'commaNumber'},20: {sorter: 'commaNumber'},21: {sorter: 'commaNumber'},22: {sorter: 'commaNumber'},23: {sorter: 'commaNumber'},24: {sorter: 'commaNumber'},25: {sorter: 'commaNumber'},26: {sorter: 'commaNumber'},27: {sorter: 'commaNumber'},28: {sorter: 'commaNumber'},29: {sorter: 'commaNumber'},30: {sorter: 'commaNumber'}          }\n";
      strVar += "});\n";
      // main table with percentages
      strVar += "$(\"#profileTable" + profCount + "_0_1_HID\").tablesorter({\n";
      strVar += "\/\/ [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending\n";
      strVar += "sortlist:[[0,1]],\n";
      strVar += "});\n";
      strVar += "\/\/NOTE: activate tablesorter on table, but doesn't apply sort - user has to click on a column header to apply sort\n";
      strVar += "\n<\/script>\n";

      // sub-table with counts
      strVar += "<script type=\"text\/javascript\">\n$(\"#profileTable" + profCount + "_1_0_VIS\").tablesorter({\n";
      strVar += "\/\/ [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending\n";
      strVar += "sortlist:[[0,1]],\n";
      strVar += "\/\/ add custom sort (zero-based index)  this will sort the 2nd, 3rd and 4th columns (the area)\n";
      strVar += "\/\/ using the parser to remove the commas, so the numbers are ordered correctly\n";
      strVar += "\/\/ Calls the custom parser by it's name 'commaNumber'.\n";
      strVar += "headers: {1: {sorter: 'commaNumber'},2: {sorter: 'commaNumber'},3: {sorter: 'commaNumber'},4: {sorter: 'commaNumber'},5: {sorter: 'commaNumber'},6: {sorter: 'commaNumber'}, 7: {sorter: 'commaNumber'},8: {sorter: 'commaNumber'},9: {sorter: 'commaNumber'},10: {sorter: 'commaNumber'},11: {sorter: 'commaNumber'},12: {sorter: 'commaNumber'},";
      strVar += "13: {sorter: 'commaNumber'},14: {sorter: 'commaNumber'},15: {sorter: 'commaNumber'},16: {sorter: 'commaNumber'},17: {sorter: 'commaNumber'},18: {sorter: 'commaNumber'}, 19: {sorter: 'commaNumber'},20: {sorter: 'commaNumber'},21: {sorter: 'commaNumber'},22: {sorter: 'commaNumber'},23: {sorter: 'commaNumber'},24: {sorter: 'commaNumber'},";
      strVar += "25: {sorter: 'commaNumber'},26: {sorter: 'commaNumber'},27: {sorter: 'commaNumber'},28: {sorter: 'commaNumber'},29: {sorter: 'commaNumber'},30: {sorter: 'commaNumber'}, 31: {sorter: 'commaNumber'},32: {sorter: 'commaNumber'},33: {sorter: 'commaNumber'},34: {sorter: 'commaNumber'},35: {sorter: 'commaNumber'},36: {sorter: 'commaNumber'},";
      strVar += "37: {sorter: 'commaNumber'},38: {sorter: 'commaNumber'},39: {sorter: 'commaNumber'},40: {sorter: 'commaNumber'},41: {sorter: 'commaNumber'},42: {sorter: 'commaNumber'}, 43: {sorter: 'commaNumber'},44: {sorter: 'commaNumber'},45: {sorter: 'commaNumber'},46: {sorter: 'commaNumber'},47: {sorter: 'commaNumber'},48: {sorter: 'commaNumber'},";
      strVar += "49: {sorter: 'commaNumber'},50: {sorter: 'commaNumber'},51: {sorter: 'commaNumber'},52: {sorter: 'commaNumber'},53: {sorter: 'commaNumber'},54: {sorter: 'commaNumber'}, 55: {sorter: 'commaNumber'},56: {sorter: 'commaNumber'},57: {sorter: 'commaNumber'},58: {sorter: 'commaNumber'},59: {sorter: 'commaNumber'},60: {sorter: 'commaNumber'},";
      strVar += "61: {sorter: 'commaNumber'},62: {sorter: 'commaNumber'},63: {sorter: 'commaNumber'},64: {sorter: 'commaNumber'},65: {sorter: 'commaNumber'},66: {sorter: 'commaNumber'}, 67: {sorter: 'commaNumber'},68: {sorter: 'commaNumber'},69: {sorter: 'commaNumber'},70: {sorter: 'commaNumber'},71: {sorter: 'commaNumber'},72: {sorter: 'commaNumber'}";
      strVar += "}\n";
      strVar += "});\n";
      // sub-table with percentages
      strVar += "$(\"#profileTable" + profCount + "_1_1_HID\").tablesorter({\n";
      strVar += "\/\/ [0,1] where first number refers to column and second number refers to order: 0=ascending, 1=descending\n";
      strVar += "sortlist:[[0,1]],\n";
      strVar += "});\n";
      strVar += "\/\/NOTE: activate tablesorter on table, but doesn't apply sort - user has to click on a column header to apply sort\n";
      strVar += "\n<\/script>\n";
   }
}

strVar += "<\/body>\n";
strVar += "<\/html>\n";
document.getElementById('codebox').style.display = 'block';
document.getElementById('codebox').style.visibility = 'visible';
document.getElementById('results').style.display = 'none';
document.getElementById('results').style.visibility = 'hidden';  
// write html for page to text area, so that it can be copied and pasted into a file
document.getElementById('codeTextArea').value = strVar;
// uncomment for downloadify 
// makebutton('myprofile','html');
}

