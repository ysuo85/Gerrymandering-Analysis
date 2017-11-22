
function selectStateByDropDown(element){
  selectedState = element.options[element.selectedIndex].text;
}
function selectYearByDropDown(element){
  d3.json("/resources/js/test.json", function(filteredData) {
      selectedYear = element.options[element.selectedIndex].text;
        selectedPair=[
            ["State",selectedState],
            ["raceYear",selectedYear]
        ];
       displayStateWithDescription(selectedState);       
       //get specific rows from data that pertain to the user's selection
       filteredData = filteredData.filter(function(row) {
            return row['State'] == selectedPair[0][1] && row['raceYear']==selectedPair[1][1];
        });
       displayVoteSums(filteredData);
       selectDistrictByClickListener(map,filteredData,areaInfoWindow)
       selectStateByMarker1Click(filteredData);
       selectStateByMarker2Click(filteredData);
       selectStateByMarker3Click(filteredData); 
       // remove old results and add the new graph canvas to the body of the webpage
       var svg1_Removal = d3.select("#visual"); //lopsided wins chart 
       svg1_Removal.selectAll("*").remove();       
       var svg1 = d3.select("#visual").append("svg")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var svg_Removal = d3.select("#vis");//consistent advantage chart
        svg_Removal.selectAll("*").remove();                
        var svg = d3.select("#vis").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var svg2_Removal = d3.select("#visEfficiencyGap");
        svg2_Removal.selectAll("*").remove();
        var svg2 = d3.select("#visEfficiencyGap").append("svg")
                .attr("width", width3 + margin2.left2 + margin2.right2)
                .attr("height", height3 + margin2.bottom2)
                .append("g")
                .attr("transform", "translate(" + margin2.left2 + "," + margin2.top2 + ")");
        displayLopsidedTestResults(filteredData,svg1);
        displayConsistentAdvantageTestResults(filteredData,svg);
        displayEfficiencyGapTestResults(filteredData,svg2);              
    });
}