package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Place;
import com.synapse.sae501.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return this.placeService.createPlace(place);
    }

    @GetMapping
    public Iterable<Place> getAllPlaces(){
        return this.placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public Place getPlace(@PathVariable Long id) {
        return this.placeService.getPlaceById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        this.placeService.deletePlaceById(id);
    }

    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Long id, @RequestBody Place place){
        return this.placeService.updatePlace(place, id);
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
