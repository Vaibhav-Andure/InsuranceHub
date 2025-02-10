package com.InsureHub.insuranceManagementService.repository;




import com.InsureHub.insuranceManagementService.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findUserByUserId(int userId);
}
