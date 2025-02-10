package com.InsureHub.insuranceManagementService.repository;



import com.InsureHub.insuranceManagementService.entities.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    // Custom query to find a claim by PolicyID (should only be one claim per policy)
    Optional<Claim> findByPolicy_PolicyId(int policyId);

    // Custom query to find a claim by TransactionID (should only be one claim per transaction)
    Optional<Claim> findByTransaction_TransactionId(String transactionId);
    // Custom query to find claims by userId
    Claim findByTransaction_PolicyHolder_User_UserId(int  userId);
    // You can add more custom queries based on your requirements, e.g., by ClaimStatus
    Optional<Claim> findByClaimStatus(String claimStatus);
    
    Optional<List<Claim>> findByPolicy_Insurer_User_UserId(int userId);
    
    @Query("SELECT COUNT(c) FROM Claim c")
    long count();
}
