package gerrymandering.service;

import gerrymandering.model.District;
import gerrymandering.model.GeoJson;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;
import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public interface GeoRenderingService {
    public GeoJson buildGeoJson(List<State> states);

    public GeoJson buildGeoJson(State state);

    public GeoJson buildGeoJson(District district);

    public GeoJson buildGeoJson(SuperDistrict superDistrict);
}
