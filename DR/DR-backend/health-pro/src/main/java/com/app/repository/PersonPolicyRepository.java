package com.app.repository;

import com.app.model.model.Person;
import com.app.model.model.PersonPolicy;
import com.app.model.model.Policy;
import com.app.model.model.PropertyOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonPolicyRepository  extends JpaRepository<PersonPolicy, Long> {
//   List<PersonPolicy> findByInsurerId (long id);

//   PersonPolicy findByInsuredId (long id);
//
   List<PersonPolicy> findPersonPoliciesByPropertyOwnerId(PropertyOwner propertyOwnerId);

   @Override
   PersonPolicy save(PersonPolicy policy);
}
