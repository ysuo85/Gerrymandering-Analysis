package gerrymandering.model;

public class GeoJson {

	private final String stateName;

	public GeoJson(String stateName) {
		this.stateName = stateName;
	}

	public String getStateName() {
		return stateName;
	}
}
