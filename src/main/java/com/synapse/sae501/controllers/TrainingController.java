package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Training;
import com.synapse.sae501.services.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@CrossOrigin(origins = "*")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @PostMapping
    public Training createTraining(@RequestBody Training training) {
        return this.trainingService.createTraining(training);
    }

    @GetMapping
    public Iterable<Training> getAllTrainings() {
        return this.trainingService.getAllTrainings();
    }

    @GetMapping("/{id}")
    public Training getTrainingById(@PathVariable Long id) {
        return this.trainingService.getTrainingById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainingById(@PathVariable Long id){
        this.trainingService.deleteTrainingById(id);
    }

    @PutMapping("/{id}")
    public Training updateTraining(@PathVariable Long id, @RequestBody Training training){
        return this.trainingService.updateTraining(training, id);
    }

    @GetMapping("/search")
    public List<Training> searchTrainings(@RequestParam(required = false) Long id,
                                          @RequestParam(required = false) String title,
                                          @RequestParam(required = false) String description,
                                          @RequestParam(required = false) String detailedDescription,
                                          @RequestParam(required = false) String prerequisites,
                                          @RequestParam(required = false) String imgName,
                                          @RequestParam(required = false) String category,
                                          @RequestParam(required = false) Float duration,
                                          @RequestParam(required = false) Float price
    ) {
        return trainingService.searchTrainings(id, title, description, detailedDescription, prerequisites, imgName, category, duration, price);
    }
}
