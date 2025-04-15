package com.dataviz.model;

/**
 * Stats model class representing system-wide statistics.
 */
public class Stats {
    private Integer totalVisualizations;
    private Integer sharedReports;
    private Integer activeDatasets;
    private Integer scheduledReports;
    
    public Stats() {
    }
    
    public Stats(Integer totalVisualizations, Integer sharedReports, Integer activeDatasets, Integer scheduledReports) {
        this.totalVisualizations = totalVisualizations;
        this.sharedReports = sharedReports;
        this.activeDatasets = activeDatasets;
        this.scheduledReports = scheduledReports;
    }
    
    // Getters and Setters
    
    public Integer getTotalVisualizations() {
        return totalVisualizations;
    }
    
    public void setTotalVisualizations(Integer totalVisualizations) {
        this.totalVisualizations = totalVisualizations;
    }
    
    public Integer getSharedReports() {
        return sharedReports;
    }
    
    public void setSharedReports(Integer sharedReports) {
        this.sharedReports = sharedReports;
    }
    
    public Integer getActiveDatasets() {
        return activeDatasets;
    }
    
    public void setActiveDatasets(Integer activeDatasets) {
        this.activeDatasets = activeDatasets;
    }
    
    public Integer getScheduledReports() {
        return scheduledReports;
    }
    
    public void setScheduledReports(Integer scheduledReports) {
        this.scheduledReports = scheduledReports;
    }
}