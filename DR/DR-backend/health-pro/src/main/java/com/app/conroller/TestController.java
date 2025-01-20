package com.app.conroller;

import com.app.model.model.UserInputData;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class TestController {

	@PostMapping("/test")
	public String testEndpoint(@RequestBody
								   UserInputData userInputData) {
		return "Received JSON: " + userInputData.toString();
	}
}
