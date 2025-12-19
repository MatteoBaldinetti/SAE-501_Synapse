package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.TrainingCreationDTO;
import com.synapse.sae501.models.Training;

public class TrainingMapper {

    public Training trainingCreationDTOToTraining(TrainingCreationDTO trainingCreationDTO) {
        return new Training(
                trainingCreationDTO.title(),
                trainingCreationDTO.description(),
                trainingCreationDTO.detailedDescription(),
                trainingCreationDTO.prerequisites(),
                trainingCreationDTO.imgName(),
                trainingCreationDTO.category(),
                trainingCreationDTO.duration(),
                trainingCreationDTO.price(),
                trainingCreationDTO.learnText()
        );
    }
}
