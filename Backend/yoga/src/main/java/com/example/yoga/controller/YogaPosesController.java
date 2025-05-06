package com.example.yoga.controller;

import com.example.yoga.model.YogaPoses;
import com.example.yoga.service.YogaPosesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/yoga-poses")
@CrossOrigin("*")
public class YogaPosesController {

    @Autowired
    private YogaPosesService yogaPoseService;

    private static final String IMAGE_BASE_URL = "http://localhost:8085/api/yoga-poses/images/";

    // ✅ Upload Yoga Pose with Image
    @PostMapping("/upload")
    public ResponseEntity<String> uploadYogaPose(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("benefits") String benefits,
            @RequestParam(value = "difficultyLevel", required = false) String difficultyLevel,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            if (difficultyLevel == null || difficultyLevel.isEmpty()) {
                difficultyLevel = "Not Specified";
            }

            // Save the image and pose details
            String imageUrl = yogaPoseService.saveImage(imageFile);
            YogaPoses yogaPose = new YogaPoses(name, description, difficultyLevel, imageUrl, benefits);
            yogaPoseService.saveYogaPose(yogaPose);

            return ResponseEntity.ok("Yoga pose uploaded successfully! Image URL: " + imageUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading image: " + e.getMessage());
        }
    }

    // ✅ Get All Yoga Poses (with Full Image URL)
    @GetMapping
    public ResponseEntity<List<YogaPoses>> getAllYogaPoses(
            @RequestParam(value = "difficultyLevel", defaultValue = "") String difficultyLevel) {
        List<YogaPoses> yogaPoses;

        if (difficultyLevel.isEmpty()) {
            yogaPoses = yogaPoseService.getYogaPosesByDifficultyLevelIsNullOrNotSpecified();
        } else {
            yogaPoses = yogaPoseService.getYogaPosesByDifficulty(difficultyLevel);
        }

        // ✅ Set Full Image URL for each pose
        yogaPoses.forEach(pose -> {
            if (pose.getImageUrl() != null && !pose.getImageUrl().isEmpty()) {
                pose.setImageUrl(IMAGE_BASE_URL + pose.getImageUrl());
            }
            if (pose.getBenefits() == null || pose.getBenefits().trim().isEmpty()) {
                pose.setBenefits("Not Specified");
            }
        });

        return ResponseEntity.ok(yogaPoses);
    }

    // ✅ Get Yoga Pose by ID (with Image URL Fixed)
    @GetMapping("/{id}")
    public ResponseEntity<YogaPoses> getYogaPoseById(@PathVariable("id") Long id) {
        Optional<YogaPoses> yogaPose = yogaPoseService.getYogaPoseById(id);

        if (yogaPose.isPresent()) {
            YogaPoses pose = yogaPose.get();
            if (pose.getImageUrl() != null && !pose.getImageUrl().isEmpty()) {
                pose.setImageUrl(IMAGE_BASE_URL + pose.getImageUrl());
            }
            return ResponseEntity.ok(pose);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Get Images (Serve Uploaded Images to Frontend)
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Adjust if using PNG
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✅ Get Yoga Poses by Difficulty Level (with Full Image URL)
    @GetMapping("/difficulty/{level}")
    public ResponseEntity<List<YogaPoses>> getYogaPosesByDifficulty(@PathVariable("level") String level) {
        List<YogaPoses> yogaPoses = yogaPoseService.getYogaPosesByDifficulty(level);

        // ✅ Ensure the image URL is set correctly
        yogaPoses.forEach(pose -> {
            if (pose.getImageUrl() != null && !pose.getImageUrl().isEmpty()) {
                pose.setImageUrl(IMAGE_BASE_URL + pose.getImageUrl());
            }
        });

        return ResponseEntity.ok(yogaPoses);
    }
}
