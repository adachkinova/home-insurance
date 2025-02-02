package com.app.conroller;

import com.app.model.enumeration.CovaragePackageEnum;
import com.app.model.model.*;
import com.app.repository.*;
import com.app.service.PolicyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;

import static com.app.configuration.WebPath.API_VERSION_1;
import static com.app.service.PolicyService.buildPolicyResponse;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "Policy operations", description = "Basic CRUD operations related to policy")
public class PolicyController {

    @Autowired
    private  PolicyService policyService;

    @Autowired
    private  PolicyRepository policyRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonPolicyRepository personPolicyRepository;

    @Autowired
    private InsuredPropertyRepository insuredPropertyRepository;

    @Autowired
    private PropertyOwnerRepository propertyOwnerRepository;


    // create claim rest api
    @PostMapping("/policy-person")
    public ResponseEntity createPolicyPerson ( @RequestBody
                                               PersonPolicy policy) {
    try {
        personPolicyRepository.save(policy);
        return ResponseEntity.ok().body(policy);
    }
    catch (Exception error){
        return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }

    }

    // create claim rest api
    @PostMapping("/policy")
    @Transactional
    public ResponseEntity createPolicy (@RequestBody UserInputData userInputData) {

        InsuredProperty insuredProperty = insuredPropertyRepository.findDuplicateRequest(userInputData.getInsuredProperty().getAddress(),
                                                                                         userInputData.getPolicy().getStartDate(),
                                                                                         userInputData.getPolicy().getEndDate());
        if(insuredProperty != null) {
            return ResponseEntity.badRequest().body("Имотът има сключена застраховка за периода: " +
                                                            insuredProperty.getPolicy().getStartDate() +
                                                            " до " + insuredProperty.getPolicy().getEndDate());
        }
        try {
            Policy policy = policyService.savePolicyData(userInputData);
            PolicyResponse policyResponse = buildPolicyResponse(policy);
            return ResponseEntity.ok(policyResponse);
        } catch(Exception error) {
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }



    // get policy by egn rest api
    @GetMapping("/policy-list/{egn}")
    public ResponseEntity getPolicyListByEgn(@PathVariable
                                             String egn) {
        try {
            PropertyOwner propertyOwner = policyService.getPropertyOwnerEGN(egn);
            List<PersonPolicy> policyList = personPolicyRepository.findPersonPoliciesByPropertyOwnerId(propertyOwner);

            return ResponseEntity.ok().body(policyList);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    // get titular by egn rest api
    @GetMapping("/policy-titular/{egn}")
    public Person getPolicyTitularByEgn(@PathVariable String egn) {
        return personRepository.findByEgn(egn);
    }

    @PostMapping("/calculate-policy")
    public Double calculatePolicy(@RequestBody UserInputData userInputData) {
        Policy policy = userInputData.getPolicy();
        CovaragePackageEnum coveragePackage = CovaragePackageEnum.fromString(policy.getCoveragePackage());
        double coverageCoefficient = coveragePackage.getCoefficient();
        double propertyCoefficient = 0.0015;
        double movablePropertyCoefficient = 0.0025;

        double policyPrice = policy.getInsuranceAmount() * propertyCoefficient;

        if (policy.getInsuranceMovablePropertyAmount() > 0) {
            policyPrice += policy.getInsuranceMovablePropertyAmount() * movablePropertyCoefficient;
        }

        policyPrice *= coverageCoefficient;

        if (CovaragePackageEnum.MAXIMUM.equals(coveragePackage)) {
            policyPrice *= userInputData.getInsuredProperty().getRisk();
        }
        return Math.round(policyPrice * 100.0) / 100.0;
    }
}
