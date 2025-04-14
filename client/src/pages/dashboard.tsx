import { useEffect } from "react";
import { useStats, useActivities } from "@/lib/data";
import { queryClient } from "@/lib/queryClient";

import { BarChart2, Share2, Database, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummaryCard from "@/components/dashboard/summary-card";
import ChartCard from "@/components/dashboard/chart-card";
import RecentActivity from "@/components/dashboard/recent-activity";

export default function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useStats();
  const { data: activities, isLoading: isLoadingActivities } = useActivities();
  
  useEffect(() => {
    // Prefetch other pages data
    queryClient.prefetchQuery({ queryKey: ["/api/datasets"] });
    queryClient.prefetchQuery({ queryKey: ["/api/visualizations"] });
  }, []);
  
  // Sample data for charts
  const userEngagementData = [
    { name: 'Mon', pageViews: 1200, sessions: 800 },
    { name: 'Tue', pageViews: 1900, sessions: 1200 },
    { name: 'Wed', pageViews: 3000, sessions: 1800 },
    { name: 'Thu', pageViews: 5000, sessions: 3000 },
    { name: 'Fri', pageViews: 3000, sessions: 1500 },
    { name: 'Sat', pageViews: 4000, sessions: 2000 },
    { name: 'Sun', pageViews: 6000, sessions: 3500 },
  ];
  
  const conversionData = [
    { name: 'Organic', value: 35 },
    { name: 'Social', value: 25 },
    { name: 'Email', value: 20 },
    { name: 'Referral', value: 15 },
    { name: 'Direct', value: 5 },
  ];
  
  return (
    <div className="max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your data visualizations and insights
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button variant="outline" className="flex items-center">
            <span className="material-icons mr-2 text-sm">file_download</span>
            Export
          </Button>
          <Button className="ml-3 flex items-center">
            <span className="material-icons mr-2 text-sm">add</span>
            New Chart
          </Button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Visualizations"
          value={isLoadingStats ? 0 : stats?.totalVisualizations || 0}
          change={{ value: 12, type: "increase" }}
          icon={<BarChart2 className="h-5 w-5 text-primary" />}
          iconBackground="bg-indigo-100"
        />
        
        <SummaryCard
          title="Shared Reports"
          value={isLoadingStats ? 0 : stats?.sharedReports || 0}
          change={{ value: 25, type: "increase" }}
          icon={<Share2 className="h-5 w-5 text-secondary" />}
          iconBackground="bg-pink-100"
        />
        
        <SummaryCard
          title="Active Datasets"
          value={isLoadingStats ? 0 : stats?.activeDatasets || 0}
          change={{ value: 2, type: "increase" }}
          icon={<Database className="h-5 w-5 text-green-500" />}
          iconBackground="bg-green-100"
        />
        
        <SummaryCard
          title="Scheduled Reports"
          value={isLoadingStats ? 0 : stats?.scheduledReports || 0}
          change={{ value: 0, type: "neutral" }}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          iconBackground="bg-amber-100"
        />
      </div>

      {/* Chart Sections */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard
          title="User Engagement"
          subtitle="Last 7 days performance metrics"
          chartType="line"
          data={userEngagementData}
          updatedAt={new Date()}
          onViewReport={() => {}}
          config={{
            xDataKey: "name",
            lineDataKeys: [
              { key: "pageViews", color: "#6366F1" },
              { key: "sessions", color: "#EC4899" }
            ]
          }}
        />
        
        <ChartCard
          title="Conversion by Channel"
          subtitle="Distribution of conversion sources"
          chartType="pie"
          data={conversionData}
          updatedAt={new Date(Date.now() - 24 * 60 * 60 * 1000)} // 1 day ago
          onViewReport={() => {}}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6">
        <RecentActivity 
          activities={activities || []} 
          isLoading={isLoadingActivities} 
        />
      </div>
    </div>
  );
}
