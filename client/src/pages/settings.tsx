import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Bell, Globe, PaintBucket, Download } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="max-w-4xl mx-auto pb-16 md:pb-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
          <TabsList className="bg-transparent p-0 h-auto justify-start space-x-2">
            <TabsTrigger 
              value="profile" 
              className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Lock className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <PaintBucket className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and how others see you on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue="Sarah Chen" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="sarahchen" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sarah.chen@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Designer" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      rows={3} 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="UX Designer focused on data visualization and analysis tools."
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <div className="pt-2">
                      <Button variant="link" className="p-0 h-auto">
                        Forgot password?
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Account Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-gray-500">
                        Permanently delete your account and all of your data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="viz-updates" className="font-medium">Visualization Updates</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when a shared visualization is updated
                      </p>
                    </div>
                    <Switch id="viz-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-shares" className="font-medium">New Shares</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when someone shares a visualization with you
                      </p>
                    </div>
                    <Switch id="new-shares" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-updates" className="font-medium">Data Updates</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when your datasets are updated
                      </p>
                    </div>
                    <Switch id="data-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-shares" className="font-medium">Shares and Comments</Label>
                      <p className="text-sm text-gray-500">
                        Show notifications for new shares and comments
                      </p>
                    </div>
                    <Switch id="in-app-shares" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-updates" className="font-medium">Data and Visualization Updates</Label>
                      <p className="text-sm text-gray-500">
                        Show notifications for data and visualization updates
                      </p>
                    </div>
                    <Switch id="in-app-updates" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how DataViz looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-white border rounded-md mb-2"></div>
                    <div className="font-medium">Light</div>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-slate-900 border rounded-md mb-2"></div>
                    <div className="font-medium">Dark</div>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-gradient-to-b from-white to-slate-900 border rounded-md mb-2"></div>
                    <div className="font-medium">System</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Chart Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations" className="font-medium">Chart Animations</Label>
                      <p className="text-sm text-gray-500">
                        Enable animations in charts and visualizations
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="tooltips" className="font-medium">Show Tooltips</Label>
                      <p className="text-sm text-gray-500">
                        Display additional information when hovering over charts
                      </p>
                    </div>
                    <Switch id="tooltips" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grid-lines" className="font-medium">Grid Lines</Label>
                    <select 
                      id="grid-lines" 
                      className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="both">Both axes</option>
                      <option value="x">X-axis only</option>
                      <option value="y">Y-axis only</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Color Palette</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="space-y-2">
                    <div className="h-8 rounded-md bg-[#6366F1]"></div>
                    <Label className="text-xs text-center block">Primary</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded-md bg-[#EC4899]"></div>
                    <Label className="text-xs text-center block">Secondary</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded-md bg-[#10B981]"></div>
                    <Label className="text-xs text-center block">Success</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded-md bg-[#F59E0B]"></div>
                    <Label className="text-xs text-center block">Warning</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your data and export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Export</h3>
                <p className="text-sm text-gray-500">
                  Export your data for backup or use in other applications
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">All Datasets</h4>
                      <p className="text-sm text-gray-500">Export all your datasets as CSV files</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Visualizations</h4>
                      <p className="text-sm text-gray-500">Export your visualization configurations</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Account Data</h4>
                      <p className="text-sm text-gray-500">Export your account information and settings</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Data Import</h3>
                <p className="text-sm text-gray-500">
                  Import data from external sources
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">From CSV</h4>
                      <p className="text-sm text-gray-500">Import data from CSV files</p>
                    </div>
                    <Button variant="outline">Import</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">From JSON</h4>
                      <p className="text-sm text-gray-500">Import data from JSON files</p>
                    </div>
                    <Button variant="outline">Import</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">From Excel</h4>
                      <p className="text-sm text-gray-500">Import data from Excel files</p>
                    </div>
                    <Button variant="outline">Import</Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Data Connection</h3>
                <p className="text-sm text-gray-500">
                  Connect to external data sources
                </p>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        API Endpoint
                      </h4>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <p className="text-sm text-gray-500">Connect to a REST API endpoint</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Database
                      </h4>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <p className="text-sm text-gray-500">Connect to a database</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
