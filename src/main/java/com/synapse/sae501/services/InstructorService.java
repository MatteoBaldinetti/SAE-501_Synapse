package com.synapse.sae501.services;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.repositories.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void  deleteInstructorById(Long id){
        this.instructorRepository.deleteById(id);
    }

    public Instructor updateInstructor(Instructor instructor, Long id){
        instructor.setId(id);
        return this.instructorRepository.save(instructor);
    }
}
