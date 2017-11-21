// google map variables
var marker1;
var marker2;
var marker3;
var markerTitle1;
var markerTitle2;
var markerTitle3;
var map;
var searchBox;
var input;
var places;
var coords = {
    'NY': '43.385888,-75.436524',
    'VA': '37.992699,-78.292969',
    'NC': '35.814249,-80.709961'
};
var newYork = {lat: 43.385888, lng: -75.436524};
var virginia = {lat: 37.992699, lng: -78.292969};
var northCarolina = {lat: 35.814249, lng: -80.709961};
var init = true;
var markers = [];
var selectStateElement;
var selectYearElement;

//loading data from user selection variables
var selectedState;
var selectedYear;
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
        zoom: 4,
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
            }
        },
        error: function(data){
            console.log('Please refresh the page and try again')
        }
    });
    // marker1 = new google.maps.Marker({
    //     position: newYork,
    //     map: map,
    //     title: 'New York'
    // });
    // marker1.info = new google.maps.InfoWindow({
    //     content: "New York"
    // });
    // marker2 = new google.maps.Marker({
    //     position: virginia,
    //     map: map,
    //     title: 'Virginia'
    // });
    // marker2.info = new google.maps.InfoWindow({
    //     content: "Virginia"
    // });
    // marker3 = new google.maps.Marker({
    //     position: northCarolina,
    //     map: map,
    //     title: 'North Carolina'
    // });
    // marker3.info = new google.maps.InfoWindow({
    //     content: "North Carolina"
    // });
    // // Create the search box and link it to the UI element.
    // input = document.getElementById('pac-input');
    // searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // // Bias the SearchBox results towards current map's viewport.
    // map.addListener('bounds_changed', function () {
    //     if (init) {
    //         init = false;
    //         return;
    //     }
    //     boundsChangedHandler();
    // });
    // // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    // placesChangedHandler(places);
    //
    // function changeMap(city) {
    //     var c = coords[city].split(',');
    //     map.setCenter(new google.maps.LatLng(c[0], c[1]));
    // }
    //
    // map.data.setStyle(function (feature) {
    //     var color = 'blue';
    //     if (feature.getProperty('isColorful')) {
    //         color = feature.getProperty('color');
    //     }
    //     var geom = feature.getGeometry();
    //     if (geom.getType() == "Polygon") {
    //         var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
    //         if (google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) {
    //             color = 'red';
    //         }
    //     }
    //     return /** @type {google.maps.Data.StyleOptions} */({
    //         clickable: true,
    //         fillColor: color,
    //         strokeColor: color,
    //         strokeWeight: 2
    //     });
    // });
    //
    // colorDistrictClickHandler(event);
    // mouseOverHandler(event);
    // mouseOutHandler(event);
    // newYorkMarkerClickHandler(event);
    // loadNewYorkGeoJsonClickHandler(event);
    // virginiaMarkerClickHandler(event);
    // loadVirginiaGeoJsonClickHandler(event);
    // northCarolinaMarkerClickHandler(event);
    // loadNorthCarolinaGeoJsonClickHandler(event);
    // selectStateByMarker1Click();
    // selectStateByMarker2Click();
    // selectStateByMarker3Click();
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
        var color = 'grey'; // Make everything grey by default
        if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }
        var geom = feature.getGeometry();
        if (geom.getType() == "Polygon") {
            var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
            if (google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) {
                color = 'red'; // If feature contains center of map, highlight it
            }
        }
        //else if(multipolygon) {access polygon array}
        return ({
            /** @type {google.maps.Data.StyleOptions} */
            clickable: true,
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
    });
}

function colorDistrictClickHandler(event) {
    // When the user clicks, set 'isColorful', and change color of district.
    map.data.addListener('click', function (event) {
        console.log('map.data clicked');
        console.log(event.feature);
        event.feature.setProperty('isColorful', true);
    });
}

function boundsChangedHandler() {
    searchBox.setBounds(map.getBounds());
    resetStyle(); // Make the Polygon at the center of the map red and make everything else grey (see function resetStyle())
    map.data.revertStyle();
}

