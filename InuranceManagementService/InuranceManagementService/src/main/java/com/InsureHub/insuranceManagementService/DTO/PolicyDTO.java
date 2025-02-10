package com.InsureHub.insuranceManagementService.DTO;

import java.math.BigDecimal;
import java.util.Date;

public class PolicyDTO {

    private int policyId;
    private String policyNumber;
    private String policyName;
    private String policyTerms;
    private BigDecimal premiumAmount;
    private BigDecimal coverageAmount;
    private String coverageType;
    private String benefits;
    private String exclusions;
    private int waitingPeriod;
    private String renewalTerms;
    private String claimProcess;
    private String status;
    private Date createdDate;
   private Date modifiedDate;
private InsurerDTO insurer;  // Add InsurerDTO field

    // Default constructor
    public PolicyDTO() {}

    // Constructor for mapping Policy entity
    public PolicyDTO(int policyId, String policyNumber, String policyName ,  String policyTerms ,
                     BigDecimal premiumAmount, BigDecimal coverageAmount, String coverageType, String benefits,
                     String exclusions, int waitingPeriod, String renewalTerms, String claimProcess, String status,
                     Date createdDate, Date modifiedDate, InsurerDTO insurer) {
        this.policyId = policyId;
        this.policyNumber = policyNumber;
  this.policyName = policyName;
  this.policyTerms = policyTerms;
        this.premiumAmount = premiumAmount;
        this.coverageAmount = coverageAmount;
        this.coverageType = coverageType;
        this.benefits = benefits;
        this.exclusions = exclusions;
        this.waitingPeriod = waitingPeriod;
        this.renewalTerms = renewalTerms;
        this.claimProcess = claimProcess;
        this.status = status;
     this.createdDate = createdDate;
     this.modifiedDate = modifiedDate;
        this.insurer = insurer;  // Set InsurerDTO
    }



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

    public InsurerDTO getInsurer() {
        return insurer;
    }

    public void setInsurer(InsurerDTO insurer) {
        this.insurer = insurer;
    }






    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getPolicyTerms() {
        return policyTerms;
    }

    public void setPolicyTerms(String policyTerms) {
        this.policyTerms = policyTerms;
    }





}
