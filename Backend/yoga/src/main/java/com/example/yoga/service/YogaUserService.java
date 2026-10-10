package com.example.yoga.service;

import com.example.yoga.model.YogaUserModel;
import com.example.yoga.repository.YogaUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service handling user registration and authentication with BCrypt password hashing.
 */
@Service
public class YogaUserService {

    private final YogaUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public YogaUserService(YogaUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new user with a hashed password.
     *
     * @throws IllegalArgumentException if the username or email already exists
     */
    public YogaUserModel registerUser(YogaUserModel user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new IllegalArgumentException("Username '" + user.getUserName() + "' is already taken");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email '" + user.getEmail() + "' is already registered");
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Authenticate a user by verifying the raw password against the stored hash.
     *
     * @return the user if credentials are valid, empty otherwise
     */
    public Optional<YogaUserModel> authenticateUser(String username, String rawPassword) {
        Optional<YogaUserModel> userOpt = userRepository.findByUserName(username);

        if (userOpt.isPresent() && passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
            return userOpt;
        }

        return Optional.empty();
    }
}
