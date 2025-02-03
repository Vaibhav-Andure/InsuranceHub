package com.InsureHub.CrudApplication.repository;



import com.InsureHub.CrudApplication.entities.Insurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Integer> {
    // Additional custom queries can be defined here
    Insurer findByInsurerName(String insurerName);
    Insurer findByLicenseNumber(String licenseNumber);
    Insurer findByInsurerId(int insurerId); // Custom query for insurerId
}
