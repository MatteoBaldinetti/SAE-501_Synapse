package com.synapse.sae501.services;

import com.synapse.sae501.dto.SessionCreationDTO;
import com.synapse.sae501.exceptions.ResourceNotFoundException;
import com.synapse.sae501.mappers.SessionMapper;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.repositories.SessionRepository;
import com.synapse.sae501.specifications.SessionSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    private final SessionMapper sessionMapper = new SessionMapper();

    public Session createSession(SessionCreationDTO sessionCreationDTO) {
        Session session = sessionMapper.sessionCreationDTOToSession(sessionCreationDTO);
        return sessionRepository.save(session);
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session object with ID " + id + " not found"));
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public void deleteSessionById(Long id) {
        getSessionById(id);
        sessionRepository.deleteById(id);
    }

    public Session updateSession(SessionCreationDTO sessionCreationDTO, Long id) {
        getSessionById(id);
        Session session = sessionMapper.sessionCreationDTOToSession(sessionCreationDTO);
        session.setId(id);
        return sessionRepository.save(session);
    }

    public List<Session> searchSessions(
            Long id,
            Timestamp startDate,
            Timestamp endDate,
            String title,
            String description,
            Float duration,
            Integer capacity,
            Long trainingId,
            Long instructorId,
            Long placeId
    ) {
        List<Specification<Session>> specs = new ArrayList<>();

        if (id != null) specs.add(SessionSpecifications.hasId(id));
        if (startDate != null) specs.add(SessionSpecifications.hasStartDate(startDate));
        if (endDate != null) specs.add(SessionSpecifications.hasEndDate(endDate));
        if (title != null) specs.add(SessionSpecifications.hasTitle(title));
        if (description != null) specs.add(SessionSpecifications.hasDescription(description));
        if (duration != null) specs.add(SessionSpecifications.hasDuration(duration));
        if (capacity != null) specs.add(SessionSpecifications.hasCapacity(capacity));
        if (trainingId != null) specs.add(SessionSpecifications.hasTrainingId(trainingId));
        if (instructorId != null) specs.add(SessionSpecifications.hasInstructorId(instructorId));
        if (placeId != null) specs.add(SessionSpecifications.hasPlaceId(placeId));

        Specification<Session> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? sessionRepository.findAll() : sessionRepository.findAll(finalSpec);
    }

    public List<Session> getSessionsByUser(Long userId) {
        Specification<Session> spec = SessionSpecifications.hasUser(userId);
        return sessionRepository.findAll(spec);
    }
}