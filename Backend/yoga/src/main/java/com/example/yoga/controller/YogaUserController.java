package com.example.yoga.controller;

import com.example.yoga.dto.ApiResponse;
import com.example.yoga.dto.AuthResponse;
import com.example.yoga.dto.LoginRequest;
import com.example.yoga.dto.RegisterRequest;
import com.example.yoga.model.YogaUserModel;
import com.example.yoga.security.JwtUtil;
import com.example.yoga.service.YogaUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller handling user registration and authentication.
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Authentication", description = "User registration and login endpoints")
public class YogaUserController {

    private final YogaUserService userService;
    private final JwtUtil jwtUtil;

    public YogaUserController(YogaUserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account with hashed password")
    public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody RegisterRequest request) {
        YogaUserModel user = new YogaUserModel(
                request.getUserName(),
                request.getEmail(),
                request.getPassword()
        );
        YogaUserModel savedUser = userService.registerUser(user);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully",
                new AuthResponse(jwtUtil.generateToken(savedUser.getUserName()), savedUser.getUserName())));
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticates a user and returns a JWT token")
    public ResponseEntity<ApiResponse<?>> loginUser(@Valid @RequestBody LoginRequest request) {
        Optional<YogaUserModel> authenticatedUser =
                userService.authenticateUser(request.getUserName(), request.getPassword());

        if (authenticatedUser.isPresent()) {
            String token = jwtUtil.generateToken(request.getUserName());
            return ResponseEntity.ok(ApiResponse.success("Login successful",
                    new AuthResponse(token, request.getUserName())));
        }

        return ResponseEntity.status(401)
                .body(ApiResponse.error("Invalid username or password"));
    }
}
