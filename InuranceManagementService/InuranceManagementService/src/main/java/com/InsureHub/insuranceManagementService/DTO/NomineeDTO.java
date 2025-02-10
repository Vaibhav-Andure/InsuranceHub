package com.InsureHub.insuranceManagementService.DTO;

public class NomineeDTO {
    private int nomineeId;
    private String nomineeName;
    private String relationship;  // Relationship to the policyholder

    // Default Constructor
    public NomineeDTO() {
    }

    // Constructor for mapping specific fields
    public NomineeDTO(int id, String name, String relationship) {
        this.nomineeId = id;
        this.nomineeName = name;
        this.relationship = relationship;
    }

    // Getters and Setters
    public int getNomineeId() {
        return nomineeId;
    }

    public void setNomineeId(int nomineeId) {
        this.nomineeId = nomineeId;
    }

    public String getNomineeName() {
        return nomineeName;
    }

    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
}
