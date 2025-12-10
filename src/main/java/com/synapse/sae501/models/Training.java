package com.synapse.sae501.models;

import jakarta.persistence.*;

@Entity
public class Training {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    @Lob
    private String description;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    @Lob
    private String detailedDescription;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    @Lob
    private String prerequisites;

    private String imgName;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Float duration;

    @Column(nullable = false)
    private Float price;

    public Training() {}

    public Training(String title, String description, String detailedDescription, String prerequisites, String imgName, String category, Float duration, Float price) {
        this.title = title;
        this.description = description;
        this.detailedDescription = detailedDescription;
        this.prerequisites = prerequisites;
        this.imgName = imgName;
        this.category = category;
        this.duration = duration;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetailedDescription() {
        return detailedDescription;
    }

    public void setDetailedDescription(String detailedDescription) {
        this.detailedDescription = detailedDescription;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPreRequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}
