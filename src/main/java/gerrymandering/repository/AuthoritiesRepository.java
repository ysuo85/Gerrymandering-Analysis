package gerrymandering.repository;
import gerrymandering.model.Authorities;
import org.springframework.data.repository.CrudRepository;

public interface AuthoritiesRepository extends CrudRepository<Authorities, Long> {
    Authorities findByUsername(String username);
}

