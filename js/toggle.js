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
   var identifier = 0;
   if(!subTable)
   {
      identifier = 0;
   }
   else
   {
      identifier = 1;
   }
 //  alert('positionProfile = ' + positionProfile);
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
 * Create a custom parser for tablesorter
 * to allow correct sorting of counts with commas in
 * (removes commas for sorting process).
 */
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
