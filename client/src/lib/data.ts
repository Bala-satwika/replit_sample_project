import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
import { 
  type Dataset, 
  type Visualization, 
  type Activity,
  type Share
} from "@shared/schema";

interface Stats {
  totalVisualizations: number;
  sharedReports: number;
  activeDatasets: number;
  scheduledReports: number;
}

// Datasets
export function useDatasets() {
  return useQuery<Dataset[]>({
    queryKey: ["/api/datasets"],
  });
}

export function useDataset(id: number) {
  return useQuery<Dataset>({
    queryKey: [`/api/datasets/${id}`],
    enabled: !!id,
  });
}

export async function createDataset(data: any) {
  const response = await apiRequest("POST", "/api/datasets", data);
  return response.json();
}

export async function updateDataset(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/datasets/${id}`, data);
  return response.json();
}

export async function deleteDataset(id: number) {
  await apiRequest("DELETE", `/api/datasets/${id}`);
}

// Visualizations
export function useVisualizations() {
  return useQuery<Visualization[]>({
    queryKey: ["/api/visualizations"],
  });
}

export function useVisualization(id: number) {
  return useQuery<Visualization>({
    queryKey: [`/api/visualizations/${id}`],
    enabled: !!id,
  });
}

export async function createVisualization(data: any) {
  const response = await apiRequest("POST", "/api/visualizations", data);
  return response.json();
}

export async function updateVisualization(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/visualizations/${id}`, data);
  return response.json();
}

export async function deleteVisualization(id: number) {
  await apiRequest("DELETE", `/api/visualizations/${id}`);
}

// Shares
export function useShares() {
  return useQuery<Share[]>({
    queryKey: ["/api/shares"],
  });
}

export async function createShare(data: any) {
  const response = await apiRequest("POST", "/api/shares", data);
  return response.json();
}

export async function deleteShare(id: number) {
  await apiRequest("DELETE", `/api/shares/${id}`);
}

// Activities
export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });
}

// Stats
export function useStats() {
  return useQuery<Stats>({
    queryKey: ["/api/stats"],
  });
}
