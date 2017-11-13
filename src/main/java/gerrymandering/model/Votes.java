package gerrymandering.model;

import gerrymandering.common.Party;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;

/**
 * Created by yisuo on 11/7/17.
 */
@Entity
@Table(name = "Votes")
public class Votes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer voteId;
    @ManyToOne(targetEntity = District.class)
    private District district;
    @Enumerated(EnumType.STRING)
    private Party party;
    @Column(name = "voteCount")
    private Long voteCount;

    public Votes(){

    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }
}
