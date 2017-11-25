package gerrymandering.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import gerrymandering.common.CommonConstants;
import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "States")
public class State extends MultiDistrictRegion implements Serializable {
    @Id
	@GeneratedValue
	@Column(name = "Id")
	private Integer Id;
    @Column(name = "StateId")
	private Integer stateId;
    @Column(name = "StateName")
	private String stateName;
    @Column(name = "Year")
	private Integer year;
    @Column(name = "ClickCount")
	private Integer clickCount;
    @OneToMany(mappedBy = "state", cascade = CascadeType.ALL)
	private List<District> districtsInState = new ArrayList<>();
	@ManyToMany(cascade = CascadeType.ALL, targetEntity = Boundary.class)
    @JoinTable(name = "StateBoundaries",
               joinColumns = @JoinColumn(name = "StateId", referencedColumnName = "Id"),
	           inverseJoinColumns = @JoinColumn(name = "BoundaryId", referencedColumnName = "Id"))
	private List<Boundary> boundaries = new ArrayList<>();
    @Transient
	private List<SuperDistrict> superDistricts = new ArrayList<>();

	public State() {
		super();
	}

	@Override
	public List<District> getDistricts() {
	    return districtsInState;
	}

	@Override
	public Map<Party, Long> getVotes() {
	    Map<Party, Long> result = new HashMap<>();
	    List<Party> parties = Arrays.asList(Party.values());

	    parties.forEach(party -> {
	    	result.put(party, 0L);
		});

		districtsInState.forEach(district -> {
			parties.forEach(party -> {
				Long v = district.getPartyVotes(party);
				Long partyVotes = result.get(party);
				partyVotes += v;
				result.put(party, partyVotes);
			});
		});

	    return result;
	}

	@Override
	public Long getTotalVotes() {
	    Map<Party, Long> allParties = getVotes();
	    Long sum = 0L;
	    Collection<Long> allVotes = allParties.values();

	    for(Long vote : allVotes){
	    	sum += vote;
		}

		return sum;
	}

	@Override
	public Map<Party, Double> getPercentVotes() {
	    Long totalVotes = getTotalVotes();
	    Map<Party, Long> allVotes = getVotes();

		return allVotes
                .entrySet()
				.stream()
                .collect(
                    Collectors.toMap(
                        p -> p.getKey(),
						p -> p.getValue()
                                / new Double(totalVotes)
								* CommonConstants.PERCENT
					)
				);
	}

	@Override
	public Long getPartyVotes(Party party) {
		return getVotes().get(party);
	}

	@Override
	public Double getPartyPercent(Party party) {
	    return getPercentVotes().get(party);
	}

	@Override
	public Party getElectedParty() {
	    Map<Party, Long> districtElections =
            districtsInState
                .stream()
                .collect(
                    Collectors.groupingBy(
                        District::getElectedParty,
                        Collectors.counting()
					)
				);

	    Party electedParty =
            Collections.max(
                districtElections.entrySet(),
                Map.Entry.comparingByValue()
			).getKey();
	    return electedParty;
	}

	@Override
	public void addVotes(Map<Party, Votes> votes, Party party, Long numVotes) {
	    votes.get(party).addVotes(numVotes);
	}

	@Override
	public Long getTotalArea() {
	    return districtsInState
                .stream()
				.mapToLong(district -> district.getTotalArea())
				.sum();
	}

	@Override
	public Map<PopulationGroup, Long> getPopulationGroups() {
	    Map<PopulationGroup, Long> result = new HashMap<>();
	    List<PopulationGroup> ethnicGroups = Arrays.asList(PopulationGroup.values());

	    ethnicGroups.forEach(group -> {
	    	result.put(group, 0L);
		});
	    districtsInState.forEach(district -> {
	    	ethnicGroups.forEach(group -> {
	    	    Map<PopulationGroup, Long> groups = district.getPopulationGroups();
	    		Long groupInDist = result.get(group);
	    		if(groups.size() > 0)
                    groupInDist += groups.get(group);
	    		result.put(group, groupInDist);
			});
		});
	    return result;
	}

	@Override
	public Map<PopulationGroup, Double> getPopulationPercents() {
	    Map<PopulationGroup, Long> demographic = getPopulationGroups();
	    Long total = getTotalPopulation();

	    return demographic
				.entrySet()
				.stream()
				.collect(
                    Collectors.toMap(
                        p -> p.getKey(),
                        p -> p.getValue()
                                / new Double(total)
                                * CommonConstants.PERCENT
					)
				);
	}

	@Override
	public Long getTotalPopulation() {
	    return districtsInState
				.stream()
				.mapToLong(district -> district.getTotalPopulation())
				.sum();
	}

	@Override
	public Long getPopulation(PopulationGroup group) {
	    return getPopulationGroups().get(group);
	}

	@Override
	public Double getPercentPopulation(PopulationGroup group) {
	    return getPopulationPercents().get(group);
	}

	@Override
	public List<Boundary> getBoundaries() {
	    return boundaries;
	}

	public void addSuperDistrict(SuperDistrict s){
		superDistricts.add(s);
	}

	public void addSuperDistricts(List<SuperDistrict> s){
		superDistricts.addAll(s);
	}

	public List<SuperDistrict> getSuperDistricts(){
		return superDistricts;
	}

	public Year getYear(){
		return Year.of(year);
	}

	@JsonProperty(value = "year")
	public Integer getYearJackson() { return year; }

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
