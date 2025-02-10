package com.InsureHub.insuranceManagementService.service;


import com.InsureHub.insuranceManagementService.repository.IrdaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IrdaiService {

    @Autowired
    private IrdaiRepository irdaiRepository;

    public boolean checkLicenseNumber(String licenseNumber) {
        return irdaiRepository.existsByLicenseNumber(licenseNumber);
    }
}
