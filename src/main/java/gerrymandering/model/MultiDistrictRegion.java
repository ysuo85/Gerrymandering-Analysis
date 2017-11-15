package gerrymandering.model;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
@MappedSuperclass
public abstract class MultiDistrictRegion extends BipartisanRegion implements Serializable {

    public MultiDistrictRegion(){
        super();
    }

    public abstract List<District> getDistricts();
}
