package gerrymandering.service;

import gerrymandering.measure.Measure;
import gerrymandering.measure.MeasureResults;
import gerrymandering.model.District;
import gerrymandering.model.GeoJson;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;

import java.time.Year;
import java.util.List;
import java.util.Map;

/**
 * Created by yisuo on 11/9/17.
 */
public class GerrymanderMeasureService {
    private Map<String, Measure> hr3057measures;
    private Map<String, Measure> analysisMeasures;

    public List<MeasureResults> runStateWideMeasures(State state){
        return null;
    }

    public List<MeasureResults> runHR3057Measures(SuperDistrict superDistrict){
        return null;
    }

    public GeoJson selectRegion(State state, District district, Year electionYear){
        return null;
    }
}
