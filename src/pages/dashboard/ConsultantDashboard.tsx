import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import EmptyState from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ThumbsUp,
  MessageCircle,
  Star,
  BookOpen
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: FolderOpen },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Knowledge Hub", href: "/dashboard/consultant/knowledge", icon: BookOpen },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: TrendingUp },
];

const ConsultantDashboard = () => {
  const { 
    currentUser, 
    allProjects, 
    allCustomerActions, 
    allFeedback,
    myWorkspaces 
  } = useWorkspaceProjects();

  const userName = currentUser?.name || "Sarah Mitchell";
  
  // Consultants see all projects (oversight role)
  const projects = allProjects;
  const customerActions = allCustomerActions;
  const feedback = allFeedback;

  // Calculate stats from shared data
  const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'review').length;
  const pendingReviews = projects.reduce((acc, p) => 
    acc + p.designs.filter(d => d.status === 'pending_review' || d.status === 'in_review').length, 0);
  const completedThisMonth = projects.filter(p => p.status === 'completed').length;
  const avgSatisfaction = feedback.length > 0 
    ? Math.round(feedback.reduce((acc, f) => acc + f.ratings.overall, 0) / feedback.length * 20) 
    : 0;

  // Get pending customer actions across all projects
  const allPendingActions = projects.flatMap(p => 
    p.pendingActions.filter(a => a.status === 'pending')
  );

  return (
    <DashboardLayout role="consultant" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Projects"
            value={activeProjects}
            icon={FolderOpen}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Reviews"
            value={pendingReviews}
            icon={Clock}
          />
          <StatCard
            title="Completed This Month"
            value={completedThisMonth}
            icon={CheckCircle}
          />
          <StatCard
            title="Client Satisfaction"
            value={avgSatisfaction > 0 ? `${avgSatisfaction}%` : 'N/A'}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Client Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Active Client Projects</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all</a>
              </div>
              {projects.length > 0 ? (
                <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Client</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Progress</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-secondary/30">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{project.name}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{project.client}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={
                              project.status === 'active' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                              project.status === 'review' ? "bg-blue-100 text-blue-700 border-blue-200" :
                              project.status === 'onboarding' ? "bg-purple-100 text-purple-700 border-purple-200" :
                              "bg-amber-100 text-amber-700 border-amber-200"
                            }>
                              {project.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">{project.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {project.pendingActions.filter(a => a.status === 'pending').length > 0 ? (
                              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                                {project.pendingActions.filter(a => a.status === 'pending').length} actions
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">None</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState 
                  icon={FolderOpen}
                  title="No active projects"
                  description="Projects will appear here once clients begin onboarding."
                />
              )}
            </div>

            {/* Pending Customer Actions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Pending Customer Actions</h2>
              </div>
              {allPendingActions.length > 0 ? (
                <div className="space-y-3">
                  {allPendingActions.slice(0, 5).map((action) => {
                    const project = projects.find(p => p.pendingActions.some(a => a.id === action.id));
                    return (
                      <div key={action.id} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            action.priority === 'high' ? 'bg-red-100' :
                            action.priority === 'medium' ? 'bg-amber-100' : 'bg-blue-100'
                          }`}>
                            <AlertCircle className={`w-5 h-5 ${
                              action.priority === 'high' ? 'text-red-600' :
                              action.priority === 'medium' ? 'text-amber-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {project?.name} • Due in {action.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          action.priority === 'high' ? "bg-red-100 text-red-700 border-red-200" :
                          action.priority === 'medium' ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-blue-100 text-blue-700 border-blue-200"
                        }>
                          {action.priority}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">All customer actions are up to date</p>
                </div>
              )}
            </div>

            {/* Aggregated Customer Feedback */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Customer Feedback</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all</a>
              </div>
              {feedback.length > 0 ? (
                <div className="space-y-3">
                  {feedback.slice(0, 3).map((fb) => (
                    <div key={fb.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">{fb.projectName}</h3>
                          <p className="text-sm text-muted-foreground">{fb.customerName} • {fb.submittedAt}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium">{fb.ratings.overall}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{fb.comments}</p>
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>Design: {fb.ratings.designQuality}/5</span>
                        <span>Communication: {fb.ratings.communication}/5</span>
                        <span>Timelines: {fb.ratings.timelines}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon={MessageSquare}
                  title="No feedback received yet"
                  description="Customer feedback will appear here after project delivery."
                />
              )}
            </div>
          </div>

          {/* Recent Customer Actions Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Customer Actions</h2>
              {customerActions.length > 0 ? (
                <div className="divide-y divide-border">
                  {customerActions.slice(0, 5).map((action) => (
                    <ActivityItem
                      key={action.id}
                      icon={action.type === 'approval' ? ThumbsUp : action.type === 'comment' ? MessageCircle : MessageSquare}
                      title={action.type === 'approval' ? 'Design Approved' : action.type === 'comment' ? 'Comment Added' : 'Feedback Submitted'}
                      description={`${action.customerName} - ${action.designTitle || action.projectName}`}
                      time={action.timestamp}
                      iconColor={action.type === 'approval' ? 'text-emerald-600' : undefined}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon={MessageCircle}
                  title="No customer actions yet"
                  description="Waiting for customer activity."
                />
              )}
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultantDashboard;