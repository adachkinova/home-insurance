package com.app.model.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idNumber;

    private String code;

    private String type;

    private String sessionToken;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "property_owner_id")
//    private PropertyOwner propertyOwner;
}
