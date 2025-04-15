package com.dataviz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visualization {
    private Long id;
    private Long userId;
    private Long datasetId;
    private String name;
    private String type; // "bar", "line", "pie", etc.
    private Map<String, Object> config;
    private Date createdAt;
}