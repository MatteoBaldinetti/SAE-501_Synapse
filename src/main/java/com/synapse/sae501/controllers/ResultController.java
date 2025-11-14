package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Result;
import com.synapse.sae501.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping
    public Result createResult(@RequestBody Result result) {
        return this.resultService.createResult(result);
    }

    @GetMapping
    public Iterable<Result> getAllResults() {
        return this.resultService.getAllResults();
    }

    @GetMapping("/{id}")
    public Result getResultById(@PathVariable Long id) {
        return this.resultService.getResultById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteResultById(@PathVariable Long id) {
        this.resultService.deleteResultById(id);
    }

    @PutMapping("/{id}")
    public Result updateResult(@PathVariable Long id, @RequestBody Result result) {
        return this.resultService.updateResult(result, id);
    }

}
