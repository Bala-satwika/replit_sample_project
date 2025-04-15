package com.dataviz.controller;

import com.dataviz.model.Visualization;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for visualization operations.
 */
@RestController
@RequestMapping("/api/visualizations")
public class VisualizationController {
    
    private final StorageService storageService;
    
    @Autowired
    public VisualizationController(StorageService storageService) {
        this.storageService = storageService;
    }
    
    /**
     * Get all visualizations.
     */
    @GetMapping
    public ResponseEntity<List<Visualization>> getAllVisualizations() {
        return ResponseEntity.ok(storageService.getAllVisualizations());
    }
    
    /**
     * Get visualization by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Visualization> getVisualization(@PathVariable Long id) {
        Visualization visualization = storageService.getVisualization(id);
        if (visualization == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visualization);
    }
    
    /**
     * Get visualizations by user ID.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Visualization>> getVisualizationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(storageService.getVisualizationsByUserId(userId));
    }
    
    /**
     * Get visualizations by dataset ID.
     */
    @GetMapping("/dataset/{datasetId}")
    public ResponseEntity<List<Visualization>> getVisualizationsByDatasetId(@PathVariable Long datasetId) {
        return ResponseEntity.ok(storageService.getVisualizationsByDatasetId(datasetId));
    }
    
    /**
     * Create a new visualization.
     */
    @PostMapping
    public ResponseEntity<Visualization> createVisualization(@RequestBody Visualization visualization) {
        return new ResponseEntity<>(storageService.createVisualization(visualization), HttpStatus.CREATED);
    }
    
    /**
     * Update an existing visualization.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Visualization> updateVisualization(@PathVariable Long id, @RequestBody Visualization visualization) {
        Visualization updatedVisualization = storageService.updateVisualization(id, visualization);
        if (updatedVisualization == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedVisualization);
    }
    
    /**
     * Delete a visualization by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisualization(@PathVariable Long id) {
        boolean deleted = storageService.deleteVisualization(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}