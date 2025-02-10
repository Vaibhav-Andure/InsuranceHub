
package com.InsureHub.insuranceManagementService.repository;

import com.InsureHub.insuranceManagementService.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRoleName(String roleName);
}
