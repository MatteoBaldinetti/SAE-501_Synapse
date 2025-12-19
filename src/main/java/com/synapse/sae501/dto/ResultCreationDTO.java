package com.synapse.sae501.dto;

public record ResultCreationDTO(
        Float grade,
        String description,
        UserIdDTO user,
        SessionIdDTO session
) {
}
