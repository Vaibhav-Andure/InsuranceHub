package com.InsureHub.CrudApplication.service;


import com.InsureHub.CrudApplication.repository.IrdaiRepository;
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
