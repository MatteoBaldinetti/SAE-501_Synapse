package com.synapse.sae501.controllers;

import com.synapse.sae501.models.User;
import com.synapse.sae501.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Tag(name = "users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User result = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> result = userService.getAllUsers();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User result = userService.getUserById(id);
        return  ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User result = userService.updateUser(user, id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam(required = false) Long id,
                                  @RequestParam(required = false) String firstname,
                                  @RequestParam(required = false) String lastname,
                                  @RequestParam(required = false) String email,
                                  @RequestParam(required = false) String password,
                                  @RequestParam(required = false) Integer type,
                                  @RequestParam(required = false) String phoneNumber,
                                  @RequestParam(required = false) String imgName
    ) {
        List<User> result = userService.searchUsers(id, firstname, lastname, email, password, type, phoneNumber, imgName);
        return ResponseEntity.ok(result);
    }
}
