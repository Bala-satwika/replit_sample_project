import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart2, Database, Share2, Settings } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

export default function MobileNav() {
  const isMobile = useMobile();
  const [location] = useLocation();
  
  if (!isMobile) {
    return null;
  }
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/visualize", label: "Visualize", icon: <BarChart2 className="h-5 w-5" /> },
    { path: "/datasets", label: "Datasets", icon: <Database className="h-5 w-5" /> },
    { path: "/share", label: "Share", icon: <Share2 className="h-5 w-5" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 inset-x-0 z-10">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a className={cn(
                "group flex flex-col items-center py-3 px-2",
                location === item.path || (item.path === "/dashboard" && location === "/")
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              )}>
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
