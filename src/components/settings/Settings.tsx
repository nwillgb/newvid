import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  CreditCard,
  Lock,
  LogOut,
  Upload,
  RefreshCw,
} from "lucide-react";

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Set the active tab based on the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/settings" || path === "/settings/profile") {
      setActiveTab("profile");
    } else if (path === "/settings/account") {
      setActiveTab("account");
    } else if (path === "/settings/notifications") {
      setActiveTab("notifications");
    } else if (path === "/settings/billing") {
      setActiveTab("billing");
    } else if (path === "/settings/security") {
      setActiveTab("security");
    }
  }, [location.pathname]);

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
              Settings
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64">
              <Tabs
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-gray-900 border border-gray-800 rounded-md p-1 w-full">
                  <Link
                    to="/settings/profile"
                    className={`flex items-center justify-start ${activeTab === "profile" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} py-3 px-4 rounded-sm transition-colors`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings/account"
                    className={`flex items-center justify-start ${activeTab === "account" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} py-3 px-4 rounded-sm transition-colors`}
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                  <Link
                    to="/settings/notifications"
                    className={`flex items-center justify-start ${activeTab === "notifications" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} py-3 px-4 rounded-sm transition-colors`}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Link>
                  <Link
                    to="/settings/billing"
                    className={`flex items-center justify-start ${activeTab === "billing" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} py-3 px-4 rounded-sm transition-colors`}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Link>
                  <Link
                    to="/settings/security"
                    className={`flex items-center justify-start ${activeTab === "security" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} py-3 px-4 rounded-sm transition-colors`}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </Link>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1">
              {activeTab === "profile" && (
                <div className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-gray-200">
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage your public profile information
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
                              <Label
                                htmlFor="firstName"
                                className="text-gray-300"
                              >
                                First Name
                              </Label>
                              <Input
                                id="firstName"
                                placeholder="John"
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="lastName"
                                className="text-gray-300"
                              >
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
              )}

              {activeTab === "account" && (
                <div className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-gray-200">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage your account preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">
                          Username
                        </Label>
                        <Input
                          id="username"
                          placeholder="johndoe"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-gray-300">
                          Language
                        </Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-gray-300">
                          Timezone
                        </Label>
                        <Select defaultValue="utc">
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="est">Eastern (GMT-5)</SelectItem>
                            <SelectItem value="cst">Central (GMT-6)</SelectItem>
                            <SelectItem value="mst">
                              Mountain (GMT-7)
                            </SelectItem>
                            <SelectItem value="pst">Pacific (GMT-8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator className="bg-gray-800 my-4" />
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Danger Zone
                        </h3>
                        <Button
                          variant="destructive"
                          className="bg-red-900 hover:bg-red-800 text-white"
                        >
                          Delete Account
                        </Button>
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
              )}

              {activeTab === "notifications" && (
                <div className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-gray-200">
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Email Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="email-marketing"
                                className="text-gray-300"
                              >
                                Marketing emails
                              </Label>
                              <p className="text-sm text-gray-400">
                                Receive emails about new features and updates
                              </p>
                            </div>
                            <Switch id="email-marketing" defaultChecked />
                          </div>
                          <Separator className="bg-gray-800" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="email-social"
                                className="text-gray-300"
                              >
                                Social notifications
                              </Label>
                              <p className="text-sm text-gray-400">
                                Receive emails for likes, comments, and shares
                              </p>
                            </div>
                            <Switch id="email-social" defaultChecked />
                          </div>
                          <Separator className="bg-gray-800" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="email-security"
                                className="text-gray-300"
                              >
                                Security alerts
                              </Label>
                              <p className="text-sm text-gray-400">
                                Receive emails for security alerts and account
                                activity
                              </p>
                            </div>
                            <Switch id="email-security" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Push Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="push-all"
                                className="text-gray-300"
                              >
                                All notifications
                              </Label>
                              <p className="text-sm text-gray-400">
                                Enable or disable all push notifications
                              </p>
                            </div>
                            <Switch id="push-all" defaultChecked />
                          </div>
                          <Separator className="bg-gray-800" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="push-video"
                                className="text-gray-300"
                              >
                                Video processing
                              </Label>
                              <p className="text-sm text-gray-400">
                                Get notified when your videos are ready
                              </p>
                            </div>
                            <Switch id="push-video" defaultChecked />
                          </div>
                          <Separator className="bg-gray-800" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="push-social"
                                className="text-gray-300"
                              >
                                Social activity
                              </Label>
                              <p className="text-sm text-gray-400">
                                Get notified about likes, comments, and shares
                              </p>
                            </div>
                            <Switch id="push-social" defaultChecked />
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
              )}

              {activeTab === "billing" && (
                <div className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-gray-200">
                    <CardHeader>
                      <CardTitle>Billing & Subscription</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage your subscription and payment methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Current Plan
                        </h3>
                        <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-md font-medium text-white">
                                Free Plan
                              </h4>
                              <p className="text-sm text-gray-400">
                                Basic features with limited usage
                              </p>
                            </div>
                            <Badge className="bg-purple-600 text-white">
                              Current
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                              Upgrade Plan
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Payment Methods
                        </h3>
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <CreditCard className="h-12 w-12 text-gray-600 mb-4" />
                          <h3 className="text-lg font-medium mb-2 text-gray-200">
                            No payment methods
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Add a payment method to upgrade your plan
                          </p>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Add Payment Method
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Billing History
                        </h3>
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <p className="text-sm text-gray-400">
                            No billing history available
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "security" && (
                <div className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-gray-200">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage your account security and authentication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Change Password
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="current-password"
                              className="text-gray-300"
                            >
                              Current Password
                            </Label>
                            <Input
                              id="current-password"
                              type="password"
                              placeholder="••••••••"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="new-password"
                              className="text-gray-300"
                            >
                              New Password
                            </Label>
                            <Input
                              id="new-password"
                              type="password"
                              placeholder="••••••••"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="confirm-password"
                              className="text-gray-300"
                            >
                              Confirm New Password
                            </Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="••••••••"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <Separator className="bg-gray-800 my-4" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-medium text-gray-200">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                      </div>

                      <Separator className="bg-gray-800 my-4" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-medium text-gray-200">
                              Active Sessions
                            </h3>
                            <p className="text-sm text-gray-400">
                              Manage your active sessions across devices
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-md font-medium text-white">
                                Current Session
                              </h4>
                              <p className="text-sm text-gray-400">
                                Chrome on Windows • IP: 192.168.1.1
                              </p>
                            </div>
                            <Badge className="bg-green-600 text-white">
                              Active
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Log Out All Other Sessions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
