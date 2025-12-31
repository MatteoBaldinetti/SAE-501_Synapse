package com.synapse.sae501.specifications;

import com.synapse.sae501.models.Training;
import org.springframework.data.jpa.domain.Specification;

public class TrainingSpecifications {

    public static Specification<Training> hasId(Long id) {
        return (root, _, criteriaBuilder) ->
                id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Training> hasTitle(String title) {
        return (root, _, criteriaBuilder) ->
                title == null ? null : criteriaBuilder.equal(root.get("title"), title);
    }

    public static Specification<Training> hasDescription(String description) {
        return (root, _, criteriaBuilder) ->
                description == null ? null : criteriaBuilder.equal(root.get("description"), description);
    }

    public static Specification<Training> hasDetailedDescription(String detailedDescription) {
        return (root, _, criteriaBuilder) ->
                detailedDescription == null ? null : criteriaBuilder.equal(root.get("detailedDescription"), detailedDescription);
    }

    public static Specification<Training> hasPrerequisites(String prerequisites) {
        return (root, _, criteriaBuilder) ->
                prerequisites == null ? null : criteriaBuilder.equal(root.get("prerequisites"), prerequisites);
    }

    public static Specification<Training> hasImgName(String imgName) {
        return (root, _, criteriaBuilder) ->
                imgName == null ? null : criteriaBuilder.equal(root.get("imgName"), imgName);
    }

    public static Specification<Training> hasCategory(String category) {
        return (root, _, criteriaBuilder) ->
                category == null ? null : criteriaBuilder.equal(root.get("category"), category);
    }

    public static Specification<Training> hasDuration(Float duration) {
        return (root, _, criteriaBuilder) ->
                duration == null ? null : criteriaBuilder.equal(root.get("duration"), duration);
    }

    public static Specification<Training> hasPrice(Float price) {
        return (root, _, criteriaBuilder) ->
                price == null ? null : criteriaBuilder.equal(root.get("price"), price);
    }

    public static Specification<Training> hasLearnText(String learnText) {
        return (root, _, criteriaBuilder) ->
                learnText == null ? null : criteriaBuilder.equal(root.get("learnText"), learnText);
    }

    public static Specification<Training> hasModelFileName(String modelFileName) {
        return (root, _, criteriaBuilder) ->
                modelFileName == null ? null : criteriaBuilder.equal(root.get("modelFileName"), modelFileName);
    }
}