function placesChangedHandler(places) {
    searchBox.addListener('places_changed', function () {
        places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        selectStateBySearchState(markers);
    });
}

function mouseOverHandler(event) {
    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 4});
    });
}

function mouseOutHandler(event) {
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
    });
}

function loadNewYorkGeoJsonClickHandler(event) {
    marker1.addListener('click', function (event) {
        // Setup event handler to remove GeoJSON features
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
        //load geojson from data.js file to recreate the new map with New York's districts
        map.data.addGeoJson(data);
        map.data.addGeoJson(tempObject26);
        map.data.addGeoJson(tempObject27);
        map.data.addGeoJson(tempObject28);
        map.data.addGeoJson(tempObject29);
        map.data.addGeoJson(tempObject30);
        map.data.addGeoJson(tempObject31);
        map.data.addGeoJson(tempObject32);
        map.data.addGeoJson(tempObject33);
        map.data.addGeoJson(tempObject34);
        map.data.addGeoJson(tempObject35);
        map.data.addGeoJson(tempObject36);
        map.data.addGeoJson(tempObject37);
        map.data.addGeoJson(tempObject38);
        map.data.addGeoJson(tempObject39);
        map.data.addGeoJson(tempObject40);
        map.data.addGeoJson(tempObject41);
        map.data.addGeoJson(tempObject42);
        map.data.addGeoJson(tempObject43);
        map.data.addGeoJson(tempObject44);
        map.data.addGeoJson(tempObject45);
        map.data.addGeoJson(tempObject46);
        map.data.addGeoJson(tempObject47);
        map.data.addGeoJson(tempObject48);
        map.data.addGeoJson(tempObject49);
        map.data.addGeoJson(tempObject50);
        map.data.addGeoJson(tempObject51);
    });
}

function loadVirginiaGeoJsonClickHandler(event) {
    marker2.addListener('click', function (event) {
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
        map.data.addGeoJson(data);
        map.data.addGeoJson(tempObject15);
        map.data.addGeoJson(tempObject16);
        map.data.addGeoJson(tempObject17);
        map.data.addGeoJson(tempObject18);
        map.data.addGeoJson(tempObject19);
        map.data.addGeoJson(tempObject20);
        map.data.addGeoJson(tempObject21);
        map.data.addGeoJson(tempObject22);
        map.data.addGeoJson(tempObject23);
        map.data.addGeoJson(tempObject24);
        map.data.addGeoJson(tempObject25);
    });
}

function loadNorthCarolinaGeoJsonClickHandler(event) {
    // Setup event handler to remove GeoJSON features
    marker3.addListener('click', function (event) {
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
        map.data.addGeoJson(data);
        map.data.addGeoJson(tempObject2);
        map.data.addGeoJson(tempObject3);
        map.data.addGeoJson(tempObject4);
        map.data.addGeoJson(tempObject5);
        map.data.addGeoJson(tempObject6);
        map.data.addGeoJson(tempObject7);
        map.data.addGeoJson(tempObject8);
        map.data.addGeoJson(tempObject9);
        map.data.addGeoJson(tempObject10);
        map.data.addGeoJson(tempObject11);
        map.data.addGeoJson(tempObject12);
        map.data.addGeoJson(tempObject13);
        map.data.addGeoJson(tempObject14);
    });
}

function newYorkMarkerClickHandler(event) {
    marker1.addListener('click', function () {
        map.setZoom(6);
        map.setCenter(marker1.getPosition());
        markerTitle1 = this.getTitle();
        console.log("markerTitle1" + markerTitle1);
    });
}

function virginiaMarkerClickHandler(event) {
    marker2.addListener('click', function () {
        map.setZoom(6);
        map.setCenter(marker2.getPosition());
        markerTitle2 = this.getTitle();
        console.log("markerTitle2" + markerTitle2);
    });
}

function northCarolinaMarkerClickHandler(event) {
    marker3.addListener('click', function () {
        map.setZoom(6);
        map.setCenter(marker3.getPosition());
        markerTitle3 = this.getTitle();
        console.log("markerTitle3" + markerTitle3);
    });
}

