package com.dataviz.model;

import java.time.LocalDateTime;

/**
 * Dataset model class representing a dataset in the system.
 */
public class Dataset {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private String source;
    private Object data;
    private LocalDateTime createdAt;
    
    public Dataset() {
    }
    
    public Dataset(Long id, Long userId, String name, String description, String source, Object data, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.source = source;
        this.data = data;
        this.createdAt = createdAt;
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
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
    
    public Object getData() {
        return data;
    }
    
    public void setData(Object data) {
        this.data = data;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}