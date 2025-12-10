package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.models.Place;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.Training;
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

    public static Specification<Session> hasTraining(Training training) {
        return (root, query, criteriaBuilder) ->
                training == null ? null : criteriaBuilder.equal(root.get("training"), training);
    }

    public static Specification<Session> hasInstructor(Instructor instructor) {
        return (root, query, criteriaBuilder) ->
                instructor == null ? null : criteriaBuilder.equal(root.get("instructor"), instructor);
    }

    public static Specification<Session> hasPlace(Place place) {
        return (root, query, criteriaBuilder) ->
                place == null ? null : criteriaBuilder.equal(root.get("place"), place);
    }
}