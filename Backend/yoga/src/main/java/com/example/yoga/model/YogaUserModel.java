package com.example.yoga.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_user_yoga")
public class YogaUserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Removed @Transient for repeatPassword (Backend should not store this)
    @Transient
    private String repeatPassword;

    // Constructors
    public YogaUserModel() {}

    public YogaUserModel(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRepeatPassword() { return repeatPassword; }
    public void setRepeatPassword(String repeatPassword) { this.repeatPassword = repeatPassword; }
}
