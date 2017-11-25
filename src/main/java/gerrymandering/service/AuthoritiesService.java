package gerrymandering.service;

import gerrymandering.model.Authorities;
import gerrymandering.repository.AuthoritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("authoritiesService")
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;

    @Autowired
    public AuthoritiesService(AuthoritiesRepository authoritiesRepository) {
        this.authoritiesRepository = authoritiesRepository;
    }

    public Authorities findByUsername(String email) {
        return authoritiesRepository.findByUsername(email);
    }


    public void saveAuthorities(Authorities authorities) {
        authoritiesRepository.save(authorities);
    }

}