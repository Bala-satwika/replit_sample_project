import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  role: text("role").default("designer"),
});

export const datasets = pgTable("datasets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const visualizations = pgTable("visualizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "bar", "line", "pie", etc.
  datasetId: integer("dataset_id").notNull(),
  userId: integer("user_id").notNull(),
  config: jsonb("config").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shares = pgTable("shares", {
  id: serial("id").primaryKey(),
  visualizationId: integer("visualization_id").notNull(),
  userId: integer("user_id").notNull(),
  sharedWith: text("shared_with"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(), // "created", "updated", "shared", etc.
  resourceType: text("resource_type").notNull(), // "dataset", "visualization", etc.
  resourceId: integer("resource_id").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  role: true,
});

export const insertDatasetSchema = createInsertSchema(datasets).pick({
  name: true,
  description: true,
  userId: true,
  data: true,
});

export const insertVisualizationSchema = createInsertSchema(visualizations).pick({
  name: true,
  type: true,
  datasetId: true,
  userId: true,
  config: true,
});

export const insertShareSchema = createInsertSchema(shares).pick({
  visualizationId: true,
  userId: true,
  sharedWith: true,
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  userId: true,
  action: true,
  resourceType: true,
  resourceId: true,
  details: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDataset = z.infer<typeof insertDatasetSchema>;
export type Dataset = typeof datasets.$inferSelect;

export type InsertVisualization = z.infer<typeof insertVisualizationSchema>;
export type Visualization = typeof visualizations.$inferSelect;

export type InsertShare = z.infer<typeof insertShareSchema>;
export type Share = typeof shares.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
