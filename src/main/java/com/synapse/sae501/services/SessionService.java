package com.synapse.sae501.services;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.models.Place;
import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.Training;
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

    public Session createSession(Session session){
        return this.sessionRepository.save(session);
    }

    public Session getSessionById(Long id){
        return this.sessionRepository.findById(id).get();
    }

    public Iterable<Session> getAllSessions(){
        return this.sessionRepository.findAll();
    }

    public void deleteSessionById(Long id){
        this.sessionRepository.deleteById(id);
    }

    public Session updateSession(Session session, Long id){
        session.setId(id);
        return this.sessionRepository.save(session);
    }

    public List<Session> searchSessions(
            Long id,
            Timestamp startDate,
            Timestamp endDate,
            String title,
            String description,
            Float duration,
            Integer capacity,
            Training training,
            Instructor instructor,
            Place place
    ) {
        List<Specification<Session>> specs = new ArrayList<>();

        if (id != null) specs.add(SessionSpecifications.hasId(id));
        if (startDate != null) specs.add(SessionSpecifications.hasStartDate(startDate));
        if (endDate != null) specs.add(SessionSpecifications.hasEndDate(endDate));
        if (title != null) specs.add(SessionSpecifications.hasTitle(title));
        if (description != null) specs.add(SessionSpecifications.hasDescription(description));
        if (duration != null) specs.add(SessionSpecifications.hasDuration(duration));
        if (capacity != null) specs.add(SessionSpecifications.hasCapacity(capacity));
        if (training != null) specs.add(SessionSpecifications.hasTraining(training));
        if (instructor != null) specs.add(SessionSpecifications.hasInstructor(instructor));
        if (place != null) specs.add(SessionSpecifications.hasPlace(place));

        Specification<Session> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? sessionRepository.findAll() : sessionRepository.findAll(finalSpec);
    }
}