package com.insuranehub.Authentication.Service.Repository;

import com.insuranehub.Authentication.Service.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findUserByUserId(int userId);
}
