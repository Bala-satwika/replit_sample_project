package com.dataviz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    private Long id;
    private Long userId;
    private String action; // "created", "updated", "shared", etc.
    private String resourceType; // "dataset", "visualization", etc.
    private Long resourceId;
    private String details;
    private Date createdAt;
}