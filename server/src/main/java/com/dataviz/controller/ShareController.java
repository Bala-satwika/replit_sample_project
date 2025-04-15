package com.dataviz.controller;

import com.dataviz.model.Share;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shares")
@CrossOrigin
public class ShareController {

    @Autowired
    private StorageService storageService;

    @GetMapping
    public List<Share> getAllShares() {
        return storageService.getShares();
    }

    @GetMapping("/visualization/{visualizationId}")
    public List<Share> getSharesByVisualizationId(@PathVariable Long visualizationId) {
        return storageService.getSharesByVisualizationId(visualizationId);
    }

    @GetMapping("/user/{userId}")
    public List<Share> getSharesByUserId(@PathVariable Long userId) {
        return storageService.getSharesByUserId(userId);
    }

    @PostMapping
    public Share createShare(@RequestBody Share share) {
        return storageService.createShare(share);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShare(@PathVariable Long id) {
        boolean deleted = storageService.deleteShare(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}