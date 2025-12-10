package com.synapse.sae501.services;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.repositories.InstructorRepository;
import com.synapse.sae501.specifications.InstructorSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    public Instructor createInstructor(Instructor instructor){
        return this.instructorRepository.save(instructor);
    }

    public Instructor getInstructorById(Long id){
        return this.instructorRepository.findById(id).get();
    }

    public Iterable<Instructor> getAllInstructors()
    {
        return this.instructorRepository.findAll();
    }

    public void deleteInstructorById(Long id){
        this.instructorRepository.deleteById(id);
    }

    public Instructor updateInstructor(Instructor instructor, Long id){
        instructor.setId(id);
        return this.instructorRepository.save(instructor);
    }

    public List<Instructor> searchInstructors(
            Long id,
            String firstName,
            String lastName,
            String contractType,
            String specialty
    ) {
        List<Specification<Instructor>> specs = new ArrayList<>();

        if (id != null) specs.add(InstructorSpecifications.hasId(id));
        if (firstName != null) specs.add(InstructorSpecifications.hasFirstName(firstName));
        if (lastName != null) specs.add(InstructorSpecifications.hasLastName(lastName));
        if (contractType != null) specs.add(InstructorSpecifications.hasContractType(contractType));
        if (specialty != null) specs.add(InstructorSpecifications.hasSpecialty(specialty));

        Specification<Instructor> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? instructorRepository.findAll() : instructorRepository.findAll(finalSpec);
    }
}
