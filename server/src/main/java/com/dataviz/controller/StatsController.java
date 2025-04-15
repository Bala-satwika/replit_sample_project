package com.dataviz.controller;

import com.dataviz.model.Stats;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for stats operations.
 */
@RestController
@RequestMapping("/api/stats")
public class StatsController {
    
    private final StorageService storageService;
    
    @Autowired
    public StatsController(StorageService storageService) {
        this.storageService = storageService;
    }
    
    /**
     * Get system stats.
     */
    @GetMapping
    public ResponseEntity<Stats> getStats() {
        return ResponseEntity.ok(storageService.getStats());
    }
}