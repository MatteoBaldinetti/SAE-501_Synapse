package com.synapse.sae501.models;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class SessionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Timestamp startDate;

    private Timestamp endDate;

    private int capacity;

    @ManyToOne
    @JoinColumn(name = "training_id")
    private TrainingModel training;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private InstructorModel instructor;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private PlaceModel place;

    public SessionModel() {}

    public SessionModel(Long id, Timestamp startDate, Timestamp endDate, int capacity, TrainingModel training, InstructorModel instructor, PlaceModel place) {
        this.id = id;
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

    public TrainingModel getTraining() {
        return training;
    }

    public void setTraining(TrainingModel training) {
        this.training = training;
    }

    public InstructorModel getInstructor() {
        return instructor;
    }

    public void setInstructor(InstructorModel instructor) {
        this.instructor = instructor;
    }

    public PlaceModel getPlace() {
        return place;
    }

    public void setPlace(PlaceModel place) {
        this.place = place;
    }
}
