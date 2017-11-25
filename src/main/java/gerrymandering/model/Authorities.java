package gerrymandering.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "authorities")
public class Authorities {
    @Id
    private String username;
    @Column(name = "authority")
    private String authority;


    public String getUserName() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public String getRole() {
        return authority;
    }

    public void setRole(String authority) {
        this.authority = authority;
    }

}
