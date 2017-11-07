package gerrymandering.service;
import gerrymandering.measure.MeasureResult;

import java.util.Map;
import java.util.HashMap;

public class AnalysisService {
	private static final AnalysisService instance = new AnalysisService();
	
	private AnalysisService() {
	}

	public AnalysisService getInstance() {
		return instance;
	}

	public Map<String,MeasureResult> runMeasures() {
		// TODO: call EfficiencyGap, ConsistentAdvantage, LopsidedTest
		return new HashMap<String,MeasureResult>();
	}
}
	
