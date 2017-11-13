package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;
import gerrymandering.common.Party;
import gerrymandering.common.PopulationGroup;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Map;

/**
 * Created by yisuo on 11/7/17.
 */

@Entity
@Table(name = "Districts")
@AttributeOverride(name = "area", column = @Column(name = "Area"))
public class District extends BipartisanRegion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "DistrictId")
    private Integer districtNo;
    @Column(name = "Area")
    private Long area;
    @Column(name = "clickCount")
    private Integer clickCount;
    @ManyToOne(targetEntity = State.class)
    private State state;
    @OneToMany(mappedBy = "district")
    @MapKeyEnumerated(EnumType.STRING)
    private Map<Party, Votes> votes;
    @ElementCollection
    @CollectionTable(name = "Population", joinColumns = @JoinColumn(name = "DistrictId"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "Name")
    @Column(name = "Population")
    private Map<PopulationGroup, Long> population;
    @JoinColumns({
            @JoinColumn(table = "DistrictBoundaries", name = "Id",
                        referencedColumnName = "DistrictId"),
            @JoinColumn(table = "Boundaries", name = "BoundaryId", referencedColumnName = "Id")
    })
    @Column(name = "Shape")
    private Polygon shape;

    public Party winningParty(){
        return null;
    }

    public Party losingParty(){
        return null;
    }

    public Integer getVotes(Party party){
        return null;
    }

    public void addVotes(Party party, Integer votes){

    }

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
}
