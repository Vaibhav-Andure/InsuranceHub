package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.InsurerDTO;
import com.InsureHub.insuranceManagementService.DTO.PolicyDTO;
import com.InsureHub.insuranceManagementService.entities.Insurer;
import com.InsureHub.insuranceManagementService.entities.Policy;
import com.InsureHub.insuranceManagementService.repository.InsurerRepository;
import com.InsureHub.insuranceManagementService.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PolicyService {



    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private InsurerRepository insurerRepository;


    public List<Policy> getPoliciesByInsurerId(int insurerId) {
        return policyRepository.findByInsurer_InsurerId(insurerId);
    }



//    // ✅ Create new policy
//    public PolicyDTO createPolicy(Policy policy) {
////        if (policy.getInsurer() == null || policy.getInsurer().getInsurerId() == 0) {
////            throw new IllegalArgumentException("Insurer is required to create a policy.");
////        }
//
//        Insurer insurer = insurerRepository.findByUser_UserId(policy.getInsurer().getUser().getUserId());
//        if (insurer == null) {
//            throw new IllegalArgumentException("insurer is not available ");
//        }
//        policy.setStatus("Active");
//        policy.setInsurer(insurer);
//        policy.setCreatedDate(new Date());
//        policy.setModifiedDate(new Date());
//        Policy savedPolicy = policyRepository.save(policy);
//        return convertToDTO(savedPolicy);
//    }

    public PolicyDTO createPolicy(Policy policy) {
        // Validate that the policy and insurer are not null
        if (policy == null) {
            throw new IllegalArgumentException("Policy cannot be null.");
        }

        // Validate that the insurer is provided and has a valid user
        if (policy.getInsurer() == null || policy.getInsurer().getUser() == null) {
            throw new IllegalArgumentException("Insurer and associated user are required to create a policy.");
        }

        // Fetch the insurer from the database using the user ID
        Insurer insurer = insurerRepository.findByUser_UserId(policy.getInsurer().getUser().getUserId());
        if (insurer == null) {
            throw new IllegalArgumentException("Insurer not found for the provided user.");
        }

        // Set the insurer, status, and dates for the policy
        policy.setInsurer(insurer);
        policy.setStatus("Active");
        policy.setCreatedDate(new Date());
        policy.setModifiedDate(new Date());

        // Save the policy to the database
        Policy savedPolicy = policyRepository.save(policy);

        // Convert the saved policy to a DTO and return it
        return convertToDTO(savedPolicy);
    }
    
    
    
    
    // ✅ Update existing policy
    public PolicyDTO updatePolicy(int id, Policy updatedPolicy) {
        Optional<Policy> existingPolicyOpt = policyRepository.findById(id);
        if (existingPolicyOpt.isEmpty()) {
            throw new IllegalArgumentException("Policy not found with ID: " + id);
        }

        Policy existingPolicy = existingPolicyOpt.get();

        // Update fields
        existingPolicy.setPolicyNumber(updatedPolicy.getPolicyNumber());

        existingPolicy.setPremiumAmount(updatedPolicy.getPremiumAmount());
        existingPolicy.setCoverageAmount(updatedPolicy.getCoverageAmount());
        existingPolicy.setCoverageType(updatedPolicy.getCoverageType());
        existingPolicy.setBenefits(updatedPolicy.getBenefits());
        existingPolicy.setExclusions(updatedPolicy.getExclusions());
        existingPolicy.setWaitingPeriod(updatedPolicy.getWaitingPeriod());
        existingPolicy.setRenewalTerms(updatedPolicy.getRenewalTerms());
        existingPolicy.setClaimProcess(updatedPolicy.getClaimProcess());
        existingPolicy.setStatus(updatedPolicy.getStatus());
        existingPolicy.setCreatedDate(updatedPolicy.getCreatedDate());
        existingPolicy.setModifiedDate(updatedPolicy.getModifiedDate());

        // Update insurer if provided
        if (updatedPolicy.getInsurer() != null) {
            Insurer insurer = insurerRepository.findByInsurerId(updatedPolicy.getInsurer().getInsurerId());
            if (insurer == null) {
                throw new IllegalArgumentException("Invalid Insurer ID.");
            }
            existingPolicy.setInsurer(insurer);
        }
          existingPolicy.setModifiedDate(new Date());
        Policy savedPolicy = policyRepository.save(existingPolicy);
        return convertToDTO(savedPolicy);
    }














    // ✅ Get policy by ID
    public Optional<PolicyDTO> getPolicyById(int id) {
        Optional<Policy> policy = policyRepository.findById(id);
        return policy.map(this::convertToDTO);
    }

    // ✅ Get all policies
    public List<PolicyDTO> getAllPolicies() {
        List<Policy> policies = policyRepository.findAll();
        return policies.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
 // ✅ Get all policies by User Id
    public List<PolicyDTO> getPoliciesByUserId(int userId) {
        // Fetch policies using the repository method
        Optional<List<Policy>> optionalPolicies = policyRepository.findByInsurer_User_UserId(userId);
        
        // Return an empty list if no policies are found
        List<Policy> policies = optionalPolicies.orElseGet(List::of);
        
        // Convert the list of Policy entities to PolicyDTOs and return
        return policies.stream()
                .map(this::convertToDTO) // Assuming convertToDTO is a method that converts Policy to PolicyDTO
                .collect(Collectors.toList());
    }
    
 

//    // ✅ Delete policy by ID
//    public boolean deletePolicy(int id) {
//        if (!policyRepository.existsById(id)) {
//            return false;  // Policy not found
//        }
//        policyRepository.deleteById(id);
//        return true;  // Successfully deleted
//    }

    // 🔹 Convert Policy Entity to PolicyDTO
    private PolicyDTO convertToDTO(Policy policy) {
        InsurerDTO insurerDTO = null;
        if (policy.getInsurer() != null) {
            insurerDTO = new InsurerDTO(
                    policy.getInsurer().getInsurerId(),
                    policy.getInsurer().getInsurerName(),
                    policy.getInsurer().getLicenseNumber()
            );
        }

        return new PolicyDTO(
                policy.getPolicyId(),
                policy.getPolicyNumber(),
                policy.getPolicyName(),
                policy.getPolicyTerms(),
                policy.getPremiumAmount(),
                policy.getCoverageAmount(),
                policy.getCoverageType(),
                policy.getBenefits(),
                policy.getExclusions(),
                policy.getWaitingPeriod(),
                policy.getRenewalTerms(),
                policy.getClaimProcess(),
                policy.getStatus(),
                policy.getCreatedDate(),
                policy.getModifiedDate(),
                insurerDTO // Include the mapped InsurerDTO
        );
    }
}
