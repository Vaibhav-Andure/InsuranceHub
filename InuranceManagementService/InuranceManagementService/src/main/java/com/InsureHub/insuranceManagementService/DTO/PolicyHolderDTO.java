package com.InsureHub.insuranceManagementService.DTO;

import java.util.List;

public class PolicyHolderDTO {

    private int policyHolderId;
    private String policyHolderName;
    private String dateOfBirth;
    private String aadharNumber;
    private String panNumber;
    private String contactNumber;
    private List<NomineeDTO> nominees;  // Updated to NomineeDTO
    private List<InsuredMemberDTO> insuredMembers;  // Updated to InsuredMemberDTO

    // Getters and Setters
    public int getPolicyHolderId() {
        return policyHolderId;
    }

    public void setPolicyHolderId(int policyHolderId) {
        this.policyHolderId = policyHolderId;
    }

    public String getPolicyHolderName() {
        return policyHolderName;
    }

    public void setPolicyHolderName(String policyHolderName) {
        this.policyHolderName = policyHolderName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<NomineeDTO> getNominees() {
        return nominees;
    }

    public void setNominees(List<NomineeDTO> nominees) {
        this.nominees = nominees;
    }

    public List<InsuredMemberDTO> getInsuredMembers() {
        return insuredMembers;
    }

    public void setInsuredMembers(List<InsuredMemberDTO> insuredMembers) {
        this.insuredMembers = insuredMembers;
    }
}
