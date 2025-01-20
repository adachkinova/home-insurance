package com.app.model.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInputData {

    @JsonProperty("policy")
    private Policy policy;

    @JsonProperty("insuredProperty")
    private InsuredProperty insuredProperty;

    @JsonProperty("propertyOwner")
    private PropertyOwner propertyOwner;
}
