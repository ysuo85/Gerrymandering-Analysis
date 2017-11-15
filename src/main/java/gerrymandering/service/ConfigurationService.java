package gerrymandering.service;

import gerrymandering.model.GeoJson;
import gerrymandering.model.State;

/**
 * Created by yisuo on 11/12/17.
 */
public interface ConfigurationService {
    public GeoJson generateUSGeoJson();

    public State getStateByZipcode(Integer zipcode);
}
