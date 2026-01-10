package com.synapse.sae501.dto;

import java.sql.Timestamp;

public record InscriptionCreationDTO(
        Timestamp inscriptionDate,
        String status,
        Timestamp date,
        Float amount,
        UserIdDTO user,
        SessionIdDTO session,
        TrainingIdDTO training
) {
}
