package com.synapse.sae501.repositories;

import com.synapse.sae501.models.SessionModel;
import org.springframework.data.repository.CrudRepository;

public interface SessionRepository extends CrudRepository<SessionModel, Long> {
}
