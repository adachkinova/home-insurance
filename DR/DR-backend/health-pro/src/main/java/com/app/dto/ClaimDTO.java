package com.app.dto;

import com.app.model.enumeration.ClaimStatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class ClaimDTO {

    @Schema(example = "id")
    private Long id;

    @Schema(example = "assetType")
    private String assetType;

    @Schema(example = "event")
    private String event;

    @Schema(example = "damageCause")
    private String damageCause;

    @Schema(example = "lossDescription")
    private String lossDescription;

    @Schema(example = "damageLevel")
    private String damageLevel;

    @Schema(example = "descriptionInput")
    private String descriptionInput;

    @Schema(example = "iban")
    private String iban;

    @Schema(example = "paid_date")
    private LocalDate paidDate;

    @Schema(example = "paidSum")
    private Double paidSum;

    @Schema(example = "claim_date")
    private LocalDate claimDate;

    @Schema(example="claim_number")
    private long claimNumber;

    @Schema(example = "claim")
    private String status;

    @Schema(example="egn")
    private String egn;

    @Schema
    private BigDecimal predictedClaimAmount;

    @Schema
    private String declineDescription ;

    @Schema
    private List<String> images;

    @Schema(example = "insured_property_id")
    private InsuredPropertyDTO insuredProperty;



}
