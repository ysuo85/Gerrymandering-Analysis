package gerrymandering.repository;

import gerrymandering.model.District;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by yisuo on 11/12/17.
 */
@Repository
public interface DistrictRepository extends CrudRepository<District, Integer> {
    @Query(value = "SELECT * FROM Districts d" +
                   "INNER JOIN States s ON d.StateId = s.Id" +
                   "WHERE d.DistrictId = ?1" +
                     "AND d.StateId = ?2" +
                     "AND s.Year = ?3",
           nativeQuery = true)
    List<District> findByDistrictNoAndStateIdAndYear(Integer districtNo, Integer stateId,
                                                     Integer year);
    List<District> findByDistrictNoAndStateId(Integer districtNo, Integer stateId);

    List<District> findAll();
}
