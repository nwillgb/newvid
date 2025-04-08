import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Film, Key, Share2, CalendarIcon } from "lucide-react";

export default function Home() {
  return (
    <DashboardLayout>
      {/* Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Total Videos
              </CardTitle>
              <Film className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">No videos created yet</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Processing
              </CardTitle>
              <div className="h-4 w-4 text-gray-400">⟳</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <Progress className="mt-2 bg-gray-800" value={0} />
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Published
              </CardTitle>
              <Share2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">No published videos</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                API Status
              </CardTitle>
              <Key className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-xs border-gray-700 text-gray-300"
                >
                  Configure APIs
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Content and Scheduled Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="lg:col-span-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">Recent Videos</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Film className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-gray-200">
                  No videos yet
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Create your first video to see it here
                </p>
                <Link to="/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Film className="mr-2 h-4 w-4" />
                    Create Video
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">Scheduled Content</CardTitle>
              <CardDescription className="text-gray-400">
                Upcoming automated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-gray-200">
                  No scheduled content
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Schedule your first content to see it here
                </p>
                <Link to="/scheduler">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Content
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Connections */}
        <Card className="mt-4 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Social Connections</CardTitle>
            <CardDescription className="text-gray-400">
              Status of your connected platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Share2 className="h-12 w-12 text-gray-600 mb-4" />
              <h3 className="text-lg font-medium mb-2 text-gray-200">
                No connected accounts
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Connect your social media accounts to enable publishing
              </p>
              <Link to="/channels">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Connect Accounts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
