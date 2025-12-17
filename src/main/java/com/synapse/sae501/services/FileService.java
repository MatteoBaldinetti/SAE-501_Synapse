package com.synapse.sae501.services;

import com.synapse.sae501.exceptions.BadRequestException;
import com.synapse.sae501.exceptions.ResourceNotFoundException;
import com.synapse.sae501.models.File;
import com.synapse.sae501.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    private final String uploadDir = "/workspace/uploads/";

    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }

    public void deleteFile(String fileName) {
        File file = fileRepository.findByFileName(fileName)
                .orElseThrow(() ->
                        new ResourceNotFoundException("File '" + fileName + "' not found"));

        try {
            Path path = Paths.get(uploadDir + fileName);
            Files.deleteIfExists(path);
            fileRepository.delete(file);
        } catch (IOException e) {
            throw new BadRequestException("Failed to delete file " + fileName);
        }
    }

    public File uploadFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty");
        }

        try {
            Files.createDirectories(Paths.get(uploadDir));

            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, fileName);

            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            File img = new File(
                    fileName,
                    "/api/files/download/" + fileName,
                    LocalDateTime.now()
            );

            return fileRepository.save(img);

        } catch (IOException e) {
            throw new BadRequestException("Failed to upload file");
        }
    }

    public ResponseEntity<Resource> downloadFile(String fileName) {
        try {
            Path path = Paths.get(uploadDir + fileName);

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new ResourceNotFoundException("File '" + fileName + "' not found");
            }

            String contentType = "application/octet-stream";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new BadRequestException("Failed to upload file");
        }
    }
}
