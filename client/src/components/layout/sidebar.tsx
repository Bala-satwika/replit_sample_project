import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart2, 
  Database, 
  Share2, 
  Settings,
  FileText,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" /> },
    { path: "/visualize", label: "Visualize", icon: <BarChart2 className="mr-3 h-5 w-5 text-gray-500" /> },
    { path: "/datasets", label: "Datasets", icon: <Database className="mr-3 h-5 w-5 text-gray-500" /> },
    { path: "/share", label: "Share", icon: <Share2 className="mr-3 h-5 w-5 text-gray-500" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="mr-3 h-5 w-5 text-gray-500" /> },
  ];
  
  const recentDatasets = [
    { id: 1, name: "User Survey Results" },
    { id: 2, name: "Q2 Analytics" },
    { id: 3, name: "Website Traffic" },
  ];
  
  const baseClasses = "flex-col fixed inset-y-0 border-r border-gray-200 bg-white z-10";
  const visibilityClasses = isMobile ? "flex w-full" : "hidden md:flex md:w-64";
  
  return (
    <aside className={cn(baseClasses, visibilityClasses)}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-primary flex items-center">
          <BarChart2 className="mr-2 h-6 w-6" />
          DataViz
        </h1>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto pt-5 pb-4 px-3">
        <ul>
          {navItems.map((item) => (
            <li className="mb-1" key={item.path}>
              <Link href={item.path}>
                <div className={cn(
                  "flex items-center px-4 py-2 rounded-md cursor-pointer",
                  location === item.path || (item.path === "/dashboard" && location === "/")
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                )}>
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="pt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent Datasets
          </h3>
          <ul className="mt-2">
            {recentDatasets.map((dataset) => (
              <li className="mb-1" key={dataset.id}>
                <Link href={`/datasets/${dataset.id}`}>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FileText className="mr-3 h-4 w-4 text-gray-400" />
                    {dataset.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <Link href="/settings/profile">
          <div className="flex items-center cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Sarah Chen</p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
