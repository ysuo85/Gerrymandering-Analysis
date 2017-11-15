package gerrymandering.controller;

import gerrymandering.api.ApiResponse;
import gerrymandering.common.CommonConstants;
import gerrymandering.model.GeoJson;
import gerrymandering.service.ConfigurationService;
import gerrymandering.service.GerrymanderMeasureService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.Year;

@RestController
public class AnalysisController {
	@Autowired
    private GerrymanderMeasureService gerrymanderMeasureService;
	@Autowired
	private ConfigurationService configurationService;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	@ResponseBody
	public ApiResponse test(){
		GeoJson result = new GeoJson("This is a test");
		return new ApiResponse(true, result);
	}

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
	public String runMeasures(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		String ret = "";
		// TODO: call AnalysisService.runMeasures(stateName)
		// TODO: use Jackson to change results into json
		return ret;
	}


}
