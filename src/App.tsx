import { Suspense } from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import VideoGenerator from "./components/video/VideoGenerator";
import VideoLibrary from "./components/video/VideoLibrary";
import ApiKeyManager from "./components/settings/ApiKeyManager";
import SocialAccountManager from "./components/social/SocialAccountManager";
import Scheduler from "./components/scheduler/Scheduler";
import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";
import DebugTools from "./components/debug/DebugTools";
import UserManagement from "./components/admin/UserManagement";
import HowToGuides from "./components/guides/HowToGuides";
import Profile from "./components/user/Profile";
import LandingPage from "./components/landing/LandingPage";

// Import tempo routes
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white">
            Loading...
          </div>
        }
      >
        <>
          {/* Tempo routes */}
          {import.meta.env.VITE_TEMPO && useRoutes(routes)}

          {/* App routes */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes - require authentication */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/videos"
              element={
                <ProtectedRoute>
                  <VideoLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <VideoGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api-keys"
              element={
                <ProtectedRoute>
                  <ApiKeyManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/channels"
              element={
                <ProtectedRoute>
                  <SocialAccountManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scheduler"
              element={
                <ProtectedRoute>
                  <Scheduler />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/profile"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/account"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/notifications"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/billing"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/security"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin-only routes */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <HowToGuides />
                </ProtectedRoute>
              }
            />

            {/* Debug and guides routes */}
            <Route
              path="/debug"
              element={
                <ProtectedRoute>
                  <DebugTools />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guides"
              element={
                <ProtectedRoute>
                  <HowToGuides />
                </ProtectedRoute>
              }
            />

            {/* Add this before any catchall route */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
