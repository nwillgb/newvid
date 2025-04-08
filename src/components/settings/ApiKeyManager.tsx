import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useApiKeyValidation } from "@/hooks/useApiKeyValidation";
import { apiRequest, ENDPOINTS } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface ApiKeyData {
  key: string;
  lastTested: string | null;
  status: "untested" | "success" | "failed";
  responseCode?: number;
  errorMessage?: string;
}

interface ApiKeyManagerProps {
  onSave?: (keys: Record<string, ApiKeyData>) => void;
  initialKeys?: Record<string, ApiKeyData>;
}

const ApiKeyManager = ({ onSave, initialKeys = {} }: ApiKeyManagerProps) => {
  const navigate = useNavigate();
  const [savedKeys, setSavedKeys] =
    useState<Record<string, ApiKeyData>>(initialKeys);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setLoadingKeys(true);
        setLoadError(null);

        // Attempt to fetch API keys
        try {
          const response = await apiRequest<{
            keys: Record<string, ApiKeyData>;
          }>(ENDPOINTS.KEYS.MANAGE);
          setSavedKeys(response.keys);
        } catch (error) {
          console.warn("Could not fetch API keys from server, using defaults");
          // In development, use default values instead of showing an error
          if (import.meta.env.DEV) {
            setSavedKeys({
              openai: {
                key: "sk-....",
                lastTested: new Date().toISOString(),
                status: "success",
              },
              elevenlabs: {
                key: "el-....",
                lastTested: new Date().toISOString(),
                status: "success",
              },
              pikapikapika: {
                key: "pk-....",
                lastTested: null,
                status: "untested",
              },
            });
          } else {
            throw error; // Re-throw in production
          }
        }
      } catch (error) {
        console.error("Failed to load API keys:", error);
        setLoadError(
          error instanceof Error ? error.message : "Failed to load API keys",
        );
      } finally {
        setLoadingKeys(false);
      }
    };

    fetchApiKeys();
  }, []);

  const {
    apiKeys,
    loading,
    databaseError,
    testApiKey,
    handleSave,
    handleKeyChange,
  } = useApiKeyValidation({
    initialKeys: savedKeys,
    onSave: (keys) => {
      if (onSave) onSave(keys);
      // Show success message or redirect
      navigate("/settings", {
        state: { message: "API keys saved successfully" },
      });
    },
  });

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({
    openai: false,
    elevenlabs: false,
    pikapikapika: false,
  });

  const toggleShowKey = (provider: string) => {
    setShowKeys({
      ...showKeys,
      [provider]: !showKeys[provider],
    });
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Connected
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-gray-700 text-gray-300">
            <AlertCircle className="h-3 w-3 mr-1" /> Not Tested
          </Badge>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto bg-[#121212] p-4">
        {loadingKeys && (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-300">Loading API keys...</span>
          </div>
        )}

        {loadError && (
          <Alert
            variant="destructive"
            className="mb-4 bg-red-900 border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        )}

        {!loadingKeys && !loadError && (
          <Card className="w-full bg-gray-900 border-gray-800 text-gray-200">
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription className="text-gray-400">
                Configure your API integrations for content generation. All keys
                are encrypted and stored securely.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {databaseError && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-900 border-red-800"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{databaseError}</AlertDescription>
                </Alert>
              )}
              <Tabs defaultValue="openai" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger
                    value="openai"
                    className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                  >
                    OpenAI
                  </TabsTrigger>
                  <TabsTrigger
                    value="elevenlabs"
                    className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                  >
                    ElevenLabs
                  </TabsTrigger>
                  <TabsTrigger
                    value="pikapikapika"
                    className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                  >
                    Pikapikapika
                  </TabsTrigger>
                </TabsList>

                {/* OpenAI Tab */}
                <TabsContent value="openai" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="openai-key" className="text-gray-300">
                        OpenAI API Key
                      </Label>
                      {renderStatusBadge(apiKeys.openai.status)}
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative flex-grow">
                        <Input
                          id="openai-key"
                          type={showKeys.openai ? "text" : "password"}
                          placeholder="sk-..."
                          value={apiKeys.openai.key}
                          onChange={(e) =>
                            handleKeyChange("openai", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleShowKey("openai")}
                        >
                          {showKeys.openai ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={() => testApiKey("openai")}
                        disabled={!apiKeys.openai.key || loading.openai}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {loading.openai ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Test"
                        )}
                      </Button>
                    </div>
                    {apiKeys.openai.lastTested && (
                      <p className="text-xs text-gray-400">
                        Last tested:{" "}
                        {new Date(apiKeys.openai.lastTested).toLocaleString()}
                        {apiKeys.openai.responseCode &&
                          ` (Response: ${apiKeys.openai.responseCode})`}
                      </p>
                    )}
                    {apiKeys.openai.status === "failed" &&
                      apiKeys.openai.errorMessage && (
                        <Alert
                          variant="destructive"
                          className="mt-2 bg-red-900 border-red-800"
                        >
                          <AlertDescription>
                            {apiKeys.openai.errorMessage}
                          </AlertDescription>
                        </Alert>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">What it's used for</Label>
                    <p className="text-sm text-gray-400">
                      OpenAI is used for generating quotes, scripts, and visual
                      prompts for your videos.
                    </p>
                  </div>
                </TabsContent>

                {/* ElevenLabs Tab */}
                <TabsContent value="elevenlabs" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="elevenlabs-key" className="text-gray-300">
                        ElevenLabs API Key
                      </Label>
                      {renderStatusBadge(apiKeys.elevenlabs.status)}
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative flex-grow">
                        <Input
                          id="elevenlabs-key"
                          type={showKeys.elevenlabs ? "text" : "password"}
                          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          value={apiKeys.elevenlabs.key}
                          onChange={(e) =>
                            handleKeyChange("elevenlabs", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleShowKey("elevenlabs")}
                        >
                          {showKeys.elevenlabs ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={() => testApiKey("elevenlabs")}
                        disabled={!apiKeys.elevenlabs.key || loading.elevenlabs}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {loading.elevenlabs ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Test"
                        )}
                      </Button>
                    </div>
                    {apiKeys.elevenlabs.lastTested && (
                      <p className="text-xs text-gray-400">
                        Last tested:{" "}
                        {new Date(
                          apiKeys.elevenlabs.lastTested,
                        ).toLocaleString()}
                        {apiKeys.elevenlabs.responseCode &&
                          ` (Response: ${apiKeys.elevenlabs.responseCode})`}
                      </p>
                    )}
                    {apiKeys.elevenlabs.status === "failed" &&
                      apiKeys.elevenlabs.errorMessage && (
                        <Alert
                          variant="destructive"
                          className="mt-2 bg-red-900 border-red-800"
                        >
                          <AlertDescription>
                            {apiKeys.elevenlabs.errorMessage}
                          </AlertDescription>
                        </Alert>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">What it's used for</Label>
                    <p className="text-sm text-gray-400">
                      ElevenLabs provides high-quality AI voiceovers for your
                      video content.
                    </p>
                  </div>
                </TabsContent>

                {/* Pikapikapika Tab */}
                <TabsContent value="pikapikapika" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="pikapikapika-key"
                        className="text-gray-300"
                      >
                        Pikapikapika API Key
                      </Label>
                      {renderStatusBadge(apiKeys.pikapikapika.status)}
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative flex-grow">
                        <Input
                          id="pikapikapika-key"
                          type={showKeys.pikapikapika ? "text" : "password"}
                          placeholder="pka_..."
                          value={apiKeys.pikapikapika.key}
                          onChange={(e) =>
                            handleKeyChange("pikapikapika", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleShowKey("pikapikapika")}
                        >
                          {showKeys.pikapikapika ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={() => testApiKey("pikapikapika")}
                        disabled={
                          !apiKeys.pikapikapika.key || loading.pikapikapika
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {loading.pikapikapika ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Test"
                        )}
                      </Button>
                    </div>
                    {apiKeys.pikapikapika.lastTested && (
                      <p className="text-xs text-gray-400">
                        Last tested:{" "}
                        {new Date(
                          apiKeys.pikapikapika.lastTested,
                        ).toLocaleString()}
                        {apiKeys.pikapikapika.responseCode &&
                          ` (Response: ${apiKeys.pikapikapika.responseCode})`}
                      </p>
                    )}
                    {apiKeys.pikapikapika.status === "failed" &&
                      apiKeys.pikapikapika.errorMessage && (
                        <Alert
                          variant="destructive"
                          className="mt-2 bg-red-900 border-red-800"
                        >
                          <AlertDescription>
                            {apiKeys.pikapikapika.errorMessage}
                          </AlertDescription>
                        </Alert>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">What it's used for</Label>
                    <p className="text-sm text-gray-400">
                      Pikapikapika generates high-quality AI videos based on
                      your prompts and settings.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/settings")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading.save}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading.save ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApiKeyManager;
