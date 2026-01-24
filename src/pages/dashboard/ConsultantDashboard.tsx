import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { LayoutDashboard, FolderOpen, FileText, MessageSquare, Users, TrendingUp, CheckCircle, Clock } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: FolderOpen },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: TrendingUp },
];

const projects = [
  { title: "Biotech Research Lab", client: "Genomix Corp", status: "active" as const, dueDate: "Feb 15, 2024", progress: 65 },
  { title: "Pharmaceutical Testing Facility", client: "MediCare Labs", status: "review" as const, dueDate: "Mar 1, 2024", progress: 90 },
  { title: "Environmental Analysis Center", client: "EcoTest Inc", status: "pending" as const, dueDate: "Mar 20, 2024", progress: 25 },
];

const ConsultantDashboard = () => {
  return (
    <DashboardLayout role="consultant" userName="Sarah Mitchell" navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Projects"
            value={12}
            icon={FolderOpen}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Reviews"
            value={5}
            icon={Clock}
          />
          <StatCard
            title="Completed This Month"
            value={8}
            icon={CheckCircle}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Client Satisfaction"
            value="94%"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Active Projects</h2>
              <a href="#" className="text-sm text-primary hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="divide-y divide-border">
              <ActivityItem
                icon={FileText}
                title="Requirements Updated"
                description="Genomix Corp lab specifications"
                time="2h ago"
              />
              <ActivityItem
                icon={MessageSquare}
                title="New Feedback"
                description="MediCare Labs design approval"
                time="4h ago"
              />
              <ActivityItem
                icon={Users}
                title="Meeting Scheduled"
                description="EcoTest Inc kickoff call"
                time="Yesterday"
              />
              <ActivityItem
                icon={CheckCircle}
                title="Milestone Completed"
                description="Phase 1 design review"
                time="2 days ago"
                iconColor="text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Permissions info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2">Your Permissions</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✓ View all client projects and requirements</li>
            <li>✓ Access feedback and insights from clients</li>
            <li>✓ Generate and export reports</li>
            <li>✗ Modify technical design documents</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultantDashboard;
