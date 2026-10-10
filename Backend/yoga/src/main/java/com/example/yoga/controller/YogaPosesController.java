package com.example.yoga.controller;

import com.example.yoga.dto.ApiResponse;
import com.example.yoga.model.YogaPoses;
import com.example.yoga.service.YogaPosesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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

/**
 * REST controller for managing yoga poses and their images.
 */
@RestController
@RequestMapping("/api/yoga-poses")
@CrossOrigin("*")
@Tag(name = "Yoga Poses", description = "CRUD operations for yoga poses with image upload")
public class YogaPosesController {

    private final YogaPosesService yogaPoseService;

    private static final String IMAGE_BASE_URL = "http://localhost:8085/api/yoga-poses/images/";

    public YogaPosesController(YogaPosesService yogaPoseService) {
        this.yogaPoseService = yogaPoseService;
    }

    @PostMapping("/upload")
    @Operation(summary = "Upload a yoga pose", description = "Upload a new yoga pose with an image")
    public ResponseEntity<ApiResponse<String>> uploadYogaPose(
            @Parameter(description = "Name of the yoga pose") @RequestParam("name") String name,
            @Parameter(description = "Description of the pose") @RequestParam("description") String description,
            @Parameter(description = "Health benefits") @RequestParam("benefits") String benefits,
            @Parameter(description = "Difficulty: Basic, Intermediate, or Advanced")
            @RequestParam(value = "difficultyLevel", required = false) String difficultyLevel,
            @Parameter(description = "Pose image file") @RequestParam("image") MultipartFile imageFile) {

        try {
            if (difficultyLevel == null || difficultyLevel.isEmpty()) {
                difficultyLevel = "Not Specified";
            }

            String imageUrl = yogaPoseService.saveImage(imageFile);
            YogaPoses yogaPose = new YogaPoses(name, description, difficultyLevel, imageUrl, benefits);
            yogaPoseService.saveYogaPose(yogaPose);

            return ResponseEntity.ok(ApiResponse.success("Yoga pose uploaded successfully", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Error uploading image: " + e.getMessage()));
        }
    }

    @GetMapping
    @Operation(summary = "Get all yoga poses", description = "Retrieve all yoga poses, optionally filtered by difficulty")
    public ResponseEntity<ApiResponse<List<YogaPoses>>> getAllYogaPoses(
            @Parameter(description = "Filter by difficulty level")
            @RequestParam(value = "difficultyLevel", defaultValue = "") String difficultyLevel) {

        List<YogaPoses> yogaPoses;

        if (difficultyLevel.isEmpty()) {
            yogaPoses = yogaPoseService.getYogaPosesByDifficultyLevelIsNullOrNotSpecified();
        } else {
            yogaPoses = yogaPoseService.getYogaPosesByDifficulty(difficultyLevel);
        }

        yogaPoses.forEach(this::resolveImageUrl);
        return ResponseEntity.ok(ApiResponse.success("Yoga poses retrieved successfully", yogaPoses));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get pose by ID", description = "Retrieve a specific yoga pose by its ID")
    public ResponseEntity<ApiResponse<YogaPoses>> getYogaPoseById(
            @Parameter(description = "Pose ID") @PathVariable("id") Long id) {

        Optional<YogaPoses> yogaPose = yogaPoseService.getYogaPoseById(id);

        if (yogaPose.isPresent()) {
            YogaPoses pose = yogaPose.get();
            resolveImageUrl(pose);
            return ResponseEntity.ok(ApiResponse.success("Yoga pose found", pose));
        }
        return ResponseEntity.status(404)
                .body(ApiResponse.error("Yoga pose not found with ID: " + id));
    }

    @GetMapping("/images/{filename}")
    @Operation(summary = "Get pose image", description = "Serve an uploaded pose image by filename")
    public ResponseEntity<Resource> getImage(
            @Parameter(description = "Image filename") @PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/difficulty/{level}")
    @Operation(summary = "Get poses by difficulty", description = "Retrieve all yoga poses of a specific difficulty level")
    public ResponseEntity<ApiResponse<List<YogaPoses>>> getYogaPosesByDifficulty(
            @Parameter(description = "Difficulty level: Basic, Intermediate, Advanced")
            @PathVariable("level") String level) {

        List<YogaPoses> yogaPoses = yogaPoseService.getYogaPosesByDifficulty(level);
        yogaPoses.forEach(this::resolveImageUrl);
        return ResponseEntity.ok(ApiResponse.success("Poses retrieved for difficulty: " + level, yogaPoses));
    }

    /**
     * Resolve the stored relative image URL to a full URL.
     */
    private void resolveImageUrl(YogaPoses pose) {
        if (pose.getImageUrl() != null && !pose.getImageUrl().isEmpty()) {
            String url = pose.getImageUrl();
            if (!url.startsWith("http")) {
                pose.setImageUrl(IMAGE_BASE_URL + url);
            }
        }
        if (pose.getBenefits() == null || pose.getBenefits().trim().isEmpty()) {
            pose.setBenefits("Not Specified");
        }
    }
}
