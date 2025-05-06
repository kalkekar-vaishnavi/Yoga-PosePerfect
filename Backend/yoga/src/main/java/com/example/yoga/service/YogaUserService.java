package com.example.yoga.service;

import com.example.yoga.model.YogaUserModel;
import com.example.yoga.repository.YogaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class YogaUserService {

    @Autowired
    private YogaUserRepository userRepository;

    public YogaUserModel registerUser(YogaUserModel user) {
        // Save user to database
        return userRepository.save(user);
    }

    public Optional<YogaUserModel> authenticateUser(String username, String password) {
        // Find user by username and password
        return userRepository.findByUserNameAndPassword(username, password);
    }
}
