package com.example.yoga.service;

import com.example.yoga.model.UserFeedBackModel;
import com.example.yoga.repository.UserFeedBackRepository;
import org.springframework.stereotype.Service;

/**
 * Service for managing user feedback submissions.
 */
@Service
public class UserFeedBackService {

    private final UserFeedBackRepository feedbackRepository;

    public UserFeedBackService(UserFeedBackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public UserFeedBackModel saveFeedback(UserFeedBackModel feedback) {
        return feedbackRepository.save(feedback);
    }
}
