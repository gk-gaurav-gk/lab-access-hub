import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileCode, ClipboardList, Settings, Wrench, CheckSquare, AlertTriangle, Clock, Upload } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
];

const tasks = [
  { title: "Update HVAC specifications", project: "Biotech Research Lab", priority: "high", dueDate: "Today" },
  { title: "Review electrical layout", project: "Pharmaceutical Testing Facility", priority: "medium", dueDate: "Tomorrow" },
  { title: "Complete safety assessment", project: "Environmental Analysis Center", priority: "low", dueDate: "Feb 20" },
];

const TechDashboard = () => {
  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assigned Tasks"
            value={8}
            icon={ClipboardList}
          />
          <StatCard
            title="Pending Reviews"
            value={3}
            icon={Clock}
          />
          <StatCard
            title="Design Versions"
            value={24}
            icon={FileCode}
            subtitle="Across all projects"
          />
          <StatCard
            title="Feasibility Notes"
            value={12}
            icon={AlertTriangle}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
              <a href="#" className="text-sm text-primary hover:underline">View all</a>
            </div>
            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Task</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Priority</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Due</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tasks.map((task) => (
                    <tr key={task.title} className="hover:bg-secondary/30">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{task.title}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{task.project}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={
                          task.priority === "high" ? "bg-red-100 text-red-700 border-red-200" :
                          task.priority === "medium" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-green-100 text-green-700 border-green-200"
                        }>
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{task.dueDate}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">Update</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Design Version
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Wrench className="w-4 h-4 mr-2" />
                  Add Feasibility Note
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Update Delivery Status
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Updates</h2>
              <div className="divide-y divide-border">
                <ActivityItem
                  icon={FileCode}
                  title="Design v2.3 uploaded"
                  description="Biotech Research Lab"
                  time="1h ago"
                />
                <ActivityItem
                  icon={Wrench}
                  title="Feasibility note added"
                  description="HVAC system constraints"
                  time="3h ago"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Permissions info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-semibold text-amber-900 mb-2">Your Permissions</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>✓ Access and upload design versions</li>
            <li>✓ View and update assigned tasks</li>
            <li>✓ Add feasibility notes and technical documentation</li>
            <li>✓ Update delivery status</li>
            <li>✗ Approve client-facing designs</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TechDashboard;
