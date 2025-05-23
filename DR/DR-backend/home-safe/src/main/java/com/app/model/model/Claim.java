package com.app.model.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "claim")

public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "assetType")
    private String assetType;

    @Column(name = "event")
    private String event;

    @Column(name = "damageCause")
    private String damageCause;

    @Column(name = "lossDescription")
    private String lossDescription;

    @Column(name = "damageLevel")
    private String damageLevel;

    @Column(name = "descriptionInput")
    private String descriptionInput;

    @Column(name = "iban")
    private String iban;

    @Column(name = "claim_date")
    private LocalDate claimDate;

    @Column(name="claim_number")
    private long claimNumber;

    @JsonProperty("egn")
    private String egn;

    @Column(name = "paidDate")
    private LocalDate paidDate;

    @Column(name = "paidSum")
    private Double paidSum;

    @Column(name = "declineDescription")
    private String declineDescription ;

    @Column(name = "status")
    private String status;

    @JsonProperty("insuredProperty")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "insured_property_id")
    private InsuredProperty insuredProperty;

    @JsonProperty("images")
    private String images;
}
