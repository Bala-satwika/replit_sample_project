import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Share, RefreshCcw } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Activity } from "@shared/schema";

interface RecentActivityProps {
  activities: Activity[];
  isLoading: boolean;
}

export default function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case "created":
        return <PlusCircle className="h-4 w-4 text-green-500" />;
      case "shared":
        return <Share className="h-4 w-4 text-blue-500" />;
      case "updated":
        return <RefreshCcw className="h-4 w-4 text-purple-500" />;
      default:
        return <PlusCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getActivityColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-100";
      case "shared":
        return "bg-blue-100";
      case "updated":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };
  
  const getActivityTitle = (activity: Activity) => {
    switch (activity.action) {
      case "created":
        return `Created ${activity.resourceType}`;
      case "shared":
        return `Shared ${activity.resourceType}`;
      case "updated":
        return `Updated ${activity.resourceType}`;
      default:
        return `${activity.action} ${activity.resourceType}`;
    }
  };
  
  const getRelativeTime = (date: Date) => {
    const today = new Date();
    const activityDate = new Date(date);
    
    if (today.toDateString() === activityDate.toDateString()) {
      return `Today, ${format(activityDate, "h:mm a")}`;
    } else {
      return formatDistanceToNow(activityDate, { addSuffix: true });
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All activity</SelectItem>
              <SelectItem value="datasets">Data updates</SelectItem>
              <SelectItem value="visualizations">Visualizations</SelectItem>
              <SelectItem value="shares">Shares</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dataset
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading activities...
                </td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No activity found.
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getActivityColor(activity.action)} flex items-center justify-center`}>
                        {getActivityIcon(activity.action)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {getActivityTitle(activity)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.details}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {activity.resourceType === "dataset" ? "Dataset" : "Visualization"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          Sarah Chen
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getRelativeTime(activity.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" className="text-primary hover:text-indigo-700">
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CardFooter className="border-t border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(activities.length, 5)}</span> of <span className="font-medium">{activities.length}</span> results
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="ml-3">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
