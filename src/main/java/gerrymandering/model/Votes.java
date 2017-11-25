package gerrymandering.model;

import gerrymandering.common.Party;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yisuo on 11/7/17.
 */
@Entity
@Table(name = "Votes")
public class Votes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "voteId")
    private Integer voteId;
    @ManyToOne(targetEntity = District.class)
    @JoinColumn(name = "DistrictId", referencedColumnName = "Id")
    private District district;
    @Enumerated(EnumType.STRING)
    @Column(name = "Party")
    private Party party;
    @Column(name = "voteCount")
    private Long voteCount;

    public Votes(){
        this.voteCount = 0L;
    }

    public Votes(Party party){
        this.party = party;
        this.voteCount = 0L;
    }

    public Votes(Party party, Long voteCount){
        this.party = party;
        this.voteCount = voteCount;
    }

    public Votes(District district, Party party, Long voteCount){
        this.district = district;
        this.party = party;
        this.voteCount = voteCount;
    }

    public District getDistrict() {
        return district;
    }

    public Party getParty() {
        return party;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void addVotes(Long votes){
        this.voteCount += votes;
    }
}
