package com.synapse.sae501.services;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public Session createSession(Session session){
        return this.sessionRepository.save(session);
    }

    public Session getSessionById(Long id){
        return this.sessionRepository.findById(id).get();
    }

    public Iterable<Session> getAllSessions(){
        return this.sessionRepository.findAll();
    }

    public void deleteSessionById(Long id){
        this.sessionRepository.deleteById(id);
    }

    public Session updateSession(Session session, Long id){
        session.setId(id);
        return this.sessionRepository.save(session);
    }
}
