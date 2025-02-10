package com.InsureHub.insuranceManagementService.DTO;

public class UserDTO {
    private int userId;          // Unique identifier for the user
    private String username;    // Username of the user
    private String email;        // Email address of the user
//    private String address;     // Address of the user
    private String roleName;    // Name of the role assigned to the user (e.g., admin, customer, insurer)

    // Getter and Setter methods
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
