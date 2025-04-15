package com.dataviz.model;

import java.util.Date;
import java.util.Map;

public class Dataset {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Map<String, Object> data;
    private Date createdAt;

    public Dataset() {
    }

    public Dataset(Long id, Long userId, String name, String description, Map<String, Object> data, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.data = data;
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

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}