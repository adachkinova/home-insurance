package com.app.dto;

import com.app.model.model.Policy;
import com.app.model.model.PropertyOwner;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;

@Data
public class InsuredPropertyDTO {

    @Schema(name = "address")
    private long id;

    @Schema(name = "city")
    private String city;

    @Schema(name = "property_type")
    private String propertyType;

    @Schema(name = "risk")
    private double risk;

    @Schema(name = "size")
    private String size;

    @Schema(name = "address")
    private String address;

    @Schema(name = "address")
    private PropertyOwner propertyOwner;

    @Schema(name = "address")
    private Policy policy;
}
