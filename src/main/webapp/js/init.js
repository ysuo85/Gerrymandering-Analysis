// google map variables
const setting = {
    countryZoom: 2,
    stateZoom: 5,
    districtZoom: 6,
    defaultYear: 2016,
    strokeDefault: 2,
    strokeHovered: 4
};

var map;
var searchBox;
var input;
var places;
var init = true;
var selectStateElement;
var selectYearElement;

//loading data from user selection variables
var selectedState = null;
var selectedDistrict = null;
var selectedYear = setting.defaultYear;
var selectedPair;
//district data variable
var districtVoteSum;
var districtNum;
// lopsided wins variables
var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 550 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// setup x
var xValue = function (d) {
        return d["Dem Vote %"];
    }, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function (d) {
        return xScale(xValue(d));
    }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function (e) {
        return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    }, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function (d) {
        return yScale(yValue(d));
    }, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
var democratVotesMean = 0;
var democratVotesSum = 0;
var republicanVotesMean = 0;
var republicanVotesSum = 0;
var median = 0;
//set up values for Republican Won districts
var republicanValues = function (e) {
    return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
}
// setup fill color
var cValue = function (d) {
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
var democratWonState = 0;
var republicanWonState = 0;
var winnerArray;
var demDistrictCount = 0;
var repDistrictCount = 0;
var filteredData;
//consistent advantage varibales
var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// setup x
var xValue = function (d) {
        return d["Dem Vote %"];
    }, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function (d) {
        return xScale(xValue(d));
    }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
// setup y
var yValue = function (e) {
        return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    }, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function (d) {
        return yScale(yValue(d));
    }, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
//set up values for Republican Won districts
var republicanValues = function (e) {
    return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
}
// setup fill color
var c = ["#E41A1C", "#377EB8"];
// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
var mean = 0;
var republicanMean = 0;
var median = 0;
var sum = 0;
var republicanSum = 0;
var counter;
var demVotePercentage;
var democratWonState = 0;
var republicanWonState = 0;
var demVotesArray;
var repVotesArray;
var usedToWinDemVotes;
var wastedDemVotes;
var usedToWinRepVotes;
var wastedRepVotes;
var demDistrictCount = 0;
var repDistrictCount = 0;
var winnerArray;

//efficiency gap variables
var counter;
var demVotePercentage;
var democratWonState = 0;
var republicanWonState = 0;
var demVotesArray;
var repVotesArray;
var usedToWinDemVotes;
var wastedDemVotes;
var usedToWinRepVotes;
var wastedRepVotes;
var demDistrictCount = 0;
var repDistrictCount = 0;
var winnerArray;
var margin2 = {
        top2: (10),
        right2: (parseInt(d3.select('body').style('width'), 10) / 20),
        bottom2: (parseInt(d3.select('body').style('width'), 10) / 5),
        left2: (parseInt(d3.select('body').style('width'), 10) / 20)
    },
    width2 = parseInt(d3.select('body').style('width'), 10) - margin2.left2 - margin2.right2,
    width3 = width2 / 3;
height2 = parseInt(d3.select('body').style('height'), 10) - margin2.top2 - margin2.bottom2,
    height3 = height2 / 1.5;
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

function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.541291, lng: -99.896488},
        zoom: setting.countryZoom,
        mapTypeId: 'roadmap'
    });
    $.ajax({
        type: 'GET',
        url: '/loadMap',
        dataType: "json",
        success: function(data){
            console.log(data);
            if(data.success === true){
                geojson = data.response.json;
                map.data.addGeoJson(geojson);
                resetStyle();
                enableStateSelect();
                enableHover();
            }
        },
        error: function(data){
            console.log('Please refresh the page and try again')
        }
    });
}

