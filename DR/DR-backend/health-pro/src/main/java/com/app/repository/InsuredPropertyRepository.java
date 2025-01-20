package com.app.repository;

import com.app.model.model.InsuredProperty;
import com.app.model.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface InsuredPropertyRepository extends JpaRepository<InsuredProperty, Long> {
	InsuredProperty findByAddress(String address);

	@Query(value = "SELECT ip.*" +
			"FROM health_pro.insured_property as ip" +
			"JOIN health_pro.policy ON p.id = ip.policy_id as p" +
			"WHERE ip.address = :address " +
			"AND (" +
			"(p.start_date <= :endDate AND p.end_date >= :startDate) OR " +
			"(p.start_date >= :startDate AND p.start_date <= :endDate) OR " +
			"(p.end_date >= :startDate AND p.end_date <= :endDate))",
		   nativeQuery = true)
	InsuredProperty findDuplicateRequest(@Param("address") String address,
								 @Param("startDate") LocalDate startDate,
								 @Param("endDate") LocalDate endDate);
}
