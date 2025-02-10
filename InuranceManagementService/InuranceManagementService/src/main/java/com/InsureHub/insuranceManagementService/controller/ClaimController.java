package com.InsureHub.insuranceManagementService.controller;

import com.InsureHub.insuranceManagementService.DTO.ClaimDTO; // Import your ClaimDTO
import com.InsureHub.insuranceManagementService.DTO.ClaimRequest;
import com.InsureHub.insuranceManagementService.entities.Claim; // Import your Claim entity
import com.InsureHub.insuranceManagementService.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/insurance/claims")
//@CrossOrigin(origins="http://localhost:5173")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/claimpolicy")
    public ResponseEntity<String> createOrUpdateClaim(@RequestBody ClaimRequest claimRequest) {

            // Extract necessary fields from the claimRequest
            int userId = claimRequest.getUserId();
            Double claimAmount = claimRequest.getClaimAmount();
            String incidentDescription = claimRequest.getIncidentDescription();
            Date incidentDate = claimRequest.getIncidentDate();

            // Call the service to save or update the claim
            Claim savedClaim = claimService.saveClaim(userId, claimAmount, incidentDescription, incidentDate);

            // Convert saved claim to DTO
            ClaimDTO claimDTO = claimService.convertToDTO(savedClaim);

            // Return success response with claimId
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    "{\"message\": \"Claim registered successfully\", \"claimId\": " + claimDTO.getClaimId() + "}"
            );

    }






    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getClaimsByUserId(@PathVariable int  userId) {
        ClaimDTO claims = claimService.findClaimsByUserId(userId);
        if (claims == null) {
            // Return a JSON response indicating that the claim is not available
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"Claim is not available for the customer\"}");
        }

        return ResponseEntity.ok(claims);
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



    // Update claim status
    @PutMapping("/{claimId}/status")
    public ResponseEntity<ClaimDTO> updateClaimStatus(@PathVariable int claimId, @RequestParam String newStatus) {
        try {
            ClaimDTO updatedClaim = claimService.updateClaimStatus(claimId, newStatus);
            // Convert to DTO
            return ResponseEntity.ok(updatedClaim);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
 // Get all claims by Insurer's UserId
    @GetMapping("/by-insurer-user/{userId}")
    public ResponseEntity<List<ClaimDTO>> getClaimsByInsurerUser(@PathVariable int userId) {
        
        List<ClaimDTO> claims = claimService.getClaimsByInsurerUserId(userId);
        
        if (claims.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no claims found
        }
        
        return ResponseEntity.ok(claims);
    }
}