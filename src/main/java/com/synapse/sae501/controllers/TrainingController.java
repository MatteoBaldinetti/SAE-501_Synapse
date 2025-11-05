package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Training;
import com.synapse.sae501.services.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainings")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @PostMapping
    public Training createTraining(@RequestBody Training training){return this.trainingService.createTraining(training);}

    @GetMapping
    public Iterable<Training> getAllTrainings() {
        return this.trainingService.getAllTrainings();
    }

    @GetMapping("/{id}")
    public Training getTrainingById(@PathVariable Long id){
        return this.trainingService.getTrainingById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainingById(@PathVariable Long id){
        this.trainingService.deleteTrainingById(id);
    }

    @PutMapping("/{id}")
    public Training updateTraining(@PathVariable Long id, @RequestBody Training training){
        return this.trainingService.updateTraining(training, training.getId());
    }

}
