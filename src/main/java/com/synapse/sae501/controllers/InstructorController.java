package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Instructor;
import com.synapse.sae501.services.InstructorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
@Tag(name = "instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor) {
        Instructor result = instructorService.createInstructor(instructor);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public Iterable<Instructor> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable Long id) {
        Instructor result = instructorService.getInstructorById(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructorById(@PathVariable Long id) {
        instructorService.deleteInstructorById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Long id, @RequestBody Instructor instructor) {
        Instructor result = instructorService.updateInstructor(instructor, id);
        return ResponseEntity.ok(result);
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
