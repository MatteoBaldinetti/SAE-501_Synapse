package com.synapse.sae501.controllers;

import com.synapse.sae501.dto.InstructorCreationDTO;
import com.synapse.sae501.exceptions.ApiError;
import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.services.InstructorService;
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
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
@Tag(name = "Instructors", description = "Endpoints for managing instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Operation(summary = "Create a new instructor")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Instructor created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create instructor", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Instructor> createInstructor(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Instructor object")
            @RequestBody InstructorCreationDTO instructorDTO
    ) {
        Instructor result = instructorService.createInstructor(instructorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all instructors")
    @ApiResponse(responseCode = "200", description = "List of instructors retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        List<Instructor> result = instructorService.getAllInstructors();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get instructor by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Instructor retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Instructor not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(
            @Parameter(description = "Instructor ID")
            @PathVariable Long id
    ) {
        Instructor result = instructorService.getInstructorById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete instructor by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Instructor deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Instructor not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructorById(
            @Parameter(description = "Instructor ID")
            @PathVariable Long id
    ) {
        instructorService.deleteInstructorById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update instructor")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Instructor updated successfully"),
            @ApiResponse(responseCode = "404", description = "Instructor not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Instructor> updateInstructor(
            @Parameter(description = "Instructor ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Instructor object")
            @RequestBody InstructorCreationDTO instructorDTO
    ) {
        Instructor result = instructorService.updateInstructor(instructorDTO, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search instructors with filters")
    @ApiResponse(responseCode = "200", description = "List of instructors retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Instructor>> searchInstructors(
            @Parameter(description = "Instructor ID") @RequestParam(required = false) Long id,
            @Parameter(description = "First name") @RequestParam(required = false) String firstName,
            @Parameter(description = "Last name") @RequestParam(required = false) String lastName,
            @Parameter(description = "Contract type") @RequestParam(required = false) String contractType,
            @Parameter(description = "Specialty") @RequestParam(required = false) String specialty
    ) {
        List<Instructor> result = instructorService.searchInstructors(id, firstName, lastName, contractType, specialty);
        return ResponseEntity.ok(result);
    }
}
