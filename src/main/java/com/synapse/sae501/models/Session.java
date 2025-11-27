package com.synapse.sae501.models;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Session {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Timestamp startDate;

    @Column(nullable = false)
    private Timestamp endDate;

    @Column(nullable = false)
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "training_id", nullable = false)
    private Training training;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

//    Do not delete this, I commented this to fix the GET method from sending too much data.
//    @OneToMany(mappedBy = "session")
//    private List<Inscription> inscriptions;
//
//    @OneToMany(mappedBy = "session")
//    private List<Result> results;

    public Session() {}

    public Session(Timestamp startDate, Timestamp endDate, int capacity, Training training, Instructor instructor, Place place) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.training = training;
        this.instructor = instructor;
        this.place = place;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }
}
