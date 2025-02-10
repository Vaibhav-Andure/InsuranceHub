package com.InsureHub.insuranceManagementService.repository;


import com.InsureHub.insuranceManagementService.entities.Irdai;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IrdaiRepository extends JpaRepository<Irdai, Integer> {
    boolean existsByLicenseNumber(String licenseNumber);
}