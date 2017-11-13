package gerrymandering.service;

import com.vividsolutions.jts.geom.Point;
import gerrymandering.model.District;
import gerrymandering.model.GeoRegion;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public class GeoCalculationService {
    public Point calculateCenter(GeoRegion region){
        return null;
    }

    public Double varianceFromCenter(GeoRegion region){
        return 0.0;
    }

    public Double calculatePerimeter(GeoRegion region){
        return 0.0;
    }

    public Double distance(Point a, Point b){
        return 0.0;
    }

    public GeoRegion mergeBoundaries(List<GeoRegion> boundaries){
        return null;
    }

    public List<District> findNeighbors(District district){
        return null;
    }
}
