// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.




function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 38.541291, lng: -99.896488},
		zoom: 4,
		mapTypeId: 'roadmap'
});

map.data.addGeoJson(data); 

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

/*
map.addListener('click', function(event) {
		var position = {lat: event.latLng.lat(), lng: event.latLng.lng()}
		var marker = new google.maps.Marker({position: position, map: map});
		});
*/
var init = true;
// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
		if(init) {
		init = false;
		return;
		}
		searchBox.setBounds(map.getBounds());
		resetStyle(); // Make the Polygon at the center of the map red and make everything else grey (see function resetStyle())
		map.data.revertStyle();
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

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
		places.forEach(function(place) {
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
});

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
		return /** @type {google.maps.Data.StyleOptions} */({
		clickable: true,
		fillColor: color,
		strokeColor: color,
		strokeWeight: 2
		});
	});
} 


var newYork = {lat: 43.385888, lng: -75.436524};
var virginia = {lat: 37.992699, lng: -78.292969};
var northCarolina = {lat: 35.814249, lng: -80.709961};
var texas = {lat:31.968599 , lng: -99.901813 };
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

// When the user clicks, set 'isColorful', changing the color of the letters.
map.data.addListener('click', function(event) {
		console.log('map.data clicked');
		console.log(event.feature);
		event.feature.setProperty('isColorful', true);
	
		// TODO: Zoom in on clicked state and send AJAX request to /loadState, then display districts in clicked state
		var loadStateReq = new XMLHttpRequest();
		loadStateReq.addEventListener("load", function callback(response) {
	displayState();
});
		loadStateReq.open("GET", "/loadState");
		loadStateReq.send();
		
		});

function displayState() {
	console.log("Display State Stub");
	// TODO
}






map.data.addListener('mouseover', function(event) {
		map.data.revertStyle();
		map.data.overrideStyle(event.feature, {strokeWeight: 4});
		});

map.data.addListener('mouseout', function(event) {
		map.data.revertStyle();
		});     

var contentString = '<div id="content">'+
'<div id="siteNotice">'+
'</div>'+
'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
'<div id="bodyContent">'+
'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
'sandstone rock formation in the southern part of the '+
'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
'south west of the nearest large town, Alice Springs; 450&#160;km '+
'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
'features of the Uluru - Kata Tjuta National Park. Uluru is '+
'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
'Aboriginal people of the area. It has many springs, waterholes, '+
'rock caves and ancient paintings. Uluru is listed as a World '+
'Heritage Site.</p>'+
'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
'(last visited June 22, 2009).</p>'+
'</div>'+
'</div>';
var secondContentString = '<div id="content">'+
'<div id="siteNotice">'+
'</div>'+
'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
'<div id="bodyContent">'+
'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
'sandstone rock formation in the southern part of the '+
'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
'south west of the nearest large town, Alice Springs; 450&#160;km '+
'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
'features of the Uluru - Kata Tjuta National Park. Uluru is '+
'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
'Aboriginal people of the area. It has many springs, waterholes, '+
'rock caves and ancient paintings. Uluru is listed as a World '+
'Heritage Site.</p>'+
'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
'(last visited June 22, 2009).</p>'+
'</div>'+
'</div>';
var thirdContentString = '<div id="content">'+
'<div id="siteNotice">'+
'</div>'+
'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+'<hr/>'+
'<div><img /></div>'+
'<div id="bodyContent">'+
'<div class="accordion-toggle22">'+

'<div class="accordion-toggle22">'+
'<p><span class="redBold"><strong><span style="font-size: 12pt; color: #993300;"> Three PhD candidates to attend Grace Hopper Celebration of Women in Computing</span></span></span><br /><span class="redBold"><strong><span style="font-size: 12pt; color: #993300;"><img style="float: right; margin: 5px;" src="http://www.stonybrook.edu/commcms/ceas/images/Grace%20Hopper.jpeg" alt="Three PhD candidates to attend Grace Hopper Celebration of Women in Computing" width="311" height="207" /></span></strong></span></p>'+
'<p><span> Computer Science doctoral candidates Mahsa Torkaman, Mina Abbasi Dinani and Laraib Iqbal Malik each earned a scholarship from the Anita Borg Institute and will attend the Grace Hopper Celebration of Women in Computing (GHC17) &mdash; the world&rsquo;s largest computing event for women.The three students will represent Stony Brook University along with eight other students who will attend GHC17 supported by funding from the Department of Computer Science. The Orlando-based event will be held October 4 through October 6.</span></p>'+
'<div>'+
'<div class="text22">'+
'<p>&nbsp;<span>&nbsp;</span><a href="/happenings/awards-and-honors/grace-hopper-scholarships/#prettyPhoto"><span class="underline redtext">READ MORE</span></a></p>'+
'</div>'+
'</div>'+
'</div>'+
'<p>&nbsp;<a href="#top"><span class="underline redtext">BACK TO TOP</span></a></p>'+
'<hr />'+
'</div>'+
'</div>';    
var infowindow = new google.maps.InfoWindow({
content: contentString
});
var infowindow_2 = new google.maps.InfoWindow({
content: secondContentString
});
var infowindow_3 = new google.maps.InfoWindow({
content: thirdContentString
});

var marker1 = new google.maps.Marker({
position: newYork,
map: map,
title: 'New York'
});

marker1.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker1.getPosition());
  });
  /*
marker1.addListener('click', function() {
		infowindow.open(map, marker1);
		}); 
*/




var marker2 = new google.maps.Marker({
position: virginia,
map: map,
title: 'Virginia'
});
marker2.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker2.getPosition());
  });
 /*
marker2.addListener('click', function() {
		infowindow_2.open(map, marker2);
		}); 
*/
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



var marker3 = new google.maps.Marker({
position: northCarolina,
map: map,
title: 'North Carolina'
});

marker3.addListener('click', function() {
       map.setZoom(6);
       map.setCenter(marker3.getPosition());
  });

/*
marker3.addListener('click', function() {
		infowindow_3.open(map, marker3);
		}); 
*/
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


google.maps.event.addDomListener(window, 'load', initMap);


