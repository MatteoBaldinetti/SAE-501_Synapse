package com.synapse.sae501.repositories;

import com.synapse.sae501.models.InstructorModel;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<InstructorModel, Long> {
}
