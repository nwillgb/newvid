import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Home,
  Film,
  Calendar,
  BarChart2,
  Settings,
  Key,
  Share2,
  Bug,
  HelpCircle,
  Users,
  Globe,
  PenTool,
  Bell,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, href, isActive = false }: NavItemProps) => {
  const { theme } = useTheme();
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? theme === "dark"
            ? "bg-purple-900/50 text-purple-200"
            : "bg-purple-100 text-purple-900"
          : theme === "dark"
            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

const NavGroup = ({ title, children }: NavGroupProps) => {
  const { theme } = useTheme();
  return (
    <div className="space-y-1">
      <h3
        className={cn(
          "px-3 text-xs font-semibold uppercase tracking-wider",
          theme === "dark" ? "text-gray-400" : "text-gray-500",
        )}
      >
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <div
      className={cn(
        "flex min-h-screen",
        theme === "dark" ? "bg-[#121212]" : "bg-gray-100",
      )}
    >
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 w-64 border-r",
          theme === "dark"
            ? "border-gray-800 bg-[#1a1a1a]"
            : "border-gray-200 bg-white",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div
            className={cn(
              "flex h-16 items-center border-b px-6",
              theme === "dark" ? "border-gray-800" : "border-gray-200",
            )}
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="rounded-md bg-purple-600 p-1">
                <span className="text-lg font-bold text-white">OA</span>
              </div>
              <span
                className={cn(
                  "text-xl font-semibold",
                  theme === "dark" ? "text-white" : "text-gray-900",
                )}
              >
                OasisApps.ai
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto p-4">
            <NavGroup title="Main">
              <NavItem
                icon={<Home size={18} className="text-gray-400" />}
                label="Dashboard"
                href="/dashboard"
                isActive={currentPath === "/dashboard"}
              />
              <NavItem
                icon={<Film size={18} className="text-gray-400" />}
                label="Video Library"
                href="/videos"
                isActive={currentPath === "/videos"}
              />
              <NavItem
                icon={<PenTool size={18} className="text-gray-400" />}
                label="Content Creation"
                href="/create"
                isActive={currentPath === "/create"}
              />
              <NavItem
                icon={<Calendar size={18} className="text-gray-400" />}
                label="Scheduler"
                href="/scheduler"
                isActive={currentPath === "/scheduler"}
              />
              <NavItem
                icon={<BarChart2 size={18} className="text-gray-400" />}
                label="Analytics"
                href="/analytics"
                isActive={currentPath === "/analytics"}
              />
              <NavItem
                icon={<Settings size={18} className="text-gray-400" />}
                label="Settings"
                href="/settings"
                isActive={currentPath === "/settings"}
              />
            </NavGroup>

            <NavGroup title="Utilities">
              <NavItem
                icon={<Key size={18} className="text-gray-400" />}
                label="API Management"
                href="/api-keys"
                isActive={currentPath === "/api-keys"}
              />
              <NavItem
                icon={<Share2 size={18} className="text-gray-400" />}
                label="Social Accounts"
                href="/channels"
                isActive={currentPath === "/channels"}
              />
              <NavItem
                icon={<Bug size={18} className="text-gray-400" />}
                label="Debug Tools"
                href="/debug"
                isActive={currentPath === "/debug"}
              />
              <NavItem
                icon={<HelpCircle size={18} className="text-gray-400" />}
                label="How To Guides"
                href="/guides"
                isActive={currentPath === "/guides"}
              />
            </NavGroup>

            {isAdmin && (
              <NavGroup title="Admin">
                <NavItem
                  icon={<Users size={18} className="text-gray-400" />}
                  label="User Management"
                  href="/admin/users"
                  isActive={currentPath.startsWith("/admin/users")}
                />
                <NavItem
                  icon={<Globe size={18} className="text-gray-400" />}
                  label="Site Settings"
                  href="/admin/settings"
                  isActive={currentPath.startsWith("/admin/settings")}
                />
              </NavGroup>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Header */}
        <header
          className={cn(
            "sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6",
            theme === "dark"
              ? "border-gray-800 bg-[#1a1a1a]"
              : "border-gray-200 bg-white",
          )}
        >
          <h1
            className={cn(
              "text-xl font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900",
            )}
          >
            {currentPath === "/dashboard" && "Dashboard"}
            {currentPath === "/videos" && "Video Library"}
            {currentPath === "/create" && "Content Creation"}
            {currentPath === "/scheduler" && "Scheduler"}
            {currentPath === "/analytics" && "Analytics"}
            {(currentPath === "/settings" ||
              currentPath === "/settings/profile") &&
              "Profile Settings"}
            {currentPath === "/settings/account" && "Account Settings"}
            {currentPath === "/settings/notifications" &&
              "Notification Settings"}
            {currentPath === "/settings/billing" && "Billing & Subscription"}
            {currentPath === "/settings/security" && "Security Settings"}
            {currentPath === "/api-keys" && "API Management"}
            {currentPath === "/channels" && "Social Accounts"}
            {currentPath === "/debug" && "Debug Tools"}
            {currentPath === "/guides" && "How To Guides"}
            {currentPath === "/profile" && "Profile"}
            {currentPath.startsWith("/admin/users") && "User Management"}
            {currentPath.startsWith("/admin/settings") && "Site Settings"}
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full",
                theme === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
              )}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Bell size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className={cn(
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 text-gray-200"
                    : "bg-white border-gray-200 text-gray-800",
                )}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Notifications</AlertDialogTitle>
                  <AlertDialogDescription
                    className={cn(
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  >
                    Notification functionality requires authentication. Please
                    connect your account to receive notifications.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className={cn(
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                    )}
                  >
                    Close
                  </AlertDialogCancel>
                  <Link to="/settings">
                    <AlertDialogAction className="bg-purple-600 hover:bg-purple-700 text-white">
                      Go to Settings
                    </AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative h-8 w-8 rounded-full",
                    theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100",
                  )}
                >
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    {getUserInitials()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn(
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 text-gray-200"
                    : "bg-white border-gray-200 text-gray-800",
                )}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator
                  className={cn(
                    theme === "dark" ? "bg-gray-800" : "bg-gray-200",
                  )}
                />
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100",
                  )}
                  onClick={handleProfileClick}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100",
                  )}
                  onClick={handleSettingsClick}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className={cn(
                    theme === "dark" ? "bg-gray-800" : "bg-gray-200",
                  )}
                />
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100",
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main
          className={cn(
            "flex-1 overflow-auto p-6",
            theme === "dark" ? "bg-[#121212]" : "bg-gray-100",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
