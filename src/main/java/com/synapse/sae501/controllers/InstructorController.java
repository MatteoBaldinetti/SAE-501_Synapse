package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.services.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instructor")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public Instructor createInstructor(@RequestBody Instructor instructor){return this.instructorService.createInstructor(instructor);}

    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable Long id){return this.instructorService.getInstructorById(id);}

    @GetMapping
    public Iterable<Instructor> getAllInstructors() {return this.instructorService.getAllInstructors();}

    @DeleteMapping
    public void deleteInstructorById(@RequestParam Long id){this.instructorService.deleteInstructorById(id);}

    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable Long id, @RequestBody Instructor instructor){
        return this.instructorService.updateInstructor(instructor, id);
    }
}
