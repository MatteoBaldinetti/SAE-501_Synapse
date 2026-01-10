package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Place;
import org.springframework.data.jpa.domain.Specification;

public class PlaceSpecifications {

    public static Specification<Place> hasId(Long id) {
        return (root, _, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Place> hasCity(String city) {
        return (root, _, criteriaBuilder) ->
                city == null ? null : criteriaBuilder.equal(root.get("city"), city);
    }

    public static Specification<Place> hasAddress(String address) {
        return (root, _, criteriaBuilder) ->
                address == null ? null : criteriaBuilder.equal(root.get("address"), address);
    }

    public static Specification<Place> hasZip(String zip) {
        return (root, _, criteriaBuilder) ->
                zip == null ? null : criteriaBuilder.equal(root.get("zip"), zip);
    }

    public static Specification<Place> hasMaxCapacity(Integer maxCapacity) {
        return (root, _, criteriaBuilder) ->
                maxCapacity == null ? null : criteriaBuilder.equal(root.get("maxCapacity"), maxCapacity);
    }
}
