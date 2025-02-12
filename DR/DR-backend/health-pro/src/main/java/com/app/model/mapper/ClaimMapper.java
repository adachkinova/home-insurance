package com.app.model.mapper;

import com.app.dto.ClaimDTO;
import com.app.dto.InsuredPropertyDTO;
import com.app.dto.PolicyDTO;
import com.app.dto.PropertyOwnerDTO;
import com.app.model.model.Claim;
import com.app.model.model.InsuredProperty;
import com.app.model.model.Policy;
import com.app.model.model.PropertyOwner;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClaimMapper {

    Claim toClaim(ClaimDTO claimDTO);

    ClaimDTO toDto(Claim claim);
    InsuredPropertyDTO insuredPropertyToDTO(InsuredProperty insuredProperty);
    PolicyDTO policyToDTO(Policy policy);
    PropertyOwnerDTO propertyOwnerToDTO(PropertyOwner propertyOwner);
}