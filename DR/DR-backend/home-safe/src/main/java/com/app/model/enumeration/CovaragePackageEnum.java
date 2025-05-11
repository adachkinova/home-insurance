package com.app.model.enumeration;

public enum CovaragePackageEnum {
	STANDARD(0.8),
	OPTIMAL(1.0),
	MAXIMUM(1.2);

	public final double coefficient;

	CovaragePackageEnum(double coefficient) {
		this.coefficient = coefficient;
	}

	public double getCoefficient() {
		return coefficient;
	}

	public static CovaragePackageEnum fromString(String coveragePackage) {
		try {
			return CovaragePackageEnum.valueOf(coveragePackage.toUpperCase());
		} catch (IllegalArgumentException e) {
			return STANDARD;  // Default coverage
		}
	}
}