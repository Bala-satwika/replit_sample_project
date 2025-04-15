package com.dataviz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dataset {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Map<String, Object> data;
    private Date createdAt;
}