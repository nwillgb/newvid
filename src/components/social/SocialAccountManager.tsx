import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Twitter,
  Instagram,
  Youtube,
  RefreshCw,
  Unlink,
  Database,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "../layout/DashboardLayout";
import { useSocialAuth } from "@/hooks/useSocialAuth";

const SocialAccountManager = () => {
  const {
    accounts,
    connecting,
    error,
    databaseError,
    handleConnect,
    handleDisconnect,
  } = useSocialAuth({});

  const [activeTab, setActiveTab] = React.useState("accounts");

  const socialPlatforms = [
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-5 w-5 text-red-500" />,
      description: "Connect to post videos and promotional content.",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
            fill="currentColor"
          />
        </svg>
      ),
      description: "Connect to post short videos and trending content.",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      description: "Connect to post Reels and Stories.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 bg-[#121212]">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Social Media Accounts
            </h1>
            <p className="text-gray-400 mt-2">
              Connect your social media accounts to automatically publish your
              generated videos.
            </p>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900/50 border-red-800 text-white"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {databaseError && (
            <Alert className="bg-amber-900/50 border-amber-800 text-white">
              <Database className="h-4 w-4" />
              <AlertDescription>
                {databaseError}
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-700 bg-amber-900/50 text-white hover:bg-amber-800 hover:text-white"
                    onClick={() => window.open("/settings", "_blank")}
                  >
                    Configure Database
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="accounts"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Connected Accounts
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Publishing Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialPlatforms.map((platform) => (
                  <Card
                    key={platform.id}
                    className="bg-gray-900 border-gray-800 text-gray-200"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center space-x-2">
                        {platform.icon}
                        <CardTitle className="text-xl">
                          {platform.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant={
                          accounts[platform.id]?.connected
                            ? "default"
                            : "outline"
                        }
                        className={
                          accounts[platform.id]?.connected
                            ? "bg-green-600 text-white"
                            : "border-gray-700 text-gray-300"
                        }
                      >
                        {accounts[platform.id]?.connected
                          ? "Connected"
                          : "Not Connected"}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {accounts[platform.id]?.connected ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {accounts[platform.id]?.username ||
                                  `${platform.name} Account`}
                              </p>
                              <p className="text-sm text-gray-400">
                                Connected{" "}
                                {accounts[platform.id]?.connectedAt ||
                                  "recently"}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                              onClick={() => handleDisconnect(platform.id)}
                              disabled={connecting[platform.id]}
                            >
                              {connecting[platform.id] ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Unlink className="h-4 w-4 mr-2" />
                              )}
                              {connecting[platform.id]
                                ? "Disconnecting..."
                                : "Disconnect"}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-4 py-6">
                          <p className="text-center text-gray-400">
                            {platform.description}
                          </p>
                          <Button
                            onClick={() => handleConnect(platform.id)}
                            disabled={connecting[platform.id]}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            {connecting[platform.id] && (
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            )}
                            {connecting[platform.id]
                              ? "Connecting..."
                              : `Connect ${platform.name}`}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>Global Publishing Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure default settings for all social media platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-publish" className="text-gray-300">
                        Auto-Publish New Videos
                      </Label>
                      <p className="text-sm text-gray-400">
                        Automatically publish new videos to connected platforms
                      </p>
                    </div>
                    <Switch id="auto-publish" />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="watermark" className="text-gray-300">
                        Add Watermark
                      </Label>
                      <p className="text-sm text-gray-400">
                        Add your brand watermark to all videos
                      </p>
                    </div>
                    <Switch id="watermark" />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications" className="text-gray-300">
                        Publishing Notifications
                      </Label>
                      <p className="text-sm text-gray-400">
                        Receive notifications when videos are published
                      </p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Global Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialAccountManager;
