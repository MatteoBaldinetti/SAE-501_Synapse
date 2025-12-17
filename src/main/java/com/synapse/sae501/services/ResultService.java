package com.synapse.sae501.services;

import com.synapse.sae501.repositories.ResultRepository;
import com.synapse.sae501.specifications.ResultSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.synapse.sae501.models.Result;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public Result createResult(Result result) {
        return resultRepository.save(result);
    }

    public Result getResultById(Long id) {
        return resultRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public void deleteResultById(Long id) {
        resultRepository.deleteById(id);
    }

    public Result updateResult(Result result, Long id) {
        result.setId(id);
        return resultRepository.save(result);
    }

    public List<Result> searchResults(
        Long id,
        Float grade,
        String description,
        Long userId,
        Long sessionId
    ) {
        List<Specification<Result>> specs = new ArrayList<>();

        if (id != null) specs.add(ResultSpecifications.hasId(id));
        if (grade != null) specs.add(ResultSpecifications.hasGrade(grade));
        if (description != null) specs.add(ResultSpecifications.hasDescription(description));
        if (userId != null) specs.add(ResultSpecifications.hasUserId(userId));
        if (sessionId != null) specs.add(ResultSpecifications.hasSessionId(sessionId));

        Specification<Result> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? resultRepository.findAll() : resultRepository.findAll(finalSpec);
    }
}
