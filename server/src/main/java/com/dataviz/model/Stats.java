package com.dataviz.model;

public class Stats {
    private int totalVisualizations;
    private int sharedReports;
    private int activeDatasets;
    private int scheduledReports;

    public Stats() {
    }

    public Stats(int totalVisualizations, int sharedReports, int activeDatasets, int scheduledReports) {
        this.totalVisualizations = totalVisualizations;
        this.sharedReports = sharedReports;
        this.activeDatasets = activeDatasets;
        this.scheduledReports = scheduledReports;
    }

    public int getTotalVisualizations() {
        return totalVisualizations;
    }

    public void setTotalVisualizations(int totalVisualizations) {
        this.totalVisualizations = totalVisualizations;
    }

    public int getSharedReports() {
        return sharedReports;
    }

    public void setSharedReports(int sharedReports) {
        this.sharedReports = sharedReports;
    }

    public int getActiveDatasets() {
        return activeDatasets;
    }

    public void setActiveDatasets(int activeDatasets) {
        this.activeDatasets = activeDatasets;
    }

    public int getScheduledReports() {
        return scheduledReports;
    }

    public void setScheduledReports(int scheduledReports) {
        this.scheduledReports = scheduledReports;
    }
}