package com.InsureHub.CrudApplication.controller;



import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Create or Update a transaction
    @PostMapping("/savetransaction")
    public ResponseEntity<String> createOrUpdateTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.saveTransaction(transaction);

        // Custom message to return with the transaction
        String jsonResponse = "{\"message\": \"Transaction successfully saved\", \"transaction\": " +
                "{\"transactionId\": \"" + savedTransaction.getTransactionId() + "\", " +
                "\"amount\": " + savedTransaction.getAmount() + ", " +
                "\"transactionDate\": \"" + savedTransaction.getTransactionDate() + "\", " +
                "\"createdAt\": \"" + savedTransaction.getCreatedAt() + "\", " +
                "\"policyHolder\": {\"policyHolderId\": \"" + savedTransaction.getPolicyHolder().getPolicyHolderId() + "\"}, " +
                "\"policy\": {\"policyId\": \"" + savedTransaction.getPolicy().getPolicyId() + "\"}}}";

        // Returning the JSON response as a string with status 201 Created
        return ResponseEntity.status(HttpStatus.CREATED).body(jsonResponse);
    }




    // Get transaction by ID
    @GetMapping("/{transactionId}")
    public ResponseEntity<String> getTransactionById(@PathVariable String transactionId) {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);

        if (transaction.isPresent()) {
            String jsonResponse = "{\"transactionId\": \"" + transaction.get().getTransactionId() + "\", " +
                    "\"amount\": " + transaction.get().getAmount() + ", " +
                    "\"transactionDate\": \"" + transaction.get().getTransactionDate() + "\", " +
                    "\"createdAt\": \"" + transaction.get().getCreatedAt() + "\", " +
                    "\"policyHolder\": {\"policyHolderId\": \"" + transaction.get().getPolicyHolder().getPolicyHolderId() + "\"}, " +
                    "\"policy\": {\"policyId\": \"" + transaction.get().getPolicy().getPolicyId() + "\"}}";
            return ResponseEntity.ok(jsonResponse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"Transaction not found\"}");
        }
    }

    // Get all transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(transactions);
        }
        return ResponseEntity.ok(transactions);
    }


    // Delete transaction by ID
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable String transactionId) {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);

        if (transaction.isPresent()) {
            transactionService.deleteTransaction(transactionId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("{\"message\": \"Transaction deleted successfully\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"Transaction not found\"}");
        }
    }

}
