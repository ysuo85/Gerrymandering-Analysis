package hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.InputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
public class AnalysisController {

	@Value("classpath:out.geojson")
	private Resource geoJsonResource;

	// TODO: add support for different years
	// TODO: use database instead of file resource

	/**
	 * @param stateName full name of state (e.g. "New York")
	 * @return GeoJson containing state with district
	**/
	/*@RequestMapping("/loadState")
	public GeoJson displayState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		return new GeoJson(stateName);
	}*/

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
	public String runMeasures(@RequestParam(value="stateName", required=false, defaultValue="New York" String stateName) {
		String ret = "";
		// TODO: call AnalysisService.runMeasures(stateName)
		// TODO: use Jackson to change results into json
		return ret;
	}


}
