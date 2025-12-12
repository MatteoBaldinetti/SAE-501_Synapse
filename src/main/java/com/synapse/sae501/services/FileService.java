package com.synapse.sae501.services;

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
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    private final String uploadDir = "/workspace/uploads/";

    public Iterable<File> getAllImages() {
        return fileRepository.findAll();
    }

    public boolean deleteImage(String fileName) {
        Optional<File> optionalImage = fileRepository.findByFileName(fileName);

        if (optionalImage.isEmpty()) {
            return false;
        }

        File file = optionalImage.get();
        try {
            Path path = Paths.get(uploadDir + fileName);
            Files.deleteIfExists(path);
            fileRepository.delete(file);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public File uploadImage(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);

        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        File img = new File();
        img.setFileName(fileName);
        img.setUrl("/api/files/download/" + fileName);

        return fileRepository.save(img);
    }

    public ResponseEntity<Resource> downloadImage(String fileName) throws MalformedURLException {
        Path path = Paths.get(uploadDir + fileName);

        Resource resource = new UrlResource(path.toUri());
        if (!resource.exists()) {
            return  ResponseEntity.notFound().build();
        }

        String contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(resource);
    }
}
