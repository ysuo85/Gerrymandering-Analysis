package gerrymandering.service;

import gerrymandering.model.GeoJson;
import gerrymandering.model.State;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public interface ConfigurationService {
    public GeoJson generateUSGeoJson(Integer year);

    public State getStateByZipcode(Integer zipcode);

    public List<Integer> getAllYears();

    public List<String> getAllStateNames();
}
