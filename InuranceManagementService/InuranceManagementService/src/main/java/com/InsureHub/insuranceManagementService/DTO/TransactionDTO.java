package com.InsureHub.insuranceManagementService.DTO;

import java.math.BigDecimal;
import java.util.Date;

public class TransactionDTO {

    private String transactionId;  // Unique ID of the transaction
    private String policyHolderName;  // Name of the policy holder
    private String policyName;  // Name of the policy
    private BigDecimal amount;      // Amount of the transaction
    private Date transactionDate;   // Date of the transaction

    // Default constructor
    public TransactionDTO() {}

    // Constructor with parameters
    public TransactionDTO(String transactionId, String policyHolderName, String policyName, BigDecimal amount, Date transactionDate) {
        this.transactionId = transactionId;
        this.policyHolderName = policyHolderName;
        this.policyName = policyName;
        this.amount = amount;
        this.transactionDate = transactionDate;
    }

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPolicyHolderName() {
        return policyHolderName;
    }

    public void setPolicyHolderName(String policyHolderName) {
        this.policyHolderName = policyHolderName;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
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
}