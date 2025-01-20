package com.app.dto;

import com.app.model.model.Person;
import com.app.model.model.PolicyOld;
import lombok.Data;

@Data
public class PersonPolicyReqDTO {

    public Person insurer;

    public Person insured;

    public PolicyOld policyOld;
}
