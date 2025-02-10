package com.InsureHub.insuranceManagementService.controller;

import com.InsureHub.insuranceManagementService.DTO.PolicyHolderDTO;
import com.InsureHub.insuranceManagementService.entities.PolicyHolder;
import com.InsureHub.insuranceManagementService.service.PolicyHolderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/insurance/policyholders")
//@CrossOrigin(origins="http://localhost:5173")
public class PolicyHolderController {

    @Autowired
    private PolicyHolderService policyHolderService;
    private static final Logger logger = LoggerFactory.getLogger(PolicyHolderController.class);
    // Register a new policyholder (Create)
    @PostMapping("/register")
    public ResponseEntity<PolicyHolderDTO> registerPolicyHolder(@RequestBody PolicyHolder policyHolder) {

        logger.info("Received PolicyHolder: {}", policyHolder);
        PolicyHolderDTO savedPolicyHolder = policyHolderService.createOrUpdatePolicyHolder(policyHolder);
        return new ResponseEntity<>(savedPolicyHolder, HttpStatus.CREATED);
    }

    // Update an existing policyholder
    @PutMapping("/update/{id}")
    public ResponseEntity<PolicyHolderDTO> updatePolicyHolder(@PathVariable int id, @RequestBody PolicyHolder policyHolder) {
        Optional<PolicyHolderDTO> existingPolicyHolder = policyHolderService.getPolicyHolderById(id);

        if (existingPolicyHolder.isPresent()) {
            policyHolder.setPolicyHolderId(id); // Ensure the correct ID is set for update
            PolicyHolderDTO updatedPolicyHolder = policyHolderService.createOrUpdatePolicyHolder(policyHolder);
            return new ResponseEntity<>(updatedPolicyHolder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get policyholder by ID
    @GetMapping("/{id}")
    public ResponseEntity<PolicyHolderDTO> getPolicyHolderById(@PathVariable int id) {
        Optional<PolicyHolderDTO> policyHolder = policyHolderService.getPolicyHolderById(id);
        return policyHolder.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all policyholders
    @GetMapping("/getallpolicyholders")
    public ResponseEntity<List<PolicyHolderDTO>> getAllPolicyHolders() {
        List<PolicyHolderDTO> policyHolders = policyHolderService.getAllPolicyHolders();
        return new ResponseEntity<>(policyHolders, HttpStatus.OK);
    }

    // Delete policyholder by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicyHolder(@PathVariable int id) {
        boolean isDeleted = policyHolderService.deletePolicyHolder(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
