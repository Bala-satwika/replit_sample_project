package com.dataviz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Share {
    private Long id;
    private Long userId;
    private Long visualizationId;
    private String sharedWith;
    private String accessLevel; // "view", "edit", etc.
    private Date createdAt;
}