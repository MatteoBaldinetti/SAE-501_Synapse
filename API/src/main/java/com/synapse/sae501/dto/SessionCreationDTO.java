package com.synapse.sae501.dto;

import java.sql.Timestamp;

public record SessionCreationDTO (
     Timestamp startDate,
     Timestamp endDate,
     String title,
     String description,
     Float duration,
     Integer capacity,
     TrainingIdDTO training,
     InstructorIdDTO instructor,
     PlaceIdDTO place
) {
}
