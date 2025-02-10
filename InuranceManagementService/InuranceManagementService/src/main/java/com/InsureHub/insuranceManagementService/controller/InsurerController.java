package com.InsureHub.insuranceManagementService.controller;



import com.InsureHub.insuranceManagementService.DTO.InsurerDTO;
import com.InsureHub.insuranceManagementService.entities.Insurer;
import com.InsureHub.insuranceManagementService.service.InsurerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/insurance/insurers")
//@CrossOrigin(origins="http://localhost:5173")
public class InsurerController {

    private final InsurerService insurerService;

    public InsurerController(InsurerService insurerService) {
        this.insurerService = insurerService;
    }

    // ✅ Create a new insurer (Accepts Insurer entity, returns DTO)
    @PostMapping("/registerinsurer")
    public ResponseEntity<InsurerDTO> createInsurer(@RequestBody Insurer insurer) {
        return ResponseEntity.ok(insurerService.createInsurer(insurer));
    }

    // ✅ Get all insurers (Returns List of DTOs)
    @GetMapping("/getallinsurer")
    public ResponseEntity<List<InsurerDTO>> getAllInsurers() {
        return ResponseEntity.ok(insurerService.getAllInsurers());
    }

    // ✅ Get insurer by ID (Returns DTO)
    @GetMapping("/{id}")
    public ResponseEntity<InsurerDTO> getInsurerById(@PathVariable int id) {
        Optional<InsurerDTO> insurerDTO = insurerService.getInsurerById(id);
        return insurerDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update an insurer (Accepts Insurer entity, returns DTO)
    @PutMapping("/{id}")
    public ResponseEntity<InsurerDTO> updateInsurer(@PathVariable int id, @RequestBody Insurer insurer) {
        return ResponseEntity.ok(insurerService.updateInsurer(id, insurer));
    }
    
    
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<InsurerDTO> getInsurerByUser_Id(@PathVariable int userId) {
        Optional<InsurerDTO> insurerDTO = insurerService.getInsurerByUser_Id(userId);
        return insurerDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete an insurer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInsurer(@PathVariable int id) {
        boolean deleted = insurerService.deleteInsurer(id);
        if (deleted) {
            return ResponseEntity.ok("Insurer deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
}

