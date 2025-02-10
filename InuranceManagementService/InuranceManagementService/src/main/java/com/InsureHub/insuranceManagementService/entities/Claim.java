package com.InsureHub.insuranceManagementService.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claimId;

    @Column(nullable = false)
    private String claimantName;  // New field for claimant name

    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    @OneToOne
    @JoinColumn(name = "transaction_id", referencedColumnName = "transactionId", nullable = false, unique = true)
    private Transaction transaction; // One claim per transaction

    @Column(nullable = false)
    private String claimStatus = "Pending"; // Default claim status is "Pending"

    @Column(nullable = false)
    private Double claimAmount;

    @Temporal(TemporalType.DATE)
    private Date incidentDate;

    private String incidentDescription;

    // New fields for tracking claim status and approval times
    @Temporal(TemporalType.TIMESTAMP)
    private Date filedDate; // Time when the claim was filed

    @Temporal(TemporalType.TIMESTAMP)
    private Date approvedDate; // Time when the claim was approved

    // Default Constructor
    public Claim() {}

    // Constructor
    public Claim(Policy policy, Transaction transaction, Double claimAmount, String claimantName) {
        this.policy = policy;
        this.transaction = transaction;
        this.claimAmount = claimAmount;
        this.claimantName = claimantName;  // Set claimant name
        this.claimStatus = "Pending";  // Set default status to "Pending"
    }

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

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
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

    // New Getters and Setters for tracking claim status and approval times
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
