package gerrymandering.controller;

import gerrymandering.api.ApiResponse;
import gerrymandering.model.GeoJson;
import gerrymandering.service.ConfigurationService;
import gerrymandering.service.GerrymanderMeasureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.Year;

@RestController
public class AnalysisController {
	@Autowired
    private GerrymanderMeasureService gerrymanderMeasureService;
	@Autowired
	private ConfigurationService configurationService;

	@RequestMapping(value = "/loadMap", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponse loadMap(){
		GeoJson result = configurationService.generateUSGeoJson();
		if(result == null)
			return new ApiResponse(false);
		else
			return new ApiResponse(true, result);
	}

	@RequestMapping(value = "/loadState", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponse loadState(
			@RequestParam(value="stateName") String stateName,
			@RequestParam(value="year") Integer electionYear){
	    GeoJson response = gerrymanderMeasureService.selectState(stateName, Year.of(electionYear));
	    if(response == null)
	    	return new ApiResponse(false);
	    else
	    	return new ApiResponse(true, response);
	}

	@RequestMapping(value = "/loadDistrict", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponse loadDistrict(
			@RequestParam(value="stateName") String stateName,
			@RequestParam(value="districtNo") Integer districtNo,
			@RequestParam(value="year") Integer electionYear){
		GeoJson response = gerrymanderMeasureService
            .selectDistrict(stateName, districtNo, Year.of(electionYear));
		if(response == null)
			return new ApiResponse(false);
		else
			return new ApiResponse(true, response);
	}

	@RequestMapping(value = "/runMeasures", method = RequestMethod.POST)
	@ResponseBody
	public String runMeasures(
			@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		String ret = "";
		// TODO: call AnalysisService.runMeasures(stateName)
		// TODO: use Jackson to change results into json
		return ret;
	}


}