/* functions for all respective handlers*/
function resetStyle() {
    /**
     * Make Polygon at center of map red and make everything else grey.
     *
     * containsLocation() from the Google Maps API Geometry Library is the key function here
     * but it only accepts a Latlng and a Polygon
     *
     * Since after the user searches for a state, the map centers on it, that state will contain
     * the center of the map (map.getCenter(), which returns a Latlng)
     * Possible exception is Hawaii
     *
     * To obtain a Polygon from a feature:
     * First obtain Geometry with feature.getGeometry()
     * Then if Geometry is Polygon (not MultiPolygon), the Polygon will be in
     * feature.getGeometry().getAt(0).getArray();
     * Open issue: how to handle features with MultiPolygon geometry
     * console.log(feature.getGeometry()) is your friend, should reveal solution
     * The Google Maps API Reference Documentation contains useful information not in the Guides
     **/
    map.data.setStyle(function (feature) {
        var fillColor = null;
        var strokeColor = 'grey';
        if(feature.getProperty('ElectedParty') === "Democrat"){
            fillColor = 'blue';
        }
        else if(feature.getProperty('ElectedParty') === "Republican"){
            fillColor = 'red';
        }
        if(feature.getProperty('StateName') === "Alaska"){
            console.log("Latitude: " + feature.getProperty('CenterY'));
            console.log("Longitude: " + feature.getProperty('CenterX'));
        }
        return ({
            /** @type {google.maps.Data.StyleOptions} */
            clickable: true,
            fillColor: fillColor,
            strokeColor: strokeColor,
            strokeWeight: setting.strokeDefault,
            zIndex: setting.countryZoom
        });
    });
}

function enableHover(){
    map.data.addListener('mouseover', function(event){
        map.data.overrideStyle(event.feature, {strokeWeight: setting.strokeHovered});
    });

    map.data.addListener('mouseout', function(event){
        map.data.overrideStyle(event.feature, {strokeWeight: setting.strokeDefault});
    });
}

function enableStateSelect() {
    map.data.addListener('click', function (event) {
        var feature = event.feature;
        var stateName = feature.getProperty('StateName');
        var voteSums = {
            votes: feature.getProperty('Votes'),
            totalVotes: feature.getProperty('TotalVotes'),
            percentVotes: feature.getProperty('PercentVotes')
        };

        if (stateName
            && (selectedState != null
            && feature.getProperty('StateId') != selectedState.features[0].getProperty('StateId'))
            || selectedState == null) {
            center = {lat: feature.getProperty('CenterY'), lng: feature.getProperty('CenterX')};
            loadStateJson(stateName, selectedYear, function(response){
                if (response.success === true) {
                    renderState(stateName, response.response.json, center);
                    displayStateWithDescription(stateName);
                    displayVoteSums(voteSums);
                }
            });
        }
    });

    map.data.addListener('addfeature', function(event){
        var feature = event.feature;
        map.data.overrideStyle(feature, {zIndex: setting.districtZoom});
    });
}

function enableDistrictSelect(selected) {
    var features = selected.features;
    return map.data.addListener('click', function(event){
        features.some(feature => {
            if(feature.getProperty('DistrictNo') === event.feature.getProperty('DistrictNo')){
                var center = {lat: event.feature.getProperty('CenterY'), lng: event.feature.getProperty('CenterX')};
                var voteSums = {
                    votes: feature.getProperty('Votes'),
                    totalVotes: feature.getProperty('TotalVotes'),
                    percentVotes: feature.getProperty('PercentVotes')
                };
                renderDistrict(center, feature);
                displayVoteSums(voteSums);
            }
        });
    });
}

function renderState(stateName, stateJson, center) {
    map.setCenter(center);
    map.setZoom(setting.stateZoom);

    if(selectedState != null){
        selectedState.features.forEach(feature => {map.data.remove(feature)});
        selectedState.listener.remove();
    }
    selectedState = {name: stateName, features: map.data.addGeoJson(stateJson)};
    selectedState.listener = enableDistrictSelect(selectedState);
    dynamicZoom(selectedState.features);
}

function renderDistrict(center, feature){
    map.setCenter(center);
    dynamicZoom([feature]);
}

function dynamicZoom(features){
    var bounds = new google.maps.LatLngBounds();
    features.forEach(feature => {
        var g = feature.getGeometry();
        g.forEachLatLng(point => {
            bounds.extend(point);
        });
    });
    map.fitBounds(bounds);
}


function loadStateJson(stateName, year, callback){
    $.ajax({
        type: 'GET',
        url: "/loadState?stateName=" + stateName + "&year=" + year,
        dataType: "json",
        success: callback
    });
}

