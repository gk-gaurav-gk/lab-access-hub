import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import DecisionTimeline from "@/components/dashboard/customer/DecisionTimeline";
import DesignComparisonDialog from "@/components/dashboard/customer/DesignComparisonDialog";
import ApprovalDialog from "@/components/dashboard/customer/ApprovalDialog";
import CommercialSnapshot from "@/components/dashboard/customer/CommercialSnapshot";
import FeedbackDialog from "@/components/dashboard/customer/FeedbackDialog";
import WhatHappensNext from "@/components/dashboard/customer/WhatHappensNext";
import ProjectHistory from "@/components/dashboard/customer/ProjectHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, FolderOpen, FileCheck, MessageSquare, CheckCircle, Clock, Eye, ThumbsUp, GitCompare } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/customer/projects", icon: FolderOpen },
  { label: "Design Reviews", href: "/dashboard/customer/reviews", icon: FileCheck },
  { label: "Feedback", href: "/dashboard/customer/feedback", icon: MessageSquare },
];

const designs = [
  { title: "Lab Layout v3.2", status: "pending", date: "Feb 12, 2024" },
  { title: "Equipment Placement", status: "approved", date: "Feb 8, 2024" },
  { title: "Safety Systems Design", status: "review", date: "Feb 5, 2024" },
];

const CustomerDashboard = () => {
  return (
    <DashboardLayout role="customer" userName="Dr. Emily Watson" navItems={navItems}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-navy-deep rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Watson</h2>
          <p className="text-primary-foreground/80">Your Biotech Research Lab project is 65% complete. 2 designs are awaiting your review.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Project Progress"
            value="65%"
            icon={FolderOpen}
          />
          <StatCard
            title="Pending Reviews"
            value={2}
            icon={Clock}
          />
          <StatCard
            title="Approved Designs"
            value={8}
            icon={CheckCircle}
          />
          <StatCard
            title="Feedback Given"
            value={12}
            icon={MessageSquare}
          />
        </div>

        {/* Decision Timeline - Client Confidence Booster */}
        <DecisionTimeline />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Status & Designs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Status */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Project Status</h2>
              </div>
              <ProjectCard
                title="Biotech Research Lab"
                client="Your Project"
                status="active"
                dueDate="March 15, 2024"
                progress={65}
              />
            </div>

            {/* Designs to Review - Enhanced with Compare & Contextual Approval */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Designs to Review</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all</a>
              </div>
              <div className="space-y-3">
                {designs.map((design) => (
                  <div key={design.title} className="bg-card rounded-xl p-4 shadow-card border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{design.title}</h3>
                        <p className="text-sm text-muted-foreground">Updated {design.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          design.status === "approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          design.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-blue-100 text-blue-700 border-blue-200"
                        }>
                          {design.status === "pending" ? "Needs Review" : design.status === "approved" ? "Approved" : "In Review"}
                        </Badge>
                        
                        {/* Compare with Previous Version */}
                        <DesignComparisonDialog 
                          designTitle={design.title}
                          trigger={
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                              <GitCompare className="w-3 h-3 mr-1" />
                              Compare
                            </Button>
                          }
                        />

                        {design.status === "pending" ? (
                          <>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              Review
                            </Button>
                            <ApprovalDialog 
                              designTitle={design.title}
                              trigger={
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                              }
                            />
                          </>
                        ) : (
                          <Button size="sm" variant="outline">
                            {design.status === "approved" ? (
                              <>
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                View
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What Happens Next Panel */}
            <WhatHappensNext />

            {/* Commercial Snapshot */}
            <CommercialSnapshot />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions - Enhanced with Structured Feedback */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Approve Pending Designs
                </Button>
                <FeedbackDialog />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="divide-y divide-border">
                <ActivityItem
                  icon={FileCheck}
                  title="New design uploaded"
                  description="Lab Layout v3.2"
                  time="2h ago"
                />
                <ActivityItem
                  icon={ThumbsUp}
                  title="You approved"
                  description="Equipment Placement design"
                  time="4 days ago"
                  iconColor="text-emerald-600"
                />
                <ActivityItem
                  icon={MessageSquare}
                  title="Feedback submitted"
                  description="Ventilation system notes"
                  time="1 week ago"
                />
              </div>
            </div>

            {/* Permissions info */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <h3 className="font-semibold text-purple-900 mb-2">Your Permissions</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>✓ View your project status and progress</li>
                <li>✓ Review and approve designs</li>
                <li>✓ Submit feedback post-delivery</li>
                <li>✗ View internal team discussions</li>
                <li>✗ Access other client projects</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Audit & History - Collapsible */}
        <ProjectHistory />
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
