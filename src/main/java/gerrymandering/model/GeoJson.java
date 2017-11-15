package gerrymandering.model;

import gerrymandering.measure.MeasureResults;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class GeoJson {
	private String json;
	private List<MeasureResults> results;

	public GeoJson() {
		results = new ArrayList<>();
	}

	public GeoJson(String geojson){
	    this();
		this.json = geojson;
	}

	public void addMeasureResults(MeasureResults r){
		results.add(r);
	}

	public void addAllMeasureResults(List<MeasureResults> r){
		results.addAll(r);
	}

	public List<MeasureResults> getMeasureResults(){
		return results;
	}
}
