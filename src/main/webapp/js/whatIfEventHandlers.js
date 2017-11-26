var areaInfoWindow;
var listOfSuperDistricts=[];//list of super-districts - each super-district is a list of features
var colorFillArray=['orange','green','purple','red','blue','black'];
var colorFillArrayLength=0;

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
function addToSuperDistrictListener(map){
	map.data.addListener('click', function(event) {
		addToSuperDistrictHandler(map,event.feature);	
	});
}
function addToSuperDistrictHandler(map,eventFeature){
    var selectedDistrictId = eventFeature.getProperty('CD115FP');
    var selectedDistrictGeom = eventFeature.getGeometry();
    var selectedDistrictGeomLatLngArray=[];
    var selectedDistrictGeomLatLng;
    selectedDistrictGeom.forEachLatLng(function(LatLng){
    	selectedDistrictGeomLatLngArray.push(LatLng);				
    });
    console.log("selectedDistrictGeomLatLngArray.length:"+selectedDistrictGeomLatLngArray.length);
    var geomLatLng;
    var id_In_List=0;
    var districtFeature;
    var geom;
    var boundaryPtInList=0;
    var newSuperDistrict=[];
    console.log("add method -listOfSuperDistricts.length:"+listOfSuperDistricts.length);
    if(listOfSuperDistricts.length==0){
    	//listOfSuperDistricts.push(newSuperDistrict);
    	//addDistrictFeature(map,eventFeature);
    	alert("Error: User must first create super district before selecting a district to add");
    }
    else{
    	var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
    	console.log("currentSuperDistrict.length:"+currentSuperDistrict.length);
    	if(currentSuperDistrict.length==0){
    		addDistrictFeature(map,eventFeature);
    	}else{
    		console.log("selectedDistrictId:"+selectedDistrictId);
    		for(var i=0; i <currentSuperDistrict.length;i++){
    			if(selectedDistrictId==currentSuperDistrict[i].getProperty('CD115FP')){
    				id_In_List=1;
    			}
    		}
    		if(id_In_List==1){//selected district has already been selected and is already in the list 
    			return;
    		}
    		else{
    			//see if selected district's points are contained in the polygons of the districts that are already in the currentSuperDistrict

    	    	for(var i = 0; i<currentSuperDistrict.length;i++){
    				districtFeature = currentSuperDistrict[i];
    				geom = districtFeature.getGeometry();
    				var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
    				for(var j =0;j<selectedDistrictGeomLatLngArray.length;j++){
    					selectedDistrictGeomLatLng=selectedDistrictGeomLatLngArray[j];
    					if(google.maps.geometry.poly.containsLocation(selectedDistrictGeomLatLng, poly)) {
							boundaryPtInList=1;
    						console.log("boundaryPtInList:"+boundaryPtInList);
						}    					
    				}    						
    			}    		
    			if(boundaryPtInList==1){
    				addDistrictFeature(map,eventFeature);
    			}else{
    				alert("Error: Superdistricts must be contiguous when being chosen.");
    				//console.log("Error: Superdistricts must be contiguous when being chosen.")
    			}
    		}
      	}
	}
}
function addDistrictFeature(map,eventFeature){
	console.log("in addDistrictFeature");
	var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
	console.log("number of features in current super-district before adding new feature:"+currentSuperDistrict.length);
	currentSuperDistrict.push(eventFeature);
	console.log("number of features in current super-district after adding new feature:"+currentSuperDistrict.length);
	map.data.setStyle(function(feature) {
		for(var i =0; i<currentSuperDistrict.length;i++){
			if(feature.getProperty('CD115FP')==currentSuperDistrict[i].getProperty('CD115FP')){
				var color=colorFillArray[colorFillArrayLength];//var color= 'grey'; // Make everything grey by default				
				var strokeColor= 'gold';	
				return ({/** @type {google.maps.Data.StyleOptions} */
					clickable: true,
					fillColor: color,
					strokeColor: strokeColor,
					strokeWeight: 2
				});
			}
		}				
			
	});
	
	document.getElementById("saveButton").className = "btn btn-primary";
}
function removeDistrictFeatureListener(map){
	document.getElementById("undoButton").addEventListener('click', function(event) {		
		removeDistrictFeatureHandler(map);	
		//event.stopPropogation();
		$(document).on("click",".messagepop",function(event) {
      		event.stopPropagation();
  		    alert(5); 
  		});
	});
	
}
function removeDistrictFeatureHandler(map){
	console.log("undo button pressed");
	console.log("listOfSuperDistricts.length before removing last added district:"+listOfSuperDistricts.length);
	if(listOfSuperDistricts.length==0){
		return;
	}
	else{
		var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
		console.log("%currentSuperDistrict.length before removing last added district:"+currentSuperDistrict.length);

		if(currentSuperDistrict.length==0){ // do{get last element} while( vertical list is there)
			var k=0;
			var iteratedSuperDistrict=listOfSuperDistricts[0];
			var iteratedFeature;
			console.log("^^^^^^listOfSuperDistricts.length:"+listOfSuperDistricts.length);
			while(listOfSuperDistricts[k].length!=0){
				iteratedSuperDistrict=listOfSuperDistricts[k];
				console.log("^^^^^^iteratedSuperDistrict.length:"+iteratedSuperDistrict.length);				
				k++;
			}
			iteratedFeature=iteratedSuperDistrict[iteratedSuperDistrict.length-1];
			map.data.setStyle(function(feature) {					
				if(iteratedFeature.getProperty('STATEFP')==feature.getProperty('STATEFP')){
					if(iteratedFeature.getProperty('CD115FP')==feature.getProperty('CD115FP')){
						var color= 'grey'; // Make everything grey by default
						var stroke='black';
						console.log("#####feature.getProperty('STATEFP'):"+feature.getProperty('STATEFP'));
						console.log("#####feature.getProperty('CD115FP'):"+feature.getProperty('CD115FP'));
						return ({/** @type {google.maps.Data.StyleOptions} */
							clickable: true,
							fillColor: color,
							strokeColor: stroke,
							strokeWeight: 2
						});
					}			
				}				
				var currentColorIndex =0;
				for(var j=0;j<listOfSuperDistricts.length;j++){// for each loop, the districts have the same fill color
					var currentSuperDistrict=listOfSuperDistricts[j];
					console.log("currentColorLength=colorFillArray.length:"+colorFillArray.length);						
					//console.log("*******currentSuperDistrict.length:"+currentSuperDistrict.length);
					if(currentSuperDistrict.length==0){
						continue;
					}else{
						//console.log("listOfSuperDistricts.length-1"+listOfSuperDistricts.length-1);
						var color=colorFillArray[currentColorIndex];
						for(var i=0; i <currentSuperDistrict.length;i++){
    						currentDistrictFeature=currentSuperDistrict[i];
    						if(feature.getProperty('CD115FP')==currentDistrictFeature.getProperty('CD115FP')){
    							//featuresInThisSuperDistrict.push(feature);  						
								var goldStrokeColor='gold';
								return ({
									clickable: true,
									fillColor: color,
									strokeColor: goldStrokeColor,
									strokeWeight: 2
								});								
    						}    		   		
    					}
    					currentColorIndex=currentColorIndex+1;
					}
   				}
   							
			});
			iteratedSuperDistrict.pop();
		}else if(currentSuperDistrict.length!=0){
			
			var lastFeature=currentSuperDistrict[currentSuperDistrict.length-1];
			console.log("$lastFeature.getProperty('STATEFP'):"+lastFeature.getProperty('STATEFP'));
			console.log("$lastFeature.getProperty('CD115FP'):"+lastFeature.getProperty('CD115FP'));
			currentSuperDistrict.pop();
			console.log("$currentSuperDistrict.length after removing last added district:"+currentSuperDistrict.length);
			console.log("$The last district of this superdistrict is:"+currentSuperDistrict[currentSuperDistrict.length-1].getProperty('CD115FP'));
			map.data.setStyle(function(feature) {
				
				//console.log("$feature.getProperty('STATEFP'):"+feature.getProperty('STATEFP'));
				if(lastFeature.getProperty('STATEFP')==feature.getProperty('STATEFP')){
					var color= 'grey'; // Make everything grey by default
				    var stroke='black';
					if(lastFeature.getProperty('CD115FP')==feature.getProperty('CD115FP')){
						console.log("$$$$$feature.getProperty('STATEFP'):"+feature.getProperty('STATEFP'));
						console.log("$$$$$feature.getProperty('CD115FP'):"+feature.getProperty('CD115FP'));
						return ({/** @type {google.maps.Data.StyleOptions} */
							clickable: true,
							fillColor: color,
							strokeColor: stroke,
							strokeWeight: 2
						});
					}			
				}
				var currentColorIndex =0;
				for(var j=0;j<listOfSuperDistricts.length;j++){// for each loop, the districts have the same fill color
					var currentSuperDistrict=listOfSuperDistricts[j];
					console.log("currentColorLength=colorFillArray.length:"+colorFillArray.length);						
					//console.log("*******currentSuperDistrict.length:"+currentSuperDistrict.length);
					if(currentSuperDistrict.length==0){
						continue;
					}else{
						//console.log("listOfSuperDistricts.length-1"+listOfSuperDistricts.length-1);
						var color=colorFillArray[currentColorIndex];
						for(var i=0; i <currentSuperDistrict.length;i++){
    						currentDistrictFeature=currentSuperDistrict[i];
    						if(feature.getProperty('CD115FP')==currentDistrictFeature.getProperty('CD115FP')){
    							//featuresInThisSuperDistrict.push(feature);  						
								var goldStrokeColor='gold';
								return ({
									clickable: true,
									fillColor: color,
									strokeColor: goldStrokeColor,
									strokeWeight: 2
								});								
    						}    		   		
    					}
    					currentColorIndex=currentColorIndex+1;
					}
   				}		
			});
				}
	}	
}

