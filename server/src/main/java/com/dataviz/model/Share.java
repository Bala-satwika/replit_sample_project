package com.dataviz.model;

import java.util.Date;

public class Share {
    private Long id;
    private Long userId;
    private Long visualizationId;
    private String accessType;
    private String accessCode;
    private Date createdAt;

    public Share() {
    }

    public Share(Long id, Long userId, Long visualizationId, String accessType, String accessCode, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.visualizationId = visualizationId;
        this.accessType = accessType;
        this.accessCode = accessCode;
        this.createdAt = createdAt;
    }

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

    public String getAccessType() {
        return accessType;
    }

    public void setAccessType(String accessType) {
        this.accessType = accessType;
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}