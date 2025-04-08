import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

import { apiRequest, ENDPOINTS } from "./api";

interface DatabaseStatus {
  connected: boolean;
  type: string;
  version?: string;
  error?: string;
}

export async function checkDatabaseConnection(): Promise<DatabaseStatus> {
  try {
    // In development mode, return a database disconnected state
    if (import.meta.env.DEV) {
      return {
        connected: false,
        type: "MySQL",
        error: "Database not connected. Please connect a database in settings.",
      };
    }

    // Make a real API call to check MySQL database connection
    const response = await apiRequest<DatabaseStatus>(
      `${ENDPOINTS.ADMIN.SETTINGS}/database/status`,
      { method: "GET" },
    );

    // Log successful connection
    if (response.connected) {
      console.info(
        `Successfully connected to ${response.type} database, version: ${response.version || "unknown"}`,
      );
    } else {
      console.warn(
        `Database connection failed: ${response.error || "Unknown error"}`,
      );
    }

    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Database connection check failed: ${errorMessage}`, error);

    // Return structured error response
    return {
      connected: false,
      type: "mysql",
      error: errorMessage,
    };
  }
}
