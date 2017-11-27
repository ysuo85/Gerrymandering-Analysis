function initMapStyle(map) {
	map.data.setStyle(function(feature) {
		var color = 'blue';
		if (feature.getProperty('isColorful')) {
			color = feature.getProperty('color');
		}
		/*
		var geom = feature.getGeometry();
		if(geom.getType() == "Polygon") {
			var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
			if(google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) {
				color = 'green';
			}
		}
		*/
		return /** @type {google.maps.Data.StyleOptions} */({
			clickable: true,
			fillColor: color,
			strokeColor: color,
			strokeWeight: 2
		});
	});
}

	function resetStyle() {
		/**
 		* Make Polygon at center of map green and make everything else grey. 
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
		/*
		map.data.setStyle(function(feature) {
			
			var color; //= 'grey'; // Make everything grey by default
			if (feature.getProperty('isColorful')) {
				color = feature.getProperty('color');
			}
			var geom = feature.getGeometry();
			if(geom.getType() == "Polygon") {
				var poly = new google.maps.Polygon({paths: geom.getAt(0).getArray()});
				if(google.maps.geometry.poly.containsLocation(map.getCenter(), poly)) { 
					color = 'green'; // If feature contains center of map, highlight it
				}
			}
			//else if(multipolygon) {access polygon array}
			
			return ({
				clickable: true,
				fillColor: color,
				strokeColor: color,
				strokeWeight: 2
			});
		});
		*/
	}
function colorSelectedStateDistricts(eventFeature){//function colorSelectedStateDistricts(data,stateFP){
	/*
	map.data.setStyle(function(feature) {
		var color ;//= 'grey';
		var winnerArray =data.map((e)=>{
        	return e['Winner'];
    	});
    	console.log("winnerArray.length:"+winnerArray.length);
    	console.log("feature.getProperty('STATEFP')"+feature.getProperty('STATEFP'));          
    	feature.setProperty('isColorful', true);	   
    	if (feature.getProperty('STATEFP')==stateFP) {
			for(var j=0; j<winnerArray.length;j++){
				if(feature.getProperty('CD115FP')==j+1){
					if(winnerArray[j]=="R"){
						color='red';
						return({
							clickable: true,
							fillColor: color,
							strokeColor: color,
							strokeWeight: 2
						});
					}else if(winnerArray[j]=="D"){
						color='blue';
						return({
							clickable: true,
							fillColor: color,
							strokeColor: color,
							strokeWeight: 2
						});
					}
				}
			}
		}
				
	});
	*/
	map.data.setStyle(function(feature) {
			var color= 'grey'; // Make everything grey by default
			var strokeColor= 'blue';
			if(feature.getProperty('STATEFP')==eventFeature.getProperty('STATEFP')){
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
}