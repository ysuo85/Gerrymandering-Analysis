package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Boundaries")
public abstract class AbstractBoundary implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Integer Id;
    @Column(name = "Shape", columnDefinition = "Polygon")
    protected Polygon shape;
}
