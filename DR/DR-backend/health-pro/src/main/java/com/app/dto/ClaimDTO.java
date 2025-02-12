package com.app.dto;

import com.app.model.model.InsuredProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

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

    @Schema(example = "claim_date")
    private LocalDate claimDate;

    @Schema(example="claim_number")
    private long claimNumber;

    @Schema(example="egn")
    private String egn;

    private BigDecimal predictedClaimAmount;

    @Schema(example = "insured_property_id")
    private InsuredPropertyDTO insuredProperty;
}
