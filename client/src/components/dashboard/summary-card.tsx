import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  icon: React.ReactNode;
  iconBackground?: string;
}

export default function SummaryCard({ 
  title, 
  value, 
  change, 
  icon,
  iconBackground = "bg-indigo-100" 
}: SummaryCardProps) {
  const getChangeIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case "increase":
        return <ArrowUp className="h-3 w-3" />;
      case "decrease":
        return <ArrowUp className="h-3 w-3 rotate-180" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };
  
  const getChangeColor = () => {
    if (!change) return "text-gray-600";
    
    switch (change.type) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className={cn("flex-shrink-0 rounded-md p-3", iconBackground)}>
              {icon}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {title}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{value}</div>
                  {change && (
                    <div className={cn("ml-2 flex items-baseline text-sm font-semibold", getChangeColor())}>
                      {getChangeIcon()}
                      <span className="sr-only">
                        {change.type === "increase" ? "Increased by" : change.type === "decrease" ? "Decreased by" : "No change"}
                      </span>
                      {change.value}%
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
