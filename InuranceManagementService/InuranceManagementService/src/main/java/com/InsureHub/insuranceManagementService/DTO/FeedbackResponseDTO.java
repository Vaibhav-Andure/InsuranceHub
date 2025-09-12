package com.InsureHub.insuranceManagementService.DTO;



public class FeedbackResponseDTO {

    private String id;        // Feedback document ID in MongoDB
    private int userId;    // ID of the user who submitted feedback
    private String username;  // Username of the user
    private int rating;       // Rating given by the user
    private String comments;  // Feedback comments

    // Constructor
    public FeedbackResponseDTO(String id, int userId, String username, int rating, String comments) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.rating = rating;
        this.comments = comments;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
