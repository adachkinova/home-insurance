package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PredictionInputDTO {
	@JsonProperty("PolicyType")
	private String policyType;

	@JsonProperty("ClaimType")
	private String claimType;

	@JsonProperty("DamageType")
	private String damageType;

	@JsonProperty("PropertySize")
	private String propertySize;

	@JsonProperty("Location")
	private String location;

	@JsonProperty("DamageSeverity")
	private String damageSeverity;

	@JsonProperty("LossDescription")
	private String lossDescription;

	@JsonProperty("CauseOfDamage")
	private String causeOfDamage;

	@JsonProperty("PreviousClaims")
	private String previousClaims;

}
