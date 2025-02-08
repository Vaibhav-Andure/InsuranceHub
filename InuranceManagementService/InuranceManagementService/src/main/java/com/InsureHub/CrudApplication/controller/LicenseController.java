package com.InsureHub.CrudApplication.controller;


import com.InsureHub.CrudApplication.service.IrdaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/license")
@CrossOrigin(origins="http://localhost:5173")
public class LicenseController {

    @Autowired
    private IrdaiService irdaiService;

    @GetMapping("/check-license-number")
    public ResponseEntity<Boolean> checkLicenseNumber(@RequestParam String licenseNumber) {
        boolean exists = irdaiService.checkLicenseNumber(licenseNumber);
        return ResponseEntity.ok(exists);
    }


}