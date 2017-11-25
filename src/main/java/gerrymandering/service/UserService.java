package gerrymandering.service;

import gerrymandering.model.User;
import gerrymandering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("UserService")
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String email) {
        return userRepository.findByUsername(email);
    }

    public User findById(String Id) {
        return userRepository.findById(Id);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

}