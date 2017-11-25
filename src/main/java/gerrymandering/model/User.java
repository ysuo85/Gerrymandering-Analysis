package gerrymandering.model;
import javax.management.relation.Role;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;

import java.beans.Transient;
import java.util.Set;


@Entity
@Table(name = "users")
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        private int id;
        @Column(name = "username")
        private String username;
        @Column(name = "password")
        private String password;
        private String passwordConfirm;
        @Column(name = "enabled")
        private boolean enabled;


        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        @Transient
        public String getPasswordConfirm() {
            return passwordConfirm;
        }

        public void setPasswordConfirm(String passwordConfirm) {
            this.passwordConfirm = passwordConfirm;
        }

        public boolean getEnabled(){
            return enabled;
        }

        public void setEnabled(boolean enabled){
            this.enabled = enabled;
        }


}
