package hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalysisController {

	/**
	 * @param stateName full name of state (e.g. "New York")
	 * @return GeoJson containing state with district
	**/
	@RequestMapping("/loadState")
	public GeoJson displayState(@RequestParam(value="stateName", required=false, defaultValue="New York") String stateName) {
		return new GeoJson(stateName);
	}

}
