package com.app.service;

import com.app.model.model.*;
import com.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;

@Service
public class PropertyOwnerService {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailSenderService senderService;

	@Autowired
	private PropertyOwnerRepository propertyOwnerRepository;

	public PropertyOwner savePropertyOwner(UserInputData userInputData) {
		PropertyOwner propertyOwner = userInputData.getPropertyOwner();
		PropertyOwner owner = propertyOwnerRepository.findByEgn(propertyOwner.getEgn());
		if(owner == null) {
			User newUser = userService.createUser(userInputData);

			senderService.sendEmail(userInputData.getPropertyOwner().getEmail(),
									"Вход в системата",
									newUser.getCode(),
									userInputData.getPropertyOwner().getFirstName());

			return propertyOwnerRepository.save(propertyOwner);
		}

		return owner;

	}

}
