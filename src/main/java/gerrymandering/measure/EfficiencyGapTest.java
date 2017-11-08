package gerrymandering.measure;

import gerrymandering.model.District;
import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.State;

public class EfficiencyGapTest implements Measure {
    private Integer winnerVoteCount;
    private Integer loserVoteCount;

	private MeasureResults runEfficiencyGapTest(State state){
		return null;
	}

	private Integer totalWastedVotes(State state){
		return 0;
	}

	private Integer wastedVotesPerDistrict(District district){
		return 0;
	}

	private Integer sumVotes(Integer votes){
		return 0;
	}

    @Override
    public MeasureResults runMeasure(MultiDistrictRegion region) {
        return null;
    }
}
