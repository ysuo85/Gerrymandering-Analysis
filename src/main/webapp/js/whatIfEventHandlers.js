var areaInfoWindow;
var listOfSuperDistricts=[];//list of super-districts - each super-district is a list of features
var colorFillArray=['orange','green','purple','red','blue','black'];
var colorFillArrayLength=0;
var startingNewSuperDistrict=0;

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
function addToSuperDistrictListener(map, selected){
    var features = selected.features;
    return map.data.addListener('click', function(event){
        features.some(feature => {
            if(feature.getProperty('DistrictNo') === event.feature.getProperty('DistrictNo')){
                addToSuperDistrictHandler(map,event.feature);
            }
        });
    });
}

function addToSuperDistrictHandler(map,eventFeature){
    var selectedDistrictId = eventFeature.getProperty('DistrictNo');
    var selectedDistrictGeom = eventFeature.getGeometry();
    var selectedDistrictGeomLatLngArray=[];
    var selectedDistrictGeomLatLng;
    selectedDistrictGeom.forEachLatLng(function(LatLng){
    	selectedDistrictGeomLatLngArray.push(LatLng);				
    });
    console.log("selectedDistrictGeomLatLngArray.length:"+selectedDistrictGeomLatLngArray.length);
    var districtFeature;
    var geom;
    var boundaryPtInList=false;
    //var newSuperDistrict=[];------------------------------------------------------------------
    console.log("add method -listOfSuperDistricts.length:"+listOfSuperDistricts.length);
    if(listOfSuperDistricts.length==0){
    	startingNewSuperDistrict=true;
    	addDistrictFeature(map,eventFeature);
    	//alert("Error: User must first create super district before selecting a district to add");----------------------------------------
    }
    else{
    	var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
    	console.log("currentSuperDistrict.length:"+currentSuperDistrict.length);
    	if(currentSuperDistrict.length==0){
    		addDistrictFeature(map,eventFeature);
    	}else{
    		console.log("selectedDistrictId:"+selectedDistrictId);
    		for(var i=0; i <currentSuperDistrict.length;i++){
    			if(selectedDistrictId==currentSuperDistrict[i].getProperty('DistrictNo')){
    			    return;
    			}
    		}
            //see if selected district's points are contained in the polygons of the districts that are already in the currentSuperDistrict
            for(var i = 0; i<currentSuperDistrict.length;i++){
                districtFeature = currentSuperDistrict[i];
                geom = districtFeature.getGeometry();
                var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
                for(var j =0;j<selectedDistrictGeomLatLngArray.length;j++){
                    selectedDistrictGeomLatLng=selectedDistrictGeomLatLngArray[j];
                    if(google.maps.geometry.poly.containsLocation(selectedDistrictGeomLatLng, poly)) {
                        boundaryPtInList=true;
                        console.log("boundaryPtInList:"+boundaryPtInList);
                    }
                }
            }
            if(boundaryPtInList==true){
                addDistrictFeature(map,eventFeature);
            }else{
                alert("Error: Superdistricts must be contiguous when being chosen.");
            }
      	}
	}
}

function addDistrictFeature(map,eventFeature){
	console.log("in addDistrictFeature");
	var newSuperDistrict=[];
	console.log("@@@@@@ startingNewSuperDistrict value: "+startingNewSuperDistrict);
	if(startingNewSuperDistrict==true){
		listOfSuperDistricts.push(newSuperDistrict);
	}
	startingNewSuperDistrict=false;
	console.log("@@@@@@@@ listOfSuperDistricts.length:"+listOfSuperDistricts.length);
	var currentSuperDistrict=listOfSuperDistricts[listOfSuperDistricts.length-1];
	//console.log("number of features in current super-district before adding new feature:"+currentSuperDistrict.length);
	currentSuperDistrict.push(eventFeature);
	console.log("number of features in current super-district after adding new feature:"+currentSuperDistrict.length);
	currentSuperDistrict.forEach(feature => {
        map.data.overrideStyle(feature, {fillColor: 'gold', strokeColor: 'red'});
	});
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
	//var newSuperDistrict=[]; -------------------------------------------------------------------------------
	startingNewSuperDistrict=true;
	var id_In_List=0;
	var currentDistrictFeature;
	var featuresInThisSuperDistrict=[];
	
	console.log("listOfSuperDistricts.length before adding new super-district:"+listOfSuperDistricts.length);
	if(listOfSuperDistricts.length==0){
		//listOfSuperDistricts.push(newSuperDistrict);--------------------------------------------------------------------------
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
		
		colorFillArrayLength=colorFillArrayLength+1;// global control of how the added districts will be colored when clicked
		var firstSuperDistrict=listOfSuperDistricts[0];
    	var firstFeature=firstSuperDistrict[0];

		map.data.setStyle(function(feature) {
			var currentColorIndex =0;
			for(var j=0;j<listOfSuperDistricts.length;j++){// for each loop, the districts have the same fill color
				var currentSuperDistrict=listOfSuperDistricts[j];
				console.log("currentColorLength=colorFillArray.length:"+colorFillArray.length);						
				if(currentSuperDistrict.length==0){
					continue;
				}else{
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
