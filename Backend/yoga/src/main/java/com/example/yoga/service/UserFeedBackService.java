package com.example.yoga.service;

import com.example.yoga.model.UserFeedBackModel;
import com.example.yoga.repository.UserFeedBackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFeedBackService {

    @Autowired
    private UserFeedBackRepository feedbackRepository;

    public UserFeedBackModel saveFeedback(UserFeedBackModel feedback) {
        return feedbackRepository.save(feedback);
    }
}
