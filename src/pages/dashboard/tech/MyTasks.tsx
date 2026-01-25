import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  FileCode, 
  ClipboardList, 
  Settings, 
  CheckSquare,
  Clock,
  AlertTriangle,
  AlertCircle,
  Play,
  CheckCircle,
  Calendar,
  ArrowRight,
  Filter,
  BookOpen
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
  { label: "Knowledge Hub", href: "/dashboard/tech/knowledge", icon: BookOpen },
];

// Mock tasks data - in real app would come from context/API
const mockTasks = [
  {
    id: '1',
    name: 'Complete HVAC layout for Lab A',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    priority: 'high',
    dueDate: '2024-01-25',
    status: 'in_progress',
    blockedReason: null
  },
  {
    id: '2',
    name: 'Update electrical specs per new requirements',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    priority: 'high',
    dueDate: '2024-01-22',
    status: 'blocked',
    blockedReason: 'Awaiting customer approval on Layout v3.1'
  },
  {
    id: '3',
    name: 'Review safety documentation',
    projectName: 'Research Center - Phase 1',
    designVersion: 'v2.0',
    priority: 'medium',
    dueDate: '2024-01-28',
    status: 'open',
    blockedReason: null
  },
  {
    id: '4',
    name: 'Prepare equipment specifications',
    projectName: 'Biotech Facility',
    designVersion: 'v1.0',
    priority: 'low',
    dueDate: '2024-02-01',
    status: 'open',
    blockedReason: null
  },
  {
    id: '5',
    name: 'Validate ventilation requirements',
    projectName: 'Research Center - Phase 1',
    designVersion: 'v2.0',
    priority: 'medium',
    dueDate: '2024-01-26',
    status: 'blocked',
    blockedReason: 'Requirement clarification needed from consultant'
  },
  {
    id: '6',
    name: 'Finalize cleanroom specs',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    priority: 'high',
    dueDate: '2024-01-20',
    status: 'completed',
    blockedReason: null
  }
];

const priorityConfig: Record<string, { label: string; className: string; icon: typeof AlertTriangle }> = {
  high: { label: 'High', className: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertCircle },
  low: { label: 'Low', className: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock }
};

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckSquare }> = {
  open: { label: 'Open', className: 'bg-secondary text-secondary-foreground', icon: Clock },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700 border-blue-200', icon: Play },
  blocked: { label: 'Blocked', className: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle }
};

const MyTasks = () => {
  const { projects } = useProjects();

  // Calculate stats
  const openTasks = mockTasks.filter(t => t.status === 'open').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in_progress').length;
  const blockedTasks = mockTasks.filter(t => t.status === 'blocked').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;

  // Group tasks by status
  const activeTasks = mockTasks.filter(t => t.status !== 'completed');
  const recentlyCompleted = mockTasks.filter(t => t.status === 'completed');

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground">Execution tasks linked to design versions and projects</p>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{openTasks}</p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Play className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressTasks}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{blockedTasks}</p>
                <p className="text-sm text-muted-foreground">Blocked</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedTasks}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blocked Tasks Alert */}
        {blockedTasks > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">{blockedTasks} task(s) are currently blocked</p>
                <p className="text-sm text-red-700 mt-1">These tasks require external action before they can proceed.</p>
              </div>
            </div>
          </div>
        )}

        {/* Active Tasks */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Tasks</h2>
          {activeTasks.length > 0 ? (
            <div className="space-y-3">
              {activeTasks.map((task) => {
                const priority = priorityConfig[task.priority];
                const status = statusConfig[task.status];
                const StatusIcon = status.icon;
                const PriorityIcon = priority.icon;
                
                return (
                  <div 
                    key={task.id} 
                    className={`bg-card rounded-xl p-4 shadow-card border ${
                      task.status === 'blocked' ? 'border-red-200 bg-red-50/50' : 'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className={`w-4 h-4 ${
                            task.status === 'blocked' ? 'text-red-600' :
                            task.status === 'in_progress' ? 'text-blue-600' :
                            'text-muted-foreground'
                          }`} />
                          <h3 className="font-medium text-foreground">{task.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{task.projectName}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">{task.designVersion}</Badge>
                        </div>

                        {task.status === 'blocked' && task.blockedReason && (
                          <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 text-red-800">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">Blocked:</span>
                              <span className="text-sm">{task.blockedReason}</span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={priority.className}>
                            <PriorityIcon className="w-3 h-3 mr-1" />
                            {priority.label}
                          </Badge>
                          <Badge variant="outline" className={status.className}>
                            {status.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Due {task.dueDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {task.status === 'open' && (
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                        {task.status === 'in_progress' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        {task.status === 'blocked' && (
                          <Button size="sm" variant="outline" disabled>
                            Waiting...
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState 
              icon={CheckSquare}
              title="No active tasks"
              description="Tasks will appear here once designs move to execution phase."
            />
          )}
        </div>

        {/* Recently Completed */}
        {recentlyCompleted.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recently Completed</h2>
            <div className="space-y-2">
              {recentlyCompleted.map((task) => (
                <div key={task.id} className="bg-secondary/30 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-foreground">{task.name}</p>
                      <p className="text-sm text-muted-foreground">{task.projectName}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    Completed
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
