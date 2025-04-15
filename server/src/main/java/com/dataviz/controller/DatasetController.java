package com.dataviz.controller;

import com.dataviz.model.Dataset;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/datasets")
@CrossOrigin
public class DatasetController {

    @Autowired
    private StorageService storageService;

    @GetMapping
    public List<Dataset> getAllDatasets() {
        return storageService.getDatasets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dataset> getDatasetById(@PathVariable Long id) {
        Dataset dataset = storageService.getDataset(id);
        if (dataset == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dataset);
    }

    @PostMapping
    public Dataset createDataset(@RequestBody Dataset dataset) {
        return storageService.createDataset(dataset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dataset> updateDataset(@PathVariable Long id, @RequestBody Dataset datasetUpdate) {
        Dataset updatedDataset = storageService.updateDataset(id, datasetUpdate);
        if (updatedDataset == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedDataset);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDataset(@PathVariable Long id) {
        boolean deleted = storageService.deleteDataset(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}