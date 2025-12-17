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
import java.util.List;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    private final String uploadDir = "/workspace/uploads/";

    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }

    public void deleteFile(String fileName) {
        Optional<File> optionalFile = fileRepository.findByFileName(fileName);

        if (optionalFile.isEmpty()) {
            return;
        }

        File file = optionalFile.get();
        try {
            Path path = Paths.get(uploadDir + fileName);
            Files.deleteIfExists(path);
            fileRepository.delete(file);
        } catch (IOException _) {}
    }

    public File uploadFile(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);

        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        File img = new File();
        img.setFileName(fileName);
        img.setUrl("/api/files/download/" + fileName);

        return fileRepository.save(img);
    }

    public ResponseEntity<Resource> downloadFile(String fileName) throws MalformedURLException {
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
