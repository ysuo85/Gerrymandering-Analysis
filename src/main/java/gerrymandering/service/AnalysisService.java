package gerrymandering.service;
import gerrymandering.measure.MeasureResults;

import java.util.Map;
import java.util.HashMap;

public class AnalysisService {
	private static final AnalysisService instance = new AnalysisService();
	
	private AnalysisService() {
	}

	public AnalysisService getInstance() {
		return instance;
	}

	public Map<String,MeasureResults> runMeasures() {
		// TODO: call EfficiencyGap, ConsistentAdvantage, LopsidedTest
		return new HashMap<String,MeasureResults>();
	}
}
	
