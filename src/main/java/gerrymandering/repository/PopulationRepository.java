package gerrymandering.repository;

import gerrymandering.model.Population;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Created by yisuo on 11/14/17.
 */
public interface PopulationRepository extends CrudRepository<Population, Integer> {
    List<Population> findAll();
}
