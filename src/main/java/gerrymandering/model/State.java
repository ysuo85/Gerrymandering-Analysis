package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;
import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Year;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "States")
public class State extends MultiDistrictRegion implements Serializable {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
    @Column(name = "StateId")
	private Integer stateId;
    @Column(name = "StateName")
	private String stateName;
    @Column(name = "Year")
	private Integer year;
    @Column(name = "ClickCount")
	private Integer clickCount;
    @OneToMany(mappedBy = "state")
	private List<District> districtsInState;
	@JoinColumns({
        @JoinColumn(table = "StateBoundaries", name = "Id", referencedColumnName = "StateId"),
        @JoinColumn(table = "Boundaries", name = "BoundaryId", referencedColumnName = "Id")
	})
    @Column(name = "Shape")
	private Polygon shape;
    @Transient
	private List<SuperDistrict> superDistricts;

	public State() {
		super();
	}

	@Override
	public List<District> getDistricts() {
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
	public Polygon getShape() {
		return null;
	}

	public void addSuperDistrict(SuperDistrict s){

	}

	public void addSuperDistricts(List<SuperDistrict> s){

	}

	public List<SuperDistrict> getSuperDistricts(){
		return superDistricts;
	}

	public Year getYear(){
		return Year.of(year);
	}

	public Integer getStateId() {
		return stateId;
	}

	public String getStateName() {
		return stateName;
	}

	public Integer getClickCount() {
		return clickCount;
	}
}
