package gerrymandering.model;

import javax.persistence.*;

/**
 * Created by yisuo on 11/14/17.
 */
@Entity
@Table(name = "StateBoundaries")
public class StateBoundary extends Boundary {
    @ManyToOne(targetEntity = State.class)
    @JoinColumn(name = "StateId", referencedColumnName = "Id")
    private State state;

    public State getState(){
        return state;
    }
}
