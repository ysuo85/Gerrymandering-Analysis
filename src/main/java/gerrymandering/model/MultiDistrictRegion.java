package gerrymandering.model;

import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
@MappedSuperclass
public abstract class MultiDistrictRegion extends BipartisanRegion implements Serializable {
    @ManyToMany(targetEntity = District.class)
    private List<District> districts;

    public MultiDistrictRegion(){
        super();
    }

    public List<District> getDistricts(){
        return null;
    }

    public void addDistrict(District district){

    }

    public void addDistricts(List<District> districts){

    }
}