function loadDistrictJson(stateName, districtNo, year, callback){
    $.ajax({
        type: 'GET',
        url: "/loadDistrict?stateName=" + stateName + "&districtNo=" + districtNo + "&year=" + year,
        dataType: "json",
        success: callback
    });
}

function selectStateByDropDown(element) {
    var stateName = element.options[element.selectedIndex].text;
    var center = null;
    var voteSums = null;
    map.data.forEach(feature => {
        if(feature.getProperty('StateName') === stateName){
            center = {lat: feature.getProperty('CenterY'), lng: feature.getProperty('CenterX')};
            voteSums = {
                votes: feature.getProperty('Votes'),
                totalVotes: feature.getProperty('TotalVotes'),
                percentVotes: feature.getProperty('PercentVotes')
            };
        }
    });
    loadStateJson(stateName, selectedYear, function(response){
        if(response.success === true){
            renderState(stateName, response.response.json, center);
            displayStateWithDescription(stateName);
            displayVoteSums(voteSums);
        }
    });
    d3.json("/resources/js/test.json", function (filteredData) {
        //get specific rows from data that pertain to the user's selection
        filteredData = filteredData.filter(function (row) {
            return row['State'] == selectedPair[0][1] && row['raceYear'] == selectedPair[1][1];
        });
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
        displayLopsidedTestResults(filteredData, svg1);
        displayConsistentAdvantageTestResults(filteredData, svg);
        displayEfficiencyGapTestResults(filteredData, svg2);
    });
}

function selectYearByDropDown(element) {
    var newYear = element.options[element.selectedIndex].text;
    if(newYear != selectedYear){
        selectedYear = newYear;
        map.data.forEach(feature => {
            map.data.remove(feature);
        });
        $.ajax({
            type: 'GET',
            url: '/loadMap',
            dataType: "json",
            success: function(data){
                if(data.success === true){
                    geojson = data.response.json;
                    map.data.addGeoJson(geojson);
                    map.setZoom(setting.countryZoom);
                    resetStyle();
                    enableStateSelect();
                    enableHover();
                }
            },
            error: function(data){
                console.log('Please refresh the page and try again')
            }
        });
    }
}

function displayStateWithDescription(stateName) {
    console.log(stateName === "North Carolina");
    if (stateName === "New York") {
        document.getElementById("selection").innerHTML = "State Chosen for " + stateName + ":" +
            "<p><br/>New York, one of the 13 original colonies, joined the Union in July 1788. However, the state did not choose electors in the first election due to an internal dispute. In the 1810 Census, New York became the nation’s most populous state, and had the most electoral votes from the 1812 election until the 1972 election, when it relinquished that distinction to California. <br><br>Like many other Northeastern states, New York’s electoral clout has diminished in recent years. In fact it has lost 2 or more electoral votes after the last 7 Censuses. Texas surpassed New York in electoral votes in 2004, and Florida will almost certainly do so after the next Census. New York has been primarily a “blue” state ever since the Great Depression, only siding with a losing Republican when it chose its then-current governor Thomas E. Dewey over Harry S. Truman in 1948. In 2016, Hillary Clinton easily defeated Donald Trump by 22% in the state.<br></p>";
    }
    else if (stateName === "North Carolina") {
        document.getElementById("selection").innerHTML = "State Chosen for " + stateName + ":" +
            "<p><br/>North Carolina, one of the original 13 colonies, entered the Union in November 1789. The state did not participate in the 1864 election due to secession. Like many other southern states, North Carolina voted almost exclusively Democratic from 1876 through 1964 and almost exclusively Republican beginning in 1968. The initial shift was largely in response to white conservative voter uneasiness with the civil rights legislation passed in the mid-1960s, which was effectively exploited by the Republicans “southern strategy.”<br><br>In 2008, Barack Obama reversed the trend of Republican dominance here (although just barely), defeating John McCain by about 14,000 votes out of 4.3 million cast (49.7% to 49.4%). In percentage terms, it was the 2nd closest race of the 2008 election (behind Missouri). In 2012, North Carolina was again the 2nd closest race (this time behind Florida) as the state flipped Republican. Mitt Romney beat Obama by about 2%. Donald Trump won the state by 3.6% over Hillary Clinton in 2016. Based on population projections,                the state may gain an additional electoral vote after the 2020 presidential election. <br></p>";
    }
    else if (stateName === "Virginia") {
        document.getElementById("selection").innerHTML = "State Chosen for " + stateName + ":" +
            "<p><br/>Virginia, one of the original 13 colonies and birthplace of four of the first five U.S. presidents, joined the Union in June 1788. In 1792, Virginia controlled 15.9% of all electoral votes, the largest concentration in U.S. history. The Commonwealth did not participate in the 1864 and 1868 elections due to secession. From the post-Civil War Reconstruction period through 1948, Virginians almost always sided with the Democratic Party in elections. However, from 1952 through 2004, Virginia was reliably Republican (except for the landslide of Lyndon Johnson over Barry Goldwater in 1964). What changed? In the early 1950s, Virginia politics was controlled by Democratic Senator Harry F. Byrd, Sr., and his political machine. For the 1952 cycle, Byrd announced he would not be endorsing a candidate, saying “Silence is Golden.” People knew this meant that it would be okay to vote for the Republican Dwight Eisenhower. <br><br>Shifting demographics, including more rapid population growth around Washington D.C., have made the state a battleground in recent elections, perhaps one that now leans Democratic again. Barack Obama won here twice and Hillary Clinton made it three in a row for Democrats, winning by about 5.5% over Donald Trump in 2016.<br></p>";
    }
}

