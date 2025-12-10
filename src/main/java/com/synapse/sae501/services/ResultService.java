package com.synapse.sae501.services;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.User;
import com.synapse.sae501.repositories.ResultRepository;
import com.synapse.sae501.specifications.ResultSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.synapse.sae501.models.Result;

import java.util.ArrayList;
import java.util.List;

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

    public List<Result> searchResults(
        Long id,
        Float grade,
        String description,
        User user,
        Session session
    ) {
        List<Specification<Result>> specs = new ArrayList<>();

        if (id != null) specs.add(ResultSpecifications.hasId(id));
        if (grade != null) specs.add(ResultSpecifications.hasGrade(grade));
        if (description != null) specs.add(ResultSpecifications.hasDescription(description));
        if (user != null) specs.add(ResultSpecifications.hasUser(user));
        if (session != null) specs.add(ResultSpecifications.hasSession(session));

        Specification<Result> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? resultRepository.findAll() : resultRepository.findAll(finalSpec);
    }
}
