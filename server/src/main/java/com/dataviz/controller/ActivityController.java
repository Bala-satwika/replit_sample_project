package com.dataviz.controller;

import com.dataviz.model.Activity;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for activity operations.
 */
@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    
    private final StorageService storageService;
    
    @Autowired
    public ActivityController(StorageService storageService) {
        this.storageService = storageService;
    }
    
    /**
     * Get all activities.
     */
    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(storageService.getAllActivities());
    }
    
    /**
     * Get activities by user ID.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Activity>> getActivitiesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(storageService.getActivitiesByUserId(userId));
    }
    
    /**
     * Create a new activity.
     */
    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        return new ResponseEntity<>(storageService.createActivity(activity), HttpStatus.CREATED);
    }
}