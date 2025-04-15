package com.dataviz.service;

import com.dataviz.model.*;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class StorageService {
    private Map<Long, User> users = new ConcurrentHashMap<>();
    private Map<Long, Dataset> datasets = new ConcurrentHashMap<>();
    private Map<Long, Visualization> visualizations = new ConcurrentHashMap<>();
    private Map<Long, Share> shares = new ConcurrentHashMap<>();
    private Map<Long, Activity> activities = new ConcurrentHashMap<>();

    private AtomicLong userIdCounter = new AtomicLong(1);
    private AtomicLong datasetIdCounter = new AtomicLong(1);
    private AtomicLong visualizationIdCounter = new AtomicLong(1);
    private AtomicLong shareIdCounter = new AtomicLong(1);
    private AtomicLong activityIdCounter = new AtomicLong(1);

    @PostConstruct
    public void init() {
        // Create default user
        User defaultUser = new User(
                userIdCounter.getAndIncrement(),
                "sarahchen",
                "sarah.chen@example.com",
                "password123",
                "Sarah Chen",
                "Designer"
        );
        users.put(defaultUser.getId(), defaultUser);

        // Create sample datasets
        Map<String, Object> surveyData = new HashMap<>();
        surveyData.put("labels", Arrays.asList("Question 1", "Question 2", "Question 3"));
        surveyData.put("values", Arrays.asList(75, 45, 90));

        Dataset dataset1 = new Dataset(
                datasetIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "User Survey Results",
                "Results from the Q1 user satisfaction survey",
                surveyData,
                new Date()
        );

        Map<String, Object> analyticsData = new HashMap<>();
        analyticsData.put("labels", Arrays.asList("Jan", "Feb", "Mar", "Apr", "May", "Jun"));
        analyticsData.put("values", Arrays.asList(2000, 3400, 2800, 5600, 4200, 3800));

        Dataset dataset2 = new Dataset(
                datasetIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "Q2 Analytics",
                "Website analytics data for Q2",
                analyticsData,
                new Date()
        );

        Map<String, Object> trafficData = new HashMap<>();
        trafficData.put("labels", Arrays.asList("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"));
        trafficData.put("values", Arrays.asList(12000, 14500, 16800, 15200, 18900, 22000, 19500));

        Dataset dataset3 = new Dataset(
                datasetIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "Website Traffic",
                "Daily website traffic data",
                trafficData,
                new Date()
        );

        datasets.put(dataset1.getId(), dataset1);
        datasets.put(dataset2.getId(), dataset2);
        datasets.put(dataset3.getId(), dataset3);

        // Create sample visualizations
        Map<String, Object> config1 = new HashMap<>();
        config1.put("xAxis", "Date");
        config1.put("yAxis", "Visitors");
        config1.put("color", "#6366F1");

        Visualization visualization1 = new Visualization(
                visualizationIdCounter.getAndIncrement(),
                defaultUser.getId(),
                dataset3.getId(),
                "User Engagement",
                "line",
                config1,
                new Date()
        );

        Map<String, Object> config2 = new HashMap<>();
        config2.put("xAxis", "Channel");
        config2.put("yAxis", "Conversions");
        config2.put("colors", Arrays.asList("#6366F1", "#EC4899", "#10B981", "#F59E0B"));

        Visualization visualization2 = new Visualization(
                visualizationIdCounter.getAndIncrement(),
                defaultUser.getId(),
                dataset2.getId(),
                "Conversion Rate",
                "pie",
                config2,
                new Date()
        );

        visualizations.put(visualization1.getId(), visualization1);
        visualizations.put(visualization2.getId(), visualization2);

        // Create sample activities
        Activity activity1 = new Activity(
                activityIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "created",
                "dataset",
                dataset1.getId(),
                "Created new dataset: User Survey Results",
                new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000) // 1 day ago
        );

        Activity activity2 = new Activity(
                activityIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "created",
                "visualization",
                visualization1.getId(),
                "Created new visualization: User Engagement",
                new Date(System.currentTimeMillis() - 12 * 60 * 60 * 1000) // 12 hours ago
        );

        Activity activity3 = new Activity(
                activityIdCounter.getAndIncrement(),
                defaultUser.getId(),
                "updated",
                "dataset",
                dataset2.getId(),
                "Updated dataset: Q2 Analytics",
                new Date(System.currentTimeMillis() - 4 * 60 * 60 * 1000) // 4 hours ago
        );

        activities.put(activity1.getId(), activity1);
        activities.put(activity2.getId(), activity2);
        activities.put(activity3.getId(), activity3);
    }

    // User methods
    public User getUser(Long id) {
        return users.get(id);
    }

    public User getUserByUsername(String username) {
        return users.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }

    public User createUser(User user) {
        user.setId(userIdCounter.getAndIncrement());
        users.put(user.getId(), user);
        return user;
    }

    // Dataset methods
    public List<Dataset> getDatasets() {
        return new ArrayList<>(datasets.values());
    }

    public Dataset getDataset(Long id) {
        return datasets.get(id);
    }

    public List<Dataset> getDatasetsByUserId(Long userId) {
        return datasets.values().stream()
                .filter(dataset -> dataset.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public Dataset createDataset(Dataset dataset) {
        dataset.setId(datasetIdCounter.getAndIncrement());
        dataset.setCreatedAt(new Date());
        datasets.put(dataset.getId(), dataset);
        return dataset;
    }

    public Dataset updateDataset(Long id, Dataset datasetUpdate) {
        Dataset dataset = datasets.get(id);
        if (dataset == null) {
            return null;
        }

        if (datasetUpdate.getName() != null) {
            dataset.setName(datasetUpdate.getName());
        }
        if (datasetUpdate.getDescription() != null) {
            dataset.setDescription(datasetUpdate.getDescription());
        }
        if (datasetUpdate.getData() != null) {
            dataset.setData(datasetUpdate.getData());
        }

        datasets.put(id, dataset);
        return dataset;
    }

    public boolean deleteDataset(Long id) {
        return datasets.remove(id) != null;
    }

    // Visualization methods
    public List<Visualization> getVisualizations() {
        return new ArrayList<>(visualizations.values());
    }

    public Visualization getVisualization(Long id) {
        return visualizations.get(id);
    }

    public List<Visualization> getVisualizationsByUserId(Long userId) {
        return visualizations.values().stream()
                .filter(visualization -> visualization.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public List<Visualization> getVisualizationsByDatasetId(Long datasetId) {
        return visualizations.values().stream()
                .filter(visualization -> visualization.getDatasetId().equals(datasetId))
                .collect(Collectors.toList());
    }

    public Visualization createVisualization(Visualization visualization) {
        visualization.setId(visualizationIdCounter.getAndIncrement());
        visualization.setCreatedAt(new Date());
        visualizations.put(visualization.getId(), visualization);
        return visualization;
    }

    public Visualization updateVisualization(Long id, Visualization visualizationUpdate) {
        Visualization visualization = visualizations.get(id);
        if (visualization == null) {
            return null;
        }

        if (visualizationUpdate.getName() != null) {
            visualization.setName(visualizationUpdate.getName());
        }
        if (visualizationUpdate.getType() != null) {
            visualization.setType(visualizationUpdate.getType());
        }
        if (visualizationUpdate.getConfig() != null) {
            visualization.setConfig(visualizationUpdate.getConfig());
        }
        if (visualizationUpdate.getDatasetId() != null) {
            visualization.setDatasetId(visualizationUpdate.getDatasetId());
        }

        visualizations.put(id, visualization);
        return visualization;
    }

    public boolean deleteVisualization(Long id) {
        return visualizations.remove(id) != null;
    }

    // Share methods
    public List<Share> getShares() {
        return new ArrayList<>(shares.values());
    }

    public List<Share> getSharesByVisualizationId(Long visualizationId) {
        return shares.values().stream()
                .filter(share -> share.getVisualizationId().equals(visualizationId))
                .collect(Collectors.toList());
    }

    public List<Share> getSharesByUserId(Long userId) {
        return shares.values().stream()
                .filter(share -> share.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public Share createShare(Share share) {
        share.setId(shareIdCounter.getAndIncrement());
        share.setCreatedAt(new Date());
        shares.put(share.getId(), share);
        return share;
    }

    public boolean deleteShare(Long id) {
        return shares.remove(id) != null;
    }

    // Activity methods
    public List<Activity> getActivities() {
        return new ArrayList<>(activities.values());
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activities.values().stream()
                .filter(activity -> activity.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public Activity createActivity(Activity activity) {
        activity.setId(activityIdCounter.getAndIncrement());
        activity.setCreatedAt(new Date());
        activities.put(activity.getId(), activity);
        return activity;
    }

    // Stats methods
    public Stats getStats() {
        return new Stats(
                visualizations.size(),
                shares.size(),
                datasets.size(),
                0 // No scheduled reports yet
        );
    }
}