package gerrymandering.service;

import com.vividsolutions.jts.geom.Point;
import gerrymandering.model.District;
import gerrymandering.model.GeoRegion;
import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public interface GeoCalculationService {
    public Point calculateCenter(GeoRegion region);

    public Double varianceFromCenter(GeoRegion region);

    public Double calculatePerimeter(GeoRegion region);

    public Double distance(Point a, Point b);

    public GeoRegion mergeBoundaries(List<GeoRegion> boundaries);

    public List<District> findNeighbors(District district);
}
