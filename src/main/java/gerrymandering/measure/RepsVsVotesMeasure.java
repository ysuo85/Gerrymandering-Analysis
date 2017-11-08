package gerrymandering.measure;

import gerrymandering.model.MultiDistrictRegion;
import gerrymandering.model.SuperDistrict;

import java.time.Year;
import java.util.Map;
import java.util.Set;

/**
 * Created by yisuo on 11/7/17.
 */
public class RepsVsVotesMeasure implements Measure {
    private Map<Year, SuperDistrict> getPastElectionData(SuperDistrict s, Year electionYear){
        return null;
    }

    private Map<Year, Map<Year, SuperDistrict>> redistrictingHappenedAt(Set<Year> electionYearss,
        Set<Year> redistrictingYears){
        return null;
    }

    private Boolean isRepsVsVotesFair(Map<Year, SuperDistrict> threeMostRecentElections){
        return false;
    }

    @Override
    public MeasureResults runMeasure(MultiDistrictRegion region) {
        return null;
    }
}
