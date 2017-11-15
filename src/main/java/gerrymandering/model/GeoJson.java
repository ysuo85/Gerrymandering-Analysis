package gerrymandering.model;

import gerrymandering.measure.MeasureResults;
import org.wololo.geojson.FeatureCollection;

import java.util.ArrayList;
import java.util.List;

public class GeoJson {
	private FeatureCollection json;
	private List<MeasureResults> results;

	public GeoJson() {
		results = new ArrayList<>();
	}

	public GeoJson(FeatureCollection geojson){
	    this();
		this.json = geojson;
	}

	public void addMeasureResults(MeasureResults r){
		results.add(r);
	}

	public void addAllMeasureResults(List<MeasureResults> r){
		results.addAll(r);
	}

	public FeatureCollection getJson(){
		return json;
	}

	public List<MeasureResults> getMeasureResults(){
		return results;
	}
}
