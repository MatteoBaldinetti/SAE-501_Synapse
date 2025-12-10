package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.Training;
import com.synapse.sae501.models.User;
import com.synapse.sae501.services.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "*")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @PostMapping
    public Inscription createInscription(@RequestBody Inscription inscription) {
        return this.inscriptionService.createInscription(inscription);
    }

    @GetMapping
    public Iterable<Inscription> getAllInscriptions() {
        return this.inscriptionService.getAllInscriptions();
    }

    @GetMapping("/{id}")
    public Inscription getInscriptionById(@PathVariable Long id) {
        return this.inscriptionService.getInscriptionById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteInscriptionById(@PathVariable Long id) {
        this.inscriptionService.deleteInscriptionById(id);
    }

    @PutMapping("/{id}")
    public Inscription updateInscription(@PathVariable Long id, @RequestBody Inscription inscription){
        return this.inscriptionService.updateInscription(inscription, id);
    }

    @GetMapping("/search")
    public List<Inscription> searchInscriptions(@RequestParam(required = false) Long id,
                                                @RequestParam(required = false) Timestamp inscriptionDate,
                                                @RequestParam(required = false) String status,
                                                @RequestParam(required = false) Timestamp date,
                                                @RequestParam(required = false) Float amount,
                                                @RequestParam(required = false) User user,
                                                @RequestParam(required = false) Session session,
                                                @RequestParam(required = false) Training training
    ) {
        return inscriptionService.searchInscriptions(id, inscriptionDate, status, date, amount, user, session, training);
    }
}
