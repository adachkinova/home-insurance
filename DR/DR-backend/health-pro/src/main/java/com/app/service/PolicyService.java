package com.app.service;

import com.app.model.entitites.User;
import com.app.model.model.*;
import com.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonPolicyRepository personPolicyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    private InsuredPropertyRepository insuredPropertyRepository;

    @Autowired
    private PropertyOwnerRepository propertyOwnerRepository;

    public Long savePolicy(PolicyOld policyOld) {
        long policyLast = policyRepository.findLastPolicyNumber();

        policyOld.setPolicyNumber(policyLast+1);
       // this.policyRepository.save(policyOld);
       return policyOld.getPolicyNumber();
    }

    public Long getPersonEGNId (String egn){
        long personId = personRepository.findByEgn(egn).getId();
        return personId;
    }

    public boolean compareStartDateEndDate(Date startDate, Date endData){
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


    public boolean saveInsurerInsured(Person insuredPerson, Person insurerPerson) {
        boolean createdNewUser = false;
        Person insuredPersonBase = personRepository.findByEgn(insuredPerson.getEgn());
        Person insurerPersonBase = personRepository.findByEgn(insurerPerson.getEgn());


            if (insurerPersonBase == null) {
                personRepository.save(insurerPerson);

                User newUser = new User();
                newUser.setIdNumber(insurerPerson.getEgn());
                newUser.setCode(userService.generateUserCode());
                newUser.setType("insurer");
                userRepository.save(newUser);
              senderService.sendEmail(insurerPerson.getEmail(), "Вход в системата", newUser.getCode(), insurerPerson.getFirstName() );
                createdNewUser = true;
            } else {
                insurerPersonBase.setFirstName(insurerPerson.getFirstName());
                insurerPersonBase.setMiddleName(insurerPerson.getMiddleName());
                insurerPersonBase.setLastName(insurerPerson.getLastName());
                insurerPersonBase.setEmail(insurerPerson.getEmail());
                insurerPersonBase.setPhoneNumber(insurerPerson.getPhoneNumber());
                insurerPersonBase.setCity(insurerPerson.getCity());
                insurerPersonBase.setAddress(insurerPerson.getAddress());
                this.personRepository.save(insurerPersonBase);
            }

        if (!(insurerPerson.getEgn().equals(insuredPerson.getEgn()))) {
            if(insuredPersonBase == null){
                personRepository.save(insuredPerson);
            }
            else{
                insuredPersonBase.setFirstName(insuredPerson.getFirstName());
                insuredPersonBase.setMiddleName(insuredPerson.getMiddleName());
                insuredPersonBase.setLastName(insuredPerson.getLastName());
                this.personRepository.save(insuredPersonBase);
            }
        }
        return createdNewUser;
    }

    public void saveConnectionPersonPolicy(PolicyOld policyOld, Person insuredPerson, Person insurerPerson) {
        PersonPolicy personPolicyConnection = new PersonPolicy();
        personPolicyConnection.setPolicyOldId(policyOld);
        personPolicyConnection.setInsuredId(personRepository.findByEgn(insuredPerson.getEgn()));
        personPolicyConnection.setInsurerId(personRepository.findByEgn(insurerPerson.getEgn()).getId());
        personPolicyRepository.save(personPolicyConnection);
    }

    public Policy savePolicyData(UserInputData userInputData) {
        InsuredProperty insuredProperty = userInputData.getInsuredProperty();
        Policy policy = userInputData.getPolicy();
        PropertyOwner propertyOwner = userInputData.getPropertyOwner();

        if (insuredProperty != null && policy != null && propertyOwner != null) {
            // Save the Policy entity first
            Policy savedPolicy = policyRepository.save(policy);
            insuredProperty.setPolicy(savedPolicy);

            // Save the PropertyOwner entity next
            PropertyOwner savedOwner = propertyOwnerRepository.save(propertyOwner);
            insuredProperty.setPropertyOwner(savedOwner);

            // Now save the InsuredProperty entity
            insuredPropertyRepository.save(insuredProperty);
            return policy;
        } else {
            throw new IllegalArgumentException("Input data contains null values!");
        }

    }


}
