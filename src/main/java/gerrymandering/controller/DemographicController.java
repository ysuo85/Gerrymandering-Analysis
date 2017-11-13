package gerrymandering.controller;

import gerrymandering.common.PopulationGroup;
import gerrymandering.model.HeatMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
@Controller
public class DemographicController {
    @RequestMapping(value = "/countryHeatMap", method = RequestMethod.GET)
    @ResponseBody
    public HeatMap displayHeatmapForAll(@RequestParam List<PopulationGroup> ethnicGroups){
        return null;
    }

    @RequestMapping(value = "/stateHeatMap", method = RequestMethod.GET)
    @ResponseBody
    public HeatMap displayHeatmapForState(@RequestParam String stateName,
                                          @RequestParam List<PopulationGroup> ethnicGroups){
        return null;
    }
}
