package com.app.service;

import com.app.exception.UserAuthenticationException;
import com.app.helpers.HelperService;
import com.app.model.model.User;
import com.app.model.model.UserInputData;
import com.app.repository.UserRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity createAdmin (ObjectNode usernameAndPasswordInJson){
        User newAdmin = new User();
        newAdmin.setIdNumber(usernameAndPasswordInJson.get("username").asText());
        newAdmin.setCode(usernameAndPasswordInJson.get("password").asText());
        newAdmin.setType("admin");
        userRepository.save(newAdmin);
        return new ResponseEntity<>(newAdmin, HttpStatus.OK);
    }

    public ResponseEntity loginUser(ObjectNode egnAndCodeInJson) {
        String egn = egnAndCodeInJson.get("idNumber").asText();
        String code = egnAndCodeInJson.get("code").asText();
        User user;
        try {
            user = authenticateAndReturnUser(egn, code);
            user.setSessionToken(HelperService.generateNewToken());
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserAuthenticationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity logOutUser(String sessionToken) {
        User user = userRepository.findBySessionToken(sessionToken);
        if (user == null) {
            return new ResponseEntity<>("Incorrect sessionToken", HttpStatus.BAD_REQUEST);
        }
        user.setSessionToken(null);
        userRepository.save(user);
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    private User authenticateAndReturnUser(String egn, String code) {
        User user = userRepository.findByIdNumber(egn);
        if (user == null) {
            throw new UserAuthenticationException("Грешнен идентификационен номер или код за достъп");
        }
        if (code.equals(user.getCode())) {
            return user;
        } else {
            throw new UserAuthenticationException("Грешно идентификационен номер или код за достъп");
        }
    }

    public static String generateUserCode() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 10;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public User createUser(UserInputData userInputData) {
        User newUser = new User();
        newUser.setIdNumber(userInputData.getPropertyOwner().getEgn());
        newUser.setCode(generateUserCode());
        newUser.setType("insurer");
        userRepository.save(newUser);
        return newUser;
    }
}
