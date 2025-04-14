import { useState } from "react";
import { useShares, useVisualizations } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Link2, Send, Copy, MailIcon, Twitter, Facebook, Linkedin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Share() {
  const { data: shares, isLoading: isLoadingShares } = useShares();
  const { data: visualizations, isLoading: isLoadingVisualizations } = useVisualizations();
  const [selectedTab, setSelectedTab] = useState("shared");
  const [shareUrl, setShareUrl] = useState("https://dataviz.example.com/share/abc123");
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // Could also show a toast notification here
  };
  
  return (
    <div className="max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
            Share
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Share your visualizations with others
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="shared" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="shared">Shared By Me</TabsTrigger>
          <TabsTrigger value="shared-with-me">Shared With Me</TabsTrigger>
          <TabsTrigger value="create">Share New Visualization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shared" className="space-y-6">
          {isLoadingShares ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p>Loading shared visualizations...</p>
              </CardContent>
            </Card>
          ) : shares?.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Share2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No shared visualizations</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't shared any visualizations yet.</p>
                <div className="mt-6">
                  <Button onClick={() => setSelectedTab("create")}>
                    Share a Visualization
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            shares?.map((share) => {
              const viz = visualizations?.find(v => v.id === share.visualizationId);
              return (
                <Card key={share.id}>
                  <CardHeader>
                    <CardTitle>{viz?.name || "Untitled Visualization"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Shared {formatDistanceToNow(new Date(share.createdAt), { addSuffix: true })}
                      {share.sharedWith && ` with ${share.sharedWith}`}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 text-sm font-medium">You</span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 bg-gray-200">
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            {share.sharedWith?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="ml-2 text-sm font-medium">{share.sharedWith || "Public link"}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="relative flex items-center max-w-sm w-full rounded-md border border-gray-300 shadow-sm">
                        <Input 
                          value={`https://dataviz.example.com/share/${share.id}`}
                          readOnly
                          className="pr-12 text-sm border-none"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 rounded-l-none"
                          onClick={handleCopyLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Manage Access
                        </Button>
                        <Button variant="destructive" size="sm">
                          Stop Sharing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
        
        <TabsContent value="shared-with-me" className="space-y-6">
          <Card>
            <CardContent className="py-10 text-center">
              <Share2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No visualizations shared with you</h3>
              <p className="mt-1 text-sm text-gray-500">When someone shares a visualization with you, it will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Share a Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="visualization">Select Visualization</Label>
                  <select 
                    id="visualization" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a visualization...</option>
                    {visualizations?.map((viz) => (
                      <option key={viz.id} value={viz.id}>
                        {viz.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="share-method">Sharing Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 flex items-start space-x-4 cursor-pointer hover:bg-gray-50">
                      <Link2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Share via Link</h3>
                        <p className="text-sm text-gray-500">Generate a link that anyone can use to view this visualization</p>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 flex items-start space-x-4 cursor-pointer hover:bg-gray-50">
                      <MailIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Invite via Email</h3>
                        <p className="text-sm text-gray-500">Send an email invitation to specific people</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="share-link">Share Link</Label>
                  <div className="flex">
                    <Input 
                      id="share-link" 
                      value={shareUrl} 
                      readOnly 
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none" onClick={handleCopyLink}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Share on Social Media</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-invite">Invite via Email</Label>
                  <div className="flex">
                    <Input 
                      id="email-invite" 
                      placeholder="Enter email addresses..." 
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none">
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
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
