package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Training;
import com.synapse.sae501.services.TrainingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@CrossOrigin(origins = "*")
@Tag(name = "trainings")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @PostMapping
    public ResponseEntity<Training> createTraining(@RequestBody Training training) {
        Training result = trainingService.createTraining(training);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public Iterable<Training> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Training> getTrainingById(@PathVariable Long id) {
        Training result = trainingService.getTrainingById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingById(@PathVariable Long id){
        trainingService.deleteTrainingById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Training> updateTraining(@PathVariable Long id, @RequestBody Training training){
        Training result = trainingService.updateTraining(training, id);
        return ResponseEntity.ok(result);
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
                                          @RequestParam(required = false) Float price,
                                          @RequestParam(required = false) String learnText
    ) {
        return trainingService.searchTrainings(id, title, description, detailedDescription, prerequisites, imgName, category, duration, price, learnText);
    }
}
