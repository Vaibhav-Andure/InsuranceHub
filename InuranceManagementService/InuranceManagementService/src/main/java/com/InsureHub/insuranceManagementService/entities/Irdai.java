package com.InsureHub.insuranceManagementService.entities;



import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "irdai") // Table name in the database
public class Irdai implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "irDAIId", nullable = false, updatable = false)
    private Integer irDAIId; // Primary key

    @Column(name = "license_number", nullable = false, unique = true, length = 50)
    private String licenseNumber; // Unique license number

    // Default constructor
    public Irdai() {}

    // Parameterized constructor
    public Irdai(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    // Getters and Setters
    public Integer getIrDAIId() {
        return irDAIId;
    }

    public void setIrDAIId(Integer irDAIId) {
        this.irDAIId = irDAIId;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    // Override equals and hashCode for proper comparison of Irdai entities
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Irdai irdai = (Irdai) o;
        return irDAIId != null && irDAIId.equals(irdai.irDAIId);
    }


}