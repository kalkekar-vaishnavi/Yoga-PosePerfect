package com.example.yoga.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_user_feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserFeedBackModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    @Column(length = 1000)
    private String message;

    @Column(nullable = false)
    private int rate;
}
