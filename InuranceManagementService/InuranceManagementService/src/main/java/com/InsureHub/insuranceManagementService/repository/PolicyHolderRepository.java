package com.InsureHub.insuranceManagementService.repository;



import com.InsureHub.insuranceManagementService.entities.PolicyHolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyHolderRepository extends JpaRepository<PolicyHolder, Integer> {
    PolicyHolder findByUser_UserId(int userId);
    // Additional custom queries can be added here if necessary

}
