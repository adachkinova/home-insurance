package com.app.model.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "INSURED_PROPERTY")
public class InsuredProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @JsonProperty("city")
    @Column(name = "city")
    private String city;

    @JsonProperty("propertyType")
    @Column(name = "property_type")
    private String propertyType;

    @JsonProperty("risk")
    @Column(name = "risk")
    private double risk;

    @JsonProperty("size")
    @Column(name = "size")
    private String size;

    @JsonProperty("address")
    @Column(name = "address")
    private String address;

    @JsonProperty("propertyOwner")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "property_owner_id")
    private PropertyOwner propertyOwner;

    @JsonProperty("policy")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policy_id")
    private Policy policy;
}
