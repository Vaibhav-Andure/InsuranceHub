package com.InsureHub.CrudApplication.controller;

import com.InsureHub.CrudApplication.DTO.ClaimDTO; // Import your ClaimDTO
import com.InsureHub.CrudApplication.entities.Claim; // Import your Claim entity
import com.InsureHub.CrudApplication.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
            ClaimDTO claimDTO = claimService.convertToDTO(savedClaim); // Convert to DTO
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Claim registered successfully\", \"claimId\": " + claimDTO.getClaimId() + "}");
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed to register claim\"}");
        }
    }

    // Get claim by Policy ID
    @GetMapping("/policy/{policyId}")
    public ResponseEntity<ClaimDTO> getClaimByPolicyId(@PathVariable int policyId) {
        Optional<ClaimDTO> claimDTO = claimService.getClaimByPolicyId(policyId);
        return claimDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Get claim by Transaction ID
    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<ClaimDTO> getClaimByTransactionId(@PathVariable String transactionId) {
        Optional<ClaimDTO> claimDTO = claimService.getClaimByTransactionId(transactionId);
        return claimDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Get all claims
    @GetMapping("/getallclaims")
    public ResponseEntity<List<ClaimDTO>> getAllClaims() {
        List<ClaimDTO> claimDTOs = claimService.getAllClaims();
        if (claimDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(claimDTOs); // Return 204 No Content if no claims found
        }
        return ResponseEntity.ok(claimDTOs); // Return 200 OK with the list of claims
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
    public ResponseEntity<ClaimDTO> updateClaimStatus(@PathVariable int claimId, @RequestBody String newStatus) {
        try {
            ClaimDTO updatedClaim = claimService.updateClaimStatus(claimId, newStatus);
             // Convert to DTO
            return ResponseEntity.ok(updatedClaim);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}