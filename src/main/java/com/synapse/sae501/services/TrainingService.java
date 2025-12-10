package com.synapse.sae501.services;

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

    public Training createTraining(Training training){
        return this.trainingRepository.save(training);
    }

    public Training getTrainingById(Long id){
        return this.trainingRepository.findById(id).get();
    }

    public Iterable<Training> getAllTrainings(){
        return this.trainingRepository.findAll();
    }

    public void deleteTrainingById(Long id){
        this.trainingRepository.deleteById(id);
    }

    public Training updateTraining(Training training, Long id){
        training.setId(id);
        return this.trainingRepository.save(training);
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
            String learnText
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

        Specification<Training> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? trainingRepository.findAll() : trainingRepository.findAll(finalSpec);
    }
}
