package gerrymandering.model;

import java.util.Map;

/**
 * Created by yisuo on 11/12/17.
 */
public class StateHeatMap extends HeatMap {
    private String stateName;
    private Map<String, Double> districtsDensity;

    public StateHeatMap(){
        super();
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public Map<String, Double> getDistrictsDensity() {
        return districtsDensity;
    }

    public void setDistrictsDensity(Map<String, Double> districtsDensity) {
        this.districtsDensity = districtsDensity;
    }
}
