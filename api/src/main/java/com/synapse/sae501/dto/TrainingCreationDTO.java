package com.synapse.sae501.dto;

public record TrainingCreationDTO(
        String title,
        String description,
        String detailedDescription,
        String prerequisites,
        String imgName,
        String category,
        Float duration,
        Float price,
        String learnText,
        String modelFileName
) {
}
