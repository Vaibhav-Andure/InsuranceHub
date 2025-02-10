package com.InsureHub.insuranceManagementService.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Transaction")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {

    @Id
    @Column(length = 255, nullable = false, unique = true)
    private String transactionId;  // Manually assigned unique ID

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date transactionDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt = new Date();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policyHolderId", referencedColumnName = "policyHolderId", nullable = true, foreignKey = @ForeignKey(name = "fk_transaction_policyholder"))
    private PolicyHolder policyHolder;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policyId", referencedColumnName = "policyId", nullable = true, foreignKey = @ForeignKey(name = "fk_transaction_policy"))
    private Policy policy;

    // Default Constructor
    public Transaction() {}

    // Constructor
    public Transaction(String transactionId, BigDecimal amount, PolicyHolder policyHolder, Policy policy) {
        this.transactionId = transactionId;  // Manually assigned
        this.amount = amount;
        this.policyHolder = policyHolder;
        this.policy = policy;
    }

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

    public Date getCreatedAt() {
        return createdAt;
    }

    public PolicyHolder getPolicyHolder() {
        return policyHolder;
    }

    public void setPolicyHolder(PolicyHolder policyHolder) {
        this.policyHolder = policyHolder;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }
//
////    // Override equals and hashCode for proper comparison of Transaction entities
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        Transaction that = (Transaction) o;
//        return Objects.equals(transactionId, that.transactionId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(transactionId);
//    }
//
//    // Override toString for better logging and debugging
//    @Override
//    public String toString() {
//        return "Transaction{" +
//                "transactionId='" + transactionId + '\'' +
//                ", amount=" + amount +
//                ", transactionDate=" + transactionDate +
//                ", createdAt=" + createdAt +
//                ", policyHolder=" + (policyHolder != null ? policyHolder.getPolicyHolderId() : "null") +
//                ", policy=" + (policy != null ? policy.getPolicyId() : "null") +
//                '}';
//    }
//
//


}
