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
//var searchGeocoder;
var input;
var selectStateElement;
var selectYearElement;
var areaInfoWindow;
//loading data from user selection variables
var selectedState = null;
var selectedDistrict = null;
var selectedYear = setting.defaultYear;
var selectStateElement;
var selectYearElement;
//var areaInfoWindow;
//loading data from user selection variables
var selectedState;
var selectedYear;

function initializeMap() { 
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 38.541291, lng: -99.896488},
        zoom: setting.countryZoom,
		mapTypeId: 'roadmap'
	});

    $.getJSON('/loadMap?year=' + selectedYear, function(data){
        if(data.success === true) {
            geojson = data.response.json;
            map.data.addGeoJson(geojson);
            resetStyle();
            enableStateSelect();
            enableHover();
        }
    });

    $.getJSON('/allYears', function(data){
        if(data.success === true) {
            initYearDropdown(data.response);
        }
    });

    $.getJSON('/allStates', function(data){
        if(data.success === true) {
            initStatesDropdown(data.response);
        }
    });

    resetStyle();
}

function initSearchbox(){
	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	searchBox = new google.maps.places.SearchBox(input);
	/*
	searchGeocoder = new google.maps.Geocoder();
	searchBox.addListener('places_changed', function() {
		searchStateByZipCode(searchGeocoder,map);
	});	
	*/
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);	

	addBoundsChangedListener(map, searchBox);
	addPlacesChangedListener(map, searchBox);
	
	// WHat is this?
	/*function changeMap(city){
		var c = coords[city].split(',');
		map.setCenter(new google.maps.LatLng(c[0],c[1]));
	}	*/
	
	
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
                    startSuperDistrictBuild(stateName, response.response.json, center);
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
            }
        });
    });
}

function startSuperDistrictBuild(stateName, stateJson, center){
    map.setCenter(center);

    if(selectedState != null){
        selectedState.features.forEach(feature => {map.data.remove(feature)});
        selectedState.listener.remove();
    }
    selectedState = {name: stateName, features: map.data.addGeoJson(stateJson)};
    selectedState.features.forEach(feature => {
        map.data.overrideStyle(feature, {fillColor: 'grey', strokeColor: 'black', fillOpacity: 1.0, strokeOpacity: 1.0});
    });
    selectedState.listener = addToSuperDistrictListener(map, selectedState);
    dynamicZoom(selectedState.features);
}

function renderState(stateName, stateJson, center) {
    map.setCenter(center);

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

function initYearDropdown(allYearsJson){
    allYearsJson.forEach((year, index) => {
        $('#box2').append(
            $('<option>', {
                value: index,
                text: year
            })
        );
    });
}

function initStatesDropdown(allStatesJson){
    allStatesJson.forEach((state, index) => {
        $('#box1').append(
            $('<option>', {
                value: index,
                text: state
            })
        );
    });
}

function selectStateByDropDown(element) {
    var stateName = element.options[element.selectedIndex].text;
    processStateByName(stateName);
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
            url: '/loadMap?year=' + selectedYear,
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

function processStateByName(stateName){
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
/* requires google geocoder api that sends request through http request and processes
    	the request in a call back function due to asynchronous request 

    function searchStateByZipCode(searchGeocoder, resultsMap){
    	
    	var searchInput = document.getElementById('pac-input').value;
    	searchGeocoder.geocode( { 'address': searchInput}, function(results, status) {
    		console.log("geocode search status code:"+status);
      		if (status == 'OK') {
        		map.setCenter(results[0].geometry.location);//returns latlng object in http response
        		var latLng = new google.maps.LatLng(results[0].geometry.location.lat,results[0].geometry.location.lng);        		
           		map.data.forEach(function (feature) {
    				var geom = feature.getGeometry();
					if(geom.getType() == "Polygon") {
						var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
						polygonContainsLocation(latLng,poly,feature);			
					}
					else if(geom.getType()=="MultiPolygon"){
						var polygonArray = geom.getArray();
						var retrievedPolygon;
						for(var i =0; i <polygonArray.length;i++){
							retrievedPolygon=polygonArray[i];
							polygonContainsLocation(latLng,retrievedPolygon,feature);							
						}
					}
    			});
      		} else {
        		alert('Geocode was not successful for the following reason: ' + status);
      		}
    	});

    }
   
  function polygonContainsLocation(latLng,poly,feature){
  	if(google.maps.geometry.poly.containsLocation(latLng, poly)) { 
		//color = 'green'; // If feature contains center of map, highlight it
		map.zoom(7);
		var searchedZipCodeState = feature.getProperty('STATEFP');
		var searchedZipCodeDistrict = feature.getProperty('CD115FP');
		var contentString,districtDemVotes=0,districtRepVotes=0;
		var demVotesArray = data.map((e) => {
     	   return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    	});            
    	//repeat finding the sum for the republicans
    	var repVotesArray = data.map((e) => {
      	    return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
    	});
    	if (areaInfoWindow) {
        	areaInfoWindow.close();
    	}
    	var districtDemVotes = demVotesArray[searchedZipCodeDistrict-1];
    	var districtRepVotes = repVotesArray[searchedZipCodeDistrict-1];
      	var contentString = "District Number:"+searchedZipCodeDistrict+'<br/>'+"DemVotes: "+districtDemVotes+"<br/>"+"RepVotes: "+districtRepVotes;
		areaInfoWindow = new google.maps.InfoWindow({
        	content: contentString ,
        	position: latLng
    	});
    	areaInfoWindow.open(map);	
	}else{
		console.log("Did not check if lat long coordinates are in polygon");
	}
  }  

  */
    

google.maps.event.addDomListener(window, 'load', initMap);





       