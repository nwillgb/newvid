// API endpoints and utilities for OasisApps.ai

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.oasisapps.ai/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  KEYS: {
    MANAGE: `${API_BASE_URL}/keys`,
    TEST: `${API_BASE_URL}/keys/test`,
  },
  VIDEO: {
    GENERATE: `${API_BASE_URL}/video/generate`,
    LIST: `${API_BASE_URL}/video/list`,
    DELETE: `${API_BASE_URL}/video/delete`,
  },
  SOCIAL: {
    CONNECT: `${API_BASE_URL}/social/connect`,
    DISCONNECT: `${API_BASE_URL}/social/disconnect`,
    LIST: `${API_BASE_URL}/social/list`,
  },
  ADMIN: {
    USERS: `${API_BASE_URL}/admin/users`,
    SETTINGS: `${API_BASE_URL}/admin/settings`,
  },
};

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export async function apiRequest<T>(
  url: string,
  options: ApiOptions = {},
): Promise<T> {
  const token = localStorage.getItem("auth_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    credentials: "include",
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    // No more mock data - always use real API calls

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API request failed with status ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// No more mock responses - all API calls go to the real backend
