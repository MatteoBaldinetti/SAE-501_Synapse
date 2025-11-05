package com.synapse.sae501.services;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.repositories.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    public Inscription createInscription(Inscription inscription){
        return inscriptionRepository.save(inscription);
    }

    public Inscription getInscriptionById(Long id){
        return this.inscriptionRepository.findById(id).get();
    }

    public Iterable<Inscription> getAllInscriptions(){
        return this.inscriptionRepository.findAll();
    }

    public void deleteInscriptionById(Long id){
        this.inscriptionRepository.deleteById(id);
    }

    public Inscription updateInscription(Inscription inscription, Long id){
        inscription.setId(id);
        return this.inscriptionRepository.save(inscription);
    }
}
