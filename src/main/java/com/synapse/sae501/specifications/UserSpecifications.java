package com.synapse.sae501.specifications;

import com.synapse.sae501.models.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {

    public static Specification<User> hasId(Long id) {
        return (root, _, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<User> hasFirstname(String firstname) {
        return (root, _, criteriaBuilder) ->
                firstname == null ? null : criteriaBuilder.equal(root.get("firstname"), firstname);
    }

    public static Specification<User> hasLastname(String lastname) {
        return (root, _, criteriaBuilder) ->
                lastname == null ? null : criteriaBuilder.equal(root.get("lastname"), lastname);
    }

    public static Specification<User> hasEmail(String email) {
        return (root, _, criteriaBuilder) ->
                email == null ? null : criteriaBuilder.equal(root.get("email"), email);
    }

    public static Specification<User> hasPassword(String password) {
        return (root, _, criteriaBuilder) ->
                password == null ? null : criteriaBuilder.equal(root.get("password"), password);
    }

    public static Specification<User> hasType(Integer type) {
        return (root, _, criteriaBuilder) ->
                type == null ? null : criteriaBuilder.equal(root.get("type"), type);
    }

    public static Specification<User> hasPhoneNumber(String phoneNumber) {
        return (root, _, criteriaBuilder) ->
                phoneNumber == null ? null : criteriaBuilder.equal(root.get("phoneNumber"), phoneNumber);
    }

    public static Specification<User> hasImgName(String imgName) {
        return (root, _, criteriaBuilder) ->
                imgName == null ? null : criteriaBuilder.equal(root.get("imgName"), imgName);
    }
}