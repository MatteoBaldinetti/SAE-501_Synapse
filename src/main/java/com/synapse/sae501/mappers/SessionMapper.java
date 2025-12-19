package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.SessionCreationDTO;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.services.InstructorService;
import com.synapse.sae501.services.PlaceService;
import com.synapse.sae501.services.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionMapper {

    @Autowired TrainingService trainingService;
    @Autowired InstructorService instructorService;
    @Autowired PlaceService placeService;

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
