package com.synapse.sae501.controllers;

import com.synapse.sae501.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.synapse.sae501.models.Result;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping
    public Result createResult(@RequestBody Result result){return this.resultService.createResult(result);}

    @GetMapping("/{id}")
    public Result getResultById(@PathVariable Long id) {return this.resultService.getResultById(id);}

    @GetMapping
    public Iterable<Result> getAllResults() {return this.resultService.getAllResults();}

    @DeleteMapping("/{id}")
    public void deleteResultById(@PathVariable Long id) {this.resultService.deleteResultById(id);}

    @PutMapping("/{id}")
    public Result updateResult(@RequestBody Result result, @PathVariable Long id) {
        return this.resultService.updateResult(result, id);
    }

}
