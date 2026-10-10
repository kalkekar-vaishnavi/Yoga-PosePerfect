package com.example.yoga.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for user login.
 */
public class LoginRequest {

    @NotBlank(message = "Username is required")
    private String userName;

    @NotBlank(message = "Password is required")
    private String password;

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
