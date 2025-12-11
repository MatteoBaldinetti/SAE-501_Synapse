package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

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
    public Session getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSessionById(@PathVariable Long id) {
        sessionService.deleteSessionById(id);
    }

    @PutMapping("/{id}")
    public Session updateSession(@PathVariable Long id, @RequestBody Session session){
        return this.sessionService.updateSession(session, id);
    }

    @GetMapping("/search")
    public List<Session> searchSessions(@RequestParam(required = false) Long id,
                                        @RequestParam(required = false) Timestamp startDate,
                                        @RequestParam(required = false) Timestamp endDate,
                                        @RequestParam(required = false) String title,
                                        @RequestParam(required = false) String description,
                                        @RequestParam(required = false) Float duration,
                                        @RequestParam(required = false) Integer capacity,
                                        @RequestParam(required = false) Long trainingId,
                                        @RequestParam(required = false) Long instructorId,
                                        @RequestParam(required = false) Long placeId
    ) {
        return sessionService.searchSessions(id, startDate, endDate, title, description, duration, capacity, trainingId, instructorId, placeId);
    }
}
