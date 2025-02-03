package com.InsureHub.CrudApplication.service;

import com.InsureHub.CrudApplication.entities.Claim;
import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.repository.ClaimRepository;
import com.InsureHub.CrudApplication.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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

        // Set the incident date to the current date

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
            claim.setFiledDate(new java.util.Date());  // Set current date if not already set
        }

        // Set the default claim status if not already set
        if (claim.getClaimStatus() == null) {
            claim.setClaimStatus("Pending");
        }

        // Save the claim to the repository
        return claimRepository.save(claim);
    }


    // Find a claim by Policy ID
    public Optional<Claim> getClaimByPolicyId(int policyId) {
        return claimRepository.findByPolicy_PolicyId(policyId);
    }

    // Find a claim by Transaction ID
    public Optional<Claim> getClaimByTransactionId(String transactionId) {
        return claimRepository.findByTransaction_TransactionId(transactionId);
    }

    // Find a claim by Claim Status
    public Optional<Claim> getClaimByStatus(String claimStatus) {
        return claimRepository.findByClaimStatus(claimStatus);
    }

    // Get all claims
    public Iterable<Claim> getAllClaims() {
        return claimRepository.findAll();
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
    public Claim updateClaimStatus(int claimId, String newStatus) {
        Optional<Claim> existingClaim = claimRepository.findById(claimId);
        if (existingClaim.isPresent()) {
            Claim claim = existingClaim.get();
            claim.setClaimStatus(newStatus);
                 if (newStatus == "Approved"){
                     claim.setApprovedDate(new Date());
                 }
            // If the claim is approved, set the approval date


            return claimRepository.save(claim);
        } else {
            throw new IllegalArgumentException("Claim not found with ID " + claimId);
        }
    }
}
