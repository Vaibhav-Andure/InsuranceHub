package com.InsureHub.insuranceManagementService.repository;



import com.InsureHub.insuranceManagementService.entities.Insurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Integer> {
    // Additional custom queries can be defined here
    Insurer findByInsurerName(String insurerName);
    Insurer findByLicenseNumber(String licenseNumber);
    Insurer findByInsurerId(int insurerId); // Custom query for insurerId

    Insurer findByUser_UserId(int userId);
    
}
