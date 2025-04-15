package com.dataviz.controller;

import com.dataviz.model.User;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private StorageService storageService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = storageService.getUser(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        // Don't return the password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = storageService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        // Don't return the password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        User createdUser = storageService.createUser(user);
        // Don't return the password
        createdUser.setPassword(null);
        return createdUser;
    }
}