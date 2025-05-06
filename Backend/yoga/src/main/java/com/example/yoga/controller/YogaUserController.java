package com.example.yoga.controller;

import com.example.yoga.model.YogaUserModel;
import com.example.yoga.repository.YogaUserRepository;
import com.example.yoga.service.YogaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class YogaUserController {

    @Autowired
    private YogaUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody YogaUserModel user) {
        try {
            // Save the user
            YogaUserModel savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody YogaUserModel user) {
        try {
            Optional<YogaUserModel> authenticatedUser = userService.authenticateUser(user.getUserName(), user.getPassword());

            if (authenticatedUser.isPresent()) {
                // Generate a random token (replace this with JWT in real applications)
                String token = UUID.randomUUID().toString();
                return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
            } else {
                return ResponseEntity.status(401).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


}
