package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;
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
    public Polygon getShape() {
        return null;
    }

    @Override
    public Map<Party, Votes> getVotes() {
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
    public Integer getTotalArea() {
        return null;
    }

    @Override
    public Map<PopulationGroup, Long> getTotalPopulation() {
        return null;
    }

    @Override
    public Map<PopulationGroup, Double> getEthnicPercent() {
        return null;
    }

    @Override
    public Long getPopulation(PopulationGroup group) {
        return null;
    }

    @Override
    public Double getPopulationPercent(PopulationGroup group) {
        return null;
    }

    @Override
    public List<District> getDistricts() {
        return null;
    }
}
