package com.InsureHub.insuranceManagementService.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "insurer")
public class Insurer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int insurerId;

    @Column(nullable = false)
    private String insurerName; // Name of the insurer

    @Column(nullable = true  , unique = true)
    private String licenseNumber; // License number of the insurer

    @JsonManagedReference
    @OneToMany(mappedBy = "insurer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Policy> policies = new ArrayList<>(); // Initialize to empty list

    @Column(nullable = false)
    private String address;


    @OneToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;


    // Default Constructor
    public Insurer() {
    }

    // Constructor for initializing Insurer
    public Insurer(String insurerName, String licenseNumber) {
        this.insurerName = insurerName;
        this.licenseNumber = licenseNumber;
    }

    // Getter and Setter for insurerId
    public int getInsurerId() {
        return insurerId;
    }

    public void setInsurerId(int insurerId) {
        this.insurerId = insurerId;
    }

    // Getter and Setter for insurerName
    public String getInsurerName() {
        return insurerName;
    }

    public void setInsurerName(String insurerName) {
        this.insurerName = insurerName;
    }

    // Getter and Setter for licenseNumber
    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    // Getter and Setter for policies
    public List<Policy> getPolicies() {
        return policies;
    }

    public void setPolicies(List<Policy> policies) {
        this.policies = policies;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String Address) {
        this.address = Address;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // Method to add a policy to the insurer
    public void addPolicy(Policy policy) {
        policies.add(policy);
        policy.setInsurer(this); // Set the insurer of the policy
    }
}
