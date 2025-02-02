package com.app.service;

import com.app.model.entitites.User;
import com.app.model.model.*;
import com.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;

@Service
public class PolicyService {

	@Autowired
	private PolicyRepository policyRepository;

	@Autowired
	private PropertyOwnerRepository propertyOwnerRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private EmailSenderService senderService;

	@Autowired
	private InsuredPropertyRepository insuredPropertyRepository;

	@Autowired
	private PersonPolicyRepository personPolicyRepository;

	public Long savePolicy(PolicyOld policyOld) {
		long policyLast = policyRepository.findLastPolicyNumber();

		policyOld.setPolicyNumber(policyLast + 1);
		// this.policyRepository.save(policyOld);
		return policyOld.getPolicyNumber();
	}

	public PropertyOwner getPropertyOwnerEGN(String egn) {
		return propertyOwnerRepository.findByEgn(egn);
	}

	public boolean compareStartDateEndDate(Date startDate, Date endData) {
		//        String dateTimeString = startDate.toString();
		//
		//        // Define the format of the input string
		//        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("E MMM dd HH:mm:ss Z yyyy");
		//
		//        // Parse the input string to LocalDateTime
		//        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString, inputFormatter);
		//
		//        // Extract the LocalDate part
		//        LocalDate localDateStart = dateTime.toLocalDate();
		//
		//
		//        String dateTimeStringEnd = endData.toString();
		//
		//        // Define the format of the input string
		//        DateTimeFormatter inputFormatterEnd = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
		//
		//        // Parse the input string to LocalDateTime
		//        LocalDateTime dateTimeEnd = LocalDateTime.parse(dateTimeString, inputFormatter);
		//
		//        // Extract the LocalDate part
		//        LocalDate localDateEnd = dateTime.toLocalDate();

		return startDate.before(endData);

	}

	@Scheduled(cron = "0 0 0 * * *", zone = "Europe/Sofia")
	public void checkPolicies() throws ParseException {
		Date date = new Date();
		this.policyRepository.removeOlderThan(date);
	}

//	public boolean saveInsurerInsured(Person insuredPerson, Person insurerPerson) {
//		boolean createdNewUser = false;
//		Person insuredPersonBase = propertyOwnerRepository.findByEgn(insuredPerson.getEgn());
//		Person insurerPersonBase = propertyOwnerRepository.findByEgn(insurerPerson.getEgn());
//
//		if(insurerPersonBase == null) {
//			propertyOwnerRepository.save(insurerPerson);
//
//			User newUser = new User();
//			newUser.setIdNumber(insurerPerson.getEgn());
//			newUser.setCode(userService.generateUserCode());
//			newUser.setType("insurer");
//			userRepository.save(newUser);
//			senderService.sendEmail(insurerPerson.getEmail(), "Вход в системата", newUser.getCode(), insurerPerson.getFirstName());
//			createdNewUser = true;
//		} else {
//			insurerPersonBase.setFirstName(insurerPerson.getFirstName());
//			insurerPersonBase.setMiddleName(insurerPerson.getMiddleName());
//			insurerPersonBase.setLastName(insurerPerson.getLastName());
//			insurerPersonBase.setEmail(insurerPerson.getEmail());
//			insurerPersonBase.setPhoneNumber(insurerPerson.getPhoneNumber());
//			insurerPersonBase.setCity(insurerPerson.getCity());
//			insurerPersonBase.setAddress(insurerPerson.getAddress());
//			this.personRepository.save(insurerPersonBase);
//		}
//
//		if(!(insurerPerson.getEgn().equals(insuredPerson.getEgn()))) {
//			if(insuredPersonBase == null) {
//				personRepository.save(insuredPerson);
//			} else {
//				insuredPersonBase.setFirstName(insuredPerson.getFirstName());
//				insuredPersonBase.setMiddleName(insuredPerson.getMiddleName());
//				insuredPersonBase.setLastName(insuredPerson.getLastName());
//				this.personRepository.save(insuredPersonBase);
//			}
//		}
//		return createdNewUser;
//	}

	public void saveConnectionPersonPolicy(Policy policy, PropertyOwner propertyOwner) {
		PersonPolicy personPolicyConnection = new PersonPolicy();
		personPolicyConnection.setPolicyId(policy);
		personPolicyConnection.setPropertyOwnerId(propertyOwnerRepository.findByEgn(propertyOwner.getEgn()));
		personPolicyRepository.save(personPolicyConnection);
	}

	public Policy savePolicyData(UserInputData userInputData) {
		InsuredProperty insuredProperty = userInputData.getInsuredProperty();
		Policy policy = userInputData.getPolicy();
		PropertyOwner propertyOwner = userInputData.getPropertyOwner();
		long policyLast = policyRepository.findLastPolicyNumber(); //

		if(insuredProperty != null && policy != null && propertyOwner != null) {
			policy.setPolicyNumber(policyLast + 1);
			Policy savedPolicy = policyRepository.save(policy);
			insuredProperty.setPolicy(savedPolicy);
			PropertyOwner savedOwner = propertyOwnerRepository.save(propertyOwner);
			insuredProperty.setPropertyOwner(savedOwner);
			insuredPropertyRepository.save(insuredProperty);
			saveConnectionPersonPolicy(policy, propertyOwner);
			User newUser = new User();
			newUser.setIdNumber(userInputData.getPropertyOwner().getEgn());
			newUser.setCode(userService.generateUserCode());
			newUser.setType("insurer");
			userRepository.save(newUser);
			senderService.sendEmail(userInputData.getPropertyOwner().getEmail(),
									"Вход в системата",
									newUser.getCode(),
									userInputData.getPropertyOwner().getName());
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
