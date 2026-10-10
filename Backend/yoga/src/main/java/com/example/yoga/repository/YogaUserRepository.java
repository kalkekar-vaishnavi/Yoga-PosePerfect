package com.example.yoga.repository;

import com.example.yoga.model.YogaUserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface YogaUserRepository extends JpaRepository<YogaUserModel, Integer> {

    Optional<YogaUserModel> findByUserName(String userName);

    Optional<YogaUserModel> findByEmail(String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
}
