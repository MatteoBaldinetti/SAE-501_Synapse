package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.PlaceCreationDTO;
import com.synapse.sae501.models.Place;

public class PlaceMapper {

    public Place placeCreationDTOToPlace(PlaceCreationDTO placeCreationDTO) {
        return new Place(
                placeCreationDTO.city(),
                placeCreationDTO.address(),
                placeCreationDTO.zip(),
                placeCreationDTO.maxCapacity()
        );
    }
}
