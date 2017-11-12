package gerrymandering.service;

import gerrymandering.model.District;
import gerrymandering.model.GeoRegion;
import gerrymandering.model.LatLong;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public class GeoCalculationService {
    public LatLong calculateCenter(GeoRegion region){
        return null;
    }

    public Double varianceFromCenter(GeoRegion region){
        return 0.0;
    }

    public Double calculatePerimeter(GeoRegion region){
        return 0.0;
    }

    public Double distance(LatLong a, LatLong b){
        return 0.0;
    }

    public GeoRegion mergeBoundaries(List<GeoRegion> boundaries){
        return null;
    }

    public List<District> findNeighbors(District district){
        return null;
    }
}