function selectStateByMarker1Click() {
    //run tests on state that contains the marker that is clicked
    google.maps.event.addListener(marker1, 'click', function () {
        marker1.info.open(map, marker1);
        marker2.info.close();
        marker3.info.close();
        marker1 = this;
        selectStateElement = document.getElementById('box1');
        selectYearElement = document.getElementById('box2');
        console.log("selectStateElement:" + selectStateElement);
        var options = selectStateElement.options;
        console.log("options:" + options);
        var iteratorAsString;
        for (var option, i = 0; option = options[i]; i++) {
            console.log("option.value:" + option.value);
            if (option.text == this.title) {
                iteratorAsString = i.toString();
                selectStateElement.selectedIndex = iteratorAsString;
                selectedState = this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        }
    });
}

function selectStateByMarker2Click() {
    google.maps.event.addListener(marker2, 'click', function () {
        marker2.info.open(map, marker2);
        marker1.info.close();
        marker3.info.close();
        marker2 = this;
        selectStateElement = document.getElementById('box1');
        selectYearElement = document.getElementById('box2');
        console.log("selectStateElement:" + selectStateElement);
        var options = selectStateElement.options;
        console.log("options:" + options);
        var iteratorAsString;
        for (var option, i = 0; option = options[i]; i++) {
            console.log("option.value:" + option.value);
            if (option.text == this.title) {
                iteratorAsString = i.toString();
                selectStateElement.selectedIndex = iteratorAsString;
                selectedState = this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        }
    });
}

function selectStateByMarker3Click() {
    google.maps.event.addListener(marker3, 'click', function () {
        marker3.info.open(map, marker3);
        marker1.info.close();
        marker2.info.close();
        marker3 = this;
        selectStateElement = document.getElementById('box1');
        selectYearElement = document.getElementById('box2');
        console.log("selectStateElement:" + selectStateElement);
        var options = selectStateElement.options;
        console.log("options:" + options);
        var iteratorAsString;
        for (var option, i = 0; option = options[i]; i++) {
            console.log("option.value:" + option.value);
            if (option.text == this.title) {
                iteratorAsString = i.toString();
                selectStateElement.selectedIndex = iteratorAsString;
                selectedState = this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        }
    });
}

function selectStateByDropDown(element) {
    console.log("in selectStateByDropDown(element method)");
    selectedState = element.options[element.selectedIndex].text;
    console.log("selectedState" + selectedState);
}

function selectYearByDropDown(element) {
    d3.json("/resources/js/test.json", function (filteredData) {
        selectedYear = element.options[element.selectedIndex].text;
        selectedPair = [
            ["State", selectedState],
            ["raceYear", selectedYear]
        ];
        displayStateWithDescription(selectedState);
        //get specific rows from data that pertain to the user's selection
        filteredData = filteredData.filter(function (row) {
            return row['State'] == selectedPair[0][1] && row['raceYear'] == selectedPair[1][1];
        });
        displayVoteSums(filteredData);
        // remove old resulst and add the new graph canvas to the body of the webpage
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

function displayStateWithDescription(selectedState) {
    if (selectedState == "New York") {
        map.setZoom(6);
        map.setCenter(marker1.getPosition());
        marker1.info.open(map, marker1);
        marker2.info.close();
        marker3.info.close();
        console.log("markerTitle1" + markerTitle1);
        document.getElementById("selection").innerHTML = "State Chosen for " + selectedPair[1][1] + " : " + selectedPair[0][1] +
            "<p><br/>New York, one of the 13 original colonies, joined the Union in July 1788. However, the state did not choose electors in the first election due to an internal dispute. In the 1810 Census, New York became the nation’s most populous state, and had the most electoral votes from the 1812 election until the 1972 election, when it relinquished that distinction to California. <br><br>Like many other Northeastern states, New York’s electoral clout has diminished in recent years. In fact it has lost 2 or more electoral votes after the last 7 Censuses. Texas surpassed New York in electoral votes in 2004, and Florida will almost certainly do so after the next Census. New York has been primarily a “blue” state ever since the Great Depression, only siding with a losing Republican when it chose its then-current governor Thomas E. Dewey over Harry S. Truman in 1948. In 2016, Hillary Clinton easily defeated Donald Trump by 22% in the state.<br></p>";
    }
    else if (selectedState == "North Carolina") {
        map.setZoom(6);
        map.setCenter(marker3.getPosition());
        marker3.info.open(map, marker3);
        marker1.info.close();
        marker2.info.close();
        console.log("markerTitle3" + markerTitle3);
        document.getElementById("selection").innerHTML = "State Chosen for " + selectedPair[1][1] + " : " + selectedPair[0][1] +
            "<p><br/>North Carolina, one of the original 13 colonies, entered the Union in November 1789. The state did not participate in the 1864 election due to secession. Like many other southern states, North Carolina voted almost exclusively Democratic from 1876 through 1964 and almost exclusively Republican beginning in 1968. The initial shift was largely in response to white conservative voter uneasiness with the civil rights legislation passed in the mid-1960s, which was effectively exploited by the Republicans “southern strategy.”<br><br>In 2008, Barack Obama reversed the trend of Republican dominance here (although just barely), defeating John McCain by about 14,000 votes out of 4.3 million cast (49.7% to 49.4%). In percentage terms, it was the 2nd closest race of the 2008 election (behind Missouri). In 2012, North Carolina was again the 2nd closest race (this time behind Florida) as the state flipped Republican. Mitt Romney beat Obama by about 2%. Donald Trump won the state by 3.6% over Hillary Clinton in 2016. Based on population projections,                the state may gain an additional electoral vote after the 2020 presidential election. <br></p>";
    }
    else if (selectedState == "Virginia") {
        map.setZoom(6);
        map.setCenter(marker2.getPosition());
        marker2.info.open(map, marker2);
        marker1.info.close();
        marker3.info.close();
        console.log("markerTitle2" + markerTitle2);
        document.getElementById("selection").innerHTML = "State Chosen for " + selectedPair[1][1] + " : " + selectedPair[0][1] +
            "<p><br/>Virginia, one of the original 13 colonies and birthplace of four of the first five U.S. presidents, joined the Union in June 1788. In 1792, Virginia controlled 15.9% of all electoral votes, the largest concentration in U.S. history. The Commonwealth did not participate in the 1864 and 1868 elections due to secession. From the post-Civil War Reconstruction period through 1948, Virginians almost always sided with the Democratic Party in elections. However, from 1952 through 2004, Virginia was reliably Republican (except for the landslide of Lyndon Johnson over Barry Goldwater in 1964). What changed? In the early 1950s, Virginia politics was controlled by Democratic Senator Harry F. Byrd, Sr., and his political machine. For the 1952 cycle, Byrd announced he would not be endorsing a candidate, saying “Silence is Golden.” People knew this meant that it would be okay to vote for the Republican Dwight Eisenhower. <br><br>Shifting demographics, including more rapid population growth around Washington D.C., have made the state a battleground in recent elections, perhaps one that now leans Democratic again. Barack Obama won here twice and Hillary Clinton made it three in a row for Democrats, winning by about 5.5% over Donald Trump in 2016.<br></p>";
    }
}

function displayVoteSums(data) {
    //returns an array of the "DemVotes " values
    demVotesArray = data.map((e) => {
        return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    });
    //calculates the sum of all the elements in the array
    demVoteSum = demVotesArray.reduce(function (total, amount) {
        return total + amount;
    }, 0);
    //repeat finding the sum for the republicans
    repVotesArray = data.map((e) => {
        return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
    });
    repVoteSum = repVotesArray.reduce(function (total, amount) {
        return total + amount;
    }, 0);
    // add total votes for each party to the description for the state
    document.getElementById("totalVotes").innerHTML = "Democratic Votes: " + demVoteSum + "  |   Republican Votes: " + repVoteSum;
    //find overall winner of state through retrieving the values 'Winner' column in each row relevant to the chosen state
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





       