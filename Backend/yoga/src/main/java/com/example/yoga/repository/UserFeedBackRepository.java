package com.example.yoga.repository;

import com.example.yoga.model.UserFeedBackModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedBackRepository extends JpaRepository<UserFeedBackModel, Long> {
}