function displayVoteSums(voteSums) {
    document.getElementById("totalVotes").innerHTML = "Democratic Votes: " + voteSums.votes["Democrat"]
        + "  |   Republican Votes: " + voteSums.votes["Republican"];
}

//Start of Lopsided Wins Methods
function displayLopsidedTestResults(data, svg1) {
    calculateLopsidedWinsMean_Median(data);
    findLopsidedWinsStateWinner(data);
    assignLopsidedWinsScales(data);
    appendLopsidedWinsXAxis(svg1);
    appendLopsidedWinsYAxis(svg1);
    appendLopsidedWinsCircles(data, svg1);
    indicateLopsidedWinsDistrictWinners(svg1);
    displayLopsidedWinsResultDescription();
}

function calculateLopsidedWinsMean_Median(data) {
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
    democratVotesSum = democratVotesArray.reduce(function (total, amount) {
        return total + amount;
    }, 0);
    democratVotesMean = democratVotesSum / democratVotesArray.length;
    //repeat finding the mean and median for the republicans
    republicanVotesArray = data.map((e) => {
        return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
    });
    republicanVotesSum = republicanVotesArray.reduce(function (total, amount) {
        return total + amount;
    }, 0);
    republicanVotesMean = republicanVotesSum / republicanVotesArray.length;
    //A sorted list is needed before locating the median
    demVotePercentage.sort();
    if (demVotePercentage.length % 2 == 0) {
        var elementA = (demVotePercentage.length / 2) - 1;
        var elementB = elementA + 1;
        var elementSum = demVotePercentage[elementA] + demVotePercentage[elementB];
        median = elementSum / 2;
    } else {
        var element = parseInt(demVotePercentage.length / 2);
        median = demVotePercentage[element];
    }
    console.log("democratVotesMean: " + democratVotesMean);
    console.log("median: " + median);
    console.log("republicanVotesMean" + republicanVotesMean);
}

