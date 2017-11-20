package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Table(name = "DistrictBoundaries")
public class DistrictBoundary extends AbstractBoundary implements Boundary, Serializable {
    @ManyToOne(targetEntity = District.class)
    @JoinColumn(name = "DistrictId", referencedColumnName = "Id")
    private District district;

    public District getDistrict(){
        return district;
    }

    @Override
    public Polygon getShape() {
        return shape;
    }
}
