package com.app.conroller;

import com.app.exception.BadRequestException;
import com.app.model.enumeration.CovaragePackageEnum;
import com.app.model.model.*;
import com.app.repository.*;
import com.app.service.PolicyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    private InsuredPropertyRepository insuredPropertyRepository;

    @PostMapping("/policy")
    @Transactional
    public ResponseEntity createPolicy (@RequestBody UserInputData userInputData) {

        Optional<InsuredProperty> insuredProperty = insuredPropertyRepository.findDuplicateRequest(userInputData.getInsuredProperty().getAddress(),
                                                                                                  userInputData.getPolicy().getStartDate(),
                                                                                                  userInputData.getPolicy().getEndDate());
        if(insuredProperty.isPresent()) {
            Policy policy = insuredProperty.get().getPolicy();
            return ResponseEntity.badRequest().body("Имотът има сключена застраховка за периода: " +
                                                            policy.getStartDate() +
                                                            " до " + policy.getEndDate());
        }
        try {
            Policy policy = policyService.savePolicyData(userInputData);
            PolicyResponse policyResponse = buildPolicyResponse(policy);
            return ResponseEntity.ok(policyResponse);
        } catch(BadRequestException error) {
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @GetMapping("/insured-property/{egn}")
    public ResponseEntity getPolicyListByEgn(@PathVariable
                                             String egn) {
        try {
            List<InsuredProperty> insuredProperties = insuredPropertyRepository.findByEgn(egn);
            return ResponseEntity.ok().body(insuredProperties);
        }
        catch (BadRequestException error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
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
