package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Result;
import com.synapse.sae501.services.ResultService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
@Tag(name = "results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping
    public ResponseEntity<Result> createResult(@RequestBody Result result) {
        Result result1 = resultService.createResult(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(result1);
    }

    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> result = resultService.getAllResults();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        Result result = resultService.getResultById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResultById(@PathVariable Long id) {
        resultService.deleteResultById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(@PathVariable Long id, @RequestBody Result result) {
        Result result1 = resultService.updateResult(result, id);
        return ResponseEntity.ok(result1);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Result>> searchResults(@RequestParam(required = false) Long id,
                                      @RequestParam(required = false) Float grade,
                                      @RequestParam(required = false) String description,
                                      @RequestParam(required = false) Long userId,
                                      @RequestParam(required = false) Long sessionId
    ) {
        List<Result> result = resultService.searchResults(id, grade, description, userId, sessionId);
        return ResponseEntity.ok(result);
    }
}
