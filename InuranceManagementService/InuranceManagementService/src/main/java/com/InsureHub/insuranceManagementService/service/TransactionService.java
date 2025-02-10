package com.InsureHub.insuranceManagementService.service;
// Make sure to import the DTO
import com.InsureHub.insuranceManagementService.DTO.TransactionDTO;

import com.InsureHub.insuranceManagementService.entities.Policy;
import com.InsureHub.insuranceManagementService.entities.PolicyHolder;
import com.InsureHub.insuranceManagementService.entities.Transaction;
import com.InsureHub.insuranceManagementService.repository.ClaimRepository;
import com.InsureHub.insuranceManagementService.repository.PolicyHolderRepository;
import com.InsureHub.insuranceManagementService.repository.PolicyRepository;
import com.InsureHub.insuranceManagementService.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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



//    }

    // Create or update a transaction
    public TransactionDTO saveTransaction(Transaction transaction) {
        // Fetch the associated policy
        Policy policy = policyRepository.findByPolicyId(transaction.getPolicy().getPolicyId());
        transaction.setPolicy(policy);

        // Generate a unique transaction ID



        transaction.setTransactionId("ihb" + UUID.randomUUID().toString().replace("-", "").substring(0, 10));
        //save policyholder first before saving transaction in data base
        PolicyHolder policyHolder = policyHolderRepository.save(transaction.getPolicyHolder());
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
    // Method to get all transactions sorted by transaction date in descending order
    public List<TransactionDTO> getAllTransactions() {
        // Create a Sort object to sort by transactionDate in descending order
        Sort sort = Sort.by(Sort.Direction.DESC, "transactionDate");

        // Fetch all transactions sorted by date
        List<Transaction> transactions = transactionRepository.findAll(sort);

        // Convert to DTO and return
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }






    public TransactionDTO getTransactionByUserId(@PathVariable int userId) {
        Optional<Transaction> userTransaction = transactionRepository.findByPolicyHolder_User_UserId(userId);
        return userTransaction.map(this::convertToDTO).orElse(null);
    }


 // Get transactions by User Id insurer user id
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