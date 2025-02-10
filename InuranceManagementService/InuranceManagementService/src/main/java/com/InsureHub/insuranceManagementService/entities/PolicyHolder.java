package com.InsureHub.insuranceManagementService.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class PolicyHolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int policyHolderId;

    @Column(nullable = false)
    private String policyHolderName;

    @Column(nullable = false)
    private String dateOfBirth;

    @Column(nullable = false)
    private String aadharNumber;

    @Column(nullable = false)
    private String panNumber;

    @Column(nullable = false)
    private String contactNumber;


    @Column(nullable = false)
    private String address;

    @OneToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;


    @OneToMany(mappedBy = "policyholder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Nominee> nominees = new ArrayList<>();

    @OneToMany(mappedBy = "policyholder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<InsuredMember> insuredMembers = new ArrayList<>();


    // Getters and Setters
    public int getPolicyHolderId() {
        return policyHolderId;
    }

    public void setPolicyHolderId(int policyHolderId) {
        this.policyHolderId = policyHolderId;
    }

    public String getPolicyHolderName() {
        return policyHolderName;
    }

    public void setPolicyHolderName(String policyHolderName) {
        this.policyHolderName = policyHolderName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
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

    public List<Nominee> getNominees() {
        return nominees;
    }

    public void setNominees(List<Nominee> nominees) {
        this.nominees = nominees;
    }

    public List<InsuredMember> getInsuredMembers() {
        return insuredMembers;
    }

    public void setInsuredMembers(List<InsuredMember> insuredMembers) {
        this.insuredMembers = insuredMembers;
    }



}
