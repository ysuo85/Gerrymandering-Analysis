package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;
import java.io.Serializable;
import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
public abstract class GeoRegion implements Serializable {
    public GeoRegion(){

    }
    public abstract List<Boundary> getBoundaries();
}
