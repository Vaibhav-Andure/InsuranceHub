package com.InsureHub.CrudApplication.service;
// Make sure to import the DTO
import com.InsureHub.CrudApplication.DTO.TransactionDTO;

import com.InsureHub.CrudApplication.entities.Policy;
import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.repository.ClaimRepository;
import com.InsureHub.CrudApplication.repository.PolicyHolderRepository;
import com.InsureHub.CrudApplication.repository.PolicyRepository;
import com.InsureHub.CrudApplication.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class TransactionService {

   

    @Autowired
    private PolicyHolderRepository policyHolderRepository; 
    
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PolicyRepository policyRepository;
    
    @Autowired
    private ClaimRepository claimRepository;

    // Create or update a transaction
    public TransactionDTO saveTransaction(Transaction transaction) {
        // Fetch the associated policy
        Policy policy = policyRepository.findByPolicyId(transaction.getPolicy().getPolicyId());
        transaction.setPolicy(policy);

        // Generate a unique transaction ID
        transaction.setTransactionId("ihb" + UUID.randomUUID().toString().replace("-", "").substring(0, 10));

        // Save the transaction
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Convert to DTO and return
        return convertToDTO(savedTransaction);
    }

    // Get a transaction by its ID
    public Optional<TransactionDTO> getTransactionById(String transactionId) {
        Optional<Transaction> transaction = transactionRepository.findById(transactionId);
        return transaction.map(this::convertToDTO);
    }

//    // Get all transactions
    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
   
 // Get transactions by User Id
    public List<TransactionDTO> getTransactionsByInsurer(int userId) {
        Optional<List<Transaction>> optionalTransactions = transactionRepository.findByPolicy_Insurer_User_UserId(userId);
        List<Transaction> transactions = optionalTransactions.orElseGet(List::of); // Return an empty list if no transactions are found
        return transactions.stream()
                .map(this::convertToDTO) // Convert to DTO
                .collect(Collectors.toList());
    }
    
    //serive code for pagination for fututer prefrence
// // Get all transactions
//    public Page<TransactionDTO> getAllTransactions(int page, int size) {
//        Pageable pageable = PageRequest.of(page - 1, size);
//        Page<Transaction> transactions = transactionRepository.findAll(pageable);
//        return transactions.map(this::convertToDTO);
//    }
    
    
    
    
    
    

    // Delete a transaction
    public void deleteTransaction(String transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    // Convert Transaction entity to TransactionDTO
    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
     dto.setTransactionId(transaction.getTransactionId());
     dto.setPolicyHolderName(transaction.getPolicyHolder().getPolicyHolderName());
     dto.setPolicyName(transaction.getPolicy().getPolicyName());
     dto.setAmount(transaction.getAmount());
     dto.setTransactionDate(transaction.getTransactionDate());
       
        return dto;
    }
    
    public Map<String, String> getStats() {
        Map<String, String> stats = new HashMap<>();

        // Total Customers
        stats.put("totalCustomers", String.valueOf(policyHolderRepository.count()));

        // Active Policies
        stats.put("activePolicies", String.valueOf(policyRepository.count()));

        // Total Amount
        stats.put("totalAmount", String.valueOf(transactionRepository.sumAmount()));

        // Pending Claims
        stats.put("pendingClaims", String.valueOf(claimRepository.count()));

        return stats;
    }
    
    
    
    
    
    
    
}