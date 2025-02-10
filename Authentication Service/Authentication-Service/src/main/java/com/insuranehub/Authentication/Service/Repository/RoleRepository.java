package com.insuranehub.Authentication.Service.Repository;



import com.insuranehub.Authentication.Service.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRoleName(String roleName);
}
