public class AnalysisService {
	private static final AnalysisService instance = new AnalysisService();
	
	private AnalysisService() {
	}

	public AnalysisService getInstance() {
		return instance;
	}

	public Map<String,MeasureResult> runMeasures() {
		// TODO: call EfficiencyGap, ConsistentAdvantage, LopsidedTest
		return new Map<String,MeasureResult>();
	}

}
	
