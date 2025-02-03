package com.InsureHub.CrudApplication.controller;



import com.InsureHub.CrudApplication.entities.Claim;
import com.InsureHub.CrudApplication.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Create or Update a claim
    @PostMapping("/claimpolicy")
    public ResponseEntity<String> createOrUpdateClaim(@RequestBody Claim claim) {
        try {
            Claim savedClaim = claimService.saveClaim(claim);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Claim registered successfully\"}");
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed to register claim\"}");
        }
    }

    // Get claim by Policy ID
    @GetMapping("/policy/{policyId}")
    public ResponseEntity<Claim> getClaimByPolicyId(@PathVariable int policyId) {
        Optional<Claim> claim = claimService.getClaimByPolicyId(policyId);
        return claim.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Get claim by Transaction ID
    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<Claim> getClaimByTransactionId(@PathVariable String transactionId) {
        Optional<Claim> claim = claimService.getClaimByTransactionId(transactionId);
        return claim.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Get all claims
    @GetMapping
    public ResponseEntity<Iterable<Claim>> getAllClaims() {
        Iterable<Claim> claims = claimService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    // Delete claim by Claim ID
    @DeleteMapping("/{claimId}")
    public ResponseEntity<String> deleteClaim(@PathVariable int claimId) {
        try {
            claimService.deleteClaim(claimId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Claim deleted successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
        }
    }

    // Update claim status
    @PutMapping("/{claimId}/status")
    public ResponseEntity<Claim> updateClaimStatus(@PathVariable int claimId, @RequestBody String newStatus) {
        try {
            Claim updatedClaim = claimService.updateClaimStatus(claimId, newStatus);
            return ResponseEntity.ok(updatedClaim);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
