import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Upload,
  RefreshCw,
  Film,
  Share2,
  Calendar,
  BarChart2,
} from "lucide-react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Profile
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your personal details and profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-start">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change
                      </Button>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-gray-300">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-gray-300">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300">
                          Bio
                        </Label>
                        <textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          className="w-full min-h-[100px] rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">John Doe</p>
                      <p className="text-sm text-gray-400">john@example.com</p>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Account Type</p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">Free Plan</p>
                      <Badge className="bg-purple-600">Active</Badge>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Statistics</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <Film className="h-4 w-4 text-purple-500" />
                          <p className="text-sm text-gray-300">Videos</p>
                        </div>
                        <p className="text-xl font-bold text-white mt-1">0</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <Share2 className="h-4 w-4 text-purple-500" />
                          <p className="text-sm text-gray-300">Published</p>
                        </div>
                        <p className="text-xl font-bold text-white mt-1">0</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          <p className="text-sm text-gray-300">Scheduled</p>
                        </div>
                        <p className="text-xl font-bold text-white mt-1">0</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-purple-500" />
                          <p className="text-sm text-gray-300">Views</p>
                        </div>
                        <p className="text-xl font-bold text-white mt-1">0</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="pt-2">
                    <Link to="/settings">
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Account Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
