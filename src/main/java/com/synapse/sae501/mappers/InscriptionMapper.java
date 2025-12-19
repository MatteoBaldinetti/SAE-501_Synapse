package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.InscriptionCreationDTO;
import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.services.SessionService;
import com.synapse.sae501.services.TrainingService;
import com.synapse.sae501.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class InscriptionMapper {

    @Autowired UserService userService = new UserService();
    @Autowired SessionService sessionService = new SessionService();
    @Autowired TrainingService trainingService = new TrainingService();

    public Inscription inscriptionCreationDTOToInscription(InscriptionCreationDTO inscriptionCreationDTO) {
        return new Inscription(
                inscriptionCreationDTO.inscriptionDate(),
                inscriptionCreationDTO.status(),
                inscriptionCreationDTO.date(),
                inscriptionCreationDTO.amount(),
                userService.getUserById(inscriptionCreationDTO.user().id()),
                sessionService.getSessionById(inscriptionCreationDTO.session().id()),
                trainingService.getTrainingById(inscriptionCreationDTO.training().id())
        );
    }
}
