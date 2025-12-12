package com.synapse.sae501.controllers;

import com.synapse.sae501.models.File;
import com.synapse.sae501.services.FileService;
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
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping
    public Iterable<File> getAllImages() {
        return fileService.getAllImages();
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteImage(@PathVariable String fileName) {
        boolean deleted = fileService.deleteImage(fileName);

        if (deleted) {
            return ResponseEntity.ok("File deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found or could not be deleted.");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            File savedFile = fileService.uploadImage(image);
            return ResponseEntity.ok(savedFile);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Upload failed.");
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String fileName) {
        try {
            return fileService.downloadImage(fileName);
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
