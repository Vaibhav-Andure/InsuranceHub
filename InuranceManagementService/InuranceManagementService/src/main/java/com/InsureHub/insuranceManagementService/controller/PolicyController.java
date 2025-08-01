package com.InsureHub.insuranceManagementService.controller;


import com.InsureHub.insuranceManagementService.DTO.PolicyDTO;
import com.InsureHub.insuranceManagementService.entities.Policy;
import com.InsureHub.insuranceManagementService.service.PolicyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/insurance/policies")
//@CrossOrigin(origins="http://localhost:5173")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    private static final Logger logger = LoggerFactory.getLogger(PolicyController.class);


    //  Create a new policy (Receive Policy Entity, Send DTO)

    @PostMapping("/createpolicy")
    public ResponseEntity<PolicyDTO> createPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.createPolicy(policy));
    }



    @GetMapping("/getallpolicies")
    public ResponseEntity<List<PolicyDTO>> getAllPolicies() {
        long startTime = System.currentTimeMillis();
        List<PolicyDTO> policies = policyService.getAllPolicies();
        long endTime = System.currentTimeMillis();
        logger.info("Time taken to send response: " + (endTime - startTime) + " milliseconds");
        return ResponseEntity.ok(policies);
    }




 // ✅ Get all policies by User Id
    @GetMapping("/byinsureruserid/{userId}")
    public ResponseEntity<List<PolicyDTO>> getPoliciesByUserId(@PathVariable int userId) {
        List<PolicyDTO> policies = policyService.getPoliciesByUserId(userId);
        return ResponseEntity.ok(policies); // Return the list of PolicyDTOs
    }




 // policy by insurerid
 @GetMapping("/insurers/{insurerId}")
    public List<Policy> getPoliciesByInsurerId(@PathVariable int insurerId) {
        return policyService.getPoliciesByInsurerId(insurerId);
    }


 	










    //  Get policy by ID (Send DTO)
    @GetMapping("/{id}")
    public ResponseEntity<Optional<PolicyDTO>> getPolicyById(@PathVariable int id) {
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }

    // Update a policy (Receive Policy Entity, Send DTO)
    @PutMapping("/{id}")
    public ResponseEntity<PolicyDTO> updatePolicy(@PathVariable int id, @RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.updatePolicy(id, policy));
    }

//    // Delete a policy
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deletePolicy(@PathVariable int id) {
//        policyService.deletePolicy(id);
//        return ResponseEntity.ok("Policy deleted successfully.");
//    }
}
