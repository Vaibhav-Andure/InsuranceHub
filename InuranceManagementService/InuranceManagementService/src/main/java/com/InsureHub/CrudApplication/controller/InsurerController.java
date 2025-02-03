package com.InsureHub.CrudApplication.controller;



import com.InsureHub.CrudApplication.DTO.InsurerDTO;
import com.InsureHub.CrudApplication.entities.Insurer;
import com.InsureHub.CrudApplication.service.InsurerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/insurers")
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

