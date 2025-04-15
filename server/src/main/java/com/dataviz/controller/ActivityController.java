package com.dataviz.controller;

import com.dataviz.model.Activity;
import com.dataviz.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin
public class ActivityController {

    @Autowired
    private StorageService storageService;

    @GetMapping
    public List<Activity> getAllActivities() {
        return storageService.getActivities();
    }

    @GetMapping("/user/{userId}")
    public List<Activity> getActivitiesByUserId(@PathVariable Long userId) {
        return storageService.getActivitiesByUserId(userId);
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return storageService.createActivity(activity);
    }
}