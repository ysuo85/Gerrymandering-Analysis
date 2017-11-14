package gerrymandering.repository;

import gerrymandering.model.Votes;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by yisuo on 11/14/17.
 */
public interface VotesRepository extends CrudRepository<Votes, Integer> {
}
