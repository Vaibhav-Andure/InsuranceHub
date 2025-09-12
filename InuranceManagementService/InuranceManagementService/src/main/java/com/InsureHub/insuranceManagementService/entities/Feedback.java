package com.InsureHub.insuranceManagementService.entities;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "feedbacks")
public class Feedback {

    @Id
    private String id;
    private int userId;
    private String transactionId;
    private int rating; // 1-5 stars
    private String comments; // max 200 words
    private LocalDateTime createdAt;

    public Feedback() {
        this.createdAt = LocalDateTime.now();
    }

    public Feedback(int userId, String transactionId, int rating, String comments) {
        this.userId = userId;
        this.transactionId = transactionId;
        this.rating = rating;
        this.comments = comments;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

