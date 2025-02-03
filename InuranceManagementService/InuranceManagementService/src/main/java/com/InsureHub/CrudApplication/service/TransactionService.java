package com.InsureHub.CrudApplication.service;



import com.InsureHub.CrudApplication.DTO.PolicyHolderDTO;
import com.InsureHub.CrudApplication.entities.Policy;
import com.InsureHub.CrudApplication.entities.Transaction;

import com.InsureHub.CrudApplication.repository.PolicyRepository;
import com.InsureHub.CrudApplication.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransactionService {


    @Autowired
    private  PolicyHolderService PolicyHolderService;


    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private PolicyRepository policyRepository;
    // Create or update a transaction
    public Transaction saveTransaction(Transaction transaction) {
      Policy policy = policyRepository.findByPolicyId(transaction.getPolicy().getPolicyId());

        PolicyHolderDTO DTo  = PolicyHolderService.createOrUpdatePolicyHolder(transaction.getPolicyHolder());
      transaction.setPolicy(policy);

      transaction.setTransactionId("ihb"+UUID.randomUUID().toString().replace("-", "").substring(0, 10));

        return transactionRepository.save(transaction);
    }

    // Get a transaction by its ID
    public Optional<Transaction> getTransactionById(String transactionId) {
        return transactionRepository.findById(transactionId);
    }

    // Get all transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }




    // Delete a transaction
    public void deleteTransaction(String transactionId) {
        transactionRepository.deleteById(transactionId);
    }


}
