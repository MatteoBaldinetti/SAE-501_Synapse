package com.synapse.sae501.services;

import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.repositories.InscriptionRepository;
import com.synapse.sae501.specifications.InscriptionSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    public Inscription createInscription(Inscription inscription) {
        return inscriptionRepository.save(inscription);
    }

    public Inscription getInscriptionById(Long id) {
        return inscriptionRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public List<Inscription> getAllInscriptions() {
        return inscriptionRepository.findAll();
    }

    public void deleteInscriptionById(Long id) {
        inscriptionRepository.deleteById(id);
    }

    public Inscription updateInscription(Inscription inscription, Long id) {
        inscription.setId(id);
        return inscriptionRepository.save(inscription);
    }

    public List<Inscription> searchInscriptions(
            Long id,
            Timestamp inscriptionDate,
            String status,
            Timestamp date,
            Float amount,
            Long userId,
            Long sessionId,
            Long trainingId
    ) {
        List<Specification<Inscription>> specs = new ArrayList<>();

        if (id != null) specs.add(InscriptionSpecifications.hasId(id));
        if (inscriptionDate != null) specs.add(InscriptionSpecifications.hasInscriptionDate(inscriptionDate));
        if (status != null) specs.add(InscriptionSpecifications.hasStatus(status));
        if (date != null) specs.add(InscriptionSpecifications.hasDate(date));
        if (amount != null) specs.add(InscriptionSpecifications.hasAmount(amount));
        if (userId != null) specs.add(InscriptionSpecifications.hasUserId(userId));
        if (sessionId != null) specs.add(InscriptionSpecifications.hasSessionId(sessionId));
        if (trainingId != null) specs.add(InscriptionSpecifications.hasTrainingId(trainingId));

        Specification<Inscription> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? inscriptionRepository.findAll() : inscriptionRepository.findAll(finalSpec);
    }
}
