package com.InsureHub.insuranceManagementService.repository;



import com.InsureHub.insuranceManagementService.entities.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {


    Transaction findByTransactionId(String transactionId);


    @Query("SELECT SUM(t.amount) FROM Transaction t")
    Double sumAmount();
    //sorted transaction
    List<Transaction> findAll(Sort sort);
    
    Optional<List<Transaction>> findByPolicy_Insurer_User_UserId(int userId);


    Optional<Transaction>  findByPolicyHolder_User_UserId(int userId);

    // ✅ Method to find transactions by policyHolderId
    Transaction findByPolicyHolder_PolicyHolderId(int policyHolderId);
}
