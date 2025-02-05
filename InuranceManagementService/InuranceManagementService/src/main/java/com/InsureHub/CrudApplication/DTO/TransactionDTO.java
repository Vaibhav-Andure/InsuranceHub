package com.InsureHub.CrudApplication.DTO;


import java.math.BigDecimal;
import java.util.Date;

public class TransactionDTO {

    private String transactionId;  // Unique ID of the transaction
    private BigDecimal amount;      // Amount of the transaction
    private Date transactionDate;   // Date of the transaction
    private Date createdAt;         // Date when the transaction was created
    private String policyHolderId;  // ID of the associated policy holder
    private String policyId;        // ID of the associated policy

    // Default constructor
    public TransactionDTO() {}

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getPolicyHolderId() {
        return policyHolderId;
    }

    public void setPolicyHolderId(String policyHolderId) {
        this.policyHolderId = policyHolderId;
    }

    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }
}