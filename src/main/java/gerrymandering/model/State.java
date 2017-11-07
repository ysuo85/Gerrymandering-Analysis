package gerrymandering.model;

import java.util.List;

public class State extends MultiDistrictRegion {
	private List<SuperDistrict> superDistricts;
	private String stateName;

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
}
