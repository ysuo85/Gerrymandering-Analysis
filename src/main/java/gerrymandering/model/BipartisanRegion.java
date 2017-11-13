package gerrymandering.model;

import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import java.io.Serializable;
import java.util.Map;

public abstract class BipartisanRegion extends GeoRegion implements Serializable {
	public BipartisanRegion() {
	}
	public abstract Map<Party, Votes> getVotes();
	public abstract Map<Party, Double> getPercentVotes();
	public abstract Long getPartyVotes(Party party);
	public abstract Double getPartyPercent(Party party);
	public abstract Party getElectedParty();
	public abstract Integer getTotalArea();
	public abstract Map<PopulationGroup, Long> getTotalPopulation();
	public abstract Map<PopulationGroup, Double> getEthnicPercent();
	public abstract Long getPopulation(PopulationGroup group);
	public abstract Double getPopulationPercent(PopulationGroup group);
}
