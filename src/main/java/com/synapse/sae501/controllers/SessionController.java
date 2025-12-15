package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.SessionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
@Tag(name = "sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        Session result = sessionService.createSession(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public List<Session> getAllSessions(){
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Session result = sessionService.getSessionById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSessionById(@PathVariable Long id) {
        sessionService.deleteSessionById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session session){
        Session result = sessionService.updateSession(session, id);
        return ResponseEntity.ok(result);
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
