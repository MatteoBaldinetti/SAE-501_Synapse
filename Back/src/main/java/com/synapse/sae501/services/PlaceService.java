package com.synapse.sae501.services;

import com.synapse.sae501.models.Place;
import com.synapse.sae501.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Place createPlace(Place place){
        return this.placeRepository.save(place);
    }

    public Place getPlaceById(Long id){
        return this.placeRepository.findById(id).get();
    }

    public Iterable<Place> getAllPlaces() {
        return this.placeRepository.findAll();
    }

    public void deletePlaceById(Long id){
        this.placeRepository.deleteById(id);
    }

    public Place updatePlace(Place place, Long id){
        place.setId(id);
        return this.placeRepository.save(place);
    }
}
