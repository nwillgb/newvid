import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Film,
  Loader2,
  RefreshCw,
  Video,
  AlertTriangle,
  Link as LinkIcon,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardLayout from "../layout/DashboardLayout";
import { checkDatabaseConnection } from "@/lib/utils";
import { apiRequest, ENDPOINTS } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface VideoGeneratorProps {
  onVideoGenerated?: (videoUrl: string) => void;
}

const VideoGenerator = ({
  onVideoGenerated = () => {},
}: VideoGeneratorProps) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("category");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false);
  const [socialAccountsConnected, setSocialAccountsConnected] = useState(false);
  const [error, setError] = useState("");
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [category, setCategory] = useState("");
  const [quote, setQuote] = useState("");
  const [visualPrompt, setVisualPrompt] = useState("");
  const [renderStyle, setRenderStyle] = useState("cinematic");

  const categories = [
    { id: "motivational", name: "Motivational" },
    { id: "viral", name: "Viral Content" },
    { id: "tips", name: "Tips & Tricks" },
    { id: "quotes", name: "Famous Quotes" },
    { id: "business", name: "Business Advice" },
  ];

  const renderStyles = [
    {
      id: "cinematic",
      name: "Cinematic",
      description: "High-quality cinematic style with realistic visuals",
    },
    {
      id: "ai_avatar",
      name: "AI Avatar",
      description: "Video featuring an AI-generated avatar speaking",
    },
    {
      id: "abstract",
      name: "Abstract",
      description: "Artistic abstract visuals with dynamic elements",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, minimalist style with simple visuals",
    },
  ];

  // Check if API keys are configured and database is connected
  useEffect(() => {
    const checkApiKeys = async () => {
      try {
        // Check database connection first
        const dbConnected = await checkDatabaseConnection();
        setDatabaseConnected(dbConnected);

        if (!dbConnected) {
          setApiKeysConfigured(false);
          return;
        }

        // Real API call to check if API keys are configured
        const response = await apiRequest(ENDPOINTS.KEYS.MANAGE);
        setApiKeysConfigured(
          response && response.keys && response.keys.length > 0,
        );
      } catch (err) {
        console.error("Error checking API keys:", err);
        setApiKeysConfigured(false);
      }
    };

    const checkSocialAccounts = async () => {
      try {
        // Check database connection first
        const dbConnected = await checkDatabaseConnection();
        if (!dbConnected) {
          setSocialAccountsConnected(false);
          return;
        }

        // Real API call to check if social accounts are connected
        const response = await apiRequest(ENDPOINTS.SOCIAL.LIST);
        setSocialAccountsConnected(
          response && response.accounts && response.accounts.length > 0,
        );
      } catch (err) {
        console.error("Error checking social accounts:", err);
        setSocialAccountsConnected(false);
      }
    };

    // Fetch previously generated videos
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest(ENDPOINTS.VIDEO.LIST);
        if (response && response.videos) {
          setGeneratedVideos(response.videos);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkApiKeys();
    checkSocialAccounts();
    fetchVideos();
  }, []);

  const handleGenerateQuote = async () => {
    if (!(await checkDatabaseConnection())) {
      setError(
        "Database connection required. Please connect a database in the settings.",
      );
      return;
    }

    if (!apiKeysConfigured) {
      setError(
        "API keys not configured. Please configure your API keys in the settings.",
      );
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // Real API call to generate a quote
      const response = await apiRequest(ENDPOINTS.VIDEO.GENERATE, {
        method: "POST",
        body: {
          type: "quote",
          category: category,
        },
      });

      if (response && response.content) {
        setQuote(response.content);
      } else {
        setError("Failed to generate quote. Please try again.");
      }
    } catch (err) {
      console.error("Error generating quote:", err);
      setError(
        "An error occurred while generating the quote. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVisualPrompt = async () => {
    if (!(await checkDatabaseConnection())) {
      setError(
        "Database connection required. Please connect a database in the settings.",
      );
      return;
    }

    if (!apiKeysConfigured) {
      setError(
        "API keys not configured. Please configure your API keys in the settings.",
      );
      return;
    }

    if (!quote) {
      setError("Please generate or enter a quote first.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // Real API call to generate a visual prompt
      const response = await apiRequest(ENDPOINTS.VIDEO.GENERATE, {
        method: "POST",
        body: {
          type: "visual_prompt",
          content: quote,
          category: category,
        },
      });

      if (response && response.content) {
        setVisualPrompt(response.content);
      } else {
        setError("Failed to generate visual prompt. Please try again.");
      }
    } catch (err) {
      console.error("Error generating visual prompt:", err);
      setError(
        "An error occurred while generating the visual prompt. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRenderVideo = async () => {
    if (!(await checkDatabaseConnection())) {
      setError(
        "Database connection required. Please connect a database in the settings.",
      );
      return;
    }

    if (!apiKeysConfigured) {
      setError(
        "API keys not configured. Please configure your API keys in the settings.",
      );
      return;
    }

    if (!category || !quote || !visualPrompt || !renderStyle) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError("");

    try {
      // Start the video generation process
      const response = await apiRequest(ENDPOINTS.VIDEO.GENERATE, {
        method: "POST",
        body: {
          type: "video",
          content: quote,
          visual_prompt: visualPrompt,
          style: renderStyle,
          category: category,
        },
      });

      if (!response || !response.id) {
        throw new Error("Failed to start video generation");
      }

      const videoId = response.id;
      let status = "processing";
      let currentProgress = 0;

      // Poll for video generation status
      const statusInterval = setInterval(async () => {
        try {
          const statusResponse = await apiRequest(
            `${ENDPOINTS.VIDEO.GENERATE}/${videoId}/status`,
          );

          if (statusResponse) {
            status = statusResponse.status;
            currentProgress = statusResponse.progress || 0;
            setProgress(currentProgress);

            if (status === "completed" && statusResponse.url) {
              clearInterval(statusInterval);
              setVideoUrl(statusResponse.url);
              setIsGenerating(false);
              onVideoGenerated(statusResponse.url);

              // Refresh the video list
              const videosResponse = await apiRequest(ENDPOINTS.VIDEO.LIST);
              if (videosResponse && videosResponse.videos) {
                setGeneratedVideos(videosResponse.videos);
              }
            } else if (status === "failed") {
              clearInterval(statusInterval);
              setIsGenerating(false);
              setError(
                statusResponse.error ||
                  "Video generation failed. Please try again.",
              );
            }
          }
        } catch (err) {
          console.error("Error checking video status:", err);
          // Don't stop the interval on network errors, just continue polling
        }
      }, 3000); // Check every 3 seconds

      // Set a timeout to stop polling after 5 minutes (to prevent infinite polling)
      setTimeout(
        () => {
          if (status !== "completed" && status !== "failed") {
            clearInterval(statusInterval);
            setIsGenerating(false);
            setError(
              "Video generation is taking longer than expected. Check the video library later.",
            );
          }
        },
        5 * 60 * 1000,
      );
    } catch (err) {
      console.error("Error rendering video:", err);
      setIsGenerating(false);
      setError(
        "An error occurred while rendering the video. Please try again.",
      );
    }
  };

  const handleNext = () => {
    switch (activeTab) {
      case "category":
        if (!category) {
          setError("Please select a category.");
          return;
        }
        setActiveTab("quote");
        break;
      case "quote":
        if (!quote) {
          setError("Please generate or enter a quote.");
          return;
        }
        setActiveTab("visual");
        break;
      case "visual":
        if (!visualPrompt) {
          setError("Please generate or enter a visual prompt.");
          return;
        }
        setActiveTab("style");
        break;
      case "style":
        if (!renderStyle) {
          setError("Please select a render style.");
          return;
        }
        setActiveTab("render");
        break;
      default:
        break;
    }
    setError("");
  };

  const handleBack = () => {
    switch (activeTab) {
      case "quote":
        setActiveTab("category");
        break;
      case "visual":
        setActiveTab("quote");
        break;
      case "style":
        setActiveTab("visual");
        break;
      case "render":
        setActiveTab("style");
        break;
      default:
        break;
    }
    setError("");
  };

  const isNextDisabled = () => {
    switch (activeTab) {
      case "category":
        return !category;
      case "quote":
        return !quote;
      case "visual":
        return !visualPrompt;
      case "style":
        return !renderStyle;
      default:
        return false;
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto p-4 bg-[#121212]">
        {!databaseConnected && (
          <Alert className="mb-6 bg-yellow-900/30 border-yellow-800">
            <Database className="h-4 w-4 text-yellow-500" />
            <AlertTitle>Database Connection Required</AlertTitle>
            <AlertDescription className="text-gray-300">
              A database connection is required to generate and store content.
              <div className="mt-2">
                <Link to="/settings">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-800 text-white hover:bg-yellow-800/50"
                  >
                    Connect Database
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {!apiKeysConfigured && (
          <Alert className="mb-6 bg-yellow-900/30 border-yellow-800">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertTitle>API Keys Required</AlertTitle>
            <AlertDescription className="text-gray-300">
              You need to configure your API keys before you can generate
              content.
              <div className="mt-2">
                <Link to="/api-keys">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-800 text-white hover:bg-yellow-800/50"
                  >
                    Configure API Keys
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert
            variant="destructive"
            className="mb-6 bg-red-900/30 border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="w-full bg-gray-900 border-gray-800 text-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-white">
              <Video className="h-6 w-6" />
              Video Generator
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create AI-powered videos in a few simple steps. Follow the process
              to generate, customize, and render your video.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 w-full bg-gray-800">
                <TabsTrigger
                  value="category"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  1. Category
                </TabsTrigger>
                <TabsTrigger
                  value="quote"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  2. Content
                </TabsTrigger>
                <TabsTrigger
                  value="visual"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  3. Visual
                </TabsTrigger>
                <TabsTrigger
                  value="style"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  4. Style
                </TabsTrigger>
                <TabsTrigger
                  value="render"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  5. Render
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="category">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Select Content Category
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Choose a category that best fits the type of video you
                        want to create.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                          <Card
                            key={cat.id}
                            className={`cursor-pointer transition-all bg-gray-800 border-gray-700 ${category === cat.id ? "border-purple-500 ring-2 ring-purple-500" : "hover:border-purple-500/50"}`}
                            onClick={() => {
                              setCategory(cat.id);
                              setError("");
                            }}
                          >
                            <CardHeader className="p-4">
                              <CardTitle className="text-md text-gray-200">
                                {cat.name}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quote">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Generate or Enter Content
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Generate an AI quote based on your selected category or
                        enter your own content.
                      </p>

                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={handleGenerateQuote}
                            disabled={
                              isGenerating ||
                              !apiKeysConfigured ||
                              !databaseConnected
                            }
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                            Generate Quote
                          </Button>
                          <p className="text-sm text-gray-400">
                            Using category:{" "}
                            <span className="font-medium text-gray-300">
                              {categories.find((c) => c.id === category)
                                ?.name || "None"}
                            </span>
                          </p>
                        </div>

                        <Textarea
                          placeholder="Enter or generate a quote/script for your video..."
                          className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                          value={quote}
                          onChange={(e) => {
                            setQuote(e.target.value);
                            setError("");
                          }}
                          disabled={isGenerating}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visual">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Visual Prompt
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Describe the visual scene for your video or generate one
                        based on your content.
                      </p>

                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={handleGenerateVisualPrompt}
                            disabled={
                              isGenerating ||
                              !quote ||
                              !apiKeysConfigured ||
                              !databaseConnected
                            }
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                            Generate Visual Prompt
                          </Button>
                          <p className="text-sm text-gray-400">
                            Based on your content
                          </p>
                        </div>

                        <Textarea
                          placeholder="Describe the visual scene for your video..."
                          className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                          value={visualPrompt}
                          onChange={(e) => {
                            setVisualPrompt(e.target.value);
                            setError("");
                          }}
                          disabled={isGenerating}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="style">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Select Render Style
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Choose the visual style for your video.
                      </p>

                      <RadioGroup
                        value={renderStyle}
                        onValueChange={(value) => {
                          setRenderStyle(value);
                          setError("");
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        disabled={isGenerating}
                      >
                        {renderStyles.map((style) => (
                          <div key={style.id}>
                            <RadioGroupItem
                              value={style.id}
                              id={style.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={style.id}
                              className="flex flex-col h-full p-4 border rounded-md border-gray-700 bg-gray-800 hover:bg-gray-750 hover:border-purple-500/50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-purple-500 cursor-pointer"
                            >
                              <span className="text-md font-medium text-gray-200">
                                {style.name}
                              </span>
                              <span className="text-sm text-gray-400 mt-1">
                                {style.description}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="render">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Render Video
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Review your settings and render your video.
                      </p>

                      <div className="space-y-6">
                        <div className="bg-gray-800 border border-gray-700 rounded-md p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-gray-200 font-medium">
                              {categories.find((c) => c.id === category)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Content:</span>
                            <span className="text-gray-200 font-medium truncate max-w-[70%]">
                              {quote.length > 50
                                ? `${quote.substring(0, 50)}...`
                                : quote}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Visual Prompt:
                            </span>
                            <span className="text-gray-200 font-medium truncate max-w-[70%]">
                              {visualPrompt.length > 50
                                ? `${visualPrompt.substring(0, 50)}...`
                                : visualPrompt}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Style:</span>
                            <span className="text-gray-200 font-medium">
                              {
                                renderStyles.find((s) => s.id === renderStyle)
                                  ?.name
                              }
                            </span>
                          </div>
                        </div>

                        {!videoUrl ? (
                          <div className="flex flex-col items-center space-y-4">
                            {isGenerating ? (
                              <div className="w-full space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">
                                    Rendering...
                                  </span>
                                  <span className="text-gray-200">
                                    {progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={progress}
                                  className="bg-gray-700"
                                />
                                <p className="text-center text-sm text-gray-400 mt-2">
                                  This may take a few minutes. Please don't
                                  close this page.
                                </p>
                              </div>
                            ) : (
                              <Button
                                onClick={handleRenderVideo}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
                                disabled={
                                  !apiKeysConfigured ||
                                  !databaseConnected ||
                                  isGenerating
                                }
                              >
                                Render Video
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-4">
                            <Alert className="bg-gray-800 border-gray-700 w-full">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <AlertTitle>
                                Video Generated Successfully
                              </AlertTitle>
                              <AlertDescription className="text-gray-400">
                                Your video has been generated and is ready to
                                view or share.
                              </AlertDescription>
                            </Alert>
                            <div className="aspect-video w-full max-w-md bg-black rounded-md overflow-hidden">
                              <video
                                src={videoUrl}
                                controls
                                className="w-full h-full object-contain"
                                poster="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                className="border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
                                onClick={() => {
                                  setActiveTab("category");
                                  setVideoUrl("");
                                  setCategory("");
                                  setQuote("");
                                  setVisualPrompt("");
                                  setRenderStyle("cinematic");
                                }}
                              >
                                Create Another
                              </Button>
                              <Link to="/video-library">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                  Go to Video Library
                                </Button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={activeTab === "category" || isGenerating}
              className="border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                isNextDisabled() || activeTab === "render" || isGenerating
              }
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {activeTab === "style" ? "Proceed to Render" : "Next"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VideoGenerator;
