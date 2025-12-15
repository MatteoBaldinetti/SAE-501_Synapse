package com.synapse.sae501.controllers;

import com.synapse.sae501.models.File;
import com.synapse.sae501.services.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
@Tag(name = "files")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping
    public Iterable<File> getAllFiles() {
        return fileService.getAllFiles();
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        boolean deleted = fileService.deleteFile(fileName);

        if (deleted) {
            return ResponseEntity.ok("File deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found or could not be deleted.");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            File savedFile = fileService.uploadFile(file);
            return ResponseEntity.ok(savedFile);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Upload failed.");
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            return fileService.downloadFile(fileName);
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
