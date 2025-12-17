package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.SessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
@Tag(name = "Sessions", description = "Endpoints for managing sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Operation(summary = "Create a new session")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Session created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create session")
    })
    @PostMapping
    public ResponseEntity<Session> createSession(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Session object")
            @RequestBody Session session
    ) {
        Session result = sessionService.createSession(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all sessions")
    @ApiResponse(responseCode = "200", description = "List of sessions retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> result = sessionService.getAllSessions();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get session by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Session retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Session not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(
            @Parameter(description = "Session ID")
            @PathVariable Long id
    ) {
        Session result = sessionService.getSessionById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete session by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Session deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Session not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSessionById(
            @Parameter(description = "Session ID")
            @PathVariable Long id
    ) {
        sessionService.deleteSessionById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update session")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Session updated successfully"),
            @ApiResponse(responseCode = "404", description = "Session not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(
            @Parameter(description = "Session ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Session object")
            @RequestBody Session session
    ) {
        Session result = sessionService.updateSession(session, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search sessions with filters")
    @ApiResponse(responseCode = "200", description = "List of sessions retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Session>> searchSessions(
            @Parameter(description = "Session ID") @RequestParam(required = false) Long id,
            @Parameter(description = "") @RequestParam(required = false) Timestamp startDate,
            @Parameter(description = "") @RequestParam(required = false) Timestamp endDate,
            @Parameter(description = "") @RequestParam(required = false) String title,
            @Parameter(description = "") @RequestParam(required = false) String description,
            @Parameter(description = "") @RequestParam(required = false) Float duration,
            @Parameter(description = "") @RequestParam(required = false) Integer capacity,
            @Parameter(description = "Training ID") @RequestParam(required = false) Long trainingId,
            @Parameter(description = "Instructor ID") @RequestParam(required = false) Long instructorId,
            @Parameter(description = "Place ID") @RequestParam(required = false) Long placeId
    ) {
        List<Session> result = sessionService.searchSessions(id, startDate, endDate, title, description, duration, capacity, trainingId, instructorId, placeId);
        return ResponseEntity.ok(result);
    }
}
