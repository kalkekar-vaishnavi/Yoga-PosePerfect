package com.example.yoga.model;

import jakarta.persistence.*;


@Entity
@Table(name = "yoga-poses") // Changed to follow naming conventions
public class YogaPoses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    private String difficultyLevel;

    private String benefits;

    @Column(name = "image_url")
    private String imageUrl; // URL of the image file

    public YogaPoses() {}

    public YogaPoses(String name, String description, String difficultyLevel, String imageUrl, String benefits) {
        this.name = name;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
        this.imageUrl = imageUrl;
        this.benefits=benefits;
    }


    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }
// Optionally override toString(), equals(), and hashCode() if needed
}
