package com.InsureHub.CrudApplication.repository;


import com.InsureHub.CrudApplication.entities.Irdai;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IrdaiRepository extends JpaRepository<Irdai, Integer> {
    boolean existsByLicenseNumber(String licenseNumber);
}