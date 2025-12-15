package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Place;
import com.synapse.sae501.services.PlaceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
@Tag(name = "places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping
    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
        Place result = placeService.createPlace(place);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public List<Place> getAllPlaces(){
        return placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlace(@PathVariable Long id) {
        Place result = placeService.getPlaceById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        placeService.deletePlaceById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place place){
        Place result = placeService.updatePlace(place, id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public List<Place> searchPlaces(@RequestParam(required = false) Long id,
                                    @RequestParam(required = false) String city,
                                    @RequestParam(required = false) String address,
                                    @RequestParam(required = false) String zip,
                                    @RequestParam(required = false) Integer maxCapacity
    ) {
        return placeService.searchPlaces(id, city, address, zip, maxCapacity);
    }
}
