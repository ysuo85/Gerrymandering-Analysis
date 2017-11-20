package gerrymandering.service;
import gerrymandering.measure.MeasureResults;

import java.util.Map;

public interface AnalysisService {
	public Map<String,MeasureResults> runMeasures();
}
	
