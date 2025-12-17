package com.synapse.sae501.controllers;

import com.synapse.sae501.models.File;
import com.synapse.sae501.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
@Tag(name = "Files", description = "Endpoints for managing files")
public class FileController {

    @Autowired
    private FileService fileService;

    @Operation(summary = "Get all files")
    @ApiResponse(responseCode = "200", description = "List of files retrieved successfully")
    @GetMapping
    public ResponseEntity<List<File>> getAllFiles() {
        List<File> file = fileService.getAllFiles();
        return ResponseEntity.ok(file);
    }

    @Operation(summary = "Delete file by file name")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "File deleted successfully"),
            @ApiResponse(responseCode = "404", description = "File not found")
    })
    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteFile(
            @Parameter(description = "Name of the file")
            @PathVariable String fileName
    ) {
        fileService.deleteFile(fileName);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Upload a file")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "File uploaded successfully"),
            @ApiResponse(responseCode = "400", description = "Upload failed")
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<File> uploadFile(
            @Parameter(description = "File to upload")
            @RequestPart("file") MultipartFile file
    ) {
        File savedFile = fileService.uploadFile(file);
        return ResponseEntity.ok(savedFile);
    }

    @Operation(summary = "Download a file")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "File downloaded successfully"),
            @ApiResponse(responseCode = "404", description = "File not found")
    })
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(
            @Parameter(description = "Name of the file")
            @PathVariable String fileName
    ) {
        return fileService.downloadFile(fileName);
    }
}
