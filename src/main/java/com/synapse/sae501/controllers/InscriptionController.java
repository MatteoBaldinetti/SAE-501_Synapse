package com.synapse.sae501.controllers;

import com.synapse.sae501.dto.InscriptionCreationDTO;
import com.synapse.sae501.exceptions.ApiError;
import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.services.InscriptionService;
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

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "*")
@Tag(name = "Inscriptions", description = "Endpoints for managing inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @Operation(summary = "Create a new inscription")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Inscription created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create inscription", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Inscription> createInscription(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Inscription object")
            @RequestBody InscriptionCreationDTO inscriptionDTO
    ) {
        Inscription result = inscriptionService.createInscription(inscriptionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all inscriptions")
    @ApiResponse(responseCode = "200", description = "List of inscriptions retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Inscription>> getAllInscriptions() {
        List<Inscription> result = inscriptionService.getAllInscriptions();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get inscription by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Inscription retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Inscription not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscriptionById(
            @Parameter(description = "Inscription ID")
            @PathVariable Long id
    ) {
        Inscription result = inscriptionService.getInscriptionById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete inscription by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Inscription deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Inscription not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscriptionById(
            @Parameter(description = "Inscription ID")
            @PathVariable Long id
    ) {
        inscriptionService.deleteInscriptionById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update inscription")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Inscription updated successfully"),
            @ApiResponse(responseCode = "404", description = "Inscription not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Inscription> updateInscription(
            @Parameter(description = "Inscription ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Inscription object")
            @RequestBody InscriptionCreationDTO inscriptionDTO
    ) {
        Inscription result = inscriptionService.updateInscription(inscriptionDTO, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search inscriptions with filters")
    @ApiResponse(responseCode = "200", description = "List of inscriptions retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Inscription>> searchInscriptions(
            @Parameter(description = "Inscription ID") @RequestParam(required = false) Long id,
            @Parameter(description = "Inscription date") @RequestParam(required = false) Timestamp inscriptionDate,
            @Parameter(description = "Status") @RequestParam(required = false) String status,
            @Parameter(description = "Date") @RequestParam(required = false) Timestamp date,
            @Parameter(description = "Amount") @RequestParam(required = false) Float amount,
            @Parameter(description = "User ID") @RequestParam(required = false) Long userId,
            @Parameter(description = "Session ID") @RequestParam(required = false) Long sessionId,
            @Parameter(description = "Training ID") @RequestParam(required = false) Long trainingId
    ) {
        List<Inscription> result = inscriptionService.searchInscriptions(id, inscriptionDate, status, date, amount, userId, sessionId, trainingId);
        return ResponseEntity.ok(result);
    }
}
