package gerrymandering.repository;

import gerrymandering.model.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Created by yisuo on 11/13/17.
 */
@Repository
public interface StateRepository extends CrudRepository<State, Integer> {
    List<State> findByStateIdAndYear(Integer stateId, Integer year);
    List<State> findByStateNameAndYear(String stateName, Integer year);
    List<State> findByStateId(Integer stateId);
    List<State> findByStateName(String stateName);
    List<State> findByYear(Integer year);
    List<State> findAll();
}
