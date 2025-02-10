package com.InsureHub.insuranceManagementService.entities;



import jakarta.persistence.*;

@Entity
public class Nominee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String dateOfBirth;

    @Column(nullable = false)
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "policyholderId", nullable = false)
    private PolicyHolder policyholder;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public PolicyHolder getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(PolicyHolder policyholder) {
        this.policyholder = policyholder;
    }
}
