package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

import javax.persistence.*;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Boundaries")
public abstract class Boundary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Integer Id;
    @Column(name = "Shape", columnDefinition = "POLYGON")
    protected Polygon shape;

    public Polygon getShape(){
        return shape;
    }
}
