function selectStateByMarker1Click(data){
	//run tests on state that contains the marker that is clicked
    google.maps.event.addListener(marker1, 'click', function() {                
    	marker1.info.open(map, marker1);
    	marker2.info.close();
    	marker3.info.close();
        marker1 = this; 
        selectStateElement = document.getElementById('box1');
        selectYearElement= document.getElementById('box2');
        var options = selectStateElement.options;
        var iteratorAsString;
        for(var option,i=0;option=options[i];i++){
            if(option.text==this.title){
                iteratorAsString=i.toString();
                selectStateElement.selectedIndex=iteratorAsString;
                selectedState=this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        }
        var stateFP=36;
        colorSelectedStateDistricts(data,stateFP);		                            
    });         
}
function selectStateByMarker2Click(data){ 
	google.maps.event.addListener(marker2, 'click', function() {                
    	marker2.info.open(map, marker2);
        marker1.info.close();
        marker3.info.close();
        marker2 = this; 
        selectStateElement = document.getElementById('box1');
        selectYearElement= document.getElementById('box2');
        var options = selectStateElement.options;
        var iteratorAsString;
        for(var option,i=0;option=options[i];i++){
            if(option.text==this.title){
         	    iteratorAsString=i.toString();
                selectStateElement.selectedIndex=iteratorAsString;
                selectedState=this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        } 
        var stateFP=51;
        colorSelectedStateDistricts(data,stateFP);      
                            
    });
}
function selectStateByMarker3Click(data){
	google.maps.event.addListener(marker3, 'click', function() {                
        marker3.info.open(map, marker3);
        marker1.info.close();
        marker2.info.close();
        marker3 = this; 
        selectStateElement = document.getElementById('box1');
        selectYearElement= document.getElementById('box2');
        var options = selectStateElement.options;
        var iteratorAsString;
        for(var option,i=0;option=options[i];i++){
            if(option.text==this.title){
                iteratorAsString=i.toString();
                selectStateElement.selectedIndex=iteratorAsString;
                selectedState=this.title; // state changes but year stays the same
                selectYearByDropDown(selectYearElement);//start tests on clicked state
                break;
            }
        }
        var stateFP=37;
        colorSelectedStateDistricts(data,stateFP);             
                            
    });     
}
