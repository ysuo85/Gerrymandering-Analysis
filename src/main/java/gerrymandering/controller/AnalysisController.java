package gerrymandering.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@RestController
public class AnalysisController {

	@Value("classpath:out.geojson")
	private Resource geoJsonResource;

	// TODO: add support for different years
	// TODO: use database instead of file resource

	/**
	 * @param stateName full name of state (e.g. "New York")
	 * @return JSON (as String) containing state with district
	**/
	@RequestMapping("/loadState")
	@ResponseBody
	public String loadState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
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

		return ret;
	}

	@RequestMapping("/runMeasures")
	@ResponseBody
	public String runMeasures(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		String ret = "";
		// TODO: call AnalysisService.runMeasures(stateName)
		// TODO: use Jackson to change results into json
		return ret;
	}


}
