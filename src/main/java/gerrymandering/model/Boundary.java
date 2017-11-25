package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

import javax.persistence.*;

/**
 * Created by yisuo on 11/17/17.
 */
@Entity
@Table(name = "Boundaries")
public class Boundary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Integer Id;
    @Column(name = "Shape", columnDefinition = "Polygon")
    public Polygon shape;

    public Polygon getShape(){
        return shape;
    };
}