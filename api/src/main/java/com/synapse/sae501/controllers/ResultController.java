package com.synapse.sae501.controllers;

import com.synapse.sae501.dto.ResultCreationDTO;
import com.synapse.sae501.exceptions.ApiError;
import com.synapse.sae501.models.Result;
import com.synapse.sae501.services.ResultService;
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
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
@Tag(name = "Results", description = "Endpoints for managing results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @Operation(summary = "Create a new result")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Result created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create result", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Result> createResult(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Result object")
            @RequestBody ResultCreationDTO resultDTO
    ) {
        Result result1 = resultService.createResult(resultDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result1);
    }

    @Operation(summary = "Get all results")
    @ApiResponse(responseCode = "200", description = "List of results retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> result = resultService.getAllResults();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get result by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Result retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Result not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(
            @Parameter(description = "Result ID")
            @PathVariable Long id
    ) {
        Result result = resultService.getResultById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete result by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Result deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Result not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResultById(
            @Parameter(description = "Result ID")
            @PathVariable Long id
    ) {
        resultService.deleteResultById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update result")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Result updated successfully"),
            @ApiResponse(responseCode = "404", description = "Result not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(
            @Parameter(description = "Result ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Result object")
            @RequestBody ResultCreationDTO resultDTO
    ) {
        Result result1 = resultService.updateResult(resultDTO, id);
        return ResponseEntity.ok(result1);
    }

    @Operation(summary = "Search results with filters")
    @ApiResponse(responseCode = "200", description = "List of results retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Result>> searchResults(
            @Parameter(description = "Result ID") @RequestParam(required = false) Long id,
            @Parameter(description = "Grade") @RequestParam(required = false) Float grade,
            @Parameter(description = "Description") @RequestParam(required = false) String description,
            @Parameter(description = "User ID") @RequestParam(required = false) Long userId,
            @Parameter(description = "Session ID") @RequestParam(required = false) Long sessionId
    ) {
        List<Result> result = resultService.searchResults(id, grade, description, userId, sessionId);
        return ResponseEntity.ok(result);
    }
}
