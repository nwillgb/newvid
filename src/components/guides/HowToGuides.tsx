import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  Film,
  Share2,
  Calendar,
  Key,
  Play,
  ChevronRight,
} from "lucide-react";

const HowToGuides = () => {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  const guides = [
    {
      id: "create-first-video",
      category: "getting-started",
      title: "Creating Your First Video",
      description: "Learn how to create your first AI-generated video",
      icon: <Film className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "connect-social",
      category: "getting-started",
      title: "Connecting Social Media Accounts",
      description: "Set up your social media accounts for auto-publishing",
      icon: <Share2 className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "setup-schedule",
      category: "getting-started",
      title: "Setting Up Your First Schedule",
      description: "Automate your content creation with schedules",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "api-keys",
      category: "advanced",
      title: "Managing API Keys",
      description: "How to set up and manage your API integrations",
      icon: <Key className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "video-styles",
      category: "advanced",
      title: "Understanding Video Styles",
      description: "Learn about different video rendering styles",
      icon: <Play className="h-5 w-5 text-purple-500" />,
    },
  ];

  const filteredGuides = guides.filter(
    (guide) =>
      guide.category === activeTab ||
      activeTab === "all" ||
      (searchQuery &&
        (guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchQuery.toLowerCase()))),
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                How To Guides
              </h1>
              <p className="text-gray-400 mt-2">
                Learn how to use OasisApps.ai effectively
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                All Guides
              </TabsTrigger>
              <TabsTrigger
                value="getting-started"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Getting Started
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Advanced
              </TabsTrigger>
              <TabsTrigger
                value="troubleshooting"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Troubleshooting
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="bg-gray-900 border-gray-800 text-gray-200 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="mt-1 bg-gray-800 p-2 rounded-md">
                      {guide.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {guide.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-gray-800 p-0 h-auto"
                    >
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredGuides.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle className="h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-200">
                    No guides found
                  </h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    {searchQuery
                      ? `No guides matching "${searchQuery}"`
                      : "No guides available in this category yet"}
                  </p>
                </div>
              )}
            </div>
          </Tabs>

          <Separator className="bg-gray-800 my-6" />

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">
                  What APIs does OasisApps.ai use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  OasisApps.ai integrates with OpenAI for content generation,
                  ElevenLabs for voiceovers, and Pikapikapika for video
                  generation. You'll need to provide your own API keys for these
                  services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">
                  How do I publish videos to social media?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  First, connect your social media accounts in the Channels
                  section. Then, when creating a video, you can choose to
                  publish it immediately or schedule it for later. You can also
                  set up automated publishing through the Scheduler.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">
                  What video formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  OasisApps.ai generates videos in portrait format (9:16 ratio)
                  optimized for social media platforms like TikTok, Instagram
                  Reels, and YouTube Shorts. The output is MP4 format with high
                  quality.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">
                  How long does it take to generate a video?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Video generation typically takes 2-5 minutes depending on the
                  complexity of the visual prompt and the length of the content.
                  This includes time for AI content generation, voiceover
                  creation, video rendering, and final composition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">
                  Can I customize the video style?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, OasisApps.ai offers several video styles including
                  Cinematic, AI Avatar, Abstract, and Minimal. Each style has
                  different visual characteristics to match your content needs.
                  You can select the style during the video creation process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Need more help?
                </h3>
                <p className="text-gray-400 mt-1">
                  Contact our support team for personalized assistance
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HowToGuides;
