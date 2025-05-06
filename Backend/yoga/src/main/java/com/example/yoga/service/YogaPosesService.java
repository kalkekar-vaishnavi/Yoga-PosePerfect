package com.example.yoga.service;

import com.example.yoga.model.YogaPoses;
import com.example.yoga.repository.YogaPosesRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

@Service
public class YogaPosesService {

    private static final String UPLOAD_DIR = "uploads/"; // ✅ Moved outside `src/main/resources/`

    @Autowired
    private YogaPosesRepository yogaPosesRepository;

    public String saveImage(MultipartFile file) throws IOException {
        // Ensure the directory exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate unique filename
        String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        // Save file
        Files.write(filePath, file.getBytes());

        // Return accessible URL
        return "/api/yoga-poses/images/" + fileName;
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
