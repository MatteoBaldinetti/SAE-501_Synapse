package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Result;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.User;
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

    public static Specification<Result> hasUser(User user) {
        return (root, query, criteriaBuilder) ->
                user == null ? null : criteriaBuilder.equal(root.get("user"), user);
    }

    public static Specification<Result> hasSession(Session session) {
        return (root, query, criteriaBuilder) ->
                session == null ? null : criteriaBuilder.equal(root.get("session"), session);
    }
}
