package com.synapse.sae501.services;

import com.synapse.sae501.dto.TrainingCreationDTO;
import com.synapse.sae501.exceptions.ResourceNotFoundException;
import com.synapse.sae501.mappers.TrainingMapper;
import com.synapse.sae501.models.Training;
import com.synapse.sae501.repositories.TrainingRepository;
import com.synapse.sae501.specifications.TrainingSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainingService {

    @Autowired
    private TrainingRepository trainingRepository;

    private final TrainingMapper trainingMapper = new TrainingMapper();

    public Training createTraining(TrainingCreationDTO trainingCreationDTO) {
        Training training = trainingMapper.trainingCreationDTOToTraining(trainingCreationDTO);
        return trainingRepository.save(training);
    }

    public Training getTrainingById(Long id) {
        return trainingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Training object with ID " + id + " not found"));
    }

    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public void deleteTrainingById(Long id) {
        getTrainingById(id);
        trainingRepository.deleteById(id);
    }

    public Training updateTraining(TrainingCreationDTO trainingCreationDTO, Long id) {
        getTrainingById(id);
        Training training = trainingMapper.trainingCreationDTOToTraining(trainingCreationDTO);
        training.setId(id);
        return trainingRepository.save(training);
    }

    public List<Training> searchTrainings(
            Long id,
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
        List<Specification<Training>> specs = new ArrayList<>();

        if (id != null) specs.add(TrainingSpecifications.hasId(id));
        if (title != null) specs.add(TrainingSpecifications.hasTitle(title));
        if (description != null) specs.add(TrainingSpecifications.hasDescription(description));
        if (detailedDescription != null) specs.add(TrainingSpecifications.hasDetailedDescription(detailedDescription));
        if (prerequisites != null) specs.add(TrainingSpecifications.hasPrerequisites(prerequisites));
        if (imgName != null) specs.add(TrainingSpecifications.hasImgName(imgName));
        if (category != null) specs.add(TrainingSpecifications.hasCategory(category));
        if (duration != null) specs.add(TrainingSpecifications.hasDuration(duration));
        if (price != null) specs.add(TrainingSpecifications.hasPrice(price));
        if (learnText != null) specs.add(TrainingSpecifications.hasLearnText(learnText));
        if (modelFileName != null) specs.add(TrainingSpecifications.hasModelFileName(modelFileName));

        Specification<Training> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? trainingRepository.findAll() : trainingRepository.findAll(finalSpec);
    }
}
