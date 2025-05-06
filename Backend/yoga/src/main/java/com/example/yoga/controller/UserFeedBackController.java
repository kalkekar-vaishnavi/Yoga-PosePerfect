package com.example.yoga.controller;

import com.example.yoga.model.UserFeedBackModel;
import com.example.yoga.service.UserFeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class UserFeedBackController {

    @Autowired
    private UserFeedBackService feedbackService;

    @PostMapping("/add")
    public ResponseEntity<UserFeedBackModel> addFeedback(@RequestBody UserFeedBackModel feedback) {
        return ResponseEntity.ok(feedbackService.saveFeedback(feedback));
    }
}
