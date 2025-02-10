package com.InsureHub.insuranceManagementService.DTO;

import com.InsureHub.insuranceManagementService.entities.Policy;  // Import the Policy entity

import java.util.List;

public class InsurerDTO {

    private int insurerId;
    private String insurerName;
    private String licenseNumber;
    private List<Policy> policies;  // List of Policy entities associated with the insurer

    // Default constructor
    public InsurerDTO() {}

    // Constructor for mapping Insurer entity without policies
    public InsurerDTO(int insurerId, String insurerName, String licenseNumber) {
        this.insurerId = insurerId;
        this.insurerName = insurerName;
        this.licenseNumber = licenseNumber;
    }

    // Constructor for mapping Insurer entity with policies
    public InsurerDTO(int insurerId, String insurerName, String licenseNumber, List<Policy> policies) {
        this.insurerId = insurerId;
        this.insurerName = insurerName;
        this.licenseNumber = licenseNumber;
        this.policies = policies;  // Assign the policies to the list
    }

    // Getters and Setters
    public int getInsurerId() {
        return insurerId;
    }

    public void setInsurerId(int insurerId) {
        this.insurerId = insurerId;
    }

    public String getInsurerName() {
        return insurerName;
    }

    public void setInsurerName(String insurerName) {
        this.insurerName = insurerName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public List<Policy> getPolicies() {
        return policies;
    }

    public void setPolicies(List<Policy> policies) {
        this.policies = policies;
    }
}
