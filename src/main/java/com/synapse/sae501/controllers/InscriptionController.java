package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.services.InscriptionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "*")
@Tag(name = "inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @PostMapping
    public ResponseEntity<Inscription> createInscription(@RequestBody Inscription inscription) {
        Inscription result = inscriptionService.createInscription(inscription);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public Iterable<Inscription> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscriptionById(@PathVariable Long id) {
        Inscription result = inscriptionService.getInscriptionById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscriptionById(@PathVariable Long id) {
        inscriptionService.deleteInscriptionById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscription> updateInscription(@PathVariable Long id, @RequestBody Inscription inscription) {
        Inscription result = inscriptionService.updateInscription(inscription, id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public List<Inscription> searchInscriptions(@RequestParam(required = false) Long id,
                                                @RequestParam(required = false) Timestamp inscriptionDate,
                                                @RequestParam(required = false) String status,
                                                @RequestParam(required = false) Timestamp date,
                                                @RequestParam(required = false) Float amount,
                                                @RequestParam(required = false) Long userId,
                                                @RequestParam(required = false) Long sessionId,
                                                @RequestParam(required = false) Long trainingId
    ) {
        return inscriptionService.searchInscriptions(id, inscriptionDate, status, date, amount, userId, sessionId, trainingId);
    }
}
