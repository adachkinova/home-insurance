package com.app.dto;

import com.app.model.model.Claim;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ClaimByIdDTO {
    public Claim claim;

    public BigDecimal maxLimitValue;

}
