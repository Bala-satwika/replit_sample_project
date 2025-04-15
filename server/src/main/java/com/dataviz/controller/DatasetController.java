package com.dataviz.controller;

import com.dataviz.model.Dataset;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for dataset operations.
 */
@RestController
@RequestMapping("/api/datasets")
public class DatasetController {
    
    private final StorageService storageService;
    
    @Autowired
    public DatasetController(StorageService storageService) {
        this.storageService = storageService;
    }
    
    /**
     * Get all datasets.
     */
    @GetMapping
    public ResponseEntity<List<Dataset>> getAllDatasets() {
        return ResponseEntity.ok(storageService.getAllDatasets());
    }
    
    /**
     * Get dataset by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Dataset> getDataset(@PathVariable Long id) {
        Dataset dataset = storageService.getDataset(id);
        if (dataset == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dataset);
    }
    
    /**
     * Get datasets by user ID.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Dataset>> getDatasetsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(storageService.getDatasetsByUserId(userId));
    }
    
    /**
     * Create a new dataset.
     */
    @PostMapping
    public ResponseEntity<Dataset> createDataset(@RequestBody Dataset dataset) {
        return new ResponseEntity<>(storageService.createDataset(dataset), HttpStatus.CREATED);
    }
    
    /**
     * Update an existing dataset.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Dataset> updateDataset(@PathVariable Long id, @RequestBody Dataset dataset) {
        Dataset updatedDataset = storageService.updateDataset(id, dataset);
        if (updatedDataset == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedDataset);
    }
    
    /**
     * Delete a dataset by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDataset(@PathVariable Long id) {
        boolean deleted = storageService.deleteDataset(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}