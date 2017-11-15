package gerrymandering.service;

import gerrymandering.model.District;
import gerrymandering.model.State;

/**
 * Created by yisuo on 11/12/17.
 */
public interface AdminService {
    public void invite(String email);

    public Boolean signup(String email, String pw);

    public Integer stateVisited(State state);

    public Integer districtVisted(District district);

    public Integer whatIfStateCombined(State state);
}
