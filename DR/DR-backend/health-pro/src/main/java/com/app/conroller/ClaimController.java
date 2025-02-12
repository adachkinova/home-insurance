package com.app.conroller;

import com.app.dto.ClaimDTO;
import com.app.dto.PredictionInputDTO;
import com.app.model.mapper.ClaimMapper;
import com.app.model.model.Claim;
import com.app.model.model.InsuredProperty;
import com.app.model.model.Person;
import com.app.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import static com.app.configuration.WebPath.API_VERSION_1;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "Claims operations", description = "Basic CRUD operations related to claims")

public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private  PersonPolicyRepository personPolicyRepository;

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private InsuredPropertyRepository insuredPropertyRepository;

    @Autowired
    private ClaimMapper claimMapper;

    // get all claims
    @GetMapping("/claims")
    public ResponseEntity getAllClaims(){
        try {
          List<Claim> listClaims = claimRepository.findAll();
          return  ResponseEntity.ok().body(listClaims);
        }
        catch (Error error){
          return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }

    }

    // create claim rest api
    @PostMapping("/claim")
    public ResponseEntity createClaim(@RequestBody Claim claim) throws Exception {
        try {
            long claimLast = claimRepository.findLastClaimNumber();
            claim.setClaimNumber(claimLast+1);
            InsuredProperty insuredProperty = insuredPropertyRepository.findByEgn(claim.getEgn()).get(0);
            claim.setInsuredProperty(insuredProperty);
            claimRepository.save(claim);


            return new ResponseEntity<>("Претенцията е успешно заявена",HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }

    }

//    // get claim by id rest api
//    @GetMapping("/claim/{id}")
//    public ResponseEntity getClaimById(@PathVariable Long id) throws Exception {
//        Claim claim = claimRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Claim not exist with id :" + id));
//
//        try {
//            ClaimByIdDTO claimData = new ClaimByIdDTO();
//            claimData.setClaim(claim);
//
//            BigDecimal newLimit = null;
//            try{
//            PolicyOld policyOld = personPolicyRepository.findByInsuredId(personRepository.findByEgn(claim.getEgn())).getPolicyId();
//
//                if (claim.getCategory().equalsIgnoreCase("Дентална помощ")) {
//                    newLimit = policyOld.getDentalLimit();
//                } else if (claim.getCategory().equalsIgnoreCase("Болнична помощ")) {
//                    newLimit = policyOld.getHospitalLimit();
//                } else if (claim.getCategory().equalsIgnoreCase("Здравни стоки")) {
//                    newLimit = policyOld.getHealthGoodsLimit();
//                } else if (claim.getCategory().equalsIgnoreCase("Извънболнична помощ")) {
//                    newLimit = policyOld.getOutOfHospitalLimit();
//                }
//
//                claimData.setMaxLimitValue(newLimit);
//                return ResponseEntity.ok().body(claimData);
//
//            }
//            catch (Exception error){
//                claimRepository.deleteById(id);
//                return ResponseEntity.badRequest().body("Полицата на застрахованото лице е изтекла. Претенцията не може да бъде разгледана");
//            }
//        }
//        catch (Exception error){
//            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
//        }
//    }

    // get claim by user
    @GetMapping("/claims-user/{egn}")
    public ResponseEntity<?> getClaimsByEgn(@PathVariable String egn) {
        try {
            List<Claim> claims = claimRepository.findByEgn(egn);
            List<ClaimDTO> claimDTOs = claims.stream()
                    .map(claimMapper::toDto)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(claimDTOs, HttpStatus.OK);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

//    // update claim status rest api
//    @PutMapping("/claim-status/{id}")
//    public ResponseEntity updateClaimStatus(@PathVariable Long id, @RequestBody Claim claimDetails) {
//            Claim claim = claimRepository.findById(id).orElseThrow(()
//                    -> new ResourceNotFoundException("Claim not exist with id :" + id));
//
//        try {
//            claim.setPaidDate(claimDetails.getPaidDate());
//            claim.setPaidSum(claimDetails.getPaidSum());
//            claim.setDescription(claimDetails.getDescription());
//
//            if (claimDetails.getPaidSum() != null) {
//                PolicyOld policyOld = personPolicyRepository.findByInsuredId(personRepository.findByEgn(claim.getEgn())).getPolicyOldId();
//
//                    if (claim.getCategory().equalsIgnoreCase("Дентална помощ")) {
//                        BigDecimal result = policyOld.getDentalLimit().subtract(claimDetails.getPaidSum());
//                        policyOld.setDentalLimit(result);
//                    } else if (claim.getCategory().equalsIgnoreCase("Болнична помощ")) {
//                        BigDecimal result = policyOld.getHospitalLimit().subtract(claimDetails.getPaidSum());
//                        policyOld.setHospitalLimit(result);
//                    } else if (claim.getCategory().equalsIgnoreCase("Здравни стоки")) {
//                        BigDecimal result = policyOld.getHealthGoodsLimit().subtract(claimDetails.getPaidSum());
//                        policyOld.setHealthGoodsLimit(result);
//                    } else if (claim.getCategory().equalsIgnoreCase("Извънболнична помощ")) {
//                        BigDecimal result = policyOld.getOutOfHospitalLimit().subtract(claimDetails.getPaidSum());
//                        policyOld.setOutOfHospitalLimit(result);
//                    }
//                    //policyRepository.save(policyOld);
//                }
//
//
//            Claim updatedClaim = claimRepository.save(claim);
//            return new ResponseEntity<>("Статуса на претенцията беше обновен успешно",HttpStatus.OK);
//        }
//        catch (Exception error){
//            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
//        }
//    }

    // check if user exists in order to file a claim
    @GetMapping("/check-user/{egn}")
    public ResponseEntity checkUser(@PathVariable String egn) {

            Person person = personRepository.findByEgn(egn);
            if(person!=null){
                return ResponseEntity.ok().body(person);
            }
            else {
            return ResponseEntity.badRequest().body("Не същесвува в базата данни потребител с такова ЕГН");
             }
    }

    @PostMapping("/predictClaimValue")
    public ResponseEntity<String> predict(@RequestBody PredictionInputDTO predictionInputDTO) {
        String urlString = "https://e812-34-19-110-22.ngrok-free.app/predict";

        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost post = new HttpPost(urlString);
            post.setHeader("Content-Type", "application/json");

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonInputString = objectMapper.writeValueAsString(predictionInputDTO);

            post.setEntity(new StringEntity(jsonInputString, StandardCharsets.UTF_8));

            try (CloseableHttpResponse response = client.execute(post)) {
                String responseString = EntityUtils.toString(response.getEntity());
                return ResponseEntity.ok(responseString);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error during the request");
        }
    }

}
