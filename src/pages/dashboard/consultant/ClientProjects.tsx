import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EmptyState from "@/components/dashboard/EmptyState";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Target
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: FolderOpen },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: TrendingUp },
];

const getRiskLevel = (project: { status: string; progress: number; pendingActions: { status: string }[] }) => {
  const pendingCount = project.pendingActions.filter(a => a.status === 'pending').length;
  if (project.status === 'onboarding' && project.progress < 30) return 'medium';
  if (pendingCount > 2) return 'high';
  if (pendingCount > 0) return 'medium';
  return 'low';
};

const getStageLabel = (status: string) => {
  switch (status) {
    case 'onboarding': return 'Requirements';
    case 'active': return 'Design';
    case 'review': return 'Validation';
    case 'delivery': return 'Delivery';
    case 'completed': return 'Completed';
    default: return status;
  }
};

const ClientProjects = () => {
  const { currentUser, allProjects, allFeedback } = useWorkspaceProjects();

  const userName = currentUser?.name || "Sarah Mitchell";
  
  // Consultant sees all projects (oversight role)
  const projects = allProjects;
  const feedback = allFeedback;

  // Calculate project health metrics
  const projectHealth = projects.map(project => {
    const pendingApprovals = project.pendingActions.filter(a => a.status === 'pending').length;
    const approvedDesigns = project.designs.filter(d => d.status === 'approved').length;
    const totalDesigns = project.designs.length;
    const iterationCount = project.designs.reduce((acc, d) => {
      const versionNum = parseFloat(d.version.replace('v', ''));
      return acc + Math.floor(versionNum);
    }, 0);
    
    return {
      ...project,
      pendingApprovals,
      approvedDesigns,
      totalDesigns,
      iterationCount,
      riskLevel: getRiskLevel(project)
    };
  });

  // Summary stats
  const totalPendingApprovals = projectHealth.reduce((acc, p) => acc + p.pendingApprovals, 0);
  const highRiskProjects = projectHealth.filter(p => p.riskLevel === 'high').length;
  const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length);

  return (
    <DashboardLayout role="consultant" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Client Projects</h1>
            <p className="text-muted-foreground">Portfolio overview and project health monitoring</p>
          </div>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalPendingApprovals}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{highRiskProjects}</p>
                <p className="text-sm text-muted-foreground">At Risk</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Portfolio */}
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projectHealth.map((project) => (
              <div key={project.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                        <Badge variant="outline" className={
                          project.riskLevel === 'high' ? "bg-red-100 text-red-700 border-red-200" :
                          project.riskLevel === 'medium' ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }>
                          {project.riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due {project.dueDate}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      project.status === 'active' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                      project.status === 'review' ? "bg-blue-100 text-blue-700 border-blue-200" :
                      project.status === 'onboarding' ? "bg-purple-100 text-purple-700 border-purple-200" :
                      project.status === 'delivery' ? "bg-cyan-100 text-cyan-700 border-cyan-200" :
                      "bg-secondary text-secondary-foreground"
                    }>
                      {getStageLabel(project.status)}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Health Indicators */}
                  <div className="grid grid-cols-4 gap-4 py-3 border-t border-border">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{project.pendingApprovals}</p>
                      <p className="text-xs text-muted-foreground">Pending Approvals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{project.approvedDesigns}/{project.totalDesigns}</p>
                      <p className="text-xs text-muted-foreground">Designs Approved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{project.iterationCount}</p>
                      <p className="text-xs text-muted-foreground">Total Iterations</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">
                        {project.timeline.milestones.filter(m => m.status === 'completed').length}/{project.timeline.milestones.length}
                      </p>
                      <p className="text-xs text-muted-foreground">Milestones</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Timeline
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Requirements
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Feedback
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={FolderOpen}
            title="No projects yet"
            description="Client projects will appear here once onboarding begins."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientProjects;
