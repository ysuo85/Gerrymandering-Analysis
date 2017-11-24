package gerrymandering.model;

import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import java.io.Serializable;
import java.util.Map;

public abstract class BipartisanRegion extends GeoRegion implements Serializable {
	public BipartisanRegion() {
		super();
	}

	public abstract Map<Party, Long> getVotes();
	public abstract Long getTotalVotes();
	public abstract Map<Party, Double> getPercentVotes();
	public abstract Long getPartyVotes(Party party);
	public abstract Double getPartyPercent(Party party);
	public abstract Party getElectedParty();
	public abstract void addVotes(Map<Party, Votes> votes, Party party, Long numVotes);
	public abstract Long getTotalArea();
	public abstract Map<PopulationGroup, Long> getPopulationGroups();
	public abstract Map<PopulationGroup, Double> getPopulationPercents();
	public abstract Long getTotalPopulation();
	public abstract Long getPopulation(PopulationGroup group);
	public abstract Double getPercentPopulation(PopulationGroup group);
}
