package gerrymandering.service;
import gerrymandering.measure.MeasureResults;

import java.util.Map;
import java.util.HashMap;

public interface AnalysisService {
	public Map<String,MeasureResults> runMeasures();
}
	
