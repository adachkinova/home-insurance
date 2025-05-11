package com.app.repository;

import com.app.model.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query(value = "SELECT COALESCE((SELECT p.policy_number FROM home_safe.policy AS p ORDER BY p.id DESC LIMIT 1), 8000000000) AS policy_number", nativeQuery = true)
    long findLastPolicyNumber();

    @Transactional
    @Modifying
    @Query(value="DELETE FROM home_safe.policy p WHERE p.end_date < :date", nativeQuery = true)
    void removeOlderThan(@Param("date") Date date);

}
