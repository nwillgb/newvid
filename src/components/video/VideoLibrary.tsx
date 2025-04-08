import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Film,
  MoreVertical,
  Play,
  Download,
  Share2,
  Trash2,
  Edit,
  Bug,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";

const VideoLibrary = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // This would be fetched from an API in a real implementation
  const videos = [];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Video Library
              </h1>
              <p className="text-gray-400 mt-2">
                Manage and organize your generated videos
              </p>
            </div>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => (window.location.href = "/create")}
            >
              <Film className="mr-2 h-4 w-4" />
              Create New Video
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-gray-800">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  All Videos
                </TabsTrigger>
                <TabsTrigger
                  value="published"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Published
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Drafts
                </TabsTrigger>
                <TabsTrigger
                  value="processing"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Processing
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <div className="flex border border-gray-700 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {videos.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800 text-gray-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Film className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2 text-gray-200">
                  No videos found
                </h3>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                  You haven't created any videos yet. Start by creating your
                  first video using our AI-powered generator.
                </p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => (window.location.href = "/create")}
                >
                  <Film className="mr-2 h-4 w-4" />
                  Create New Video
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Grid view would go here */}
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800 text-gray-200">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800">
                      <TableHead className="text-gray-400">Title</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Created</TableHead>
                      <TableHead className="text-gray-400">Platforms</TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{/* Table rows would go here */}</TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VideoLibrary;
