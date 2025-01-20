package com.app.model.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "policy_old")
public class PolicyOld {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "policy_number")
    private long policyNumber;

    @Column(name = "dental_limit")
    private BigDecimal dentalLimit;

    @Column(name = "hospital_limit")
    private BigDecimal hospitalLimit;

    @Column(name = "out_of_hospital_limit")
    private BigDecimal outOfHospitalLimit;

    @Column(name = "health_goods_limit")
    private BigDecimal healthGoodsLimit;

    @Column(name = "price")
    private BigDecimal price;

}
