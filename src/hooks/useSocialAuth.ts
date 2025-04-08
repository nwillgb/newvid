import { useState } from "react";
import { checkDatabaseConnection } from "@/lib/utils";

interface SocialAccount {
  connected: boolean;
  username?: string;
  avatar?: string;
  connectedAt?: string;
}

interface UseSocialAuthProps {
  initialAccounts?: Record<string, SocialAccount>;
  onSave?: (accounts: Record<string, SocialAccount>) => void;
}

export const useSocialAuth = ({
  initialAccounts = {},
  onSave,
}: UseSocialAuthProps) => {
  const [accounts, setAccounts] = useState<Record<string, SocialAccount>>({
    twitter: initialAccounts.twitter || {
      connected: false,
    },
    instagram: initialAccounts.instagram || {
      connected: false,
    },
    tiktok: initialAccounts.tiktok || {
      connected: false,
    },
    youtube: initialAccounts.youtube || {
      connected: false,
    },
  });

  const [connecting, setConnecting] = useState<Record<string, boolean>>({
    twitter: false,
    instagram: false,
    tiktok: false,
    youtube: false,
  });

  const [error, setError] = useState<string>("");
  const [databaseError, setDatabaseError] = useState<string | null>(null);

  const handleConnect = async (platform: string) => {
    setConnecting({ ...connecting, [platform]: true });
    setError("");
    setDatabaseError(null);

    try {
      // Check database connection first
      const hasDatabaseConnection = await checkDatabaseConnection();

      if (!hasDatabaseConnection) {
        throw new Error(`Database connection required to connect ${platform}`);
      }

      // Define OAuth endpoints for each platform
      const oauthUrls = {
        twitter: "https://api.twitter.com/oauth/authorize",
        instagram: "https://api.instagram.com/oauth/authorize",
        tiktok: "https://www.tiktok.com/auth/authorize/",
        youtube: "https://accounts.google.com/o/oauth2/auth",
      };

      // In a real implementation, this would redirect to the OAuth flow
      // For now, we'll simulate a failure due to missing database connection
      setTimeout(() => {
        setError(
          `Authentication with ${platform} requires a database connection to store tokens securely.`,
        );
        setConnecting({ ...connecting, [platform]: false });
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Connection error";

      if (errorMessage.includes("Database connection")) {
        setDatabaseError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setConnecting({ ...connecting, [platform]: false });
    }
  };

  const handleDisconnect = async (platform: string) => {
    setConnecting({ ...connecting, [platform]: true });
    setError("");
    setDatabaseError(null);

    try {
      // Check database connection first
      const hasDatabaseConnection = await checkDatabaseConnection();

      if (!hasDatabaseConnection) {
        throw new Error(
          `Database connection required to disconnect ${platform}`,
        );
      }

      // In a real implementation, this would revoke the OAuth token
      // For now, we'll simulate a success
      setTimeout(() => {
        setAccounts({
          ...accounts,
          [platform]: {
            connected: false,
          },
        });
        setConnecting({ ...connecting, [platform]: false });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Connection error";

      if (errorMessage.includes("Database connection")) {
        setDatabaseError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setConnecting({ ...connecting, [platform]: false });
    }
  };

  return {
    accounts,
    connecting,
    error,
    databaseError,
    handleConnect,
    handleDisconnect,
    setError,
    setDatabaseError,
  };
};

export default useSocialAuth;
