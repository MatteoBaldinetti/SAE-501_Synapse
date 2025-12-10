package com.synapse.sae501.services;

import com.synapse.sae501.models.Place;
import com.synapse.sae501.repositories.PlaceRepository;
import com.synapse.sae501.specifications.PlaceSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<Place> searchPlaces(
        Long id,
        String city,
        String address,
        String zip,
        Integer maxCapacity
    ) {
        List<Specification<Place>> specs = new ArrayList<>();

        if (id != null) specs.add(PlaceSpecifications.hasId(id));
        if (city != null) specs.add(PlaceSpecifications.hasCity(city));
        if (address != null) specs.add(PlaceSpecifications.hasAddress(address));
        if (zip != null) specs.add(PlaceSpecifications.hasZip(zip));
        if (maxCapacity != null) specs.add(PlaceSpecifications.hasMaxCapacity(maxCapacity));

        Specification<Place> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? placeRepository.findAll() : placeRepository.findAll(finalSpec);
    }
}
