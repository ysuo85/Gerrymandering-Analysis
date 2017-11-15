package gerrymandering.service;

import gerrymandering.common.CommonConstants;
import gerrymandering.measure.MeasureResults;
import gerrymandering.model.District;
import gerrymandering.model.GeoJson;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;
import gerrymandering.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Year;
import java.util.List;

/**
 * Created by yisuo on 11/14/17.
 */
@Service("gerrymanderMeasureService")
public class GerrymanderMeasureServiceImpl implements GerrymanderMeasureService {
    @Autowired
    private DistrictRepository districts;
    @Autowired
    private GeoRenderingService geoJson;

    @Override
    public List<MeasureResults> runStateWideMeasures(State state) {
        return null;
    }

    @Override
    public List<MeasureResults> runHR3057Measures(SuperDistrict superDistrict) {
        return null;
    }

    @Override
    public GeoJson selectDistrict(Integer stateId, Integer districtId, Year electionYear) {
        List<District> found =
            districts.findByDistrictNoAndStateIdAndYear(districtId, stateId, electionYear.getValue());
        if(found.isEmpty())
            return null;
        else
            return geoJson.buildGeoJson(found.get(CommonConstants.FIRST_ELEMENT));
    }

    @Override
    public GeoJson selectDistrict(String stateName, Integer districtId, Year electionYear){
        List<District> found =
            districts.findByDistrictNoAndStateNameAndYear(districtId, stateName, electionYear.getValue());
        if(found.isEmpty())
            return null;
        else
            return geoJson.buildGeoJson(found.get(CommonConstants.FIRST_ELEMENT));
    }

    @Override
    public GeoJson selectState(Integer stateId, Year electionYear) {
        List<District> found =
            districts.findByStateIdAndYear(stateId, electionYear.getValue());
        if(found.isEmpty())
            return null;
        else
            return geoJson.buildGeoJson(found.get(CommonConstants.FIRST_ELEMENT));
    }

    @Override
    public GeoJson selectState(String stateName, Year electionYear){
        List<District> found =
            districts.findByStateNameAndYear(stateName, electionYear.getValue());
        if(found.isEmpty())
            return null;
        else
            return geoJson.buildGeoJson(found.get(CommonConstants.FIRST_ELEMENT));
    }
}
