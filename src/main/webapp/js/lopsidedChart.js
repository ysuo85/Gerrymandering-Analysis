// lopsided wins variables
var margin = {top: 20, right: 20, bottom: 30, left: 90},
            width = 550 - margin.left - margin.right,
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
            var democratVotesMean=0;
            var democratVotesSum=0;
            var republicanVotesMean=0;
            var republicanVotesSum=0;
            var median=0;
            //set up values for Republican Won districts
            var republicanValues = function(e) {
              return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes; 
            }            
            // setup fill color
            var cValue = function(d) {
             return d.Winner;
            },
            color = d3.scale.category10();
            // add the tooltip area to the webpage
            var tooltip = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);
            var counter;
            var demVotePercentage;
            var democratVotesArray;
            var republicanVotesArray;
            var democratWonState=0;
            var republicanWonState=0;
            var winnerArray;
            var demDistrictCount=0;
            var repDistrictCount=0;
            var filteredData;
function displayLopsidedTestResults(data,svg1){
    calculateLopsidedWinsMean_Median(data);
    findLopsidedWinsStateWinner(data);
    assignLopsidedWinsScales(data);
    appendLopsidedWinsXAxis(svg1);
    appendLopsidedWinsYAxis(svg1);
    appendLopsidedWinsCircles(data,svg1);
    indicateLopsidedWinsDistrictWinners(svg1);
    displayLopsidedWinsResultDescription();
}
function calculateLopsidedWinsMean_Median(data){
             //retrieve the column that only holds the "Dem Vote %" values of each row related to the chosen state
            //returns an array of the "Dem Vote % " values
            demVotePercentage = data.map((e) => {
              return e['Dem Vote %'];
            });
            //retrieve the column that only holds the "DemVotes" values of each row related to the chosen state
            //returns an array of the "DemVotes " values
            democratVotesArray = data.map((e) => {
              return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
            });
            //calculates the sum of all the elements in the array 
            democratVotesSum = democratVotesArray.reduce(function(total,amount){
              return total + amount;
            }, 0);
            democratVotesMean = democratVotesSum/ democratVotesArray.length;
            //repeat finding the mean and median for the republicans
            republicanVotesArray = data.map((e) => {
              return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
            });
            republicanVotesSum = republicanVotesArray.reduce(function(total,amount){
              return total + amount;
            }, 0);
            republicanVotesMean = republicanVotesSum/republicanVotesArray.length;
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
        function findLopsidedWinsStateWinner(data){
            //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
            winnerArray = data.map((e)=>{
              return e['Winner'];
            });
            for(var k=0; k<winnerArray.length; k++)
            {
                if(winnerArray[k]=="D")
                {
                   demDistrictCount = demDistrictCount+1;
                }
                else if(winnerArray[k]=="R")
                {
                    repDistrictCount = repDistrictCount+1;
                }
            }
            if(demDistrictCount>repDistrictCount)
            {
              democratWonState=1;
            }
            else if(demDistrictCount < repDistrictCount){
              republicanWonState=1;
            }
            console.log("demDistrictCount: " + demDistrictCount);
            console.log("repDistrictCount: " + repDistrictCount);
            console.log("democratWonState: " + democratWonState);
            console.log("republicanWonState"+republicanWonState);
        }
        function assignLopsidedWinsScales(data){
            xScale.domain([0, d3.max(data, xValue)+0.2]);
            yScale.domain([0, d3.max(data, yValue )]);
        }
        function appendLopsidedWinsXAxis(svg1){
            // x-axis appended to HTML "g" element with the specified text "Democrat Vote Percentage"
            svg1.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("Democrat Vote Percentage");
        }
        function appendLopsidedWinsYAxis(svg1){
            // y-axis appended to HTML "g" element with the specified text "Vote Shares"
            svg1.append("g")
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
        function appendLopsidedWinsCircles(data,svg1){
            // appends circles to chart while rendering each circle's color property through the
            // cValue function that chooses 2 colors for the 2 respective parties and the r value that holds
            // the radius of each circle
            svg1.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 3.5)
                .attr("cx", xMap)
                .attr("cy", yMap)
                .style("fill", function(d) { 
                  return color(cValue(d));
                }) 
                .on("mouseover", function(d) {
                  tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                  tooltip.html("District:"+d["AreaNumber"] + "<br/>Dem Vote %:" + xValue(d) 
                    + "<br/> Dem Votes: " + yValue(d)+"<br/> Rep Votes:"+republicanValues(d) )
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");  
                  })
                .on("mouseout", function(d) {
                  tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                });
        }
        function indicateLopsidedWinsDistrictWinners(svg1){
            // draw legend colored rectangles to identify which party won which district
            var legend = svg1.selectAll(".legend")
                .data(color.domain())
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                  return "translate(0," + i * 20 + ")";
                });
            
            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);
            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { 
                  return d;
                });
        }
        function displayLopsidedWinsResultDescription(){
            //displays the test result description based on the overall winner of the state as well as the chosen state and year combination
            if(democratWonState==1){
              document.getElementById("lopsidedWinsAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with an average of "+ republicanVotesMean+ " votes, and Democrats won their districts with an average of "+ democratVotesMean+ " votes. The median for the Democrat vote percentage was "+ median+"%. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Democrats. <br><br>";
            }if(republicanWonState==1){
              document.getElementById("lopsidedWinsAnalysis").innerHTML = "In "+selectedPair[0][1]+"'s "+selectedPair[1][1]+" election, Republicans won their districts with an average of "+ republicanVotesMean+ " votes, and Democrats won their districts with an average of "+ democratVotesMean+ " votes. The median for the Democrat vote percentage was "+ median+"%. The difference between the two parties’ win margins indicates "+selectedPair[0][1]+" may be gerrymandered to gain an advantage for Republicans. <br><br>";
            }
        }
