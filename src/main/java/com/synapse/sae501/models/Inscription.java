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
    private float amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    public Inscription(Session session, User user, float amount, Timestamp date, String status, Timestamp inscriptionDate, Long id) {
        this.session = session;
        this.user = user;
        this.amount = amount;
        this.date = date;
        this.status = status;
        this.inscriptionDate = inscriptionDate;
        this.id = id;
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

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
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
}
