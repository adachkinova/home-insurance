package com.app.model.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PROPERTY_OWNER")
public class PropertyOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @JsonProperty("firstName")
    @Column(name = "firstName")
    private String firstName;

    @JsonProperty("middleName")
    @Column(name = "middleName")
    private String middleName;

    @JsonProperty("lastName")
    @Column(name = "lastName")
    private String lastName;

    @JsonProperty("egn")
    @Column(name = "egn")
    private String egn;

    @JsonProperty("phoneNumber")
    @Column(name = "phoneNumber")
    private String phoneNumber;

    @JsonProperty("email")
    @Column(name = "email")
    private String email;
}
