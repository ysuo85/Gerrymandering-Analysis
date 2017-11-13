package gerrymandering.model;

import gerrymandering.common.PopulationGroup;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/13/17.
 */
public class Population implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
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

    public void setName(PopulationGroup name) {
        this.name = name;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
