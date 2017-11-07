package gerrymandering.model;

import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
public abstract class MultiDistrictRegion extends BipartisanRegion {
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
