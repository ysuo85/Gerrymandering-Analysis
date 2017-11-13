package gerrymandering.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Year;
import java.util.List;

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

    @Transient
	private List<SuperDistrict> superDistricts;

	public State() {
		super();
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
