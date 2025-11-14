package com.synapse.sae501.services;

import com.synapse.sae501.models.Training;
import com.synapse.sae501.repositories.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
