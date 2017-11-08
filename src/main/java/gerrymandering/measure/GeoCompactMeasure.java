package gerrymandering.measure;

import gerrymandering.model.District;
import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.State;
import gerrymandering.model.SuperDistrict;

import java.util.List;

/**
 * Created by yisuo on 11/7/17.
 */
public class GeoCompactMeasure implements Measure {
    private List<SuperDistrict> findAllCombinations(List<District> selected, State state){
        return null;
    }

    private Double calculateGeoCompactness(SuperDistrict s){
        return 0.0;
    }

    private Boolean validateCompactness(Double compactness, List<SuperDistrict> allCombinations){
        return false;
    }

    private Boolean containsASuperDistrict(State state){
        return false;
    }

    @Override
    public MeasureResults runMeasure(MultiDistrictRegion region) {
        return null;
    }
}
