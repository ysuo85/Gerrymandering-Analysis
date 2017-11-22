function addBoundsChangedListener(map, searchBox) {
	map.addListener('bounds_changed', function() {
		boundsChangedHandler(map, searchBox);		
	});	
}
function boundsChangedHandler(map, searchBox){
	searchBox.setBounds(map.getBounds());
	resetStyle(); // Make the Polygon at the center of the map red and make everything else grey (see function resetStyle())
	map.data.revertStyle();
}

function addPlacesChangedListener(map, searchBox) {
	searchBox.addListener('places_changed', function() {
		placesChangedHandler(map, searchBox);	
	});
}
function placesChangedHandler(map, searchBox){
	//searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
		if(places.length == 0) {
			return;
		}
		// Clear out the old markers.
		markers.forEach(function(marker) {
				marker.setMap(null);
		});
		markers = [];
		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place){
			if (!place.geometry){
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
}
function newYorkMarkerClickListener(map, marker1,markerTitle1) {
	marker1.addListener('click', function() {
		newYorkMarkerClickHandler(map,marker1,markerTitle1);	
	});
}
function newYorkMarkerClickHandler(map,marker1,markerTitle1){
	map.setZoom(6);
    map.setCenter(marker1.getPosition());
    markerTitle1=marker1.getTitle();
}
function loadNewYorkGeoJsonClickListener(map, marker1) {
	marker1.addListener('click', function() {
		loadNewYorkGeoJsonClickHandler(map,marker1);	
	});
}
function loadNewYorkGeoJsonClickHandler(map,marker1){
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
  
}
function virginiaMarkerClickListener(map, marker2,markerTitle2) {
	marker2.addListener('click', function() {
		virginiaMarkerClickHandler(map,marker2,markerTitle2);	
	});
}
function virginiaMarkerClickHandler(map, marker2,markerTitle2){
	marker2.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker2.getPosition());
       markerTitle2=marker2.getTitle();
   });
}
function loadVirginiaGeoJsonClickListener(map, marker2) {
	marker2.addListener('click', function() {
		loadVirginiaGeoJsonClickHandler(map,marker2);	
	});
}
function loadVirginiaGeoJsonClickHandler(map,marker2){
	// Setup event handler to remove GeoJSON features
    map.data.forEach(function (feature) {
    	map.data.remove(feature);
    });
    //load geojson from data.js file to recreate the new map with New York's districts         
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
}
function northCarolinaMarkerClickListener(map, marker3,markerTitle3) {
	marker3.addListener('click', function() {
		northCarolinaMarkerClickHandler(map,marker3,markerTitle3);	
	});
}
function northCarolinaMarkerClickHandler(map,marker3,markerTitle3){
	marker3.addListener('click', function() {
		map.setZoom(6);
    	map.setCenter(marker3.getPosition());
    	markerTitle3=marker3.getTitle();
   });
}
function loadNorthCarolinaGeoJsonClickListener(map, marker3) {
	marker3.addListener('click', function() {
		loadNorthCarolinaGeoJsonClickHandler(map,marker3);	
	});
}
function loadNorthCarolinaGeoJsonClickHandler(map,marker3){
	// Setup event handler to remove GeoJSON features
    map.data.forEach(function (feature) {
    	map.data.remove(feature);
    });
    //load geojson from data.js file to recreate the new map with New York's districts         
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
}
function mouseOverListener(map) {
	map.data.addListener('mouseover', function(event) {
		mouseOverHandler(map,event); 	
	});
}
function mouseOverHandler(map,event) {	
		map.data.revertStyle();
		map.data.overrideStyle(event.feature, {strokeWeight: 4});
}
function mouseOutListener(map) {
	map.data.addListener('mouseout', function() {
		mouseOutHandler(map); 	
	});
}
function mouseOutHandler(map){
		map.data.revertStyle();
}


function selectDistrictByClickListener(map,data,areaInfoWindow) {
	// When the user clicks, set 'isColorful', and change color of district.
	var contentString,districtDemVotes=0,districtRepVotes=0;
	var demVotesArray = data.map((e) => {
        return typeof e.DemVotes === 'string' ? parseInt(e.DemVotes.replace(",", "")) : e.DemVotes;
    });            
    //repeat finding the sum for the republicans
    var repVotesArray = data.map((e) => {
        return typeof e.RepVotes === 'string' ? parseInt(e.RepVotes.replace(",", "")) : e.RepVotes;
    });   
	console.log("demVotesArray.length: " + demVotesArray.length);
	console.log("repVotesArray.length: " + repVotesArray.length);
	console.log("demVotesArray[26]: " + demVotesArray[26]);
	console.log("repVotesArray[26]: " + repVotesArray[26]);
	map.data.addListener('click', function(event) {
		selectDistrictByClickHandler(map,event,areaInfoWindow,demVotesArray,repVotesArray);	
	});
}
function selectDistrictByClickHandler(map,event,areaInfoWindow,demVotesArray,repVotesArray){
		if (areaInfoWindow) {
        	areaInfoWindow.close();
    	}
		event.feature.setProperty('isColorful', true);
    	map.setCenter(event.latLng);
		map.setZoom(7);
    	districtDemVotes = demVotesArray[event.feature.getProperty('CD115FP')-1];
    	districtRepVotes = repVotesArray[event.feature.getProperty('CD115FP')-1];
      	contentString = "District Number:"+event.feature.getProperty('CD115FP')+'<br/>'+"DemVotes: "+districtDemVotes+"<br/>"+"RepVotes: "+districtRepVotes;
		areaInfoWindow = new google.maps.InfoWindow({
        	content: contentString ,
        	position: event.latLng
    	});
    	areaInfoWindow.open(map);		
}