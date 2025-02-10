package com.InsureHub.insuranceManagementService.repository;


import com.InsureHub.insuranceManagementService.entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Integer> {
    // Additional custom queries can be defined here
    Policy findByPolicyNumber(String policyNumber);



    // Using derived query method
    List<Policy> findByInsurer_InsurerId(int insurerId);
    // New method to find policy by policyId
    Policy findByPolicyId(int policyId);
    
 // Optional method to find policies by UserId
    Optional<List<Policy>> findByInsurer_User_UserId(int userId);

    
    
        @Query("SELECT COUNT(p) FROM Policy p")
        long count();
    
}
