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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart2,
  TrendingUp,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Calendar,
  Youtube,
  Instagram,
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Analytics
              </h1>
              <p className="text-gray-400 mt-2">
                Track performance and engagement across your content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="youtube"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                YouTube
              </TabsTrigger>
              <TabsTrigger
                value="tiktok"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                TikTok
              </TabsTrigger>
              <TabsTrigger
                value="instagram"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Instagram
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">
                      Total Views
                    </CardTitle>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-gray-400">
                      No views recorded yet
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">
                      Total Likes
                    </CardTitle>
                    <ThumbsUp className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-gray-400">
                      No likes recorded yet
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">
                      Comments
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-gray-400">
                      No comments recorded yet
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">
                      Shares
                    </CardTitle>
                    <Share2 className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-gray-400">
                      No shares recorded yet
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription className="text-gray-400">
                    Engagement across all platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <BarChart2 className="h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-200">
                    No data available
                  </h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    Connect your social media accounts and publish content to
                    see analytics data here.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => (window.location.href = "/channels")}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Connect Accounts
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="youtube" className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      YouTube Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Performance metrics for your YouTube content
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Youtube className="h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-200">
                    YouTube account not connected
                  </h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    Connect your YouTube account to see analytics data here.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => (window.location.href = "/channels")}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Connect YouTube
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tiktok" className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                      </svg>
                      TikTok Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Performance metrics for your TikTok content
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <svg
                    className="h-16 w-16 text-gray-600 mb-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2 text-gray-200">
                    TikTok account not connected
                  </h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    Connect your TikTok account to see analytics data here.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => (window.location.href = "/channels")}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Connect TikTok
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instagram" className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Instagram className="h-5 w-5 text-pink-500" />
                      Instagram Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Performance metrics for your Instagram content
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Instagram className="h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-200">
                    Instagram account not connected
                  </h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    Connect your Instagram account to see analytics data here.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => (window.location.href = "/channels")}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Connect Instagram
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
