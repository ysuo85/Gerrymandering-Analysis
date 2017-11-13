package gerrymandering.model;

import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Map;

@MappedSuperclass
public abstract class BipartisanRegion extends GeoRegion implements Serializable {
    private Votes votes;
    private Party electedParty;
    private Integer area;
    private Map<PopulationGroup, Integer> population;

	public BipartisanRegion() {
	}

	public Map<PopulationGroup, Double> getEthnicPercent(){
	    return null;
    }

}
