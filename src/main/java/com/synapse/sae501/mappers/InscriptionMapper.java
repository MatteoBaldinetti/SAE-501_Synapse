package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.InscriptionCreationDTO;
import com.synapse.sae501.models.Inscription;
import com.synapse.sae501.services.SessionService;
import com.synapse.sae501.services.TrainingService;
import com.synapse.sae501.services.UserService;
import org.springframework.stereotype.Component;

@Component
public class InscriptionMapper {

    private final UserService userService;
    private final SessionService sessionService;
    private final TrainingService trainingService;

    public InscriptionMapper(UserService userService, SessionService sessionService, TrainingService trainingService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.trainingService = trainingService;
    }

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
