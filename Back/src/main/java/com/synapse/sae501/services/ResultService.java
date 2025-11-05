package com.synapse.sae501.services;

import com.synapse.sae501.repositories.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.synapse.sae501.models.Result;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public Result createResult(Result result) {
        return this.resultRepository.save(result);
    }

    public Result getResultById(Long id) {
        return this.resultRepository.findById(id).get();
    }

    public Iterable<Result> getAllResults() {
        return this.resultRepository.findAll();
    }

    public void deleteResultById(Long id) {
        this.resultRepository.deleteById(id);
    }

    public Result updateResult(Result result, Long id) {
        result.setId(id);
        return this.resultRepository.save(result);
    }
}
