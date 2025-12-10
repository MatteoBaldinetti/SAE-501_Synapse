package com.synapse.sae501.controllers;

import com.synapse.sae501.models.User;
import com.synapse.sae501.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return this.userService.createUser(user);
    }

    @GetMapping
    public Iterable<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return this.userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        this.userService.deleteUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return this.userService.updateUser(user, id);
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam(required = false) Long id,
                                  @RequestParam(required = false) String firstname,
                                  @RequestParam(required = false) String lastname,
                                  @RequestParam(required = false) String email,
                                  @RequestParam(required = false) String password,
                                  @RequestParam(required = false) Integer type
    ) {
        return userService.searchUsers(id, firstname, lastname, email, password, type);
    }
}
