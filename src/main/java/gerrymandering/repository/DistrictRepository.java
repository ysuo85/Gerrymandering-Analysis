package gerrymandering.repository;

import gerrymandering.model.District;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by yisuo on 11/12/17.
 */
@Repository
public interface DistrictRepository extends CrudRepository<District, Integer> {
}
