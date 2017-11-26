var marker1;
var marker2;
var marker3;
var markerTitle1;
var markerTitle2;
var markerTitle3;
var map;
//var searchGeocoder;
var searchBox;
//var input;
//var places;
var coords={
		'NY': '43.385888,-75.436524',
		'VA':'37.992699,-78.292969',
		'NC':'35.814249,-80.709961'
};
var newYork = {lat: 43.385888, lng: -75.436524};
var virginia = {lat: 37.992699, lng: -78.292969};
var northCarolina = {lat: 35.814249, lng: -80.709961};
var markers = [];
var selectStateElement;
var selectYearElement;
//var areaInfoWindow;
//loading data from user selection variables
var selectedState;
var selectedYear;
var selectedPair;
var districtVoteSum;
var districtNum;

function initializeMap() { 
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 38.541291, lng: -99.896488},
		zoom: 3,
		mapTypeId: 'roadmap'
	});
	map.data.addGeoJson(data);	
	// TODO: instead of markers, listen for when user selects state (through click or search) 
	marker1 = new google.maps.Marker({
		position: newYork,
		map: map,
		title: 'New York'
	});
	marker1.info = new google.maps.InfoWindow({
  		content: "New York"
	});	
	marker2 = new google.maps.Marker({
		position: virginia,
		map: map,
		title: 'Virginia'
	});
	marker2.info = new google.maps.InfoWindow({
  		content: "Virginia"
	});
	marker3 = new google.maps.Marker({
		position: northCarolina,
		map: map,
		title: 'North Carolina'
	});
	marker3.info = new google.maps.InfoWindow({
  		content: "North Carolina"
	}); 
	initMapStyle(map);
	initSearchbox();
	/*start initial scenario that runs tests on "New York, 2016" as selected Pair*/
	selectStateElement = document.getElementById('box1');
    selectYearElement= document.getElementById('box2');
    selectStateElement.selectedIndex="0";
    selectedState="New York"; // state changes but year stays the same
    selectYearElement.selectedIndex="0";
    selectedYear="2016";
    selectYearByDropDown(selectYearElement);
    /*initiate google map functionality*/
	newYorkMarkerClickListener(map, marker1,markerTitle1);
    loadNewYorkGeoJsonClickListener(map, marker1);
    virginiaMarkerClickListener(map, marker2,markerTitle2);
    loadVirginiaGeoJsonClickListener(map, marker2);
    northCarolinaMarkerClickListener(map, marker3,markerTitle3);
    loadNorthCarolinaGeoJsonClickListener(map, marker3);
    mouseOverListener(map);
    mouseOutListener(map);

    //initializeWhatIfMap(selectedState,selectedYear,selectStateElement,selectYearElement);
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





       