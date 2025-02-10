package com.InsureHub.insuranceManagementService.DTO;

public class InsuredMemberDTO {
    private int memberId;
    private String memberName;
    private String dateOfBirth;  // Changed to String for consistency with DTOs
    private String relationship;  // Relationship to the policyholder

    // Default Constructor
    public InsuredMemberDTO() {
    }

    // Constructor for mapping specific fields
    public InsuredMemberDTO(int id, String name, String dateOfBirth) {
        this.memberId = id;
        this.memberName = name;
        this.dateOfBirth = dateOfBirth;
    }

    // Constructor for full mapping
    public InsuredMemberDTO(int memberId, String memberName, String dateOfBirth, String relationship) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.dateOfBirth = dateOfBirth;
        this.relationship = relationship;
    }

    // Getters and Setters
    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
}
