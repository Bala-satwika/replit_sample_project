package com.dataviz.controller;

import com.dataviz.model.Stats;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin
public class StatsController {

    @Autowired
    private StorageService storageService;

    @GetMapping
    public Stats getStats() {
        return storageService.getStats();
    }
}