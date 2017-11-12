package gerrymandering.model;

import gerrymandering.common.PopulationGroup;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
public class HeatMap {
    protected List<PopulationGroup> ethnicGroups;

    public HeatMap(){

    }

    public List<PopulationGroup> getEthnicGroups(){
        return ethnicGroups;
    }

    public void setEthnicGroups(List<PopulationGroup> ethnicGroups){
        this.ethnicGroups = ethnicGroups;
    }
}
