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

    @ManyToOne
    @JoinColumn(name = "session_id")
    private SessionModel session;

    public ResultModel() {}

    public ResultModel(Long id, float grade, String description, UserModel user, SessionModel session) {
        this.id = id;
        this.grade = grade;
        this.description = description;
        this.user = user;
        this.session = session;
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

    public SessionModel getSession() {
        return session;
    }

    public void setSession(SessionModel session) {
        this.session = session;
    }
}
