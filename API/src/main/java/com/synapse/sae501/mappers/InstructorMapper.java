package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.InstructorCreationDTO;
import com.synapse.sae501.models.Instructor;

public class InstructorMapper {

    public Instructor instructorCreationDTOToInstructor(InstructorCreationDTO instructorCreationDTO) {
        return new Instructor(
                instructorCreationDTO.firstName(),
                instructorCreationDTO.lastName(),
                instructorCreationDTO.contractType(),
                instructorCreationDTO.specialty()
        );
    }
}
