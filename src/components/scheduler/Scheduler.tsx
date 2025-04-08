import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Calendar,
  CalendarIcon,
  Clock,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Youtube,
  Instagram,
} from "lucide-react";

const Scheduler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // This would be fetched from an API in a real implementation
  const schedules = [];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Content Scheduler
              </h1>
              <p className="text-gray-400 mt-2">
                Automate your content creation and publishing workflow
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  New Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-gray-200 sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Schedule</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Set up automated content creation and publishing
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Daily Motivation"
                      className="col-span-3 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="category"
                      className="text-right text-gray-300"
                    >
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="motivational">
                          Motivational
                        </SelectItem>
                        <SelectItem value="viral">Viral Content</SelectItem>
                        <SelectItem value="tips">Tips & Tricks</SelectItem>
                        <SelectItem value="quotes">Famous Quotes</SelectItem>
                        <SelectItem value="business">
                          Business Advice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="frequency"
                      className="text-right text-gray-300"
                    >
                      Frequency
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right text-gray-300">
                      Time
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        id="time"
                        type="time"
                        defaultValue="08:00"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <Separator className="bg-gray-800 my-2" />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right text-gray-300">
                      Platforms
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <span className="text-gray-300">YouTube</span>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                          </svg>
                          <span className="text-gray-300">TikTok</span>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-500" />
                          <span className="text-gray-300">Instagram</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right text-gray-300">
                      Auto-Publish
                    </Label>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-publish" />
                        <Label htmlFor="auto-publish" className="text-gray-300">
                          Automatically publish to selected platforms
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Save Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {schedules.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800 text-gray-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2 text-gray-200">
                  No schedules found
                </h3>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                  You haven't created any content schedules yet. Create a
                  schedule to automate your content creation and publishing
                  workflow.
                </p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Schedule
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-gray-800 text-gray-200">
              <CardHeader>
                <CardTitle>Active Schedules</CardTitle>
                <CardDescription className="text-gray-400">
                  Your automated content creation schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Frequency</TableHead>
                      <TableHead className="text-gray-400">Platforms</TableHead>
                      <TableHead className="text-gray-400">Next Run</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{/* Table rows would go here */}</TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Scheduler;
