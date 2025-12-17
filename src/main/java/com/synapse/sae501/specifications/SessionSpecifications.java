package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Timestamp;

public class SessionSpecifications {
    public static Specification<Session> hasId(Long id) {
        return (root, query, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Session> hasStartDate(Timestamp startDate) {
        return (root, query, criteriaBuilder) ->
                startDate == null ? null : criteriaBuilder.equal(root.get("startDate"), startDate);
    }

    public static Specification<Session> hasEndDate(Timestamp endDate) {
        return (root, query, criteriaBuilder) ->
                endDate == null ? null : criteriaBuilder.equal(root.get("endDate"), endDate);
    }

    public static Specification<Session> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                title == null ? null : criteriaBuilder.equal(root.get("title"), title);
    }

    public static Specification<Session> hasDescription(String description) {
        return (root, query, criteriaBuilder) ->
                description == null ? null : criteriaBuilder.equal(root.get("description"), description);
    }

    public static Specification<Session> hasDuration(Float duration) {
        return (root, query, criteriaBuilder) ->
                duration == null ? null : criteriaBuilder.equal(root.get("duration"), duration);
    }

    public static Specification<Session> hasCapacity(Integer capacity) {
        return (root, query, criteriaBuilder) ->
                capacity == null ? null : criteriaBuilder.equal(root.get("capacity"), capacity);
    }

    public static Specification<Session> hasTrainingId(Long trainingId) {
        return (root, query, criteriaBuilder) ->
                trainingId == null ? null : criteriaBuilder.equal(root.get("training").get("id"), trainingId);
    }

    public static Specification<Session> hasInstructorId(Long instructorId) {
        return (root, query, criteriaBuilder) ->
                instructorId == null ? null : criteriaBuilder.equal(root.get("instructor").get("id"), instructorId);
    }

    public static Specification<Session> hasPlaceId(Long placeId) {
        return (root, query, criteriaBuilder) ->
                placeId == null ? null : criteriaBuilder.equal(root.get("place").get("id"), placeId);
    }

    public static Specification<Session> hasUser(Long userId) {
        return (root, query, cb) -> {
            if (userId == null) return null;

            assert query != null;
            query.distinct(true);

            Join<Session, Inscription> inscriptionJoin = root.join("inscriptions");
            Join<Inscription, User> userJoin = inscriptionJoin.join("user");

            return cb.equal(userJoin.get("id"), userId);
        };
    }
}