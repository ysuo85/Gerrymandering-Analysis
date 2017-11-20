
//consistent advantage varibales
                 var margin = {top: 20, right: 20, bottom: 30, left: 90},
                  width = 500 - margin.left - margin.right,
                  height = 400 - margin.top - margin.bottom;
                  // setup x 
                  var xValue = function(d) {
                    return d["Dem Vote %"];
                  }, // data -> value
                  xScale = d3.scale.linear().range([0, width]), // value -> display
                  xMap = function(d) { 
                    return xScale(xValue(d));
                  }, // data -> display
                  xAxis = d3.svg.axis().scale(xScale).orient("bottom");
                  // setup y
                  var yValue = function(e) {
                    return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes; 
                  }, // data -> value
                  yScale = d3.scale.linear().range([height, 0]), // value -> display
                  yMap = function(d) { 
                    return yScale(yValue(d));
                  }, // data -> display
                  yAxis = d3.svg.axis().scale(yScale).orient("left");
                  //set up values for Republican Won districts
                  var republicanValues = function(e) {
                    return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes; 
                  }
                  // setup fill color
                  var c = [ "#E41A1C", "#377EB8"];
                  // add the tooltip area to the webpage
                  var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                  var mean=0;
                  var republicanMean=0;
                  var median=0;
                  var sum=0;
                  var republicanSum=0;
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
function displayConsistentAdvantageTestResults(data,svg){
      calculateConsistentAdvantageMean_Median(data);
      initConsistentAdvantageSVGContainer(data,svg);
      findConsistentAdvantageStateWinner(data);
      democratWinsConsistentAdvantageSVG(data,svg);
      republicanWinsConsistentAdvantageSVG(data,svg);
      displayConsistentAdvantageResultDescription();

    }
    
        function calculateConsistentAdvantageMean_Median(data){
          //returns an array of the "Dem Vote % " values
                  demVotePercentage = data.map((e) => {
                    return e['Dem Vote %'];
                  });
                  //calculates the sum of all the elements in the array
                  sum = demVotePercentage.reduce(function(total,amount){
                    return total + amount;
                  }, 0);
                  mean = sum/ demVotePercentage.length;
                  var difference;
                  for(var i =0; i<demVotePercentage.length;i++){
                    difference = 1-demVotePercentage[i];
                    republicanSum = republicanSum+difference;
                  }
                  republicanMean = republicanSum/demVotePercentage.length;
                  //A sorted list is needed before locating the median
                  demVotePercentage.sort();
                  if(demVotePercentage.length%2==0){
                    var elementA = (demVotePercentage.length/2)-1 ; 
                    var elementB = elementA+1;
                    var elementSum=demVotePercentage[elementA] + demVotePercentage[elementB];
                    median = elementSum/2;
                  }else{
                    var element = parseInt(demVotePercentage.length/2) ; 
                    median = demVotePercentage[element];
                  } 
        }
        function initConsistentAdvantageSVGContainer(data,svg){
          //remove the chart that was previously rendered and replace it with 
                  
                  //retrieve the column that only holds the "Dem Vote %" values of each row related to the chosen state
                  //returns an array of the "Dem Vote % " values
                  demVotePercentage = data.map((e) => {
                    return e['Dem Vote %'];
                  });
                  xScale.domain([0, d3.max(data, xValue)+0.2]);
                  yScale.domain([0, d3.max(data, yValue )]);
                // x-axis appended to HTML "g" element with the specified text "Vote Percentage"
                  svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .append("text")
                    .attr("class", "label")
                    .attr("x", width)
                    .attr("y", -6)
                    .style("text-anchor", "end")
                    .text("Vote Percentage");
                // y-axis appended to HTML "g" element with the specified text "Vote Shares"
                  svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("class", "label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Vote Shares");
        }
        function findConsistentAdvantageStateWinner(data){
          //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
                  winnerArray = data.map((e)=>{
                    return e['Winner'];
                  });
                  for(var i=0; i<winnerArray.length; i++){  
                    if(winnerArray[i]=="D"){
                      demDistrictCount = demDistrictCount+1;
                    }else if(winnerArray[i]=="R"){
                      repDistrictCount = repDistrictCount+1;
                    }
                  }
                  console.log("demDistrictCount: " + demDistrictCount);
                  console.log("repDistrictCount: " + repDistrictCount);
                  if(demDistrictCount>repDistrictCount){
                    democratWonState=1;
                  }else if(demDistrictCount < repDistrictCount){
                    republicanWonState=1;
                  }
        }
        function democratWinsConsistentAdvantageSVG(data,svg){
                 if(democratWonState==1){                    
                    svg.selectAll(".dot")
                      .data(data)
                      .enter().append("circle")
                      .attr("class", "dot")
                      .attr("r", 3.5)
                      .attr("cx", xMap)
                      .attr("cy", yMap)
                      .style("fill", function(d) { 
                         return c[1];
                      }) 
                      .on("mouseover", function(d) {
                        tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                        if(d.Winner=="D"){
                          tooltip.html("District:"+d["AreaNumber"] + "<br/>Dem Vote %:" + xValue(d) 
                          + "<br/> Dem Votes: " + yValue(d) )
                          .style("left", (d3.event.pageX + 5) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                        }else if(d.Winner=="R"){
                          tooltip.html("District:"+d["AreaNumber"] + "<br/> Dem Vote %:" + xValue(d) 
                           + "<br/> Rep Votes: " + republicanValues(d) )
                           .style("left", (d3.event.pageX + 5) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                        }
                      })
                      .on("mouseout", function(d) {
                        tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                      });
                  }
        }
        function republicanWinsConsistentAdvantageSVG(data,svg){
                if(republicanWonState==1){
                    svg.selectAll(".dot")
                      .data(data)
                      .enter().append("circle")
                      .attr("class", "dot")
                      .attr("r", 3.5)
                      .attr("cx", xMap)
                      .attr("cy", yMap)
                      .style("fill", function(d) { 
                        return c[0];
                      }) 
                      .on("mouseover", function(d) {
                        tooltip.transition()
                          .duration(200)
                          .style("opacity", .9);
                        tooltip.html("District:"+d["AreaNumber"] + "<br/> Dem Vote %:" + xValue(d) 
                        + "<br/> Rep Votes: " + republicanValues(d) )
                          .style("left", (d3.event.pageX + 5) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function(d) {
                        tooltip.transition()
                          .duration(500)
                          .style("opacity", 0);
                      });

                  }
        }
        function displayConsistentAdvantageResultDescription(){
                   //displays the test result description based on the overall winner of the state as well as the chosen state and year combination 
                  if(democratWonState==1){
                    document.getElementById("consistentAdvantageAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with an average of "+ republicanMean+ "% percent of the vote, and Democrats won their districts with an average of "+ mean+ "% percent of the vote. The median for the Democrats was "+ median+"%. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Democrats. <br><br>";
                  }
                  if(republicanWonState==1){
                    document.getElementById("consistentAdvantageAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with an average of "+ republicanMean+ "% percent of the vote, and Democrats won their districts with an average of "+ mean+ "% percent of the vote. The median for the Democrats was "+ median+"%. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Republicans. <br><br>";
                  }  
        }