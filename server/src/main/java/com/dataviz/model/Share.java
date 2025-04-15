package com.dataviz.model;

import java.time.LocalDateTime;

/**
 * Share model class representing a share in the system.
 */
public class Share {
    private Long id;
    private Long userId;
    private Long visualizationId;
    private String accessToken;
    private String accessType;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    
    public Share() {
    }
    
    public Share(Long id, Long userId, Long visualizationId, String accessToken, String accessType, 
                 LocalDateTime expiresAt, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.visualizationId = visualizationId;
        this.accessToken = accessToken;
        this.accessType = accessType;
        this.expiresAt = expiresAt;
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
    
    public Long getVisualizationId() {
        return visualizationId;
    }
    
    public void setVisualizationId(Long visualizationId) {
        this.visualizationId = visualizationId;
    }
    
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public String getAccessType() {
        return accessType;
    }
    
    public void setAccessType(String accessType) {
        this.accessType = accessType;
    }
    
    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}