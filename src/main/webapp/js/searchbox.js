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
function initAutocomplete() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 38.541291, lng: -99.896488},
		zoom: 4,
		mapTypeId: 'roadmap'
	});
	map.data.addGeoJson(data); 
	// Create the search box and link it to the UI element.
	input = document.getElementById('pac-input');
	searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var init = true;
	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		if(init) {
		init = false;
		return;
		}
		searchBox.setBounds(map.getBounds());
		resetStyle(); // Make the Polygon at the center of the map red and make everything else grey
		              // (see function resetStyle())
		map.data.revertStyle();
	});
	var markers = [];
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
		places = searchBox.getPlaces();
		if (places.length == 0) {
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
	});

	var coords={
		'NY': '43.385888,-75.436524',
		'VA':'37.992699,-78.292969',
		'NC':'35.814249,-80.709961'
	};
	function changeMap(city){
		var c = coords[city].split(',');
		map.setCenter(new google.maps.LatLng(c[0],c[1]));
	}
	var newYork = {lat: 43.385888, lng: -75.436524};
	var virginia = {lat: 37.992699, lng: -78.292969};
	var northCarolina = {lat: 35.814249, lng: -80.709961};

	map.data.setStyle(function(feature) {
		var color = 'blue';
		if (feature.getProperty('isColorful')) {
			color = feature.getProperty('color');
		}
		var geom = feature.getGeometry();
		if(geom.getType() == "Polygon") {
			var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
			if(google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) {
				color = 'red';
			}
		}
		return /** @type {google.maps.Data.StyleOptions} */({
			clickable: true,
			fillColor: color,
			strokeColor: color,
			strokeWeight: 2
		});
	});
// When the user clicks, set 'isColorful', and change color of district.
	map.data.addListener('click', function(event) {
		console.log('map.data clicked');
		console.log(event.feature);
		event.feature.setProperty('isColorful', true);		
	});
  	map.data.addListener('mouseover', function(event) {
  		mouseOverHandler(event);
		//map.data.revertStyle();
		//map.data.overrideStyle(event.feature, {strokeWeight: 4});
	});

	map.data.addListener('mouseout', function(event) {
		map.data.revertStyle();
	}); 
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
	marker1.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker1.getPosition());
       markerTitle1=this.getTitle();
       console.log("markerTitle1"+markerTitle1);
  	});
	
	marker2.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker2.getPosition());
       markerTitle2=this.getTitle();
       console.log("markerTitle2"+markerTitle2);
  	});
  	marker3.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker3.getPosition());
       markerTitle3=this.getTitle();
       console.log("markerTitle3"+markerTitle3);
  	});
  	marker1.addListener('click', function(event) {
              /* Setup event handler to remove GeoJSON features*/
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
            map.data.addGeoJson(tempObject45);  //-->possible problem with this object 
            map.data.addGeoJson(tempObject46);
            map.data.addGeoJson(tempObject47);
            map.data.addGeoJson(tempObject48);
            map.data.addGeoJson(tempObject49);
            map.data.addGeoJson(tempObject50);
            map.data.addGeoJson(tempObject51);               
          });


  	marker2.addListener('click', function(event) {
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
	
	marker3.addListener('click', function(event) {
		/* Setup event handler to remove GeoJSON features*/
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
function resetStyle() {
    map.data.setStyle(function(feature) {
        var color = 'grey'; // Make everything grey by default
        if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }
        var geom = feature.getGeometry();
        if(geom.getType() == "Polygon") {
            var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
            if(google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) {
                color = 'red'; // If feature contains center of map, highlight it
            }
        }
        return ({/** @type {google.maps.Data.StyleOptions} */
        clickable: true,
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
    });
}

google.maps.event.addDomListener(window, 'load', initMap);


function mouseOverHandler(event) {
	map.data.revertStyle();
	map.data.overrideStyle(event.feature, {strokeWeight: 4});
}