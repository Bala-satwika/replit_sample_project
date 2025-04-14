import { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";
import MobileNav from "./mobile-nav";
import useMobile from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <Sidebar />
      
      <div className="flex flex-col flex-1 md:ml-64 overflow-hidden">
        {/* Top navigation bar */}
        <TopBar onMenuClick={toggleSidebar} />
        
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          >
            <div 
              className="fixed inset-y-0 left-0 w-64 bg-white z-50"
              onClick={(e) => e.stopPropagation()} 
            >
              <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
