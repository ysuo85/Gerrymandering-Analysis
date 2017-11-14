package gerrymandering.repository;

import gerrymandering.model.Population;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by yisuo on 11/14/17.
 */
public interface PopulationRepository extends CrudRepository<Population, Integer> {
}
