package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

/**
 * Created by yisuo on 11/17/17.
 */
public interface Boundary {
    public Polygon getShape();
}
