import { useState } from "react";
import { useVisualizations } from "@/lib/data";
import { Visualization } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, Plus, FileText } from "lucide-react";

export default function Visualize() {
  const { data: visualizations, isLoading } = useVisualizations();
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample data
  const sampleData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
    { name: 'Category E', value: 100 },
  ];
  
  const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'];
  
  const getChartIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <BarChart2 className="mr-2 h-5 w-5" />;
      case "pie":
        return <PieChartIcon className="mr-2 h-5 w-5" />;
      case "line":
        return <LineChartIcon className="mr-2 h-5 w-5" />;
      default:
        return <BarChart2 className="mr-2 h-5 w-5" />;
    }
  };
  
  const renderChartPreview = (type: string) => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sampleData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
              >
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Unknown chart type</div>;
    }
  };
  
  const filteredVisualizations = visualizations?.filter(viz => {
    if (activeTab === "all") return true;
    return viz.type === activeTab;
  });
  
  return (
    <div className="max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
            Visualize
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your data visualizations
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create Visualization
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              All Types
            </TabsTrigger>
            <TabsTrigger value="bar" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              Bar
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Pie
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="space-y-0">
          {isLoading ? (
            <div className="text-center py-10">Loading visualizations...</div>
          ) : filteredVisualizations?.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No visualizations</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new visualization.</p>
              <div className="mt-6">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Visualization
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVisualizations?.map((viz) => (
                <Card key={viz.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-1">
                    <CardTitle className="flex items-center text-lg">
                      {getChartIcon(viz.type)}
                      {viz.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderChartPreview(viz.type)}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        Created {new Date(viz.createdAt).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bar" className="space-y-0">
          {/* Same structure as 'all' but filtered for bar charts */}
        </TabsContent>
        
        <TabsContent value="line" className="space-y-0">
          {/* Same structure as 'all' but filtered for line charts */}
        </TabsContent>
        
        <TabsContent value="pie" className="space-y-0">
          {/* Same structure as 'all' but filtered for pie charts */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
