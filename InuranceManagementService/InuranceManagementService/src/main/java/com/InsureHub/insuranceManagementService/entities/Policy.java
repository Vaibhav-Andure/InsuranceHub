package com.InsureHub.insuranceManagementService.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int policyId;

    @Column(nullable = false)
    private String policyName;

    @Column(unique = true, nullable = false)
    private String policyNumber;

    @Column(nullable = false)
    private BigDecimal premiumAmount;

    @Column(nullable = false)
    private BigDecimal coverageAmount;

    @Column(nullable = false)
    private String coverageType; // e.g., "Individual", "Family", "Group"

    @Column(columnDefinition = "TEXT")
    private String benefits; // Plain text (not JSON)

    @Column(columnDefinition = "TEXT")
    private String exclusions; // Plain text (not JSON)

    @Column(nullable = false)
    private int waitingPeriod; // in days

    private String renewalTerms;

    private String claimProcess;

    @Column(nullable = false)
    private String status; // e.g., Active, Expired, Cancelled

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedDate;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "insurer_id", referencedColumnName = "insurerId")
    private Insurer insurer; // Many policies belong to one insurer

    @Column(nullable = true)
    private String policyType; // For example, "Health", "Life", etc.

    @Column(nullable = true)
    private BigDecimal coPayment; // Co-payment percentage or amount

    @Column(nullable = true)
    private String policyTerms; // Additional policy-specific terms

    // Default Constructor
    public Policy() {}

    // Getters and Setters
    public int getPolicyId() {
        return policyId;
    }

    public void setPolicyId(int policyId) {
        this.policyId = policyId;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public BigDecimal getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(BigDecimal premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public BigDecimal getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(BigDecimal coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public String getCoverageType() {
        return coverageType;
    }

    public void setCoverageType(String coverageType) {
        this.coverageType = coverageType;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public String getExclusions() {
        return exclusions;
    }

    public void setExclusions(String exclusions) {
        this.exclusions = exclusions;
    }

    public int getWaitingPeriod() {
        return waitingPeriod;
    }

    public void setWaitingPeriod(int waitingPeriod) {
        this.waitingPeriod = waitingPeriod;
    }

    public String getRenewalTerms() {
        return renewalTerms;
    }

    public void setRenewalTerms(String renewalTerms) {
        this.renewalTerms = renewalTerms;
    }

    public String getClaimProcess() {
        return claimProcess;
    }

    public void setClaimProcess(String claimProcess) {
        this.claimProcess = claimProcess;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Insurer getInsurer() {
        return insurer;
    }

    public void setInsurer(Insurer insurer) {
        this.insurer = insurer;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public BigDecimal getCoPayment() {
        return coPayment;
    }

    public void setCoPayment(BigDecimal coPayment) {
        this.coPayment = coPayment;
    }

    public String getPolicyTerms() {
        return policyTerms;
    }

    public void setPolicyTerms(String policyTerms) {
        this.policyTerms = policyTerms;
    }




    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }





}
