function main() {
  // This is a reimplementation of the Grouped Bar Chart by Mike Bostock
  // (http://bl.ocks.org/882152). Although useful, I found the original's
  // minimal comments and inverted axes hard to follow, so I created the
  // version you see here.

  // First, we define sizes and colours...
  var outerW = 540; // outer width
  var outerH = 400; // outer height
  var padding = { t: 0, r: 0, b: 0, l: 0 };
  var w = outerW - padding.l - padding.r; // inner width
  var h = outerH - padding.t - padding.b; // inner height
  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  var c = [  "#377EB8","#E41A1C"]; // Color Settings

  // Second, we define our data...
  // Create a two-dimensional array.
  // The first dimension has as many Array elements as there are series.
  // The second dimension has as many Number elements as there are groups.
  // It looks something like this...
  //  var data = [
  //    [ 0.10, 0.09, 0.08, 0.07, 0.06, ... ], // series 1
  //    [ 0.10, 0.09, 0.08, 0.07, 0.06, ... ], // series 2
  //    [ 0.10, 0.09, 0.08, 0.07, 0.06, ... ]  // series 3
  //  ];

  var numberGroups = 2; // groups
  var numberSeries = 2;  // series in each group


  
  // Third, we define our scales...
  // Groups scale, x axis
  
  var x0 = d3.scale.ordinal()
      .domain(d3.range(numberGroups))
      .rangeBands([0, w], 0.2);

  // Series scale, x axis
  // It might help to think of the series scale as a child of the groups scale

  var x1 = d3.scale.ordinal()
      .domain(d3.range(numberSeries))
      .rangeBands([0, x0.rangeBand()]);

  
  
var demVotePercentage;
var democratWonState=0;
var republicanWonState=0;
var demVoteSum;
var repVoteSum; 
var demVotesArray;
var repVotesArray;
var usedToWinDemVotes;
var wastedDemVotes;
var usedToWinRepVotes;
var wastedRepVotes;
var demDistrictCount=0;
var repDistrictCount=0;
var winnerArray;
var filters = [
  ['State', 'New York'],
  ['raceYear', '2012']
];

/* creation of zoom tour scatter plot*/

d3.json("/resources/js/test.json", function(data) {
  data = data.filter(function(row) {

        return row['State'] == filters[0][1] && row['raceYear']==filters[1][1];
      
  });


   
/* calculate total democratic votes and republican votes in the state for each party*/
    demVotesArray = data.map((e) => {
      return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    });
    demVoteSum = demVotesArray.reduce(function(total,amount){
        return total + amount;
    }, 0);
    repVotesArray = data.map((e) => {
      return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
    });
    repVoteSum = repVotesArray.reduce(function(total,amount){
        return total + amount;
    }, 0);
    winnerArray = data.map((e)=>{
      return e['Winner'];
    });


  for(var i=0; i<winnerArray.length; i++)
{
  if(winnerArray[i]=="D")
  {
    demDistrictCount = demDistrictCount+1;
  }
  else if(winnerArray[i]=="R")
  {
    repDistrictCount = repDistrictCount+1;
  }
}
console.log("demDistrictCount: " + demDistrictCount);
console.log("repDistrictCount: " + repDistrictCount);

  if(demDistrictCount>repDistrictCount)
  {
    democratWonState=1;
  }
  else if(demDistrictCount < repDistrictCount){
    republicanWonState=1;

  }
  if(democratWonState==1)
  {
    usedToWinDemVotes = demVoteSum;
    wastedDemVotes = demVoteSum/2;
    usedToWinRepVotes = repVoteSum;
    wastedRepVotes = repVoteSum;
  }
  if(republicanWonState==1)
  {
    usedToWinRepVotes = repVoteSum;
    wastedRepVotes = repVoteSum/2;
    usedToWinDemVotes = demVoteSum;
    wastedDemVotes = demVoteSum;
  }

  var voteCounts = [
    [usedToWinDemVotes, wastedDemVotes],
    [usedToWinRepVotes, wastedRepVotes]
  ];
  console.log("usedToWinDemVotes: " + usedToWinDemVotes);

  console.log("wastedDemVotes: " + wastedDemVotes);

  console.log("usedToWinRepVotes: " + usedToWinRepVotes);

  console.log("wastedRepVotes: " + wastedRepVotes);

  var voteCounts1DArray = [usedToWinDemVotes, usedToWinRepVotes, wastedDemVotes, wastedRepVotes];

  var y = d3.scale.linear()
      .domain([0, Math.max(usedToWinDemVotes, usedToWinRepVotes, wastedDemVotes, wastedRepVotes)]) 
      .range([0, h]);

  

  // Visualisation selection
  var vis = d3.select("#vis")
      .append("svg:svg")
      .attr("width", outerW)
      .attr("height", outerH);
  /* 

     Series selection
     We place each series into its own SVG group element. In other words,
     each SVG group element contains one series (i.e. bars of the same colour).
     It might be helpful to think of each SVG group element as containing one bar chart.

*/


  var series = vis.selectAll("g.series")
      .data(voteCounts)
      .enter().append("svg:g")
      .attr("class", "series") // Not strictly necessary, but helpful when inspecting the DOM
      .attr("fill", function (d, i) {
        return c[i];
      })
      .attr("transform", function (d, i) { 
        return "translate(" + x1(i) + ")"; 
      });

  // Groups selection
  var groups = series.selectAll("rect")
      .data(function(d) {return d;}) // The second dimension in the two-dimensional data array
      .enter().append("svg:rect")
      .attr("x", 20)
      .attr("y", function (d) {
           return h-y(d);
      })
      .attr("width", x1.rangeBand())
      .attr("height", y)
      .attr("transform", function (d, i) {
         return "translate(" + x0(i) + ")"; 
      });
//added
  
  var colorRange = d3.scale.category10();
  var color = d3.scale.ordinal()
    .range(colorRange.range());

//var color =  ["#377EB8","#E41A1C"];

  var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

//var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

vis.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

vis.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Vote Shares");


/*
groups.on("mousemove", function(d){
        divTooltip.style("left", d3.event.pageX+10+"px");
        divTooltip.style("top", d3.event.pageY-25+"px");
        divTooltip.style("display", "inline-block");
        var x = d3.event.pageX, y = d3.event.pageY
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l = l-1
        elementData = voteCounts
        divTooltip.html((d.label)+"<br>"+elementData.name+"<br>"+elementData.value+"%");
    });

groups.on("mouseout", function(d){
        divTooltip.style("display", "none");
    });
    */








var legend = series.selectAll(".legend")
    .data(voteCounts.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
     return "translate(0," + i * 20 + ")";
      });

legend.append("rect")
    .attr("x", w - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", w - 19)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { 
      return d;
       });

   

  });
}

