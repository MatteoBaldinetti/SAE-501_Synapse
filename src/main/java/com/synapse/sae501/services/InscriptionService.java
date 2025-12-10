package com.synapse.sae501.services;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.Training;
import com.synapse.sae501.models.User;
import com.synapse.sae501.repositories.InscriptionRepository;
import com.synapse.sae501.specifications.InscriptionSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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

    public List<Inscription> searchInscriptions(
            Long id,
            Timestamp inscriptionDate,
            String status,
            Timestamp date,
            Float amount,
            User user,
            Session session,
            Training training
    ) {
        List<Specification<Inscription>> specs = new ArrayList<>();

        if (id != null) specs.add(InscriptionSpecifications.hasId(id));
        if (inscriptionDate != null) specs.add(InscriptionSpecifications.hasInscriptionDate(inscriptionDate));
        if (status != null) specs.add(InscriptionSpecifications.hasStatus(status));
        if (date != null) specs.add(InscriptionSpecifications.hasDate(date));
        if (amount != null) specs.add(InscriptionSpecifications.hasAmount(amount));
        if (user != null) specs.add(InscriptionSpecifications.hasUser(user));
        if (session != null) specs.add(InscriptionSpecifications.hasSession(session));
        if (training != null) specs.add(InscriptionSpecifications.hasTraining(training));

        Specification<Inscription> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? inscriptionRepository.findAll() : inscriptionRepository.findAll(finalSpec);
    }
}
