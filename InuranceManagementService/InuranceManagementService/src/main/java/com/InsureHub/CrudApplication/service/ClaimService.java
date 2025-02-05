package com.InsureHub.CrudApplication.service;

import com.InsureHub.CrudApplication.DTO.ClaimDTO; // Import your ClaimDTO
import com.InsureHub.CrudApplication.entities.Claim;
import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.repository.ClaimRepository;
import com.InsureHub.CrudApplication.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Save or update a claim
    public Claim saveClaim(Claim claim) {
        // Check if the transaction is null, and if so, throw an exception
        if (claim.getTransaction() == null) {
            throw new IllegalArgumentException("Transaction must not be null for creating a claim.");
        }

        // Ensure that the transaction exists in the database
        Transaction transaction = transactionRepository.findByTransactionId(claim.getTransaction().getTransactionId());
        if (transaction == null) {
            throw new IllegalArgumentException("Transaction with ID " + claim.getTransaction().getTransactionId() + " does not exist.");
        }

        // Set the transaction and policy based on the transaction data
        claim.setTransaction(transaction);
        claim.setPolicy(transaction.getPolicy());
        claim.setClaimantName(transaction.getPolicyHolder().getPolicyHolderName());

        // Set the filed date to the current date
        claim.setFiledDate(new Date());

        // Check if a claim already exists for this policy
        if (claim.getPolicy() != null && claimRepository.findByPolicy_PolicyId(claim.getPolicy().getPolicyId()).isPresent()) {
            throw new IllegalStateException("A claim already exists for this policy.");
        }

        // Check if a claim already exists for this transaction
        if (claim.getTransaction() != null && claimRepository.findByTransaction_TransactionId(claim.getTransaction().getTransactionId()).isPresent()) {
            throw new IllegalStateException("A claim already exists for this transaction.");
        }

        // Set the filed date if not already set
        if (claim.getFiledDate() == null) {
            claim.setFiledDate(new Date());  // Set current date if not already set
        }

        // Set the default claim status if not already set
        if (claim.getClaimStatus() == null) {
            claim.setClaimStatus("Pending");
        }

        // Save the claim to the repository
        return claimRepository.save(claim);
    }

    // Convert Claim entity to ClaimDTO
    public ClaimDTO convertToDTO(Claim claim) {
        ClaimDTO dto = new ClaimDTO();
        dto.setClaimId(claim.getClaimId());
        dto.setClaimantName(claim.getClaimantName());
        dto.setPolicyId(claim.getPolicy() != null ? claim.getPolicy().getPolicyId() : null);
        dto.setTransactionId(claim.getTransaction() != null ? claim.getTransaction().getTransactionId() : null);
        dto.setClaimStatus(claim.getClaimStatus());
        dto.setClaimAmount(claim.getClaimAmount());
        dto.setIncidentDate(claim.getIncidentDate());
        dto.setIncidentDescription(claim.getIncidentDescription());
        dto.setFiledDate(claim.getFiledDate());
        dto.setApprovedDate(claim.getApprovedDate());
        return dto;
    }

    // Find a claim by Policy ID
    public Optional<ClaimDTO> getClaimByPolicyId(int policyId) {
        return claimRepository.findByPolicy_PolicyId(policyId)
                .map(this::convertToDTO);
    }

    // Find a claim by Transaction ID
    public Optional<ClaimDTO> getClaimByTransactionId(String transactionId) {
        return claimRepository.findByTransaction_TransactionId(transactionId)
                .map(this::convertToDTO);
    }

    // Find a claim by Claim Status
    public Optional<ClaimDTO> getClaimByStatus(String claimStatus) {
        return claimRepository.findByClaimStatus(claimStatus)
                .map(this::convertToDTO);
    }

    // Get all claims
    public List<ClaimDTO> getAllClaims() {
        List<ClaimDTO> claimDTOs = new ArrayList<>();
        claimRepository.findAll().forEach(claim -> claimDTOs.add(convertToDTO(claim))); // Convert each claim to DTO
        return claimDTOs;
    }

    // Delete a claim by Claim ID
    public void deleteClaim(int claimId) {
        // Check if the claim exists before deleting
        Optional<Claim> existingClaim = claimRepository.findById(claimId);
        if (existingClaim.isPresent()) {
            claimRepository.deleteById(claimId);
        } else {
            throw new IllegalArgumentException("Claim not found with ID " + claimId);
        }
    }

    // Update claim status (if needed) and set approval date when approved
    public ClaimDTO updateClaimStatus(int claimId, String newStatus) {
        Optional<Claim> existingClaim = claimRepository.findById(claimId);
        if (existingClaim.isPresent()) {
            Claim claim = existingClaim.get();
            claim.setClaimStatus(newStatus);
            if ("Approved".equals(newStatus)) {
                claim.setApprovedDate(new Date());
            }
            // Save the updated claim and convert to DTO
            return convertToDTO(claimRepository.save(claim));
        } else {
            throw new IllegalArgumentException("Claim not found with ID " + claimId);
        }
    }
}