package gerrymandering.controller;

import gerrymandering.model.GeoJson;
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

@RestController
public class AnalysisController {
	@Autowired
    private GerrymanderMeasureService gerrymanderMeasureService;

	@Value("classpath:out.geojson")
	private Resource geoJsonResource;

	// TODO: add support for different years
	// TODO: use database instead of file resource
	/**
	 * @param stateName full name of state (e.g. "New York")
	 * @return JSON (as String) containing state with district
	**/
	@RequestMapping(value = "/loadState", method = RequestMethod.GET)
	@ResponseBody
	public GeoJson loadState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		String ret = "";
		// TODO: switch on stateName to load correct resource (currently always loads New York)
		try {
			InputStream inputStream  = geoJsonResource.getInputStream();	
			ret = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
		}
		catch(FileNotFoundException e) {
			System.err.println("File Not Found Exception in AnalysisController loadStateTEST");
			e.printStackTrace();
		}
		catch(IOException e) {
			System.err.println("IOException in AnalysisController loadStateTEST");
			e.printStackTrace();
		}

		return null;
	}

	@RequestMapping(value = "/loadDistrict", method = RequestMethod.GET)
	@ResponseBody
	public GeoJson loadDistrict(@RequestParam String stateName, @RequestParam String districtNo){
		return null;
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
