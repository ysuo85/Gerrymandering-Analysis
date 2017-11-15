package gerrymandering.repository;

import gerrymandering.model.Votes;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Created by yisuo on 11/14/17.
 */
public interface VotesRepository extends CrudRepository<Votes, Integer> {
    List<Votes> findAll();
}
