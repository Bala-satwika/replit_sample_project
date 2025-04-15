package com.dataviz.controller;

import com.dataviz.model.Visualization;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visualizations")
@CrossOrigin
public class VisualizationController {

    @Autowired
    private StorageService storageService;

    @GetMapping
    public List<Visualization> getAllVisualizations() {
        return storageService.getVisualizations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visualization> getVisualizationById(@PathVariable Long id) {
        Visualization visualization = storageService.getVisualization(id);
        if (visualization == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visualization);
    }

    @GetMapping("/dataset/{datasetId}")
    public List<Visualization> getVisualizationsByDatasetId(@PathVariable Long datasetId) {
        return storageService.getVisualizationsByDatasetId(datasetId);
    }

    @PostMapping
    public Visualization createVisualization(@RequestBody Visualization visualization) {
        return storageService.createVisualization(visualization);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visualization> updateVisualization(@PathVariable Long id, @RequestBody Visualization visualizationUpdate) {
        Visualization updatedVisualization = storageService.updateVisualization(id, visualizationUpdate);
        if (updatedVisualization == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedVisualization);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisualization(@PathVariable Long id) {
        boolean deleted = storageService.deleteVisualization(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}