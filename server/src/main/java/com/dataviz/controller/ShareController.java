package com.dataviz.controller;

import com.dataviz.model.Share;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for share operations.
 */
@RestController
@RequestMapping("/api/shares")
public class ShareController {
    
    private final StorageService storageService;
    
    @Autowired
    public ShareController(StorageService storageService) {
        this.storageService = storageService;
    }
    
    /**
     * Get all shares.
     */
    @GetMapping
    public ResponseEntity<List<Share>> getAllShares() {
        return ResponseEntity.ok(storageService.getAllShares());
    }
    
    /**
     * Get shares by visualization ID.
     */
    @GetMapping("/visualization/{visualizationId}")
    public ResponseEntity<List<Share>> getSharesByVisualizationId(@PathVariable Long visualizationId) {
        return ResponseEntity.ok(storageService.getSharesByVisualizationId(visualizationId));
    }
    
    /**
     * Get shares by user ID.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Share>> getSharesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(storageService.getSharesByUserId(userId));
    }
    
    /**
     * Create a new share.
     */
    @PostMapping
    public ResponseEntity<Share> createShare(@RequestBody Share share) {
        return new ResponseEntity<>(storageService.createShare(share), HttpStatus.CREATED);
    }
    
    /**
     * Delete a share by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShare(@PathVariable Long id) {
        boolean deleted = storageService.deleteShare(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}