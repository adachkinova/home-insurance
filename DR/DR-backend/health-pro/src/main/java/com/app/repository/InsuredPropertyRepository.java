package com.app.repository;

import com.app.model.model.InsuredProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface InsuredPropertyRepository extends JpaRepository<InsuredProperty, Long> {

	@Query("SELECT ip FROM InsuredProperty ip " +
			"JOIN FETCH ip.policy p " +
			"JOIN FETCH ip.propertyOwner po " +
			"WHERE ip.address = :address " +
			"AND (" +
			"(p.startDate <= :endDate AND p.endDate >= :startDate) OR " +
			"(p.startDate >= :startDate AND p.startDate <= :endDate) OR " +
			"(p.endDate >= :startDate AND p.endDate <= :endDate))")
	Optional<InsuredProperty> findDuplicateRequest(@Param("address") String address,
												   @Param("startDate") LocalDate startDate,
												   @Param("endDate") LocalDate endDate);



	@Query("SELECT ip FROM InsuredProperty ip " +
			"JOIN FETCH ip.propertyOwner po " +
			"JOIN FETCH ip.policy p " +
			"WHERE po.egn = :egn")
	List<InsuredProperty> findByEgn(@Param("egn") String egn);
}
