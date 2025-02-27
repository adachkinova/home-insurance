package com.app.conroller;

import com.app.dto.ClaimByIdDTO;
import com.app.dto.ClaimDTO;
import com.app.dto.ImageDTO;
import com.app.dto.PredictionInputDTO;
import com.app.exception.ResourceNotFoundException;
import com.app.model.mapper.ClaimMapper;
import com.app.model.model.*;
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
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
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

    @Autowired
    private ImageRepository imageRepository;

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

    @PostMapping("/claim")
    public ResponseEntity createClaim(@RequestBody ClaimDTO claimDTO) {
        if (claimDTO == null) {
            return ResponseEntity.badRequest().body("Invalid claim data");
        }

        try {
            Claim claim = claimMapper.toClaim(claimDTO);
            long claimLast = claimRepository.findLastClaimNumber();
            claim.setClaimNumber(claimLast + 1);
            InsuredProperty insuredProperty = insuredPropertyRepository.findByEgn(claim.getEgn()).get(0);
            claim.setInsuredProperty(insuredProperty);
            claimRepository.save(claim);
        } catch (Error error) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }

        return ResponseEntity.ok("Claim created successfully");
    }

    @PostMapping(value = "/uploadImages" , consumes = "multipart/form-data")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") List<MultipartFile> files) {
        List<String> savedFilePaths = new ArrayList<>();
        String uploadDir = "C:\\Users\\a.dachkinova\\Desktop\\images\\";

        for (MultipartFile file : files) {
            try {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                String filePath = uploadDir + fileName;
                File destinationFile = new File(filePath);

                // Save file to disk
                file.transferTo(destinationFile);
                savedFilePaths.add(filePath);

            } catch (IOException e) {
                // Log the exception for debugging
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
        }
        return ResponseEntity.ok(savedFilePaths);
    }

    @GetMapping("/claim/{id}")
    public ResponseEntity getClaimById(@PathVariable Long id) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not exist with id :" + id));
        try {
            ClaimByIdDTO claimData = new ClaimByIdDTO();
            claimData.setClaim(claim);
//            ClaimDTO claimDTO = claimMapper.toDto(claim);
            return ResponseEntity.ok().body(claimData);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @GetMapping("/v1/claim/{claimId}/images")
    public ResponseEntity<List<String>> getClaimImages(@PathVariable Long claimId) {
        Optional<Claim> claimOpt = claimRepository.findById(claimId);

        if (claimOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        ClaimDTO claimDTO = claimMapper.toDto(claimOpt.get());

        List<String> imagePaths = claimDTO.getImages();
        List<String> imageUrls = imagePaths.stream()
                .map(path -> path.substring(path.lastIndexOf("\\") + 1)) // Extract filename
                .map(fileName -> "http://localhost:8099/v1/claim/image/" + fileName) // Construct URL
                .collect(Collectors.toList());

        return ResponseEntity.ok(imageUrls);
    }

    @GetMapping("/claim-image")
    public ResponseEntity<Resource> getImage(@RequestParam String fileName) {
        try {
            Path imagePath = Paths.get("C:/Users/a.dachkinova/Desktop/images/" + fileName);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Detect file type dynamically
                String contentType = Files.probeContentType(imagePath);
                if (contentType == null) {
                    contentType = "application/octet-stream"; // Default fallback
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

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

    // update claim status rest api
    @PutMapping("/claim-status/{id}")
    public ResponseEntity updateClaimStatus(@RequestBody Claim claimDetails, @PathVariable Long id) {
            Claim claim = claimRepository.findById(id).orElseThrow(()
                    -> new ResourceNotFoundException("Claim not exist with id :" + id));
        try {
            claim.setPaidDate(claimDetails.getPaidDate());
            claim.setPaidSum(claimDetails.getPaidSum());
            claim.setDeclineDescription(claimDetails.getDeclineDescription());
            claimRepository.save(claim);
            return new ResponseEntity<>("Статуса на претенцията беше обновен успешно", HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    // check if user exists in order to file a claim
    @GetMapping("/check-user/{egn}")
    public ResponseEntity checkUser(
            @PathVariable
            String egn) {

        Person person = personRepository.findByEgn(egn);
        if(person != null) {
            return ResponseEntity.ok().body(person);
        } else {
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
