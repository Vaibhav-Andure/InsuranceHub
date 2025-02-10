package com.insuranehub.Authentication.Service.entities;



import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    @Column(name = "RoleName", nullable = false, unique = true)
    private String roleName;

    @Column(name = "RoleDescription")
    private String roleDescription;

    // Getters and Setters
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }
}
