package hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalysisController {

	@RequestMapping("/analyze")
	public String analyze() {
		return "basic user three test results";
	}

	@RequestMapping("/loadState")
	public GeoJson displayState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		return new GeoJson(stateName);
	}

}
