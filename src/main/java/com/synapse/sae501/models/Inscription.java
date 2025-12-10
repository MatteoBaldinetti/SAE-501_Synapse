package com.synapse.sae501.models;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Inscription {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Timestamp inscriptionDate;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false)
    private Float amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "training_id", nullable = false)
    private Training training;

    public Inscription() {}

    public Inscription(Timestamp inscriptionDate, String status, Timestamp date, Float amount, User user, Session session, Training training) {
        this.inscriptionDate = inscriptionDate;
        this.status = status;
        this.date = date;
        this.amount = amount;
        this.user = user;
        this.session = session;
        this.training = training;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getInscriptionDate() {
        return inscriptionDate;
    }

    public void setInscriptionDate(Timestamp inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }
}
