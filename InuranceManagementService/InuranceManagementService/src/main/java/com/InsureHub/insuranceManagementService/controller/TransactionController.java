package com.InsureHub.insuranceManagementService.controller;
 // Import the DTO
import com.InsureHub.insuranceManagementService.DTO.TransactionDTO;
import com.InsureHub.insuranceManagementService.entities.Transaction;
import com.InsureHub.insuranceManagementService.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/insurance/transactions")
//@CrossOrigin(origins = "http://localhost:5173")
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



//////
//    @GetMapping("/user/{userId}")
//    public Optional<TransactionDTO> getTransactionById(@PathVariable int userId) {
//        return transactionService.getTransactionByUserId(userId);
//    }

    @GetMapping("/byuserid/{userId}")
    public Optional<TransactionDTO> getTransactionByUserId(@PathVariable int userId) {
        return Optional.ofNullable(transactionService.getTransactionByUserId(userId));
    }



//    // Get all transactions
    @GetMapping("/getalltransaction")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactionDTOs = transactionService.getAllTransactions();
        if (transactionDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(transactionDTOs);
        }
        return ResponseEntity.ok(transactionDTOs);
    }
    
    
 // ✅ Get transactions by User Id
    @GetMapping("/byinsureruserid/{userId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByInsurer(@PathVariable int userId) {
        List<TransactionDTO> transactions = transactionService.getTransactionsByInsurer(userId);
        return ResponseEntity.ok(transactions); // Return the list of TransactionDTOs
    }
    
    
    
//    futrue scope for pagination
// // Get all transactions
//    @GetMapping("/getalltransaction")
//    public ResponseEntity<Page<TransactionDTO>> getAllTransactions(
//        @RequestParam(defaultValue = "1") int page,
//        @RequestParam(defaultValue = "5") int size
//    ) {
//        Page<TransactionDTO> transactionDTOs = transactionService.getAllTransactions(page, size);
//        return ResponseEntity.ok(transactionDTOs);
//    }
//    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, String>> getStats() {
        Map<String, String> stats = transactionService.getStats();
        return ResponseEntity.ok(stats);
    }
    


}