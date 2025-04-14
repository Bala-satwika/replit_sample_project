import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Bell, HelpCircle, BarChart2 } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const isMobile = useMobile();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5 text-gray-500" />
          </Button>
          <h1 className="text-xl font-semibold text-primary ml-3 flex items-center">
            <BarChart2 className="mr-2 h-6 w-6" />
            DataViz
          </h1>
        </div>
        
        <div className="hidden md:flex md:flex-1 md:items-center">
          <div className="max-w-lg w-full lg:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search datasets or visualizations..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-3 text-gray-400 hover:text-gray-500">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {isMobile && (
            <div className="ml-3 relative">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
