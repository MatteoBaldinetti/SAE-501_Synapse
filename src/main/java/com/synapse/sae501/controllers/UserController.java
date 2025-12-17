package com.synapse.sae501.controllers;

import com.synapse.sae501.models.Session;
import com.synapse.sae501.models.User;
import com.synapse.sae501.services.SessionService;
import com.synapse.sae501.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Tag(name = "Users", description = "Endpoints for managing users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SessionService sessionService;

    @Operation(summary = "Create a new user")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User created successfully"),
            @ApiResponse(responseCode = "400", description = "Failed to create user")
    })
    @PostMapping
    public ResponseEntity<User> createUser(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User object")
            @RequestBody User user
    ) {
        User result = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200", description = "List of users retrieved successfully")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> result = userService.getAllUsers();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get user by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @Parameter(description = "User ID")
            @PathVariable Long id
    ) {
        User result = userService.getUserById(id);
        return  ResponseEntity.ok(result);
    }

    @Operation(summary = "Delete user by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(
            @Parameter(description = "User ID")
            @PathVariable Long id
    ) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @Parameter(description = "User ID")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User object")
            @RequestBody User user
    ) {
        User result = userService.updateUser(user, id);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Search users with filters")
    @ApiResponse(responseCode = "200", description = "List of users retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @Parameter(description = "User ID") @RequestParam(required = false) Long id,
            @Parameter(description = "First name") @RequestParam(required = false) String firstname,
            @Parameter(description = "Last name") @RequestParam(required = false) String lastname,
            @Parameter(description = "Email") @RequestParam(required = false) String email,
            @Parameter(description = "Password") @RequestParam(required = false) String password,
            @Parameter(description = "Type of account") @RequestParam(required = false) Integer type,
            @Parameter(description = "Phone number") @RequestParam(required = false) String phoneNumber,
            @Parameter(description = "Image name") @RequestParam(required = false) String imgName
    ) {
        List<User> result = userService.searchUsers(id, firstname, lastname, email, password, type, phoneNumber, imgName);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Get all sessions linked to a user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of sessions retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByUser(
            @Parameter(description = "User ID")
            @PathVariable Long userId
    ) {
        List<Session> result = sessionService.getSessionsByUser(userId);
        return ResponseEntity.ok(result);
    }
}
