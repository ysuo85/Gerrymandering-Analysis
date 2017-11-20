package gerrymandering.model;

import com.vividsolutions.jts.geom.Polygon;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Table(name = "StateBoundaries")
public class StateBoundary extends AbstractBoundary implements Boundary, Serializable {
    @ManyToOne(targetEntity = State.class)
    @JoinColumn(name = "StateId", referencedColumnName = "Id")
    private State state;

    public State getState(){
        return state;
    }

    @Override
    public Polygon getShape() {
        return shape;
    }
}
