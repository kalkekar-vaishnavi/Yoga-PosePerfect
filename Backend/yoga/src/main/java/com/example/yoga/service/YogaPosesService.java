package com.example.yoga.service;

import com.example.yoga.model.YogaPoses;
import com.example.yoga.repository.YogaPosesRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service for managing yoga poses and image uploads.
 */
@Service
public class YogaPosesService {

    private static final String UPLOAD_DIR = "uploads/";

    private final YogaPosesRepository yogaPosesRepository;

    public YogaPosesService(YogaPosesRepository yogaPosesRepository) {
        this.yogaPosesRepository = yogaPosesRepository;
    }

    /**
     * Save an uploaded image to disk and return the accessible filename.
     */
    public String saveImage(MultipartFile file) throws IOException {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.write(filePath, file.getBytes());

        return fileName;
    }

    public YogaPoses saveYogaPose(YogaPoses yogaPose) {
        return yogaPosesRepository.save(yogaPose);
    }

    public List<YogaPoses> getAllYogaPoses() {
        return yogaPosesRepository.findAll();
    }

    public Optional<YogaPoses> getYogaPoseById(Long id) {
        return yogaPosesRepository.findById(id);
    }

    public List<YogaPoses> getYogaPosesByDifficulty(String difficultyLevel) {
        return yogaPosesRepository.findByDifficultyLevel(difficultyLevel);
    }

    public List<YogaPoses> getYogaPosesByDifficultyLevelIsNullOrNotSpecified() {
        return yogaPosesRepository.findByDifficultyLevelIsNullOrDifficultyLevel("Not Specified");
    }
}
