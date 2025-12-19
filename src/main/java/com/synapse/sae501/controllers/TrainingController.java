package com.synapse.sae501.controllers;

import com.synapse.sae501.dto.TrainingCreationDTO;
import com.synapse.sae501.exceptions.ApiError;
import com.synapse.sae501.models.Training;
import com.synapse.sae501.services.TrainingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@CrossOrigin(origins = "*")
@Tag(name = "Trainings", description = "Endpoints for managing trainings")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @Operation(summary = "Create a new training")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Training created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create training", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Training> createTraining(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Training object")
            @RequestBody TrainingCreationDTO trainingDTO
    ) {
        Training result = trainingService.createTraining(trainingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all trainings")
    @ApiResponse(responseCode = "200", description = "List of trainings retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Training>> getAllTrainings() {
        List<Training> result = trainingService.getAllTrainings();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get training by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Training retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Training not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Training> getTrainingById(
            @Parameter(description = "Training ID")
            @PathVariable Long id
    ) {
        Training result = trainingService.getTrainingById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete training by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Training deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Training not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingById(
            @Parameter(description = "Training ID")
            @PathVariable Long id
    ) {
        trainingService.deleteTrainingById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update training")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Training updated successfully"),
            @ApiResponse(responseCode = "404", description = "Training not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Training> updateTraining(
            @Parameter(description = "Training ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Training object")
            @RequestBody TrainingCreationDTO trainingDTO
    ) {
        Training result = trainingService.updateTraining(trainingDTO, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search trainings with filters")
    @ApiResponse(responseCode = "200", description = "List of trainings retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Training>> searchTrainings(
            @Parameter(description = "Training ID") @RequestParam(required = false) Long id,
            @Parameter(description = "Title") @RequestParam(required = false) String title,
            @Parameter(description = "Description") @RequestParam(required = false) String description,
            @Parameter(description = "Detailed description") @RequestParam(required = false) String detailedDescription,
            @Parameter(description = "Prerequisites") @RequestParam(required = false) String prerequisites,
            @Parameter(description = "Image name") @RequestParam(required = false) String imgName,
            @Parameter(description = "Category") @RequestParam(required = false) String category,
            @Parameter(description = "Duration") @RequestParam(required = false) Float duration,
            @Parameter(description = "Price") @RequestParam(required = false) Float price,
            @Parameter(description = "Learn text") @RequestParam(required = false) String learnText
    ) {
        List<Training> result = trainingService.searchTrainings(id, title, description, detailedDescription, prerequisites, imgName, category, duration, price, learnText);
        return ResponseEntity.ok(result);
    }
}
