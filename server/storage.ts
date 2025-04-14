import {
  users, type User, type InsertUser,
  datasets, type Dataset, type InsertDataset,
  visualizations, type Visualization, type InsertVisualization,
  shares, type Share, type InsertShare,
  activities, type Activity, type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dataset methods
  getDatasets(): Promise<Dataset[]>;
  getDataset(id: number): Promise<Dataset | undefined>;
  getDatasetsByUserId(userId: number): Promise<Dataset[]>;
  createDataset(dataset: InsertDataset): Promise<Dataset>;
  updateDataset(id: number, dataset: Partial<InsertDataset>): Promise<Dataset | undefined>;
  deleteDataset(id: number): Promise<boolean>;
  
  // Visualization methods
  getVisualizations(): Promise<Visualization[]>;
  getVisualization(id: number): Promise<Visualization | undefined>;
  getVisualizationsByUserId(userId: number): Promise<Visualization[]>;
  getVisualizationsByDatasetId(datasetId: number): Promise<Visualization[]>;
  createVisualization(visualization: InsertVisualization): Promise<Visualization>;
  updateVisualization(id: number, visualization: Partial<InsertVisualization>): Promise<Visualization | undefined>;
  deleteVisualization(id: number): Promise<boolean>;
  
  // Share methods
  getShares(): Promise<Share[]>;
  getSharesByVisualizationId(visualizationId: number): Promise<Share[]>;
  getSharesByUserId(userId: number): Promise<Share[]>;
  createShare(share: InsertShare): Promise<Share>;
  deleteShare(id: number): Promise<boolean>;
  
  // Activity methods
  getActivities(): Promise<Activity[]>;
  getActivitiesByUserId(userId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private datasets: Map<number, Dataset>;
  private visualizations: Map<number, Visualization>;
  private shares: Map<number, Share>;
  private activities: Map<number, Activity>;
  
  private currentUserId: number;
  private currentDatasetId: number;
  private currentVisualizationId: number;
  private currentShareId: number;
  private currentActivityId: number;

  constructor() {
    this.users = new Map();
    this.datasets = new Map();
    this.visualizations = new Map();
    this.shares = new Map();
    this.activities = new Map();
    
    this.currentUserId = 1;
    this.currentDatasetId = 1;
    this.currentVisualizationId = 1;
    this.currentShareId = 1;
    this.currentActivityId = 1;
    
    // Create a default user
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "demo",
      password: "password",
      displayName: "Demo User",
      role: "designer"
    };
    this.users.set(defaultUser.id, defaultUser);
    
    // Create some sample datasets
    const sampleDataset1: Dataset = {
      id: this.currentDatasetId++,
      name: "User Survey Results",
      description: "Results from our user survey",
      userId: defaultUser.id,
      data: {
        labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        values: [45, 25, 15, 10, 5]
      },
      createdAt: new Date()
    };
    this.datasets.set(sampleDataset1.id, sampleDataset1);
    
    const sampleDataset2: Dataset = {
      id: this.currentDatasetId++,
      name: "Q2 Analytics",
      description: "Analytics data from Q2",
      userId: defaultUser.id,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [1200, 1900, 1500, 1800, 2300, 2500]
      },
      createdAt: new Date()
    };
    this.datasets.set(sampleDataset2.id, sampleDataset2);
    
    const sampleDataset3: Dataset = {
      id: this.currentDatasetId++,
      name: "Website Traffic",
      description: "Website traffic analytics",
      userId: defaultUser.id,
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        pageViews: [1200, 1900, 3000, 5000, 3000, 4000, 6000],
        sessions: [800, 1200, 1800, 3000, 1500, 2000, 3500]
      },
      createdAt: new Date()
    };
    this.datasets.set(sampleDataset3.id, sampleDataset3);
    
    // Create some sample visualizations
    const userEngagementVisualization: Visualization = {
      id: this.currentVisualizationId++,
      name: "User Engagement",
      type: "line",
      datasetId: sampleDataset3.id,
      userId: defaultUser.id,
      config: {
        title: "User Engagement",
        subtitle: "Last 7 days performance metrics",
        xAxis: "days",
        yAxis: "count",
        showLegend: true
      },
      createdAt: new Date()
    };
    this.visualizations.set(userEngagementVisualization.id, userEngagementVisualization);
    
    const conversionVisualization: Visualization = {
      id: this.currentVisualizationId++,
      name: "Conversion by Channel",
      type: "pie",
      datasetId: sampleDataset2.id,
      userId: defaultUser.id,
      config: {
        title: "Conversion by Channel",
        subtitle: "Distribution of conversion sources",
        showLegend: true,
        showLabels: true
      },
      createdAt: new Date()
    };
    this.visualizations.set(conversionVisualization.id, conversionVisualization);
    
    // Create some sample activities
    this.createActivity({
      userId: defaultUser.id,
      action: "created",
      resourceType: "visualization",
      resourceId: userEngagementVisualization.id,
      details: "Created visualization: User Engagement"
    });
    
    this.createActivity({
      userId: defaultUser.id,
      action: "updated",
      resourceType: "dataset",
      resourceId: sampleDataset3.id,
      details: "Updated dataset: Website Traffic"
    });
    
    this.createActivity({
      userId: defaultUser.id,
      action: "shared",
      resourceType: "visualization",
      resourceId: conversionVisualization.id,
      details: "Shared visualization: Conversion by Channel"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Dataset methods
  async getDatasets(): Promise<Dataset[]> {
    return Array.from(this.datasets.values());
  }
  
  async getDataset(id: number): Promise<Dataset | undefined> {
    return this.datasets.get(id);
  }
  
  async getDatasetsByUserId(userId: number): Promise<Dataset[]> {
    return Array.from(this.datasets.values()).filter(
      (dataset) => dataset.userId === userId
    );
  }
  
  async createDataset(insertDataset: InsertDataset): Promise<Dataset> {
    const id = this.currentDatasetId++;
    const dataset: Dataset = { ...insertDataset, id, createdAt: new Date() };
    this.datasets.set(id, dataset);
    
    await this.createActivity({
      userId: dataset.userId,
      action: "created",
      resourceType: "dataset",
      resourceId: id,
      details: `Created dataset: ${dataset.name}`
    });
    
    return dataset;
  }
  
  async updateDataset(id: number, datasetUpdate: Partial<InsertDataset>): Promise<Dataset | undefined> {
    const dataset = this.datasets.get(id);
    if (!dataset) return undefined;
    
    const updatedDataset = { ...dataset, ...datasetUpdate };
    this.datasets.set(id, updatedDataset);
    
    await this.createActivity({
      userId: updatedDataset.userId,
      action: "updated",
      resourceType: "dataset",
      resourceId: id,
      details: `Updated dataset: ${updatedDataset.name}`
    });
    
    return updatedDataset;
  }
  
  async deleteDataset(id: number): Promise<boolean> {
    const dataset = this.datasets.get(id);
    if (!dataset) return false;
    
    const deleted = this.datasets.delete(id);
    
    if (deleted) {
      await this.createActivity({
        userId: dataset.userId,
        action: "deleted",
        resourceType: "dataset",
        resourceId: id,
        details: `Deleted dataset: ${dataset.name}`
      });
    }
    
    return deleted;
  }
  
  // Visualization methods
  async getVisualizations(): Promise<Visualization[]> {
    return Array.from(this.visualizations.values());
  }
  
  async getVisualization(id: number): Promise<Visualization | undefined> {
    return this.visualizations.get(id);
  }
  
  async getVisualizationsByUserId(userId: number): Promise<Visualization[]> {
    return Array.from(this.visualizations.values()).filter(
      (visualization) => visualization.userId === userId
    );
  }
  
  async getVisualizationsByDatasetId(datasetId: number): Promise<Visualization[]> {
    return Array.from(this.visualizations.values()).filter(
      (visualization) => visualization.datasetId === datasetId
    );
  }
  
  async createVisualization(insertVisualization: InsertVisualization): Promise<Visualization> {
    const id = this.currentVisualizationId++;
    const visualization: Visualization = { 
      ...insertVisualization, 
      id, 
      createdAt: new Date() 
    };
    this.visualizations.set(id, visualization);
    
    await this.createActivity({
      userId: visualization.userId,
      action: "created",
      resourceType: "visualization",
      resourceId: id,
      details: `Created visualization: ${visualization.name}`
    });
    
    return visualization;
  }
  
  async updateVisualization(id: number, visualizationUpdate: Partial<InsertVisualization>): Promise<Visualization | undefined> {
    const visualization = this.visualizations.get(id);
    if (!visualization) return undefined;
    
    const updatedVisualization = { ...visualization, ...visualizationUpdate };
    this.visualizations.set(id, updatedVisualization);
    
    await this.createActivity({
      userId: updatedVisualization.userId,
      action: "updated",
      resourceType: "visualization",
      resourceId: id,
      details: `Updated visualization: ${updatedVisualization.name}`
    });
    
    return updatedVisualization;
  }
  
  async deleteVisualization(id: number): Promise<boolean> {
    const visualization = this.visualizations.get(id);
    if (!visualization) return false;
    
    const deleted = this.visualizations.delete(id);
    
    if (deleted) {
      await this.createActivity({
        userId: visualization.userId,
        action: "deleted",
        resourceType: "visualization",
        resourceId: id,
        details: `Deleted visualization: ${visualization.name}`
      });
    }
    
    return deleted;
  }
  
  // Share methods
  async getShares(): Promise<Share[]> {
    return Array.from(this.shares.values());
  }
  
  async getSharesByVisualizationId(visualizationId: number): Promise<Share[]> {
    return Array.from(this.shares.values()).filter(
      (share) => share.visualizationId === visualizationId
    );
  }
  
  async getSharesByUserId(userId: number): Promise<Share[]> {
    return Array.from(this.shares.values()).filter(
      (share) => share.userId === userId
    );
  }
  
  async createShare(insertShare: InsertShare): Promise<Share> {
    const id = this.currentShareId++;
    const share: Share = { ...insertShare, id, createdAt: new Date() };
    this.shares.set(id, share);
    
    const visualization = await this.getVisualization(share.visualizationId);
    
    await this.createActivity({
      userId: share.userId,
      action: "shared",
      resourceType: "visualization",
      resourceId: share.visualizationId,
      details: `Shared visualization: ${visualization?.name || "Unknown"}`
    });
    
    return share;
  }
  
  async deleteShare(id: number): Promise<boolean> {
    const share = this.shares.get(id);
    if (!share) return false;
    
    const deleted = this.shares.delete(id);
    
    if (deleted) {
      const visualization = await this.getVisualization(share.visualizationId);
      
      await this.createActivity({
        userId: share.userId,
        action: "unshared",
        resourceType: "visualization",
        resourceId: share.visualizationId,
        details: `Unshared visualization: ${visualization?.name || "Unknown"}`
      });
    }
    
    return deleted;
  }
  
  // Activity methods
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getActivitiesByUserId(userId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = { ...insertActivity, id, createdAt: new Date() };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