function findLopsidedWinsStateWinner(data) {
    //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
    winnerArray = data.map((e) => {
        return e['Winner'];
    });
    for (var k = 0; k < winnerArray.length; k++) {
        if (winnerArray[k] == "D") {
            demDistrictCount = demDistrictCount + 1;
        }
        else if (winnerArray[k] == "R") {
            repDistrictCount = repDistrictCount + 1;
        }
    }
    if (demDistrictCount > repDistrictCount) {
        democratWonState = 1;
    }
    else if (demDistrictCount < repDistrictCount) {
        republicanWonState = 1;
    }
    console.log("demDistrictCount: " + demDistrictCount);
    console.log("repDistrictCount: " + repDistrictCount);
    console.log("democratWonState: " + democratWonState);
    console.log("republicanWonState" + republicanWonState);
}
function assignLopsidedWinsScales(data) {
    console.log("data passed into assignLopsidedWinsScales method:" + data);
    xScale.domain([0, d3.max(data, xValue) + 0.2]);
    console.log("yValue: " + yValue);
    yScale.domain([0, d3.max(data, yValue)]);
}
function appendLopsidedWinsXAxis(svg1) {
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
function appendLopsidedWinsYAxis(svg1) {
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
function appendLopsidedWinsCircles(data, svg1) {
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
        .style("fill", function (d) {
            return color(cValue(d));
        })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("District:" + d["AreaNumber"] + "<br/>Dem Vote %:" + xValue(d)
                + "<br/> Dem Votes: " + yValue(d) + "<br/> Rep Votes:" + republicanValues(d))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}
function indicateLopsidedWinsDistrictWinners(svg1) {
    // draw legend colored rectangles to identify which party won which district
    var legend = svg1.selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
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
        .text(function (d) {
            return d;
        });
}
function displayLopsidedWinsResultDescription() {
    //displays the test result description based on the overall winner of the state as well as the chosen state and year combination
    if (democratWonState == 1) {
        document.getElementById("lopsidedWinsAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with an average of " + republicanVotesMean + " votes, and Democrats won their districts with an average of " + democratVotesMean + " votes. The median for the Democrat vote percentage was " + median + "%. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Democrats. <br><br>";
    }
    if (republicanWonState == 1) {
        document.getElementById("lopsidedWinsAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with an average of " + republicanVotesMean + " votes, and Democrats won their districts with an average of " + democratVotesMean + " votes. The median for the Democrat vote percentage was " + median + "%. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Republicans. <br><br>";
    }
}

//Start of Consistent Advantage Methods
function displayConsistentAdvantageTestResults(data, svg) {
    calculateConsistentAdvantageMean_Median(data);
    initConsistentAdvantageSVGContainer(data, svg);
    findConsistentAdvantageStateWinner(data);
    democratWinsConsistentAdvantageSVG(data, svg);
    republicanWinsConsistentAdvantageSVG(data, svg);
    displayConsistentAdvantageResultDescription();
}

function calculateConsistentAdvantageMean_Median(data) {
    //returns an array of the "Dem Vote % " values
    demVotePercentage = data.map((e) => {
        return e['Dem Vote %'];
    });
    console.log("data" + data);
    //calculates the sum of all the elements in the array
    sum = demVotePercentage.reduce(function (total, amount) {
        return total + amount;
    }, 0);
    mean = sum / demVotePercentage.length;
    var difference;
    for (var i = 0; i < demVotePercentage.length; i++) {
        difference = 1 - demVotePercentage[i];
        republicanSum = republicanSum + difference;
    }
    republicanMean = republicanSum / demVotePercentage.length;
    //A sorted list is needed before locating the median
    demVotePercentage.sort();
    if (demVotePercentage.length % 2 == 0) {
        var elementA = (demVotePercentage.length / 2) - 1;
        var elementB = elementA + 1;
        var elementSum = demVotePercentage[elementA] + demVotePercentage[elementB];
        median = elementSum / 2;
    } else {
        var element = parseInt(demVotePercentage.length / 2);
        median = demVotePercentage[element];
    }
}

function initConsistentAdvantageSVGContainer(data, svg) {
    //remove the chart that was previously rendered and replace it with

    //retrieve the column that only holds the "Dem Vote %" values of each row related to the chosen state
    //returns an array of the "Dem Vote % " values
    demVotePercentage = data.map((e) => {
        return e['Dem Vote %'];
    });
    console.log("data" + data);
    xScale.domain([0, d3.max(data, xValue) + 0.2]);
    yScale.domain([0, d3.max(data, yValue)]);
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

function findConsistentAdvantageStateWinner(data) {
    //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
    winnerArray = data.map((e) => {
        return e['Winner'];
    });
    for (var i = 0; i < winnerArray.length; i++) {
        if (winnerArray[i] == "D") {
            demDistrictCount = demDistrictCount + 1;
        } else if (winnerArray[i] == "R") {
            repDistrictCount = repDistrictCount + 1;
        }
    }
    console.log("demDistrictCount: " + demDistrictCount);
    console.log("repDistrictCount: " + repDistrictCount);
    if (demDistrictCount > repDistrictCount) {
        democratWonState = 1;
    } else if (demDistrictCount < repDistrictCount) {
        republicanWonState = 1;
    }
}

function democratWinsConsistentAdvantageSVG(data, svg) {
    if (democratWonState == 1) {
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) {
                return c[1];
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                if (d.Winner == "D") {
                    tooltip.html("District:" + d["AreaNumber"] + "<br/>Dem Vote %:" + xValue(d)
                        + "<br/> Dem Votes: " + yValue(d))
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (d.Winner == "R") {
                    tooltip.html("District:" + d["AreaNumber"] + "<br/> Dem Vote %:" + xValue(d)
                        + "<br/> Rep Votes: " + republicanValues(d))
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }
}

function republicanWinsConsistentAdvantageSVG(data, svg) {
    if (republicanWonState == 1) {
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) {
                return c[0];
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("District:" + d["AreaNumber"] + "<br/> Dem Vote %:" + xValue(d)
                    + "<br/> Rep Votes: " + republicanValues(d))
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }
}

function displayConsistentAdvantageResultDescription() {
    //displays the test result description based on the overall winner of the state as well as the chosen state and year combination
    if (democratWonState == 1) {
        document.getElementById("consistentAdvantageAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with an average of " + republicanMean + "% percent of the vote, and Democrats won their districts with an average of " + mean + "% percent of the vote. The median for the Democrats was " + median + "%. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Democrats. <br><br>";
    }
    if (republicanWonState == 1) {
        document.getElementById("consistentAdvantageAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with an average of " + republicanMean + "% percent of the vote, and Democrats won their districts with an average of " + mean + "% percent of the vote. The median for the Democrats was " + median + "%. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Republicans. <br><br>";
    }
}

//Start of Efficiency Gap Methods
function displayEfficiencyGapTestResults(data, svg2) {
    findEfficiencyGapStateWinner(data);
    setDataSetForEfficiencyGapChart();
    setEfficiencyGapChartDomains();
    appendEfficiencyGapAxis(svg2);
    initEfficiencyGapBarChart(svg2);
    colorEfficiencyGapByWastedVotes(svg2);
    displayEfficiencyGapResultDescription();
}

function findEfficiencyGapStateWinner(data) {
    //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
    winnerArray = data.map((e) => {
        return e['Winner'];
    });
    for (var i = 0; i < winnerArray.length; i++) {
        if (winnerArray[i] == "D") {
            demDistrictCount = demDistrictCount + 1;
        }
        else if (winnerArray[i] == "R") {
            repDistrictCount = repDistrictCount + 1;
        }
    }
    console.log("demDistrictCount:" + demDistrictCount);
    console.log("repDistrictCount:" + repDistrictCount);
    if (demDistrictCount > repDistrictCount) {
        democratWonState = 1;
    }
    else if (demDistrictCount < repDistrictCount) {
        republicanWonState = 1;
    }
}

function setDataSetForEfficiencyGapChart() {
    if (democratWonState == 1) {
        usedToWinDemVotes = demVoteSum;
        wastedDemVotes = demVoteSum / 2;
        usedToWinRepVotes = repVoteSum;
        wastedRepVotes = repVoteSum;
    }
    if (republicanWonState == 1) {
        usedToWinRepVotes = repVoteSum;
        wastedRepVotes = repVoteSum / 2;
        usedToWinDemVotes = demVoteSum;
        wastedDemVotes = demVoteSum;
    }
    dataset = [
        {label: "Total Votes", "Democrat": usedToWinDemVotes, "Republican": usedToWinRepVotes},
        {label: "Votes Wasted", "Democrat": wastedDemVotes, "Republican": wastedRepVotes}
    ];
    options = d3.keys(dataset[0]).filter(function (key) {
        return key !== "label";
    });
}

function setEfficiencyGapChartDomains() {
    var options = d3.keys(dataset[0]).filter(function (key) {
        return key !== "label";
    });
    dataset.forEach(function (d) {
        d.valores = options.map(function (name) {
            return {name: name, value: +d[name]};
        });
    });
    x_1.domain(dataset.map(function (d) {
        return d.label;
    }));
    x_2.domain(options).rangeRoundBands([0, x_1.rangeBand()]);
    y_1.domain([0, d3.max(dataset, function (d) {
        return d3.max(d.valores, function (d) {
            return d.value;
        });
    })]);
}

function appendEfficiencyGapAxis(svg2) {
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

function initEfficiencyGapBarChart(svg2) {
    // appends bars to chart while rendering each bars' color property through the
    // color2 function that chooses 2 colors for the 2 respective parties and the r value that holds
    // the radius of each circle
    var bar = svg2.selectAll(".bar")
        .data(dataset)
        .enter().append("g")
        .attr("class", "rect")
        .attr("transform", function (d) {
            return "translate(" + x_1(d.label) + ",0)";
        });
    bar.selectAll("rect")
        .data(function (d) {
            return d.valores;
        })
        .enter().append("rect")
        .attr("width", x_2.rangeBand())
        .attr("x", function (d) {
            return x_2(d.name);
        })
        .attr("y", function (d) {
            return y_1(d.value);
        })
        .attr("value", function (d) {
            return d.name;
        })
        .attr("height", function (d) {
            return height2 - y_1(d.value);
        })
        .style("fill", function (d) {
            return color2(d.name);
        });
}

function colorEfficiencyGapByWastedVotes(svg2) {
    // draw legend colored rectangles to identify which party wasted the displayed votes
    var legend2 = svg2.selectAll(".legend")
        .data(options.slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
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
        .text(function (d) {
            return d;
        });
}

function displayEfficiencyGapResultDescription() {
    //displays the test result description based on the overall winner of the state as well as the chosen state and year combination
    if (democratWonState == 1) {
        document.getElementById("efficiencyGapAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with " + usedToWinRepVotes + " votes, and Democrats won their districts with " + usedToWinDemVotes + " votes. The Republicans unfortunately lost and therefore wasted all of their votes, while the Democrats wasted " + wastedDemVotes + " due to their win. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Democrats. <br><br>";
    }
    if (republicanWonState == 1) {
        document.getElementById("efficiencyGapAnalysis").innerHTML = "In " + selectedPair[0][1] + "'s " + selectedPair[1][1] + " election, Republicans won their districts with " + usedToWinRepVotes + " votes, and Democrats won their districts with " + usedToWinDemVotes + " votes.  The Democrats unfortunately lost and therefore wasted all of their votes, while the Republicans wasted " + wastedRepVotes + " due to their win. The difference between the two parties’ win margins indicates " + selectedPair[0][1] + " may be gerrymandered to gain an advantage for Republicans. <br><br>";
    }
}

//Additional functionality
function selectStateBySearchState(markers) {
    console.log("markers:" + markers);
    var counter = 0;
    var feature;
    var loopStop = false;

    if (!markers[0].title.includes("New York") && !markers[0].title.includes("NY") && !markers[0].title.includes("North Carolina") && !markers[0].title.includes("NC") &&
        !markers[0].title.includes("Virginia") && !markers[0].title.includes("VA")) {
        return;
    }
    else {
        var iteratorAsString;
        console.log("title:" + markers[0].title);
        if (markers[0].title.includes("NY") || markers[0].title.includes("New York")) {
            selectedState = "New York";
            iteratorAsString = "0";
            markerTitle1 = selectedState;
        }
        else if (markers[0].title.includes("VA") || markers[0].title.includes("Virginia")) {
            selectedState = "Virginia";
            iteratorAsString = "2";
            markerTitle2 = selectedState;
        }
        else if (markers[0].title.includes("NC") || markers[0].title.includes("North Carolina")) {
            selectedState = "North Carolina";
            iteratorAsString = "1";
            markerTitle3 = selectedState;
        }
        console.log("selectedState after search with searchbox:" + selectedState);
        selectStateElement = document.getElementById('box1');
        console.log("iteratorAsString after search:" + iteratorAsString);
        selectStateElement.selectedIndex = iteratorAsString;
        selectYearElement = document.getElementById('box2');
        selectYearByDropDown(selectYearElement);//start tests on clicked state
    }
}

google.maps.event.addDomListener(window, 'load', initMap);





       