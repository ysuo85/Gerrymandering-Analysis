package gerrymandering.model;

import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import java.time.Year;
import java.util.Map;

public abstract class BipartisanRegion {
    private Votes votes;
    private Year year;
    private Party electedParty;
    private Integer area;
    private Map<PopulationGroup, Integer> population;

	public BipartisanRegion() {
	}

	public Map<PopulationGroup, Double> getEthnicPercent(){
	    return null;
    }
}
