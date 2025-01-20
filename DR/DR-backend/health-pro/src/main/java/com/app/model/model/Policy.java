package com.app.model.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "POLICY")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @JsonProperty("startDate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private LocalDate startDate;

    @JsonProperty("endDate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private LocalDate endDate;

    @JsonProperty("policyNumber")
    @Column(name = "policyNumber", unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "policy_number_seq")
    @SequenceGenerator(name = "policy_number_seq", sequenceName = "policy_number_seq", allocationSize = 1)
    private long policyNumber;

    @JsonProperty("coveragePackage")
    @Column(name = "coverage_package")
    private String coveragePackage;

    @JsonProperty("insuranceAmount")
    @Column(name = "insurance_amount")
    private Integer insuranceAmount;

    @JsonProperty("insuranceMovablePropertyAmount")
    @Column(name = "insurance_movable_property_amount")
    private Integer insuranceMovablePropertyAmount;

    @JsonProperty("price")
    @Column(name = "price")
    private BigDecimal price;
}
