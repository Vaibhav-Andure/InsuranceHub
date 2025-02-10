package com.InsureHub.insuranceManagementService.DTO;



import java.util.Date;

public class ClaimDTO {

    private Long claimId;              // Unique identifier for the claim
    private String claimantName;        // Name of the claimant
    private int policyId;              // ID of the associated policy
    private String transactionId;       // ID of the associated transaction
    private String claimStatus;         // Status of the claim
    private Double claimAmount;         // Amount of the claim
    private Date incidentDate;          // Date of the incident
    private String incidentDescription;  // Description of the incident
    private Date filedDate;             // Date when the claim was filed
    private Date approvedDate;          // Date when the claim was approved

    // Default constructor
    public ClaimDTO() {}

    // Getters and Setters
    public Long getClaimId() {
        return claimId;
    }

    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }

    public String getClaimantName() {
        return claimantName;
    }

    public void setClaimantName(String claimantName) {
        this.claimantName = claimantName;
    }

    public int getPolicyId() {
        return policyId;
    }

    public void setPolicyId(int policyId) {
        this.policyId = policyId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(String claimStatus) {
        this.claimStatus = claimStatus;
    }

    public Double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(Double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public Date getIncidentDate() {
        return incidentDate;
    }

    public void setIncidentDate(Date incidentDate) {
        this.incidentDate = incidentDate;
    }

    public String getIncidentDescription() {
        return incidentDescription;
    }

    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public Date getFiledDate() {
        return filedDate;
    }

    public void setFiledDate(Date filedDate) {
        this.filedDate = filedDate;
    }

    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(Date approvedDate) {
        this.approvedDate = approvedDate;
    }
}
