package gerrymandering.service;

import gerrymandering.model.District;
import gerrymandering.model.State;

/**
 * Created by yisuo on 11/12/17.
 */
public interface MonitorService {
    public void registerStateSelected(State state);

    public void registerDistrictSelected(District district);

    public void registerWhatIfStateSelected(State state);
}
