import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertDatasetSchema, 
  insertVisualizationSchema, 
  insertShareSchema,
  insertActivitySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Datasets
  app.get("/api/datasets", async (req, res) => {
    try {
      const datasets = await storage.getDatasets();
      res.json(datasets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch datasets" });
    }
  });
  
  app.get("/api/datasets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const dataset = await storage.getDataset(id);
      
      if (!dataset) {
        return res.status(404).json({ message: "Dataset not found" });
      }
      
      res.json(dataset);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dataset" });
    }
  });
  
  app.post("/api/datasets", async (req, res) => {
    try {
      const result = insertDatasetSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid dataset data", errors: result.error });
      }
      
      const dataset = await storage.createDataset(result.data);
      res.status(201).json(dataset);
    } catch (error) {
      res.status(500).json({ message: "Failed to create dataset" });
    }
  });
  
  app.put("/api/datasets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertDatasetSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid dataset data", errors: result.error });
      }
      
      const updatedDataset = await storage.updateDataset(id, result.data);
      
      if (!updatedDataset) {
        return res.status(404).json({ message: "Dataset not found" });
      }
      
      res.json(updatedDataset);
    } catch (error) {
      res.status(500).json({ message: "Failed to update dataset" });
    }
  });
  
  app.delete("/api/datasets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDataset(id);
      
      if (!success) {
        return res.status(404).json({ message: "Dataset not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete dataset" });
    }
  });
  
  // Visualizations
  app.get("/api/visualizations", async (req, res) => {
    try {
      const visualizations = await storage.getVisualizations();
      res.json(visualizations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visualizations" });
    }
  });
  
  app.get("/api/visualizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const visualization = await storage.getVisualization(id);
      
      if (!visualization) {
        return res.status(404).json({ message: "Visualization not found" });
      }
      
      res.json(visualization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visualization" });
    }
  });
  
  app.post("/api/visualizations", async (req, res) => {
    try {
      const result = insertVisualizationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid visualization data", errors: result.error });
      }
      
      const visualization = await storage.createVisualization(result.data);
      res.status(201).json(visualization);
    } catch (error) {
      res.status(500).json({ message: "Failed to create visualization" });
    }
  });
  
  app.put("/api/visualizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertVisualizationSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid visualization data", errors: result.error });
      }
      
      const updatedVisualization = await storage.updateVisualization(id, result.data);
      
      if (!updatedVisualization) {
        return res.status(404).json({ message: "Visualization not found" });
      }
      
      res.json(updatedVisualization);
    } catch (error) {
      res.status(500).json({ message: "Failed to update visualization" });
    }
  });
  
  app.delete("/api/visualizations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteVisualization(id);
      
      if (!success) {
        return res.status(404).json({ message: "Visualization not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete visualization" });
    }
  });
  
  // Shares
  app.get("/api/shares", async (req, res) => {
    try {
      const shares = await storage.getShares();
      res.json(shares);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shares" });
    }
  });
  
  app.post("/api/shares", async (req, res) => {
    try {
      const result = insertShareSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid share data", errors: result.error });
      }
      
      const share = await storage.createShare(result.data);
      res.status(201).json(share);
    } catch (error) {
      res.status(500).json({ message: "Failed to create share" });
    }
  });
  
  app.delete("/api/shares/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteShare(id);
      
      if (!success) {
        return res.status(404).json({ message: "Share not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete share" });
    }
  });
  
  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  
  app.get("/api/users/:userId/activities", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const activities = await storage.getActivitiesByUserId(userId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user activities" });
    }
  });
  
  // Stats for dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const visualizations = await storage.getVisualizations();
      const datasets = await storage.getDatasets();
      const shares = await storage.getShares();
      const activities = await storage.getActivities();
      
      const stats = {
        totalVisualizations: visualizations.length,
        sharedReports: shares.length,
        activeDatasets: datasets.length,
        scheduledReports: 0, // Not implemented yet
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
