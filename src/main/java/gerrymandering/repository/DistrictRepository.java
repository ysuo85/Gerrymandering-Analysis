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

    @Query(value = "SELECT * FROM Districts d" +
                   "INNER JOIN States s ON d.StateId = s.Id" +
                   "WHERE d.DistrictId = ?1" +
                   "AND s.StateName = ?2" +
                   "AND s.Year = ?3",
           nativeQuery = true)
    List<District> findByDistrictNoAndStateNameAndYear(Integer districtNo, String stateName,
                                                       Integer year);

    @Query(value = "SELECT * FROM Districts d" +
                   "INNER JOIN States s ON d.StateId = s.Id" +
                   "WHERE d.StateId = ?1" +
                   "AND s.Year = ?2",
           nativeQuery = true)
    List<District> findByStateIdAndYear(Integer stateId, Integer year);

    @Query(value = "SELECT * FROM Districts d" +
                   "INNER JOIN States s ON d.StateId = s.Id" +
                   "WHERE d.StateName = ?1" +
                   "AND s.Year = ?2",
           nativeQuery = true)
    List<District> findByStateNameAndYear(String stateName, Integer year);

    List<District> findAll();
}
