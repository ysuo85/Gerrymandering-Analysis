function main() {
  // This is a reimplementation of the Grouped Bar Chart by Mike Bostock
  // (http://bl.ocks.org/882152). Although useful, I found the original's
  // minimal comments and inverted axes hard to follow, so I created the
  // version you see here.

  // First, we define sizes and colours...
  var outerW = 640; // outer width
  var outerH = 480; // outer height
  var padding = { t: 0, r: 0, b: 0, l: 0 };
  var w = outerW - padding.l - padding.r; // inner width
  var h = outerH - padding.t - padding.b; // inner height
  var c = [ "#E41A1C", "#377EB8"];//, "#4DAF4A" ]; // ColorBrewer Set 1

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


  /*
  var data = d3.range(numberSeries).map(function () { return d3.range(numberGroups).map(Math.random); });
*/
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

  // Values scale, y axis
  /*
  var y = d3.scale.linear()
      .domain([0, 1]) // Because Math.random returns numbers between 0 and 1
      .range([0, h]);
      */
  var filters = [
  ['State', 'New York'],
    ['raceYear', '2012']
  ];

var demVotePercentage;
var democratWinState=0;
var republicanWinState=0;
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

d3.json("/resources/test.json", function(error, data) {
  if (error) throw error;
  data = data.filter(function(row) {

        return row['State'] == filters[0][1] && row['raceYear']==filters[1][1];
      
  });

  /* calculate the winner of the state*/
  demVotePercentage = data.map((e) => {return e['Dem Vote %'];}); 
   
  for(var i=0; i<demVotePercentage.length(); i++)
  {
    if(demVotePercentage[i]>=0.5)
    {
      demDistrictCount = demDistrictCount+1;
    }
    else
    {
      repDistrictCount = repDistrictCount+1;
    }
  }
  if(demDistrictCount>=(demVotePercentage.length()/2))
  {
    democratWinState=1;
  }
  else{
    republicanWinState=1;
  }
/* calculate total democratic votes and republican votes in the state for each party*/
    demVotesArray = data.map((e) => {return e['DemVotes'];});
    demVoteSum = demVotesArray.reduce(function(total,amount){

        return total + amount;
      });
    repVotesArray = data.map((e) => {return e['RepVotes'];});
    repVoteSum = repVotesArray.reduce(function(total,amount){

        return total + amount;
      });
  if(democratWinState==1)
  {
    usedToWinDemVotes = demVoteSum / 2;
    wastedDemVotes = demVoteSum - usedToWinDemVotes;
    usedToWinRepVotes = repVoteSum;
    wastedRepVotes = repVoteSum;
  }
  if(republicanWinState==1)
  {
    usedToWinRepVotes = repVoteSum / 2;
    wastedRepVotes = repVoteSum - usedToWinRepVotes;
    usedToWinDemVotes = demVoteSum;
    wastedDemVotes = demVoteSum;
  }

  var voteCounts = [
    [usedToWinDemVotes, wastedDemVotes],
    [usedToWinRepVotes, wastedRepVotes]
  ];

var transposedData = d3.transpose(voteCounts);
 
 //x0.domain(data.map(function(d) { return d.['Winner']; }));
  //x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  //y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

   var y = d3.scale.linear()
      .domain([0, 300000]) 
      .range([0, h]);
     

 // end added

  // Visualisation selection
  var vis = d3.select("#vis")
      .append("svg:svg")
      .attr("width", outerW)
      .attr("height", outerH);

  // Series selection
  // We place each series into its own SVG group element. In other words,
  // each SVG group element contains one series (i.e. bars of the same colour).
  // It might be helpful to think of each SVG group element as containing one bar chart.
  var series = vis.selectAll("g.series")
      //.data(data)
      .data(transposedData)
    .enter().append("svg:g")
      .attr("class", "series") // Not strictly necessary, but helpful when inspecting the DOM
      .attr("fill", function (d, i) { return c[i]; })
      .attr("transform", function (d, i) { return "translate(" + x1(i) + ")"; });

  // Groups selection
  var groups = series.selectAll("rect")
      .data(Object) // The second dimension in the two-dimensional data array
      .enter().append("svg:rect")
        .attr("x", 0)
        .attr("y", function (d) { return h - y(d); })
        .attr("width", x1.rangeBand())
        .attr("height", y)
        .attr("transform", function (d, i) { return "translate(" + x0(i) + ")"; });
  });
}
