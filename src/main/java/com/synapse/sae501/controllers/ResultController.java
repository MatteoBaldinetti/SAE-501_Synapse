package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Result;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.User;
import com.synapse.sae501.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search")
    public List<Result> searchResults(@RequestParam(required = false) Long id,
                                      @RequestParam(required = false) Float grade,
                                      @RequestParam(required = false) String description,
                                      @RequestParam(required = false) User user,
                                      @RequestParam(required = false) Session session
    ) {
        return resultService.searchResults(id, grade, description, user, session);
    }
}
