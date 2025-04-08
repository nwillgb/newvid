import { useState, useEffect } from "react";
import { checkDatabaseConnection } from "@/lib/utils";
import { apiRequest, ENDPOINTS } from "@/lib/api";

interface ApiKeyData {
  key: string;
  lastTested: string | null;
  status: "untested" | "success" | "failed";
  responseCode?: number;
  errorMessage?: string;
}

interface UseApiKeyValidationProps {
  initialKeys?: Record<string, ApiKeyData>;
  onSave?: (keys: Record<string, ApiKeyData>) => void;
}

export const useApiKeyValidation = ({
  initialKeys = {},
  onSave,
}: UseApiKeyValidationProps) => {
  const [apiKeys, setApiKeys] = useState<Record<string, ApiKeyData>>({
    openai: initialKeys.openai || {
      key: "",
      lastTested: null,
      status: "untested",
    },
    elevenlabs: initialKeys.elevenlabs || {
      key: "",
      lastTested: null,
      status: "untested",
    },
    pikapikapika: initialKeys.pikapikapika || {
      key: "",
      lastTested: null,
      status: "untested",
    },
  });

  const [loading, setLoading] = useState<Record<string, boolean>>({
    openai: false,
    elevenlabs: false,
    pikapikapika: false,
    save: false,
  });

  const [databaseError, setDatabaseError] = useState<string | null>(null);

  // Initialize with empty values if initialKeys is empty
  useEffect(() => {
    if (Object.keys(initialKeys).length === 0) {
      setApiKeys({
        openai: {
          key: "",
          lastTested: null,
          status: "untested",
        },
        elevenlabs: {
          key: "",
          lastTested: null,
          status: "untested",
        },
        pikapikapika: {
          key: "",
          lastTested: null,
          status: "untested",
        },
      });
    }
  }, [initialKeys]);

  const testApiKey = async (provider: string) => {
    setLoading({ ...loading, [provider]: true });
    setDatabaseError(null);

    try {
      // Check database connection first
      const hasDatabaseConnection = await checkDatabaseConnection();

      if (!hasDatabaseConnection.connected) {
        throw new Error("Database connection required to save API keys");
      }

      // Define endpoints for each provider
      const endpoints = {
        openai: "https://api.openai.com/v1/models",
        elevenlabs: "https://api.elevenlabs.io/v1/voices",
        pikapikapika: "https://api.pikapikapika.ai/v1/status",
      };

      const headers: Record<string, Record<string, string>> = {
        openai: {
          Authorization: `Bearer ${apiKeys[provider].key}`,
          "Content-Type": "application/json",
        },
        elevenlabs: {
          "xi-api-key": apiKeys[provider].key,
          "Content-Type": "application/json",
        },
        pikapikapika: {
          Authorization: `Bearer ${apiKeys[provider].key}`,
          "Content-Type": "application/json",
        },
      };

      // First try to test the key through our backend API
      try {
        const testResponse = await apiRequest(ENDPOINTS.KEYS.TEST, {
          method: "POST",
          body: {
            provider,
            key: apiKeys[provider].key,
          },
        });

        setApiKeys({
          ...apiKeys,
          [provider]: {
            ...apiKeys[provider],
            lastTested: new Date().toISOString(),
            status: "success",
            responseCode: 200,
            errorMessage: undefined,
          },
        });
        return;
      } catch (backendError) {
        // If backend test fails, fall back to direct API test
        console.log("Backend API key test failed, trying direct test");
      }

      // Don't simulate success in development mode
      if (!hasDatabaseConnection) {
        setApiKeys({
          ...apiKeys,
          [provider]: {
            ...apiKeys[provider],
            lastTested: new Date().toISOString(),
            status: "failed",
            responseCode: 500,
            errorMessage: "Database connection required to test API keys",
          },
        });
        return;
      }

      // Fall back to direct API call if backend test fails
      const response = await fetch(
        endpoints[provider as keyof typeof endpoints],
        {
          method: "GET",
          headers: headers[provider as keyof typeof headers],
        },
      );

      if (response.ok) {
        setApiKeys({
          ...apiKeys,
          [provider]: {
            ...apiKeys[provider],
            lastTested: new Date().toISOString(),
            status: "success",
            responseCode: response.status,
            errorMessage: undefined,
          },
        });
      } else {
        setApiKeys({
          ...apiKeys,
          [provider]: {
            ...apiKeys[provider],
            lastTested: new Date().toISOString(),
            status: "failed",
            responseCode: response.status,
            errorMessage: `API Error: ${response.status} ${response.statusText}`,
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Connection error";

      if (errorMessage.includes("Database connection")) {
        setDatabaseError(errorMessage);
      }

      setApiKeys({
        ...apiKeys,
        [provider]: {
          ...apiKeys[provider],
          lastTested: new Date().toISOString(),
          status: "failed",
          errorMessage: errorMessage,
        },
      });
    } finally {
      setLoading({ ...loading, [provider]: false });
    }
  };

  const handleSave = async () => {
    setLoading({ ...loading, save: true });
    setDatabaseError(null);

    try {
      // Check database connection first
      const hasDatabaseConnection = await checkDatabaseConnection();

      if (!hasDatabaseConnection.connected) {
        throw new Error("Database connection required to save API keys");
      }

      // Save API keys to backend
      await apiRequest(ENDPOINTS.KEYS.MANAGE, {
        method: "POST",
        body: {
          keys: {
            openai: apiKeys.openai.key,
            elevenlabs: apiKeys.elevenlabs.key,
            pikapikapika: apiKeys.pikapikapika.key,
          },
        },
      });

      if (onSave) {
        onSave(apiKeys);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Connection error";
      setDatabaseError(errorMessage);
    } finally {
      setLoading({ ...loading, save: false });
    }
  };

  const handleKeyChange = (provider: string, value: string) => {
    setApiKeys({
      ...apiKeys,
      [provider]: {
        ...apiKeys[provider],
        key: value,
        status:
          value !== apiKeys[provider].key
            ? "untested"
            : apiKeys[provider].status,
      },
    });
  };

  return {
    apiKeys,
    loading,
    databaseError,
    testApiKey,
    handleSave,
    handleKeyChange,
    setDatabaseError,
  };
};

export default useApiKeyValidation;
