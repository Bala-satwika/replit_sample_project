package com.dataviz.model;

import java.time.LocalDateTime;

/**
 * Visualization model class representing a visualization in the system.
 */
public class Visualization {
    private Long id;
    private Long userId;
    private Long datasetId;
    private String name;
    private String type;
    private Object config;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Visualization() {
    }
    
    public Visualization(Long id, Long userId, Long datasetId, String name, String type, Object config, 
                         LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.datasetId = datasetId;
        this.name = name;
        this.type = type;
        this.config = config;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getDatasetId() {
        return datasetId;
    }
    
    public void setDatasetId(Long datasetId) {
        this.datasetId = datasetId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Object getConfig() {
        return config;
    }
    
    public void setConfig(Object config) {
        this.config = config;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}