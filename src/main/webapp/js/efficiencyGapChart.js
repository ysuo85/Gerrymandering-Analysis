
//efficiency gap variables
            var counter;
            var demVotePercentage;
            var democratWonState=0;
            var republicanWonState=0; 
            var demVotesArray;
            var repVotesArray;
            var usedToWinDemVotes;
            var wastedDemVotes;
            var usedToWinRepVotes;
            var wastedRepVotes;
            var demDistrictCount=0;
            var repDistrictCount=0;
            var winnerArray;
            var margin2 = {top2: (10), right2: (parseInt(d3.select('body').style('width'), 10)/20), bottom2: (parseInt(d3.select('body').style('width'), 10)/5), left2: (parseInt(d3.select('body').style('width'), 10)/20)},
            width2 = parseInt(d3.select('body').style('width'), 10) - margin2.left2 - margin2.right2,
            width3 = width2/3;
            height2 = parseInt(d3.select('body').style('height'), 10) - margin2.top2 - margin2.bottom2,
            height3 = height2/1.5;
            var x_1 = d3.scale.ordinal()
            .rangeRoundBands([0, width3], .1);
            var x_2 = d3.scale.ordinal();
            var y_1 = d3.scale.linear()
            .range([height2, 0]);
            var colorRange2 = d3.scale.category20();
            var color2 = d3.scale.ordinal()
              .range(colorRange2.range());
            //distinguish what will be used to scale the x axis and its orientation
            var x_Axis = d3.svg.axis()
              .scale(x_1)
              .orient("bottom");
            //distinguish what will be used to scale the y axis and its orientation
            var y_Axis = d3.svg.axis()
              .scale(y_1)
              .orient("left")
              .tickFormat(d3.format(".2s"));
             var options;
