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
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ClaimMapper {

    @Mapping(target = "images", source = "images", qualifiedByName = "listToString")
    Claim toClaim(ClaimDTO claimDTO);

    @Mapping(target = "images", source = "images", qualifiedByName = "stringToList")
    ClaimDTO toDto(Claim claim);

    @Named("listToString")
    default String listToString(List<String> images) {
        return images != null ? String.join(",", images) : null;
    }

    @Named("stringToList")
    default List<String> stringToList(String images) {
        return (images != null && !images.isEmpty()) ? Arrays.asList(images.split(",")) : Collections.emptyList();
    }
    InsuredPropertyDTO insuredPropertyToDTO(InsuredProperty insuredProperty);
    PolicyDTO policyToDTO(Policy policy);
    PropertyOwnerDTO propertyOwnerToDTO(PropertyOwner propertyOwner);
}