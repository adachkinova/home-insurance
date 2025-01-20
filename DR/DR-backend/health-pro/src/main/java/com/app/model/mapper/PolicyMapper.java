package com.app.model.mapper;

import com.app.dto.PolicyDTO;

import com.app.model.model.PolicyOld;
import org.mapstruct.Mapper;

@Mapper
public interface PolicyMapper {
    PolicyOld policyDTOToPolicy(PolicyDTO policyDTO);

    PolicyDTO policyToPolicyDTO(PolicyOld policyOld);
}
