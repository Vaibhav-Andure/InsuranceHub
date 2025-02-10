package com.InsureHub.insuranceManagementService.controller;


import com.InsureHub.insuranceManagementService.service.IrdaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/insurance/license")
//@CrossOrigin(origins="http://localhost:5173")
public class LicenseController {

    @Autowired
    private IrdaiService irdaiService;

    @GetMapping("/check-license-number")
    public ResponseEntity<Boolean> checkLicenseNumber(@RequestParam String licenseNumber) {
        boolean exists = irdaiService.checkLicenseNumber(licenseNumber);
        return ResponseEntity.ok(exists);
    }


}