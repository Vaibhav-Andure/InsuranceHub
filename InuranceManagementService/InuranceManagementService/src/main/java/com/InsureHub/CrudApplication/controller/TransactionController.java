package com.InsureHub.CrudApplication.controller;
 // Import the DTO
import com.InsureHub.CrudApplication.DTO.TransactionDTO;
import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Create or Update a transaction
    @PostMapping("/savetransaction")
    public ResponseEntity<TransactionDTO> createOrUpdateTransaction(@RequestBody Transaction transaction) {
        TransactionDTO savedTransactionDTO = transactionService.saveTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransactionDTO);
    }

    // Get transaction by ID
    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable String transactionId) {
        Optional<TransactionDTO> transactionDTO = transactionService.getTransactionById(transactionId);

        return transactionDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null)); // You can return a custom error response if needed
    }

    // Get all transactions
    @GetMapping("/getalltransaction")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactionDTOs = transactionService.getAllTransactions();
        if (transactionDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(transactionDTOs);
        }
        return ResponseEntity.ok(transactionDTOs);
    }

    // Delete transaction by ID
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable String transactionId) {
        Optional<TransactionDTO> transaction = transactionService.getTransactionById(transactionId);

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