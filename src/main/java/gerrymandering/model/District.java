package gerrymandering.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/7/17.
 */

@Entity
@Table(name = "Districts")
@AttributeOverride(name = "area", column = @Column(name = "Area"))
public class District extends BipartisanRegion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "DistrictId")
    private Integer districtNo;
    @Column(name = "clickCount")
    private Integer clickCount;
    @ManyToOne
    private State state;
}
