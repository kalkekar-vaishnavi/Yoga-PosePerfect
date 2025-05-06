package com.example.yoga.repository;

import com.example.yoga.model.YogaPoses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YogaPosesRepository extends JpaRepository<YogaPoses, Long> {
    // Custom query methods (if needed) can be added here
    List<YogaPoses> findByDifficultyLevel(String difficultyLevel);
    List<YogaPoses> findByDifficultyLevelIsNullOrDifficultyLevel(String difficultyLevel);
    List<YogaPoses> findByBenefitsContaining(String keyword);


}
