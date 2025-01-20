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

    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @JsonProperty("middleName")
    @Column(name = "middleName")
    private String middleName;

    @JsonProperty("surname")
    @Column(name = "surname")
    private String surname;

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
