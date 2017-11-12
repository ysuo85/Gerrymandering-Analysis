package gerrymandering.model;

import java.util.Map;

/**
 * Created by yisuo on 11/12/17.
 */
public class CountryHeatMap extends HeatMap {
    private Map<String, Double> stateDensity;

    public CountryHeatMap(){
        super();
    }

    public Map<String, Double> getStateDensity(){
        return stateDensity;
    }

    public void setStateDensity(Map<String, Double> stateDensity){
        this.stateDensity = stateDensity;
    }
}
