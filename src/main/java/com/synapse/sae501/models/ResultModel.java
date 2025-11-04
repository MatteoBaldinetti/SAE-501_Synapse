package com.synapse.sae501.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ResultModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float grade;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    private List<SessionModel> sessions;

    public ResultModel() {}

    public ResultModel(float grade, String description, UserModel user, List<SessionModel> sessions) {
        this.grade = grade;
        this.description = description;
        this.user = user;
        this.sessions = sessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getGrade() {
        return grade;
    }

    public void setGrade(float grade) {
        this.grade = grade;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public List<SessionModel> getSessions() {
        return sessions;
    }

    public void setSessions(List<SessionModel> sessions) {
        this.sessions = sessions;
    }
}
