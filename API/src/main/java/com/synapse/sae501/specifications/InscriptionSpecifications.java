package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Inscription;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Timestamp;

public class InscriptionSpecifications {
    
    public static Specification<Inscription> hasId(Long id) {
        return (root, _, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Inscription> hasInscriptionDate(Timestamp inscriptionDate) {
        return (root, _, criteriaBuilder) ->
                inscriptionDate == null ? null : criteriaBuilder.equal(root.get("inscriptionDate"), inscriptionDate);
    }

    public static Specification<Inscription> hasStatus(String status) {
        return (root, _, criteriaBuilder) ->
                status == null ? null : criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Inscription> hasDate(Timestamp date) {
        return (root, _, criteriaBuilder) ->
                date == null ? null : criteriaBuilder.equal(root.get("date"), date);
    }

    public static Specification<Inscription> hasAmount(Float amount) {
        return (root, _, criteriaBuilder) ->
                amount == null ? null : criteriaBuilder.equal(root.get("amount"), amount);
    }

    public static Specification<Inscription> hasUserId(Long userId) {
        return (root, _, criteriaBuilder) ->
                userId == null ? null : criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Inscription> hasSessionId(Long sessionId) {
        return (root, _, criteriaBuilder) ->
                sessionId == null ? null : criteriaBuilder.equal(root.get("session").get("id"), sessionId);
    }

    public static Specification<Inscription> hasTrainingId(Long trainingId) {
        return (root, _, criteriaBuilder) ->
                trainingId == null ? null : criteriaBuilder.equal(root.get("training").get("id"), trainingId);
    }
}
