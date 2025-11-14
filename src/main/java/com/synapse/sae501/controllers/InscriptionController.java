package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.services.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inscription")
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

}
