package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.services.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public Instructor createInstructor(@RequestBody Instructor instructor) {
        return this.instructorService.createInstructor(instructor);
    }

    @GetMapping
    public Iterable<Instructor> getAllInstructors() {
        return this.instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable Long id) {
        return this.instructorService.getInstructorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteInstructorById(@PathVariable Long id) {
        this.instructorService.deleteInstructorById(id);
    }

    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable Long id, @RequestBody Instructor instructor){
        return this.instructorService.updateInstructor(instructor, id);
    }

    @GetMapping("/search")
    public List<Instructor> searchInstructors(@RequestParam(required = false) Long id,
                                              @RequestParam(required = false) String firstName,
                                              @RequestParam(required = false) String lastName,
                                              @RequestParam(required = false) String contractType,
                                              @RequestParam(required = false) String specialty
    ) {
        return instructorService.searchInstructors(id, firstName, lastName, contractType, specialty);
    }
}
