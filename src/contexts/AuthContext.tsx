import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, ENDPOINTS } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setIsLoading(false);
      return false;
    }

    try {
      setIsLoading(true);

      // Verify token with the server
      const response = await apiRequest<{ user: User }>(ENDPOINTS.AUTH.VERIFY, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.user);
      console.info(
        `User authenticated: ${response.user.name} (${response.user.role})`,
      );

      // Update stored user data with fresh data from server
      localStorage.setItem("user_data", JSON.stringify(response.user));

      setIsLoading(false);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `Authentication verification failed: ${errorMessage}`,
        error,
      );

      // Clear authentication data on failure
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);

      // Authenticate with the MySQL database through API
      const response = await apiRequest<{ user: User; token: string }>(
        ENDPOINTS.AUTH.LOGIN,
        {
          method: "POST",
          body: { email, password },
        },
      );

      // Store auth data
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_data", JSON.stringify(response.user));
      setUser(response.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setIsLoading(true);

      // Register with the MySQL database through API
      const response = await apiRequest<{ user: User; token: string }>(
        ENDPOINTS.AUTH.REGISTER,
        {
          method: "POST",
          body: { name, email, password },
        },
      );

      // Store auth data
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_data", JSON.stringify(response.user));
      setUser(response.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
