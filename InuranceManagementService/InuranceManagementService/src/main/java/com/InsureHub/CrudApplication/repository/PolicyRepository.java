package com.InsureHub.CrudApplication.repository;


import com.InsureHub.CrudApplication.entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Integer> {
    // Additional custom queries can be defined here
    Policy findByPolicyNumber(String policyNumber);
    List<Policy> findByInsurer_InsurerId(Integer insurerId);

    // New method to find policy by policyId
    Policy findByPolicyId(int policyId);

}
