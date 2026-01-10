package com.synapse.sae501.dto;

public record UserCreationDTO(
        String firstname,
        String lastname,
        String email,
        String password,
        Integer type,
        String phoneNumber,
        String imgName
) {
}