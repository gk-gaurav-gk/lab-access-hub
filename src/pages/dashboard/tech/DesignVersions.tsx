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
  Lock,
  MessageCircle,
  Eye,
  GitCompare,
  Edit,
  Calendar,
  User
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
];

const DesignVersions = () => {
  const { projects, customerActions } = useProjects();

  // Get projects assigned to this tech team member
  const myProjects = projects.filter(p => p.assignedTech.includes('James Chen'));
  
  // Get all designs with their project context
  const allDesigns = myProjects.flatMap(project => 
    project.designs.map(design => ({ 
      ...design, 
      projectName: project.name, 
      projectId: project.id,
      client: project.client
    }))
  );

  // Get customer comments for designs
  const getDesignComments = (designId: string) => {
    return customerActions.filter(a => a.type === 'comment' && a.designId === designId);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return { label: 'Approved & Locked', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      case 'in_review':
        return { label: 'In Review', className: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'pending_review':
        return { label: 'Pending Review', className: 'bg-amber-100 text-amber-700 border-amber-200' };
      default:
        return { label: 'Draft', className: 'bg-secondary text-secondary-foreground border-border' };
    }
  };

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Design Versions</h1>
            <p className="text-muted-foreground">Version-controlled design artifacts with approval tracking</p>
          </div>
          <Button>
            <FileCode className="w-4 h-4 mr-2" />
            Upload New Version
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{allDesigns.length}</p>
                <p className="text-sm text-muted-foreground">Total Versions</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allDesigns.filter(d => d.status === 'in_review' || d.status === 'pending_review').length}
                </p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allDesigns.filter(d => d.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approved & Locked</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {customerActions.filter(a => a.type === 'comment').length}
                </p>
                <p className="text-sm text-muted-foreground">Customer Comments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Versions Table */}
        {allDesigns.length > 0 ? (
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Design</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Version</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Customer Approval</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Last Updated</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allDesigns.map((design) => {
                  const statusConfig = getStatusConfig(design.status);
                  const comments = getDesignComments(design.id);
                  const isLocked = design.status === 'approved';
                  
                  return (
                    <tr key={design.id} className="hover:bg-secondary/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {isLocked && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Lock className="w-4 h-4 text-emerald-600" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approved by customer on {design.uploadedAt}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <div>
                            <span className="text-sm font-medium text-foreground">{design.title}</span>
                            <p className="text-xs text-muted-foreground">{design.client}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{design.projectName}</td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className="bg-secondary">
                          {design.version}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={statusConfig.className}>
                          {isLocked && <Lock className="w-3 h-3 mr-1" />}
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        {isLocked ? (
                          <div className="flex items-center gap-1 text-emerald-600">
                            <CheckSquare className="w-4 h-4" />
                            <span className="text-sm">Approved</span>
                          </div>
                        ) : (
                          <span className="text-sm text-amber-600">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {design.uploadedAt}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {!isLocked ? (
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger>
                                <Button size="sm" variant="outline" disabled>
                                  <Lock className="w-3 h-3 mr-1" />
                                  Locked
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Design is approved and locked</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          
                          {/* View Comments Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="relative">
                                <MessageCircle className="w-4 h-4" />
                                {comments.length > 0 && (
                                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                    {comments.length}
                                  </span>
                                )}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Customer Comments - {design.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                {comments.length > 0 ? (
                                  comments.map((comment) => (
                                    <div key={comment.id} className="bg-secondary/50 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <User className="w-4 h-4 text-muted-foreground" />
                                          <span className="font-medium text-sm">{comment.customerName}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                      </div>
                                      <p className="text-sm text-foreground">{comment.content}</p>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No comments yet</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button size="sm" variant="ghost">
                            <GitCompare className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            icon={FileCode}
            title="No design versions yet"
            description="Upload your first design version to get started with version control."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DesignVersions;
