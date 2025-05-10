package com.app.service;

import com.app.model.model.*;
import com.app.repository.InsuredPropertyRepository;
import com.app.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PolicyService {

	@Autowired
	private PolicyRepository policyRepository;

	@Autowired
	private PropertyOwnerService propertyOwnerService;

	@Autowired
	private InsuredPropertyRepository insuredPropertyRepository;

	@Scheduled(cron = "0 0 0 * * *", zone = "Europe/Sofia")
	public void checkPolicies() {
		Date date = new Date();
		this.policyRepository.removeOlderThan(date);
	}

	public Policy savePolicyData(UserInputData userInputData) {
		InsuredProperty insuredProperty = userInputData.getInsuredProperty();
		Policy policy = userInputData.getPolicy();
		PropertyOwner propertyOwner = userInputData.getPropertyOwner();
		long policyLast = policyRepository.findLastPolicyNumber(); //TODO

		if(insuredProperty != null && policy != null && propertyOwner != null) {
			PropertyOwner owner = propertyOwnerService.savePropertyOwner(userInputData);
			insuredProperty.setPropertyOwner(owner);

			policy.setPolicyNumber(policyLast + 1);
			Policy savedPolicy = policyRepository.save(policy);
			insuredProperty.setPolicy(savedPolicy);

			insuredPropertyRepository.save(insuredProperty);
			return policy;
		} else {
			throw new IllegalArgumentException("Input data contains null values!");
		}
	}



	public static PolicyResponse buildPolicyResponse(Policy policy) {
		PolicyResponse policyResponse = new PolicyResponse();
		policyResponse.setIsNewUserCreated(true);
		policyResponse.setPolicyNumber(policy.getPolicyNumber());
		return policyResponse;
	}

}
