package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Result;
import org.springframework.data.jpa.domain.Specification;

public class ResultSpecifications {

    public static Specification<Result> hasId(Long id) {
        return (root, query, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Result> hasGrade(Float grade) {
        return (root, query, criteriaBuilder) ->
                grade == null ? null : criteriaBuilder.equal(root.get("grade"), grade);
    }

    public static Specification<Result> hasDescription(String description) {
        return (root, query, criteriaBuilder) ->
                description == null ? null : criteriaBuilder.equal(root.get("description"), description);
    }

    public static Specification<Result> hasUserId(Long userId) {
        return (root, query, criteriaBuilder) ->
                userId == null ? null : criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Result> hasSessionId(Long sessionId) {
        return (root, query, criteriaBuilder) ->
                sessionId == null ? null : criteriaBuilder.equal(root.get("session").get("id"), sessionId);
    }
}