function displayEfficiencyGapTestResults(data,svg2){
            findEfficiencyGapStateWinner(data);
            setDataSetForEfficiencyGapChart();
            setEfficiencyGapChartDomains();
            appendEfficiencyGapAxis(svg2);
            initEfficiencyGapBarChart(svg2);
            colorEfficiencyGapByWastedVotes(svg2);
            displayEfficiencyGapResultDescription();
        }

    function findEfficiencyGapStateWinner(data){
        //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
            winnerArray = data.map((e)=>{
               return e['Winner'];
            });
            for(var i=0; i<winnerArray.length; i++){
              if(winnerArray[i]=="D"){
                demDistrictCount = demDistrictCount+1;
              }
              else if(winnerArray[i]=="R"){
                repDistrictCount = repDistrictCount+1;
              }
            }
            console.log("demDistrictCount:"+demDistrictCount);
            console.log("repDistrictCount:"+repDistrictCount);
            if(demDistrictCount>repDistrictCount){
              democratWonState=1;
            }
            else if(demDistrictCount < repDistrictCount){
              republicanWonState=1;
            }
    }
    function setDataSetForEfficiencyGapChart(){
            if(democratWonState==1){
              usedToWinDemVotes = demVoteSum;
              wastedDemVotes = demVoteSum/2;
              usedToWinRepVotes = repVoteSum;
              wastedRepVotes = repVoteSum;
            }
            if(republicanWonState==1){
              usedToWinRepVotes = repVoteSum;
              wastedRepVotes = repVoteSum/2;
              usedToWinDemVotes = demVoteSum;
              wastedDemVotes = demVoteSum;
            }
            dataset = [
             {label:"Total Votes", "Democrat":usedToWinDemVotes, "Republican":usedToWinRepVotes},
             {label:"Votes Wasted", "Democrat":wastedDemVotes, "Republican":wastedRepVotes}
            ];
            options = d3.keys(dataset[0]).filter(function(key) { 
              return key !== "label";
            });
    }
    function setEfficiencyGapChartDomains(){
           var options = d3.keys(dataset[0]).filter(function(key) { 
              return key !== "label";
            });
            dataset.forEach(function(d) {
              d.valores = options.map(function(name) { 
                return {name: name, value: +d[name]};
              });
            });
            x_1.domain(dataset.map(function(d) { 
              return d.label;
            }));
            x_2.domain(options).rangeRoundBands([0, x_1.rangeBand()]);
            y_1.domain([0, d3.max(dataset, function(d) { 
              return d3.max(d.valores, function(d) {
                return d.value; 
              });
            })]);
    }
    function appendEfficiencyGapAxis(svg2){
        // x-axis appended to HTML "g" element with the specified text "Democrat Vote Percentage"
            svg2.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height2 + ")")
              .call(x_Axis);
              // y-axis appended to HTML "g" element with the specified text "Vote Shares"
            svg2.append("g")
              .attr("class", "y axis")
              .call(y_Axis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Vote Shares");
    }
    function initEfficiencyGapBarChart(svg2){
        // appends bars to chart while rendering each bars' color property through the
            // color2 function that chooses 2 colors for the 2 respective parties and the r value that holds
            // the radius of each circle
            var bar = svg2.selectAll(".bar")
              .data(dataset)
              .enter().append("g")
              .attr("class", "rect")
              .attr("transform", function(d) {
                return "translate(" + x_1(d.label) + ",0)";
              });
            bar.selectAll("rect")
              .data(function(d) { 
                return d.valores; 
              })
             .enter().append("rect")
             .attr("width", x_2.rangeBand())
             .attr("x", function(d) { 
               return x_2(d.name);
              })
             .attr("y", function(d) { 
                return y_1(d.value);
              })
              .attr("value", function(d){
                return d.name;
              })
              .attr("height", function(d) { 
                  return height2 - y_1(d.value);
              })
              .style("fill", function(d) {
                return color2(d.name);
              });
    }
    function colorEfficiencyGapByWastedVotes(svg2){
        // draw legend colored rectangles to identify which party wasted the displayed votes
            var legend2 = svg2.selectAll(".legend")
              .data(options.slice())
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { 
                return "translate(0," + i * 20 + ")"; 
              });
            
            legend2.append("rect")
              .attr("x", width3 - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color2);

            legend2.append("text")
              .attr("x", width3 - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) {
                return d; 
              });
    }
    function displayEfficiencyGapResultDescription(){
          //displays the test result description based on the overall winner of the state as well as the chosen state and year combination            
            if(democratWonState==1){
              document.getElementById("efficiencyGapAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with "+ usedToWinRepVotes+ " votes, and Democrats won their districts with "+ usedToWinDemVotes+ " votes. The Republicans unfortunately lost and therefore wasted all of their votes, while the Democrats wasted "+wastedDemVotes +" due to their win. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Democrats. <br><br>";
            }
            if(republicanWonState==1){
              document.getElementById("efficiencyGapAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with "+ usedToWinRepVotes+ " votes, and Democrats won their districts with "+ usedToWinDemVotes+ " votes.  The Democrats unfortunately lost and therefore wasted all of their votes, while the Republicans wasted "+wastedRepVotes +" due to their win. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Republicans. <br><br>";
            } 
            
    }
    //Additional functionality
    function selectStateBySearchState(markers){
        var counter=0;
        var feature;
        //var loopStop=false; 
        
        if(!markers[0].title.includes("New York")&&!markers[0].title.includes("NY")&&!markers[0].title.includes("North Carolina")&&!markers[0].title.includes("NC")&&
            !markers[0].title.includes("Virginia")&&!markers[0].title.includes("VA")){
                return;
        }
        else{
                var iteratorAsString;
            
                if(markers[0].title.includes("NY")||markers[0].title.includes("New York")){
                    selectedState="New York";
                    iteratorAsString="0";
                    markerTitle1=selectedState;
                }
                else if(markers[0].title.includes("VA")||markers[0].title.includes("Virginia")){
                    selectedState="Virginia";
                    iteratorAsString="2";
                    markerTitle2=selectedState;
                }
                else if(markers[0].title.includes("NC")||markers[0].title.includes("North Carolina")){
                    selectedState="North Carolina";
                    iteratorAsString="1";
                    markerTitle3=selectedState;
                }                       
                selectStateElement=document.getElementById('box1');
                selectStateElement.selectedIndex=iteratorAsString;
                selectYearElement= document.getElementById('box2');
                selectYearByDropDown(selectYearElement);//start tests on clicked state           
            }

    }