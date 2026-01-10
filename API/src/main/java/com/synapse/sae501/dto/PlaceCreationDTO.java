package com.synapse.sae501.dto;

public record PlaceCreationDTO(
        String city,
        String address,
        String zip,
        Integer maxCapacity
) {
}
