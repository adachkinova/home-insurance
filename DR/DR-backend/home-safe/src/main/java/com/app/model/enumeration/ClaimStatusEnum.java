package com.app.model.enumeration;

public enum ClaimStatusEnum {
	PENDING("PENDING"),
	APPROVED("APPROVED"),
	REJECTED("REJECTED");

	public final String claimStatus;

	ClaimStatusEnum(String claimStatus) {
		this.claimStatus = claimStatus;
	}

}