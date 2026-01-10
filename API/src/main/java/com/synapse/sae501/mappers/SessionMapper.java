package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.SessionCreationDTO;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.InstructorService;
import com.synapse.sae501.services.PlaceService;
import com.synapse.sae501.services.TrainingService;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper {

    private final TrainingService trainingService;
    private final InstructorService instructorService;
    private final PlaceService placeService;

    public SessionMapper(TrainingService trainingService, InstructorService instructorService, PlaceService placeService) {
        this.trainingService = trainingService;
        this.instructorService = instructorService;
        this.placeService = placeService;
    }

    public Session sessionCreationDTOToSession(SessionCreationDTO sessionCreationDTO) {
        return new Session(
                sessionCreationDTO.startDate(),
                sessionCreationDTO.endDate(),
                sessionCreationDTO.title(),
                sessionCreationDTO.description(),
                sessionCreationDTO.duration(),
                sessionCreationDTO.capacity(),
                trainingService.getTrainingById(sessionCreationDTO.training().id()),
                instructorService.getInstructorById(sessionCreationDTO.instructor().id()),
                placeService.getPlaceById(sessionCreationDTO.place().id())
        );
    }
}
