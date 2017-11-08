package gerrymandering.measure;

import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.State;

import java.util.List;

public class LopsidedTest implements Measure {
    private Double lopsidedThreshold;

	private MeasureResults runLopsidedTest(State state){
		return null;
	}

	private List<Double> votesPercentages(State state){
		return null;
	}

	private Double tTest(List<Double> a, List<Double> b){
		return 0.0;
	}

	private Boolean exceedsThreshold(Double result, Double threshold){
		return false;
	}

	@Override
	public MeasureResults runMeasure(MultiDistrictRegion region) {
		return null;
	}
}
