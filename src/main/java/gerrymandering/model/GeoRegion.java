package gerrymandering.model;

import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
public class GeoRegion {
    private List<LatLong> shape;

    public GeoRegion(){

    }

    public List<LatLong> getShape(){
        return shape;
    }
}
