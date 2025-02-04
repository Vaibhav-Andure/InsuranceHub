package com.InsureHub.CrudApplication.controller;


import com.InsureHub.CrudApplication.DTO.PolicyDTO;
import com.InsureHub.CrudApplication.entities.Policy;
import com.InsureHub.CrudApplication.service.PolicyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins="http://localhost:5173")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    // ✅ Create a new policy (Receive Policy Entity, Send DTO)

    @PostMapping("/createpolicy")
    public ResponseEntity<PolicyDTO> createPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.createPolicy(policy));
    }

    // ✅ Get all policies (Send DTOs)
    @GetMapping("getallpolicies")
    public ResponseEntity<List<PolicyDTO>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // ✅ Get policy by ID (Send DTO)
    @GetMapping("/{id}")
    public ResponseEntity<Optional<PolicyDTO>> getPolicyById(@PathVariable int id) {
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }

    // ✅ Update a policy (Receive Policy Entity, Send DTO)
    @PutMapping("/{id}")
    public ResponseEntity<PolicyDTO> updatePolicy(@PathVariable int id, @RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.updatePolicy(id, policy));
    }

    // ✅ Delete a policy
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable int id) {
        policyService.deletePolicy(id);
        return ResponseEntity.ok("Policy deleted successfully.");
    }
}
