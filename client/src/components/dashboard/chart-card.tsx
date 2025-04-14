import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, ArrowRight } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  chartType: "line" | "pie";
  data: any[];
  updatedAt?: Date;
  onViewReport?: () => void;
  config?: {
    xDataKey?: string;
    lineDataKeys?: Array<{ key: string; color: string }>;
    pieDataKey?: string;
    colors?: string[];
  };
}

export default function ChartCard({
  title,
  subtitle,
  chartType,
  data,
  updatedAt,
  onViewReport,
  config = {}
}: ChartCardProps) {
  const { 
    xDataKey = "name", 
    lineDataKeys = [{ key: "value", color: "#6366F1" }],
    pieDataKey = "value",
    colors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"] 
  } = config;
  
  const formattedDate = updatedAt ? format(updatedAt, "PPpp") : format(new Date(), "PPpp");
  
  return (
    <Card>
      <CardHeader className="pb-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PNG</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Refresh data</DropdownMenuItem>
              <DropdownMenuItem>Edit chart</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="py-5">
        <div className="w-full h-[250px]">
          {chartType === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                {lineDataKeys.map((lineConfig, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={lineConfig.key}
                    stroke={lineConfig.color}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey={pieDataKey}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm w-full">
          <Button variant="link" className="p-0 h-auto" onClick={onViewReport}>
            <span className="flex items-center text-primary font-medium">
              View detailed report
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Button>
          <span className="text-gray-500">Updated {formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
