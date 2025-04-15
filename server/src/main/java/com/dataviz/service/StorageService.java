package com.dataviz.service;

import com.dataviz.model.*;
import java.util.List;

/**
 * Service interface for handling storage operations.
 */
public interface StorageService {
    
    // User methods
    User getUser(Long id);
    User getUserByUsername(String username);
    User createUser(User user);
    
    // Dataset methods
    List<Dataset> getAllDatasets();
    Dataset getDataset(Long id);
    List<Dataset> getDatasetsByUserId(Long userId);
    Dataset createDataset(Dataset dataset);
    Dataset updateDataset(Long id, Dataset dataset);
    boolean deleteDataset(Long id);
    
    // Visualization methods
    List<Visualization> getAllVisualizations();
    Visualization getVisualization(Long id);
    List<Visualization> getVisualizationsByUserId(Long userId);
    List<Visualization> getVisualizationsByDatasetId(Long datasetId);
    Visualization createVisualization(Visualization visualization);
    Visualization updateVisualization(Long id, Visualization visualization);
    boolean deleteVisualization(Long id);
    
    // Share methods
    List<Share> getAllShares();
    List<Share> getSharesByVisualizationId(Long visualizationId);
    List<Share> getSharesByUserId(Long userId);
    Share createShare(Share share);
    boolean deleteShare(Long id);
    
    // Activity methods
    List<Activity> getAllActivities();
    List<Activity> getActivitiesByUserId(Long userId);
    Activity createActivity(Activity activity);
    
    // Stats methods
    Stats getStats();
}