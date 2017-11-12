package gerrymandering.controller;

import gerrymandering.model.GeoJson;
import gerrymandering.model.State;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
@Controller
public class WhatIfController {
    @RequestMapping(value = "/combineDistrictsAuto", method = RequestMethod.POST)
    @ResponseBody
    public GeoJson combineDistrictsAuto(@RequestParam String stateName){
        return null;
    }

    @RequestMapping(value = "/combineDistrictsManual", method = RequestMethod.POST)
    @ResponseBody
    public GeoJson combineDistrictsManual(@RequestParam String stateName,
                                          @RequestParam List<String> districts){
        return null;
    }

    @RequestMapping(value = "/saveCompletedWork", method = RequestMethod.POST)
    @ResponseBody
    public GeoJson saveCompletedWork(@RequestParam State state){
        return null;
    }

    @RequestMapping(value = "/loadCompletedWorks", method = RequestMethod.GET)
    @ResponseBody
    public List<GeoJson> loadCompletedWorks(@RequestParam Integer numItems){
        return null;
    }

    @RequestMapping(value = "/downloadWork", method = RequestMethod.GET)
    @ResponseBody
    public File downloadWork(@RequestParam State state){
        return null;
    }
}
