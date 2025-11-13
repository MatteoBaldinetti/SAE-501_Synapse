package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public Session createSession(@RequestBody Session session){
        return sessionService.createSession(session);
    }

    @GetMapping
    public Iterable<Session> getAllSessions(){
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public Session getSessionById(@PathVariable("id") Long id){
        return sessionService.getSessionById(id);
    }

    @DeleteMapping
    public void deleteSessionById(@PathVariable("id") Long id) {
        sessionService.deleteSessionById(id);
    }

    @PutMapping("/{id}")
    public Session updateSession(@PathVariable Long id, @RequestBody Session session){
        return this.sessionService.updateSession(session, id);
    }
}
