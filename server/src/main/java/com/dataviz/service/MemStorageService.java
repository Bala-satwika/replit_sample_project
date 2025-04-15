package com.dataviz.service;

import com.dataviz.model.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * In-memory implementation of StorageService interface.
 */
@Service
public class MemStorageService implements StorageService {
    
    private final Map<Long, User> users = new HashMap<>();
    private final Map<Long, Dataset> datasets = new HashMap<>();
    private final Map<Long, Visualization> visualizations = new HashMap<>();
    private final Map<Long, Share> shares = new HashMap<>();
    private final Map<Long, Activity> activities = new HashMap<>();
    
    private final AtomicLong userIdCounter = new AtomicLong(1);
    private final AtomicLong datasetIdCounter = new AtomicLong(1);
    private final AtomicLong visualizationIdCounter = new AtomicLong(1);
    private final AtomicLong shareIdCounter = new AtomicLong(1);
    private final AtomicLong activityIdCounter = new AtomicLong(1);
    
    /**
     * Initialize with sample data
     */
    public MemStorageService() {
        // Create default user
        User defaultUser = new User(
            userIdCounter.getAndIncrement(),
            "admin",
            "admin@example.com",
            "password",
            "Admin User",
            LocalDateTime.now()
        );
        users.put(defaultUser.getId(), defaultUser);
        
        // Create sample datasets
        Dataset sampleDataset1 = new Dataset(
            datasetIdCounter.getAndIncrement(),
            defaultUser.getId(),
            "User Survey Results",
            "Results from the Q1 2023 user satisfaction survey",
            "Google Forms",
            Map.of(
                "columns", List.of("date", "userType", "satisfaction", "recommendation", "comments"),
                "rows", List.of(
                    Map.of("date", "2023-01-15", "userType", "enterprise", "satisfaction", 4, "recommendation", 5, "comments", "Great product!"),
                    Map.of("date", "2023-01-16", "userType", "small-business", "satisfaction", 3, "recommendation", 4, "comments", "Good but could be better"),
                    Map.of("date", "2023-01-17", "userType", "enterprise", "satisfaction", 5, "recommendation", 5, "comments", "Excellent features"),
                    Map.of("date", "2023-01-18", "userType", "individual", "satisfaction", 2, "recommendation", 3, "comments", "Needs improvement")
                )
            ),
            LocalDateTime.now()
        );
        datasets.put(sampleDataset1.getId(), sampleDataset1);
        
        Dataset sampleDataset2 = new Dataset(
            datasetIdCounter.getAndIncrement(),
            defaultUser.getId(),
            "Website Traffic",
            "Monthly website traffic data for 2023",
            "Google Analytics",
            Map.of(
                "columns", List.of("month", "visitors", "pageViews", "bounceRate", "conversionRate"),
                "rows", List.of(
                    Map.of("month", "January", "visitors", 12500, "pageViews", 42000, "bounceRate", 0.45, "conversionRate", 0.12),
                    Map.of("month", "February", "visitors", 13200, "pageViews", 45000, "bounceRate", 0.43, "conversionRate", 0.13),
                    Map.of("month", "March", "visitors", 14500, "pageViews", 48000, "bounceRate", 0.41, "conversionRate", 0.15),
                    Map.of("month", "April", "visitors", 15000, "pageViews", 51000, "bounceRate", 0.40, "conversionRate", 0.16)
                )
            ),
            LocalDateTime.now()
        );
        datasets.put(sampleDataset2.getId(), sampleDataset2);
        
        // Create sample visualizations
        Visualization userEngagementVisualization = new Visualization(
            visualizationIdCounter.getAndIncrement(),
            defaultUser.getId(),
            sampleDataset1.getId(),
            "User Engagement",
            "pie",
            Map.of(
                "dataKey", "satisfaction",
                "labelKey", "userType",
                "colors", List.of("#8884d8", "#82ca9d", "#ffc658", "#ff8042")
            ),
            LocalDateTime.now(),
            LocalDateTime.now()
        );
        visualizations.put(userEngagementVisualization.getId(), userEngagementVisualization);
        
        Visualization conversionVisualization = new Visualization(
            visualizationIdCounter.getAndIncrement(),
            defaultUser.getId(),
            sampleDataset2.getId(),
            "Conversion Rate Trends",
            "line",
            Map.of(
                "xAxisKey", "month",
                "yAxisKeys", List.of(
                    Map.of("key", "conversionRate", "color", "#8884d8"),
                    Map.of("key", "bounceRate", "color", "#82ca9d")
                )
            ),
            LocalDateTime.now(),
            LocalDateTime.now()
        );
        visualizations.put(conversionVisualization.getId(), conversionVisualization);
        
        // Create sample activities
        Activity createDatasetActivity = new Activity(
            activityIdCounter.getAndIncrement(),
            defaultUser.getId(),
            "created",
            "dataset",
            sampleDataset1.getId(),
            Map.of("name", sampleDataset1.getName()),
            LocalDateTime.now()
        );
        activities.put(createDatasetActivity.getId(), createDatasetActivity);
        
        Activity createVisualizationActivity = new Activity(
            activityIdCounter.getAndIncrement(),
            defaultUser.getId(),
            "created",
            "visualization",
            userEngagementVisualization.getId(),
            Map.of("name", userEngagementVisualization.getName()),
            LocalDateTime.now()
        );
        activities.put(createVisualizationActivity.getId(), createVisualizationActivity);
    }
    
