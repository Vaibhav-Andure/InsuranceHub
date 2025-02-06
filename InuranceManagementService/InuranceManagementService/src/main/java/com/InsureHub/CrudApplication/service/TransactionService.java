package com.InsureHub.CrudApplication.service;
// Make sure to import the DTO
import com.InsureHub.CrudApplication.DTO.TransactionDTO;
import com.InsureHub.CrudApplication.entities.Policy;
import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.repository.PolicyRepository;
import com.InsureHub.CrudApplication.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private PolicyHolderService policyHolderService;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PolicyRepository policyRepository;


    //get transaction for particular user
//    public List<Transaction> getTransactionsByUserId(int userId) {
//        return transactionRepository.findByPolicyHolder_User_UserId(userId);
//    }

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

    // Get all transactions
    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Delete a transaction
    public void deleteTransaction(String transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    // Convert Transaction entity to TransactionDTO
    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setTransactionId(transaction.getTransactionId());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setCreatedAt(transaction.getCreatedAt());
        // Set PolicyHolderId and PolicyId if needed
        dto.setPolicyHolderId(String.valueOf(transaction.getPolicyHolder() != null ? transaction.getPolicyHolder().getPolicyHolderId() : null));
        dto.setPolicyId(String.valueOf(transaction.getPolicy() != null ? transaction.getPolicy().getPolicyId() : null));
        return dto;
    }
}