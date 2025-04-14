import { useDatasets } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Database, Plus, Edit, Trash2, BarChart2, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Datasets() {
  const { data: datasets, isLoading } = useDatasets();
  
  return (
    <div className="max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
            Datasets
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your data sources for visualizations
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Dataset
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
                <div className="mt-4 flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : datasets?.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <Database className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No datasets</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new dataset.</p>
          <div className="mt-6">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Dataset
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {datasets?.map((dataset) => (
            <Card key={dataset.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{dataset.name}</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    {formatDistanceToNow(new Date(dataset.createdAt), { addSuffix: true })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">{dataset.description || "No description provided."}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {Array.isArray(dataset.data.labels) ? dataset.data.labels.length : 0} data points
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    CSV
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Last updated {formatDistanceToNow(new Date(dataset.createdAt), { addSuffix: true })}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Visualize
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
