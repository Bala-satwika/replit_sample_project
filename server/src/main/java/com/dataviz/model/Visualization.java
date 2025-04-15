package com.dataviz.model;

import java.util.Date;
import java.util.Map;

public class Visualization {
    private Long id;
    private Long userId;
    private Long datasetId;
    private String name;
    private String type;
    private Map<String, Object> config;
    private Date createdAt;

    public Visualization() {
    }

    public Visualization(Long id, Long userId, Long datasetId, String name, String type, Map<String, Object> config, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.datasetId = datasetId;
        this.name = name;
        this.type = type;
        this.config = config;
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

    public Map<String, Object> getConfig() {
        return config;
    }

    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}