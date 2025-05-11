package com.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
public class PropertyOwnerDTO {
    
    @Schema(name = "firstName")
    private long id;

    @Schema(name = "firstName")
    private String firstName;

    @Schema(name = "middleName")
    private String middleName;

    @Schema(name = "lastName")
    private String lastName;

    @Schema(name = "egn")
    private String egn;

    @Schema(name = "phoneNumber")
    private String phoneNumber;

    @Schema(name = "email")
    private String email;
}
