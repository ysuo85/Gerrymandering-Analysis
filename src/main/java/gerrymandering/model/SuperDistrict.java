package gerrymandering.model;

import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import java.util.List;
import java.util.Map;

/**
 * Created by yisuo on 11/7/17.
 */
public class SuperDistrict extends MultiDistrictRegion {
    private String stateName;

    @Override
    public List<Boundary> getBoundaries() {
        return null;
    }

    @Override
    public Map<Party, Long> getVotes() {
        return null;
    }

    @Override
    public Long getTotalVotes() {
        return null;
    }

    @Override
    public Map<Party, Double> getPercentVotes() {
        return null;
    }

    @Override
    public Long getPartyVotes(Party party) {
        return null;
    }

    @Override
    public Double getPartyPercent(Party party) {
        return null;
    }

    @Override
    public Party getElectedParty() {
        return null;
    }

    @Override
    public void addVotes(Map<Party, Votes> votes, Party party, Long numVotes) {

    }

    @Override
    public Long getTotalArea() {
        return null;
    }

    @Override
    public Map<PopulationGroup, Long> getPopulationGroups() {
        return null;
    }

    @Override
    public Map<PopulationGroup, Double> getPopulationPercents() {
        return null;
    }

    @Override
    public Long getTotalPopulation() {
        return null;
    }

    @Override
    public Long getPopulation(PopulationGroup group) {
        return null;
    }

    @Override
    public Double getPercentPopulation(PopulationGroup group) {
        return null;
    }

    @Override
    public List<District> getDistricts() {
        return null;
    }
}

