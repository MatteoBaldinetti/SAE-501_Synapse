package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Inscription;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Timestamp;

public class InscriptionSpecifications {
    
    public static Specification<Inscription> hasId(Long id) {
        return (root, query, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Inscription> hasInscriptionDate(Timestamp inscriptionDate) {
        return (root, query, criteriaBuilder) ->
                inscriptionDate == null ? null : criteriaBuilder.equal(root.get("inscriptionDate"), inscriptionDate);
    }

    public static Specification<Inscription> hasStatus(String status) {
        return (root, query, criteriaBuilder) ->
                status == null ? null : criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Inscription> hasDate(Timestamp date) {
        return (root, query, criteriaBuilder) ->
                date == null ? null : criteriaBuilder.equal(root.get("date"), date);
    }

    public static Specification<Inscription> hasAmount(Float amount) {
        return (root, query, criteriaBuilder) ->
                amount == null ? null : criteriaBuilder.equal(root.get("amount"), amount);
    }

    public static Specification<Inscription> hasUserId(Long userId) {
        return (root, query, criteriaBuilder) ->
                userId == null ? null : criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Inscription> hasSessionId(Long sessionId) {
        return (root, query, criteriaBuilder) ->
                sessionId == null ? null : criteriaBuilder.equal(root.get("session").get("id"), sessionId);
    }

    public static Specification<Inscription> hasTrainingId(Long trainingId) {
        return (root, query, criteriaBuilder) ->
                trainingId == null ? null : criteriaBuilder.equal(root.get("training").get("id"), trainingId);
    }
}
