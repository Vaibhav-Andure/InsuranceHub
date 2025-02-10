package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.ClaimDTO; // Import your ClaimDTO
import com.InsureHub.insuranceManagementService.entities.Claim;
import com.InsureHub.insuranceManagementService.entities.PolicyHolder;
import com.InsureHub.insuranceManagementService.entities.Transaction;
import com.InsureHub.insuranceManagementService.repository.ClaimRepository;
import com.InsureHub.insuranceManagementService.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PolicyHolderService policyHolderService;

    public Claim saveClaim(int userId,  Double claimAmount, String incidentDescription, Date incidentDate) {
        // Fetch PolicyHolder by userId
        PolicyHolder policyHolder = policyHolderService.getPolicyHoldersByUserId(userId);

        if (policyHolder == null) {
            throw new IllegalArgumentException("No PolicyHolder found for the given userId.");
        }

        // Fetch the associated Transaction using PolicyHolder
        Transaction transaction =  transactionRepository.findByPolicyHolder_PolicyHolderId(policyHolder.getPolicyHolderId());

        if (transaction == null) {
            throw new IllegalArgumentException("No Transaction found for the given PolicyHolder.");
        }

        // Create a new Claim and set the relevant fields
        Claim claim = new Claim();
        claim.setClaimAmount(claimAmount);
        claim.setIncidentDescription(incidentDescription);
        claim.setIncidentDate(incidentDate);  // Set the incidentDate here

        // Set the transaction and policy for the claim
        claim.setTransaction(transaction);
        claim.setPolicy(transaction.getPolicy());

        // Set claimant name from the PolicyHolder
        claim.setClaimantName(policyHolder.getPolicyHolderName());
  claim.setApprovedDate(new Date(0));
        // Set the filed date to current date
        claim.setFiledDate(new Date());

        if (claimRepository.findByTransaction_TransactionId(claim.getTransaction().getTransactionId()).isPresent()) {
            throw new IllegalStateException("A claim already exists for this transaction.");
        }

        // Set default claim status if not set
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

    
 // Get all claims by Insurer's UserId
    public List<ClaimDTO> getClaimsByInsurerUserId(int userId) {
        List<ClaimDTO> claimDTOs = new ArrayList<>();
        
        claimRepository.findByPolicy_Insurer_User_UserId(userId)
                       .orElse(Collections.emptyList()) // Ensure an empty list if no claims exist
                       .forEach(claim -> claimDTOs.add(convertToDTO(claim))); // Convert each claim to DTO
        
        return claimDTOs;
    }
  
    
    




    // update get claim by user id



    public ClaimDTO findClaimsByUserId(int  userId) {

       Claim claim =  claimRepository.findByTransaction_PolicyHolder_User_UserId(userId);

        return convertToDTO(claim);
    }






    // Update claim status (if needed) and set approval date when approved
    public ClaimDTO updateClaimStatus(int claimId, String newStatus) {
        Optional<Claim> existingClaim = claimRepository.findById(claimId);
        if (existingClaim.isPresent()) {
            Claim claim = existingClaim.get();
            claim.setClaimStatus(newStatus);
            if ("Approved".equals(newStatus)) {
                claim.setApprovedDate(new Date());  // Sets current date if status is 'Approved'
            }
            // Save the updated claim and convert to DTO
            return convertToDTO(claimRepository.save(claim));
        } else {
            throw new IllegalArgumentException("Claim not found with ID " + claimId);
        }
    }
}