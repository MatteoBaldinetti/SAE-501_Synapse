package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.Training;
import com.synapse.sae501.models.User;
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

    public static Specification<Inscription> hasUser(User user) {
        return (root, query, criteriaBuilder) ->
                user == null ? null : criteriaBuilder.equal(root.get("user"), user);
    }

    public static Specification<Inscription> hasSession(Session session) {
        return (root, query, criteriaBuilder) ->
                session == null ? null : criteriaBuilder.equal(root.get("session"), session);
    }

    public static Specification<Inscription> hasTraining(Training training) {
        return (root, query, criteriaBuilder) ->
                training == null ? null : criteriaBuilder.equal(root.get("training"), training);
    }
}
