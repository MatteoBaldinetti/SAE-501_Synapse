package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Instructor;
import org.springframework.data.jpa.domain.Specification;

public class InstructorSpecifications {

    public static Specification<Instructor> hasId(Long id) {
        return (root, _, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Instructor> hasFirstName(String firstName) {
        return (root, _, criteriaBuilder) ->
                firstName == null ? null : criteriaBuilder.equal(root.get("firstName"), firstName);
    }

    public static Specification<Instructor> hasLastName(String lastName) {
        return (root, _, criteriaBuilder) ->
                lastName == null ? null : criteriaBuilder.equal(root.get("lastName"), lastName);
    }
    
    public static Specification<Instructor> hasContractType(String contractType) {
        return (root, _, criteriaBuilder) ->
                contractType == null ? null : criteriaBuilder.equal(root.get("contractType"), contractType);
    }

    public static Specification<Instructor> hasSpecialty(String specialty) {
        return (root, _, criteriaBuilder) ->
                specialty == null ? null : criteriaBuilder.equal(root.get("specialty"), specialty);
    }
}
