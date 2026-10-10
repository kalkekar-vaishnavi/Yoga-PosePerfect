package com.example.yoga.controller;

import com.example.yoga.dto.ApiResponse;
import com.example.yoga.model.UserFeedBackModel;
import com.example.yoga.service.UserFeedBackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for user feedback submissions.
 */
@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
@Tag(name = "Feedback", description = "User feedback and rating endpoints")
public class UserFeedBackController {

    private final UserFeedBackService feedbackService;

    public UserFeedBackController(UserFeedBackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/add")
    @Operation(summary = "Submit feedback", description = "Submit user feedback with a rating")
    public ResponseEntity<ApiResponse<UserFeedBackModel>> addFeedback(
            @Valid @RequestBody UserFeedBackModel feedback) {
        UserFeedBackModel saved = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(ApiResponse.success("Feedback submitted successfully", saved));
    }
}
