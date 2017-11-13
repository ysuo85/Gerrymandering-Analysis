package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;
import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/7/17.
 */
@Entity
@Table(name = "Boundaries")
public class GeoRegion implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @Column(columnDefinition =  "POLYGON", name = "Shape")
    private Polygon shape;

    public GeoRegion(){

    }

    public Polygon getShape(){
        return shape;
    }

    public Integer id(){
        return id;
    }
}
