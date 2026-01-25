import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileCheck, 
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
  User,
  Calendar,
  DollarSign,
  ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/customer/projects", icon: FolderOpen },
  { label: "Design Reviews", href: "/dashboard/customer/reviews", icon: FileCheck },
  { label: "Feedback", href: "/dashboard/customer/feedback", icon: MessageSquare },
];

const MyProjects = () => {
  const { currentUser, myProjects, getWorkspaceForProject } = useWorkspaceProjects();

  const userName = currentUser?.name || "Dr. Emily Watson";

  const getPhaseConfig = (status: string) => {
    switch (status) {
      case 'design':
        return { label: 'Design', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'validation':
        return { label: 'Validation', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'delivery':
        return { label: 'Delivery', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      case 'completed':
        return { label: 'Completed', color: 'bg-gray-100 text-gray-700 border-gray-200' };
      default:
        return { label: 'Active', color: 'bg-primary/10 text-primary border-primary/20' };
    }
  };

  const getStatusConfig = (progress: number, pendingActions: number) => {
    if (pendingActions > 0) return { label: 'Awaiting Review', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    if (progress === 100) return { label: 'Completed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    return { label: 'Active', color: 'bg-blue-100 text-blue-700 border-blue-200' };
  };

  const getTimelineSteps = (status: string) => {
    const allSteps = [
      { id: 'requirements', label: 'Requirements Gathering' },
      { id: 'design', label: 'Design Phase' },
      { id: 'validation', label: 'Validation' },
      { id: 'delivery', label: 'Delivery' },
      { id: 'completed', label: 'Project Complete' },
    ];

    const currentIndex = {
      'requirements': 0,
      'design': 1,
      'validation': 2,
      'delivery': 3,
      'completed': 4,
    }[status] || 1;

    return allSteps.map((step, index) => ({
      ...step,
      status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'upcoming'
    }));
  };

  return (
    <DashboardLayout role="customer" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Track your lab projects and milestones</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Active Projects"
            value={myProjects.filter(p => p.status !== 'completed').length}
            icon={FolderOpen}
          />
          <StatCard
            title="Awaiting Your Review"
            value={myProjects.reduce((acc, p) => 
              acc + p.pendingActions.filter(a => a.assignedTo === 'customer' && a.status === 'pending').length, 0)}
            icon={Clock}
          />
          <StatCard
            title="Completed Projects"
            value={myProjects.filter(p => p.status === 'completed').length}
            icon={CheckCircle}
          />
        </div>

        {/* Project Cards */}
        {myProjects.length > 0 ? (
          <div className="space-y-6">
            {myProjects.map((project) => {
              const phaseConfig = getPhaseConfig(project.status);
              const pendingCount = project.pendingActions.filter(a => a.assignedTo === 'customer' && a.status === 'pending').length;
              const statusConfig = getStatusConfig(project.progress, pendingCount);
              const timelineSteps = getTimelineSteps(project.status);

              return (
                <div key={project.id} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                  {/* Project Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{project.name}</h2>
                        <p className="text-muted-foreground">Custom laboratory design project for {project.client}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={phaseConfig.color}>
                          {phaseConfig.label}
                        </Badge>
                        <Badge variant="outline" className={statusConfig.color}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium text-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>

                  {/* Timeline View */}
                  <div className="p-6 bg-muted/30 border-b border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Project Timeline</h3>
                    <div className="flex items-center justify-between">
                      {timelineSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.status === 'completed' ? 'bg-emerald-500 text-white' :
                              step.status === 'current' ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {step.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-medium">{index + 1}</span>
                              )}
                            </div>
                            <span className={`text-xs mt-2 text-center max-w-[80px] ${
                              step.status === 'current' ? 'font-medium text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div className={`w-12 h-0.5 mx-2 ${
                              step.status === 'completed' ? 'bg-emerald-500' : 'bg-border'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Information */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Assigned Consultant</p>
                        <p className="font-medium text-foreground">{project.assignedConsultant}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Completion</p>
                        <p className="font-medium text-foreground">{project.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Budget Range</p>
                        <p className="font-medium text-foreground">
                          {project.budget?.approved || 'TBD'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {pendingCount > 0 && (
                    <div className="px-6 pb-6">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="font-medium text-amber-800">Actions Required</p>
                            <p className="text-sm text-amber-700">{pendingCount} item{pendingCount > 1 ? 's' : ''} awaiting your review</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          View Reviews <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="No projects assigned yet"
            description="Once your lab project is initiated, you'll see all details and progress here."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyProjects;