function createSuperDistrictListener(map){
	document.getElementById("createButton").addEventListener('click', function() {		
		createSuperDistrictHandler(map);	
	});
}
function createSuperDistrictHandler(map){
	var newSuperDistrict=[];
	var id_In_List=0;
	var currentDistrictFeature;
	var featuresInThisSuperDistrict=[];
	
	console.log("listOfSuperDistricts.length before adding new super-district:"+listOfSuperDistricts.length);
	if(listOfSuperDistricts.length==0){
		listOfSuperDistricts.push(newSuperDistrict);
		console.log("added first superdistrict array that is currently empty");
		map.data.setStyle(function(feature) {
			var color= 'grey'; // Make everything grey by default
			var strokeColor= 'blue';
			if(feature.getProperty('Name')==selectedState){
				//need to find a way to access district id's
				//if(feature.getProperty('CD115FP')==){ 
					return ({/** @type {google.maps.Data.StyleOptions} */
						clickable: true,
						fillColor: color,
						strokeColor: strokeColor,
						strokeWeight: 2
					});
				//}    			
		    }

		});
	}else if(listOfSuperDistricts.length!=0){
		//console.log("currentColorLength=colorFillArray.length:"+colorFillArray.length);
		//currentColorLength=colorFillArray.length;// control of how districts will render before selecting districts for a new superdistrict
		colorFillArrayLength=colorFillArrayLength+1;// global control of how the added districts will be colored when clicked
		var firstSuperDistrict=listOfSuperDistricts[0];
    	var firstFeature=firstSuperDistrict[0];
    	listOfSuperDistricts.push(newSuperDistrict);
    	console.log("added a new superdistrict array that is currently empty- this is not the first superdistrict");
		//those not in the current superdistrict lists will change their style

		map.data.setStyle(function(feature) {//map.data.forEach(function (feature) {
			//console.log("*******listOfSuperDistricts.length:"+listOfSuperDistricts.length);
			var currentColorIndex =0;
			for(var j=0;j<listOfSuperDistricts.length;j++){// for each loop, the districts have the same fill color
				var currentSuperDistrict=listOfSuperDistricts[j];
				console.log("currentColorLength=colorFillArray.length:"+colorFillArray.length);						
				//console.log("*******currentSuperDistrict.length:"+currentSuperDistrict.length);
				if(currentSuperDistrict.length==0){
					continue;
				}else{
					//console.log("listOfSuperDistricts.length-1"+listOfSuperDistricts.length-1);
					var color=colorFillArray[currentColorIndex];
					for(var i=0; i <currentSuperDistrict.length;i++){
    					currentDistrictFeature=currentSuperDistrict[i];
    					if(feature.getProperty('CD115FP')==currentDistrictFeature.getProperty('CD115FP')){
    						featuresInThisSuperDistrict.push(feature);  						
							var goldStrokeColor='gold';
							return ({
								clickable: true,
								fillColor: color,
								strokeColor: goldStrokeColor,
								strokeWeight: 2
							});								
    					}    		   		
    				}
    				currentColorIndex=currentColorIndex+1;
				}
   			}
   			//featuresInThisSuperDistrict now has all districts that have ever been added to any of the existing superdistricts
   			if(feature.getProperty('STATEFP')==firstFeature.getProperty('STATEFP')){
				for(var i=0; i<featuresInThisSuperDistrict.length;i++){
					if(feature.getProperty('CD115FP')==featuresInThisSuperDistrict[i].getProperty('CD115FP')){
						id_In_List=1;//district was already rendered its assigned superdistrict color and gold border
					}
				}
				if(id_In_List==0){
					var color= 'grey'; // Make everything grey by default
					var strokeColor= 'blue';					
					return ({
						clickable: true,
						fillColor: color,
						strokeColor: strokeColor,
						strokeWeight: 2
					});
				}
			}
   			
		});
		
	}	
}
function saveSuperDistrictListener(map){
	document.getElementById("saveButton").addEventListener('click', function() {
		saveSuperDistrictHandler(map);	
	});
}
function saveSuperDistrictHandler(map){
	
}
function cancelSuperDistrictListener(map){
	document.getElementById("cancelButton").addEventListener('click', function() {
		cancelSuperDistrictHandler(map);	
	});
}
function cancelSuperDistrictHandler(map){
	if(listOfSuperDistricts.length==0){
		return;
	}else{
		if(listOfSuperDistricts.length==1){
			document.getElementById("saveButton").className = "btn btn-primary disabled";
		}
		var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
		if(currentSuperDistrict.length==0){
			listOfSuperDistricts.pop();
		}else{
			map.data.setStyle(function(feature) {
				for(var i=0; i<currentSuperDistrict.length;i++){
					var currentFeature=currentSuperDistrict[currentSuperDistrict.length-1];		
					var color= 'grey'; // Make everything grey by default	
					if(currentFeature.getProperty('STATEFP')==feature.getProperty('STATEFP')){
						if(currentFeature.getProperty('CD115FP')==feature.getProperty('CD115FP')){
							return ({
								clickable: true,
								fillColor: color,
								strokeColor: color,
								strokeWeight: 2
							});
						}			
					}
					currentSuperDistrict.pop();
				}
			});
			listOfSuperDistricts.pop();
		}
	}		
}
function resetSuperDistrictListener(map){
	document.getElementById("resetButton").addEventListener('click', function() {
		resetSuperDistrictHandler(map);	
	});
}
function resetSuperDistrictHandler(map){	
	if(listOfSuperDistricts.length==0){
		return;
	}
	else{
		map.data.setStyle(function(feature) {
			for(var i=0; i<listOfSuperDistricts.length;i++){
				var currentSuperDistrict = listOfSuperDistricts[i];
				for(var j=0; j<currentSuperDistrict.length;j++){
					var currentFeature=currentSuperDistrict[j];
					var color= 'grey'; // Make everything grey by default
					var stroke='black';	
					if(currentFeature.getProperty('STATEFP')==feature.getProperty('STATEFP')){
						if(currentFeature.getProperty('CD115FP')==feature.getProperty('CD115FP')){
							return ({
								clickable: true,
								fillColor: color,
								strokeColor: stroke,
								strokeWeight: 2
							});
						}			
					}		
					//currentSuperDistrict.pop();
				}
				//listOfSuperDistricts.pop();			
			}
		});
		for(var i=0; i<listOfSuperDistricts.length;i++){
				var currentSuperDistrict = listOfSuperDistricts[i];
				for(var j=0; j<currentSuperDistrict.length;j++){
					currentSuperDistrict.pop();
				}
			listOfSuperDistricts.pop();
		}

		console.log("listOfSuperDistricts.length after reset:"+listOfSuperDistricts.length);
		document.getElementById("saveButton").className = "btn btn-primary disabled";
	}			
}
