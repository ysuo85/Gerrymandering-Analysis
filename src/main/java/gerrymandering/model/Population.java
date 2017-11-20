package gerrymandering.model;

import gerrymandering.common.PopulationGroup;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/13/17.
 */
@Entity
@Table(name = "Population")
public class Population implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    @Column(name = "Name")
    @Enumerated(EnumType.STRING)
    private PopulationGroup name;
    @Column(name = "Population")
    private Long population;
    @ManyToOne(targetEntity = District.class)
    private District district;

    public Population(){

    }

    public PopulationGroup getName() {
        return name;
    }

    public Long getPopulation() {
        return population;
    }

    public District getDistrict() {
        return district;
    }
}
