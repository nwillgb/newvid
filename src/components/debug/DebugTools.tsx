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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bug,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Film,
  Terminal,
  Code,
  Eye,
  Download,
} from "lucide-react";

const DebugTools = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // This would be fetched from an API in a real implementation
  const jobs = [];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Debug Tools
              </h1>
              <p className="text-gray-400 mt-2">
                Monitor and troubleshoot your content generation jobs
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="jobs"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Job History
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                System Logs
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                API Requests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="mt-6">
              {jobs.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bug className="h-16 w-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-gray-200">
                      No jobs found
                    </h3>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                      You haven't created any content yet. Generate videos to
                      see job history and debug information.
                    </p>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => (window.location.href = "/create")}
                    >
                      <Film className="mr-2 h-4 w-4" />
                      Create Video
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-900 border-gray-800 text-gray-200">
                  <CardHeader>
                    <CardTitle>Job History</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and debug your content generation jobs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800 hover:bg-gray-800">
                          <TableHead className="text-gray-400">
                            Job ID
                          </TableHead>
                          <TableHead className="text-gray-400">Type</TableHead>
                          <TableHead className="text-gray-400">
                            Status
                          </TableHead>
                          <TableHead className="text-gray-400">
                            Created
                          </TableHead>
                          <TableHead className="text-gray-400">
                            Duration
                          </TableHead>
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
            </TabsContent>

            <TabsContent value="logs" className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription className="text-gray-400">
                    View system logs for troubleshooting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Terminal className="h-16 w-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-gray-200">
                      No logs available
                    </h3>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                      System logs will appear here after you generate content
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <Card className="bg-gray-900 border-gray-800 text-gray-200">
                <CardHeader>
                  <CardTitle>API Requests</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monitor API requests and responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Code className="h-16 w-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-gray-200">
                      No API requests
                    </h3>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                      API requests and responses will be logged here when you
                      generate content
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {selectedJob && (
            <Dialog
              open={!!selectedJob}
              onOpenChange={(open) => !open && setSelectedJob(null)}
            >
              <DialogContent className="bg-gray-900 border-gray-800 text-gray-200 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Job Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Detailed information about job #{selectedJob.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-400">Job ID</Label>
                      <p className="text-gray-200 font-mono">
                        {selectedJob.id}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Status</Label>
                      <div className="flex items-center gap-2">
                        {selectedJob.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : selectedJob.status === "failed" ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
                        )}
                        <span className="capitalize">{selectedJob.status}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Created At</Label>
                      <p className="text-gray-200">{selectedJob.createdAt}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Duration</Label>
                      <p className="text-gray-200">{selectedJob.duration}</p>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="space-y-2">
                    <Label className="text-gray-400">Input Parameters</Label>
                    <div className="bg-gray-800 rounded-md p-4 overflow-auto max-h-40">
                      <pre className="text-gray-200 text-sm font-mono">
                        {JSON.stringify(selectedJob.input, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-400">API Responses</Label>
                    <div className="bg-gray-800 rounded-md p-4 overflow-auto max-h-40">
                      <pre className="text-gray-200 text-sm font-mono">
                        {JSON.stringify(selectedJob.responses, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {selectedJob.error && (
                    <div className="space-y-2">
                      <Label className="text-gray-400">Error</Label>
                      <div className="bg-red-900/30 border border-red-800 rounded-md p-4 overflow-auto max-h-40">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <pre className="text-red-200 text-sm font-mono whitespace-pre-wrap">
                            {selectedJob.error}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Output
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Logs
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DebugTools;
