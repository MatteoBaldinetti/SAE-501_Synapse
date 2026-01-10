package com.synapse.sae501.controllers;

import com.synapse.sae501.dto.PlaceCreationDTO;
import com.synapse.sae501.exceptions.ApiError;
import com.synapse.sae501.models.Place;
import com.synapse.sae501.services.PlaceService;
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
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
@Tag(name = "Places", description = "Endpoints for managing places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Operation(summary = "Create a new place")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Place created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create place", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Place> createPlace(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Place object")
            @RequestBody PlaceCreationDTO placeDTO
    ) {
        Place result = placeService.createPlace(placeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all places")
    @ApiResponse(responseCode = "200", description = "List of places retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces(){
        List<Place> result = placeService.getAllPlaces();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get place by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Place retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Place not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(
            @Parameter(description = "Place ID")
            @PathVariable Long id
    ) {
        Place result = placeService.getPlaceById(id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete place by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Place deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Place not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaceById(
            @Parameter(description = "Place ID")
            @PathVariable Long id
    ) {
        placeService.deletePlaceById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update place")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Place updated successfully"),
            @ApiResponse(responseCode = "404", description = "Place not found", content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(
            @Parameter(description = "Place ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Place object")
            @RequestBody PlaceCreationDTO placeDTO
    ) {
        Place result = placeService.updatePlace(placeDTO, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search places with filters")
    @ApiResponse(responseCode = "200", description = "List of places retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<Place>> searchPlaces(
            @Parameter(description = "Place ID") @RequestParam(required = false) Long id,
            @Parameter(description = "City") @RequestParam(required = false) String city,
            @Parameter(description = "Address") @RequestParam(required = false) String address,
            @Parameter(description = "ZIP Code") @RequestParam(required = false) String zip,
            @Parameter(description = "Max capacity") @RequestParam(required = false) Integer maxCapacity
    ) {
        List<Place> result = placeService.searchPlaces(id, city, address, zip, maxCapacity);
        return ResponseEntity.ok(result);
    }
}
