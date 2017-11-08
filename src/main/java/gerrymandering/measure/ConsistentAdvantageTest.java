package gerrymandering.measure;

import gerrymandering.model.District;
import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.State;
import java.util.List;

public class ConsistentAdvantageTest implements Measure {
    private List<Double> winnerPercentages;

	public MeasureResults runConsistentAdvantageTest(){
		return null;
	}

	public Double meanMedianDifference(State state){
		return 0.0;
	}

	public Double winningPercentage(District district){
		return 0.0;
	}

	public Double addPercentage(Double percentage){
		return 0.0;
	}

	@Override
	public MeasureResults runMeasure(MultiDistrictRegion region) {
		return null;
	}
}
