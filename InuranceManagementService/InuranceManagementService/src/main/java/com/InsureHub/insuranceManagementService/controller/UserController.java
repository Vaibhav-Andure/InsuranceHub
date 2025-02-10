package com.InsureHub.insuranceManagementService.controller;

import com.InsureHub.insuranceManagementService.DTO.UserDTO;
import com.InsureHub.insuranceManagementService.entities.User;
import com.InsureHub.insuranceManagementService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;





    @GetMapping("/validate-email")
    public ResponseEntity<Boolean> validateUserEmail(@RequestParam String email) {
        boolean userExists = userService.userExistsByEmail(email);
        return ResponseEntity.ok(userExists);
    }







    // User registration endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {


        System.out.println("Received request: " + user);
        System.out.println("received user data ");
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        System.out.println(user.getRole().getRoleName());






        // Check if the user already exists by email
        Optional<User> existingUser = userService.findUserByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"message\": \"User already exists. Please sign in.\"}");
        } else {
            try {
                User registeredUser = userService.registerUser(user);
                if (registeredUser == null) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("{\"message\": \"User already exists. Please sign in.\"}");
                }
                UserDTO  SENDUSER =  userService.convertToDTO(registeredUser);
                return ResponseEntity.ok(SENDUSER);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("{\"message\": \"Registration failed. Please try again.\"}");
            }
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // Perform login by matching email and password
        Optional<UserDTO> loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        // If user found, return 200 OK with the user details
        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get());
        } else {
            // If not found, return 401 Unauthorized with an error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials, please enter valid credentials.\"}");
        }
    }

    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<Optional<UserDTO>> getUserById(@PathVariable int userId) {
        try {
            Optional<UserDTO> userDTO = userService.getUserById(userId);
            return ResponseEntity.ok(userDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    // Get all users
    @GetMapping("/getallusers")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Update user
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody User user) {
        try {
            Optional<UserDTO> updatedUser = userService.updateUser(userId, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"User not found.\"}");
        }
    }

    // Delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