    // User methods
    
    @Override
    public User getUser(Long id) {
        return users.get(id);
    }
    
    @Override
    public User getUserByUsername(String username) {
        return users.values().stream()
            .filter(user -> user.getUsername().equals(username))
            .findFirst()
            .orElse(null);
    }
    
    @Override
    public User createUser(User user) {
        user.setId(userIdCounter.getAndIncrement());
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        users.put(user.getId(), user);
        return user;
    }
    
    // Dataset methods
    
    @Override
    public List<Dataset> getAllDatasets() {
        return new ArrayList<>(datasets.values());
    }
    
    @Override
    public Dataset getDataset(Long id) {
        return datasets.get(id);
    }
    
    @Override
    public List<Dataset> getDatasetsByUserId(Long userId) {
        return datasets.values().stream()
            .filter(dataset -> dataset.getUserId().equals(userId))
            .collect(Collectors.toList());
    }
    
    @Override
    public Dataset createDataset(Dataset dataset) {
        dataset.setId(datasetIdCounter.getAndIncrement());
        if (dataset.getCreatedAt() == null) {
            dataset.setCreatedAt(LocalDateTime.now());
        }
        datasets.put(dataset.getId(), dataset);
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            dataset.getUserId(),
            "created",
            "dataset",
            dataset.getId(),
            Map.of("name", dataset.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        return dataset;
    }
    
    @Override
    public Dataset updateDataset(Long id, Dataset dataset) {
        Dataset existingDataset = datasets.get(id);
        if (existingDataset == null) {
            return null;
        }
        
        // Update fields
        if (dataset.getName() != null) {
            existingDataset.setName(dataset.getName());
        }
        if (dataset.getDescription() != null) {
            existingDataset.setDescription(dataset.getDescription());
        }
        if (dataset.getSource() != null) {
            existingDataset.setSource(dataset.getSource());
        }
        if (dataset.getData() != null) {
            existingDataset.setData(dataset.getData());
        }
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            existingDataset.getUserId(),
            "updated",
            "dataset",
            existingDataset.getId(),
            Map.of("name", existingDataset.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        return existingDataset;
    }
    
    @Override
    public boolean deleteDataset(Long id) {
        Dataset dataset = datasets.get(id);
        if (dataset == null) {
            return false;
        }
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            dataset.getUserId(),
            "deleted",
            "dataset",
            dataset.getId(),
            Map.of("name", dataset.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        // Remove dataset
        datasets.remove(id);
        
        return true;
    }
    
    // Visualization methods
    
    @Override
    public List<Visualization> getAllVisualizations() {
        return new ArrayList<>(visualizations.values());
    }
    
    @Override
    public Visualization getVisualization(Long id) {
        return visualizations.get(id);
    }
    
    @Override
    public List<Visualization> getVisualizationsByUserId(Long userId) {
        return visualizations.values().stream()
            .filter(visualization -> visualization.getUserId().equals(userId))
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Visualization> getVisualizationsByDatasetId(Long datasetId) {
        return visualizations.values().stream()
            .filter(visualization -> visualization.getDatasetId().equals(datasetId))
            .collect(Collectors.toList());
    }
    
    @Override
    public Visualization createVisualization(Visualization visualization) {
        visualization.setId(visualizationIdCounter.getAndIncrement());
        if (visualization.getCreatedAt() == null) {
            visualization.setCreatedAt(LocalDateTime.now());
        }
        if (visualization.getUpdatedAt() == null) {
            visualization.setUpdatedAt(LocalDateTime.now());
        }
        visualizations.put(visualization.getId(), visualization);
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            visualization.getUserId(),
            "created",
            "visualization",
            visualization.getId(),
            Map.of("name", visualization.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        return visualization;
    }
    
    @Override
    public Visualization updateVisualization(Long id, Visualization visualization) {
        Visualization existingVisualization = visualizations.get(id);
        if (existingVisualization == null) {
            return null;
        }
        
        // Update fields
        if (visualization.getName() != null) {
            existingVisualization.setName(visualization.getName());
        }
        if (visualization.getType() != null) {
            existingVisualization.setType(visualization.getType());
        }
        if (visualization.getConfig() != null) {
            existingVisualization.setConfig(visualization.getConfig());
        }
        if (visualization.getDatasetId() != null) {
            existingVisualization.setDatasetId(visualization.getDatasetId());
        }
        
        // Always update the updatedAt field
        existingVisualization.setUpdatedAt(LocalDateTime.now());
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            existingVisualization.getUserId(),
            "updated",
            "visualization",
            existingVisualization.getId(),
            Map.of("name", existingVisualization.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        return existingVisualization;
    }
    
    @Override
    public boolean deleteVisualization(Long id) {
        Visualization visualization = visualizations.get(id);
        if (visualization == null) {
            return false;
        }
        
        // Create activity record
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            visualization.getUserId(),
            "deleted",
            "visualization",
            visualization.getId(),
            Map.of("name", visualization.getName()),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        // Remove visualization
        visualizations.remove(id);
        
        return true;
    }
    
    // Share methods
    
    @Override
    public List<Share> getAllShares() {
        return new ArrayList<>(shares.values());
    }
    
    @Override
    public List<Share> getSharesByVisualizationId(Long visualizationId) {
        return shares.values().stream()
            .filter(share -> share.getVisualizationId().equals(visualizationId))
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Share> getSharesByUserId(Long userId) {
        return shares.values().stream()
            .filter(share -> share.getUserId().equals(userId))
            .collect(Collectors.toList());
    }
    
    @Override
    public Share createShare(Share share) {
        share.setId(shareIdCounter.getAndIncrement());
        if (share.getCreatedAt() == null) {
            share.setCreatedAt(LocalDateTime.now());
        }
        shares.put(share.getId(), share);
        
        // Create activity record
        Visualization visualization = visualizations.get(share.getVisualizationId());
        String visualizationName = visualization != null ? visualization.getName() : "Unknown";
        
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            share.getUserId(),
            "shared",
            "visualization",
            share.getVisualizationId(),
            Map.of("name", visualizationName),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        return share;
    }
    
    @Override
    public boolean deleteShare(Long id) {
        Share share = shares.get(id);
        if (share == null) {
            return false;
        }
        
        // Create activity record
        Visualization visualization = visualizations.get(share.getVisualizationId());
        String visualizationName = visualization != null ? visualization.getName() : "Unknown";
        
        Activity activity = new Activity(
            activityIdCounter.getAndIncrement(),
            share.getUserId(),
            "unshared",
            "visualization",
            share.getVisualizationId(),
            Map.of("name", visualizationName),
            LocalDateTime.now()
        );
        activities.put(activity.getId(), activity);
        
        // Remove share
        shares.remove(id);
        
        return true;
    }
    
    // Activity methods
    
    @Override
    public List<Activity> getAllActivities() {
        List<Activity> activityList = new ArrayList<>(activities.values());
        // Sort by createdAt descending (newest first)
        activityList.sort((a1, a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()));
        return activityList;
    }
    
    @Override
    public List<Activity> getActivitiesByUserId(Long userId) {
        List<Activity> userActivities = activities.values().stream()
            .filter(activity -> activity.getUserId().equals(userId))
            .collect(Collectors.toList());
        // Sort by createdAt descending (newest first)
        userActivities.sort((a1, a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()));
        return userActivities;
    }
    
    @Override
    public Activity createActivity(Activity activity) {
        activity.setId(activityIdCounter.getAndIncrement());
        if (activity.getCreatedAt() == null) {
            activity.setCreatedAt(LocalDateTime.now());
        }
        activities.put(activity.getId(), activity);
        return activity;
    }
    
    // Stats methods
    
    @Override
    public Stats getStats() {
        return new Stats(
            visualizations.size(),
            shares.size(),
            datasets.size(),
            0 // No scheduled reports yet
        );
    }
}