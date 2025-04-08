import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  ShieldOff,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "../layout/DashboardLayout";
import { apiRequest, ENDPOINTS } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { AvatarGenerator } from "@/components/ui/avatar-generator";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin?: string;
}

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // New user form state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit user state
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user",
    status: "active" as "active" | "inactive" | "pending",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, users, activeTab]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Connect to MySQL database and fetch users
      // Example using a custom API endpoint that connects to MySQL
      const response = await apiRequest<{ users: User[] }>(
        ENDPOINTS.ADMIN.USERS,
      );
      setUsers(response.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );
    }

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((user) => user.status === activeTab);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send request to add user to MySQL database
      await apiRequest(ENDPOINTS.ADMIN.USERS, {
        method: "POST",
        body: newUser,
      });

      fetchUsers();
      setSuccess("User added successfully");
      setIsAddUserOpen(false);
      setNewUser({ name: "", email: "", role: "user", password: "" });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to add user:", err);
      setError("Failed to add user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Send request to update user in MySQL database
      await apiRequest(`${ENDPOINTS.ADMIN.USERS}/${editingUser.id}`, {
        method: "PUT",
        body: editForm,
      });

      fetchUsers();
      setSuccess("User updated successfully");
      setIsEditUserOpen(false);
      setEditingUser(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsLoading(true);
    setError(null);

    try {
      // Send request to delete user from MySQL database
      await apiRequest(`${ENDPOINTS.ADMIN.USERS}/${userId}`, {
        method: "DELETE",
      });

      fetchUsers();
      setSuccess("User deleted successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      // Send request to update user role in MySQL database
      await apiRequest(`${ENDPOINTS.ADMIN.USERS}/${user.id}/role`, {
        method: "PUT",
        body: { role: newRole },
      });

      fetchUsers();
      setSuccess(`User role updated to ${newRole}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to update user role:", err);
      setError("Failed to update user role. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary">
            <XCircle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            <AlertCircle className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto bg-[#121212] p-4">
        <Card className="w-full bg-gray-900 border-gray-800 text-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage user accounts and permissions
                </CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create a new user account
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="user@example.com"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                          }
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-gray-300">
                          Role
                        </Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) =>
                            setNewUser({ ...newUser, role: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddUserOpen(false)}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            Adding...
                          </>
                        ) : (
                          "Add User"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Edit User Dialog */}
              <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                <DialogContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Update user account details
                    </DialogDescription>
                  </DialogHeader>
                  {editingUser && (
                    <form onSubmit={handleUpdateUser}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name" className="text-gray-300">
                            Full Name
                          </Label>
                          <Input
                            id="edit-name"
                            placeholder="John Doe"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-email" className="text-gray-300">
                            Email
                          </Label>
                          <Input
                            id="edit-email"
                            type="email"
                            placeholder="user@example.com"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-role" className="text-gray-300">
                            Role
                          </Label>
                          <Select
                            value={editForm.role}
                            onValueChange={(value: "admin" | "user") =>
                              setEditForm({ ...editForm, role: value })
                            }
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-status"
                            className="text-gray-300"
                          >
                            Status
                          </Label>
                          <Select
                            value={editForm.status}
                            onValueChange={(
                              value: "active" | "inactive" | "pending",
                            ) => setEditForm({ ...editForm, status: value })}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditUserOpen(false)}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Updating...
                            </>
                          ) : (
                            "Update User"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-900 border-red-800"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-900 border-green-800">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 bg-gray-800 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full md:w-auto"
                >
                  <TabsList className="grid grid-cols-3 w-full md:w-auto bg-gray-800">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                    >
                      All Users
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="inactive"
                      className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                    >
                      Inactive
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
                  <span className="ml-2 text-gray-300">Loading users...</span>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No users found matching your criteria
                </div>
              ) : (
                <div className="rounded-md border border-gray-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-800">
                      <TableRow className="hover:bg-gray-800 border-gray-700">
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Role</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Created</TableHead>
                        <TableHead className="text-gray-300">
                          Last Login
                        </TableHead>
                        <TableHead className="text-gray-300 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className="hover:bg-gray-800/50 border-gray-800"
                        >
                          <TableCell className="font-medium text-gray-200 flex items-center gap-2">
                            <AvatarGenerator
                              seed={user.email}
                              size="sm"
                              fallback={user.name.charAt(0)}
                            />
                            {user.name}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${user.role === "admin" ? "bg-purple-600" : "bg-blue-600"}`}
                            >
                              {user.role === "admin" ? "Admin" : "User"}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="text-gray-400">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {user.lastLogin
                              ? formatDate(user.lastLogin)
                              : "Never"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-900 border-gray-800 text-gray-200"
                              >
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-800 cursor-pointer"
                                  onClick={() => handleToggleRole(user)}
                                  disabled={user.id === currentUser?.id}
                                >
                                  {user.role === "admin" ? (
                                    <>
                                      <ShieldOff className="mr-2 h-4 w-4" />
                                      Remove Admin
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="mr-2 h-4 w-4" />
                                      Make Admin
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <DropdownMenuItem
                                  className="text-red-500 hover:bg-gray-800 hover:text-red-400 cursor-pointer"
                                  onClick={() => handleDeleteUser(user.id)}
                                  disabled={user.id === currentUser?.id}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
            <div className="text-sm text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              disabled={isLoading}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
