package gerrymandering.service;

import gerrymandering.common.PopulationGroup;
import gerrymandering.model.District;
import gerrymandering.model.State;
import java.util.List;

/**
 * Created by yisuo on 11/9/17.
 */
public interface DemographicService {
    public Double getPopulationDensity(State state, List<PopulationGroup> ethnicGroups);

    public Double getPopulationDensity(District district, List<PopulationGroup> ethnicGroups);

    public Double getPopulationDensity(State state);

    public Double getPopulationDensity(District district);
}
