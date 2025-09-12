package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.UserDTO;
import com.InsureHub.insuranceManagementService.entities.User;
import com.InsureHub.insuranceManagementService.entities.Role;
import com.InsureHub.insuranceManagementService.repository.UserRepository;
import com.InsureHub.insuranceManagementService.repository.RoleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;  // Inject RoleRepository

    @Autowired
    private PasswordEncoder passwordEncoder;

//if user exisit by email


    public boolean userExistsByEmail(String email) {
        Optional<User> existingUser = findUserByEmail(email);
        return existingUser.isPresent();
    }


    // Find a user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }



    // Get a user by ID
    public Optional<UserDTO> getUserById(int userId) {
        return userRepository.findById(userId).map(this::convertToDTO);
    }

    // Get all users as DTOs
    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        logger.info("Retrieved {} users.", users.size());
        return users;
    }




    // Convert User entity to UserDTO
    public  UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
//        userDTO.setAddress(user.getAddress());

        if (user.getRole() != null) {
            logger.info("Fetched role name: {}", user.getRole().getRoleName());
            userDTO.setRoleName(user.getRole().getRoleName());
        } else {
            logger.warn("Role is null for user: {}", user.getEmail());
        }

        return userDTO;
    }
}
