package gerrymandering.model;

import javax.persistence.*;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Table(name = "DistrictBoundaries")
public class DistrictBoundary extends Boundary {
    @ManyToOne(targetEntity = District.class)
    @JoinColumn(name = "DistrictId", referencedColumnName = "Id")
    private District district;

    public District getDistrict(){
        return district;
    }
}
