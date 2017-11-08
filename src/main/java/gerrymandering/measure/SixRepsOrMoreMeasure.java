package gerrymandering.measure;

import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;

/**
 * Created by yisuo on 11/7/17.
 */
public class SixRepsOrMoreMeasure implements Measure {
    private Boolean checkNumDistricts(SuperDistrict s){
        return false;
    }

    private Boolean checkNumOfSuperDistricts(State state){
        return false;
    }

    private Boolean checkNumOfRepsPerSuperDistrict(SuperDistrict s){
        return false;
    }

    @Override
    public MeasureResults runMeasure(MultiDistrictRegion region) {
        return null;
    }
}
