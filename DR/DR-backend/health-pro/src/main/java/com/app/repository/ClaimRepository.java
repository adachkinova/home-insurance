
package com.app.repository;

import com.app.model.model.Claim;
import com.app.model.model.InsuredProperty;
import org.hibernate.mapping.Any;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    @Query("SELECT c FROM Claim c " +
            "JOIN FETCH c.insuredProperty ip " +
            "JOIN FETCH ip.propertyOwner po " +
            "WHERE po.egn = :egn")
    List<Claim> findByEgn(@Param("egn") String egn);

    List<Claim> findAllByEgn( String egn);

    @Query(value = "SELECT COALESCE((SELECT c.claim_number FROM health_pro.claim AS c ORDER BY c.id DESC LIMIT 1), 3000000000) AS claim_number", nativeQuery = true)
    long findLastClaimNumber();
}