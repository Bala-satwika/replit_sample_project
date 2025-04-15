package com.dataviz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stats {
    private int totalVisualizations;
    private int sharedReports;
    private int activeDatasets;
    private int scheduledReports;
}