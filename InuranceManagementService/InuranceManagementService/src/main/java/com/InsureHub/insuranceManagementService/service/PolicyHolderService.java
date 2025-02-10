package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.InsuredMemberDTO;
import com.InsureHub.insuranceManagementService.DTO.NomineeDTO;
import com.InsureHub.insuranceManagementService.DTO.PolicyHolderDTO;
import com.InsureHub.insuranceManagementService.entities.PolicyHolder;
import com.InsureHub.insuranceManagementService.entities.User;
import com.InsureHub.insuranceManagementService.repository.PolicyHolderRepository;
import com.InsureHub.insuranceManagementService.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PolicyHolderService {

    private static final Logger logger = LoggerFactory.getLogger(PolicyHolderService.class);

    @Autowired
    private PolicyHolderRepository policyHolderRepository;

    @Autowired
    private UserRepository userRepository;



    public PolicyHolder getPolicyHoldersByUserId(int userId) {
        return policyHolderRepository.findByUser_UserId(userId);
    }

    // Create or update policyholder
    public PolicyHolderDTO createOrUpdatePolicyHolder(PolicyHolder policyHolder) {
        // Extract userId from the nested User object


        int userId = policyHolder.getUser().getUserId();

        // Log to track if the user exists or not
        logger.info("Fetching user with ID: {}", userId);

        // Fetch the user using userId and set it, using orElseThrow for better error handling
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        policyHolder.setUser(user);  // Set the fetched user

        // Log that user has been fetched successfully
        logger.info("User found and set for PolicyHolder with ID: {}", userId);

        // Ensure nominees are set
        if (policyHolder.getNominees() != null) {
            policyHolder.getNominees().forEach(nominee -> nominee.setPolicyholder(policyHolder));
        }

        // Ensure insured members are set
        if (policyHolder.getInsuredMembers() != null) {
            policyHolder.getInsuredMembers().forEach(member -> member.setPolicyholder(policyHolder));
        }

        // Log before saving
        logger.info("Saving PolicyHolder with ID: {}", policyHolder.getPolicyHolderId());

        // Save the policyholder
        PolicyHolder savedPolicyHolder = policyHolderRepository.save(policyHolder);

        // Log after save
        logger.info("Saved PolicyHolder with ID: {}", savedPolicyHolder.getPolicyHolderId());

        // Convert saved entity to DTO and return
        return convertToDTO(savedPolicyHolder);
    }

    // Get policyholder by ID
    public Optional<PolicyHolderDTO> getPolicyHolderById(int id) {
        // Log the attempt to fetch the policyholder
        logger.info("Fetching PolicyHolder with ID: {}", id);

        Optional<PolicyHolder> policyHolder = policyHolderRepository.findById(id);

        if (policyHolder.isPresent()) {
            logger.info("PolicyHolder with ID: {} found", id);
        } else {
            logger.warn("PolicyHolder with ID: {} not found", id);
        }

        return policyHolder.map(this::convertToDTO);
    }

    // Get all policyholders
    public List<PolicyHolderDTO> getAllPolicyHolders() {
        logger.info("Fetching all PolicyHolders");
        List<PolicyHolder> policyHolders = policyHolderRepository.findAll();
        return policyHolders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Delete policyholder by ID
    public boolean deletePolicyHolder(int id) {
        logger.info("Attempting to delete PolicyHolder with ID: {}", id);

        if (!policyHolderRepository.existsById(id)) {
            logger.warn("PolicyHolder with ID: {} does not exist", id);
            return false;  // Policyholder not found
        }

        policyHolderRepository.deleteById(id);
        logger.info("Deleted PolicyHolder with ID: {}", id);
        return true;  // Deleted successfully
    }

    // DTO conversion
    private PolicyHolderDTO convertToDTO(PolicyHolder policyHolder) {
        PolicyHolderDTO dto = new PolicyHolderDTO();
        dto.setPolicyHolderId(policyHolder.getPolicyHolderId());
        dto.setPolicyHolderName(policyHolder.getPolicyHolderName());
        dto.setDateOfBirth(policyHolder.getDateOfBirth());
        dto.setContactNumber(policyHolder.getContactNumber());
        dto.setAadharNumber(policyHolder.getAadharNumber());
        dto.setPanNumber(policyHolder.getPanNumber());

        // Convert Nominee entities to DTOs if the list is not null
        if (policyHolder.getNominees() != null && !policyHolder.getNominees().isEmpty()) {
            logger.info("Converting Nominees to DTOs for PolicyHolder ID: {}", policyHolder.getPolicyHolderId());
            dto.setNominees(policyHolder.getNominees()
                    .stream()
                    .map(nominee -> new NomineeDTO(
                            nominee.getId(),
                            nominee.getName(),
                            nominee.getRelationship()
                    ))
                    .collect(Collectors.toList()));
        } else {
            logger.info("No Nominees found for PolicyHolder ID: {}", policyHolder.getPolicyHolderId());
            dto.setNominees(List.of());  // Empty list if there are no nominees
        }

        // Convert InsuredMember entities to DTOs if the list is not null
        if (policyHolder.getInsuredMembers() != null && !policyHolder.getInsuredMembers().isEmpty()) {
            logger.info("Converting Insured Members to DTOs for PolicyHolder ID: {}", policyHolder.getPolicyHolderId());
            dto.setInsuredMembers(policyHolder.getInsuredMembers()
                    .stream()
                    .map(member -> new InsuredMemberDTO(
                            member.getId(),
                            member.getName(),
                            member.getDateOfBirth()
                    ))
                    .collect(Collectors.toList()));
        } else {
            logger.info("No Insured Members found for PolicyHolder ID: {}", policyHolder.getPolicyHolderId());
            dto.setInsuredMembers(List.of());  // Empty list if there are no insured members
        }

        return dto;
    }
}
