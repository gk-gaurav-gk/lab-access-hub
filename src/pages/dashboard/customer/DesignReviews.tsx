import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmptyState from "@/components/dashboard/EmptyState";
import DesignComparisonDialog from "@/components/dashboard/customer/DesignComparisonDialog";
import ApprovalDialog from "@/components/dashboard/customer/ApprovalDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { useToast } from "@/hooks/use-toast";
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
  LayoutDashboard, 
  FolderOpen, 
  FileCheck, 
  MessageSquare,
  Eye,
  CheckCircle,
  GitCompare,
  Clock,
  AlertCircle,
  MessageCircle,
  Calendar,
  Lock
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/customer/projects", icon: FolderOpen },
  { label: "Design Reviews", href: "/dashboard/customer/reviews", icon: FileCheck },
  { label: "Feedback", href: "/dashboard/customer/feedback", icon: MessageSquare },
];

const DesignReviews = () => {
  const { currentUser, myProjects, approveDesign, addComment } = useWorkspaceProjects();
  const { toast } = useToast();
  const [changeRequestOpen, setChangeRequestOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<{ projectId: string; designId: string; title: string } | null>(null);
  const [changeRequest, setChangeRequest] = useState({
    category: 'design',
    description: '',
    priority: 'medium'
  });

  const userName = currentUser?.name || "Dr. Emily Watson";

  // Get all designs with project info
  const allDesigns = myProjects.flatMap(project =>
    project.designs.map(design => ({
      ...design,
      projectName: project.name,
      projectId: project.id
    }))
  );

  // Split into pending and approved
  const pendingDesigns = allDesigns.filter(d => d.status === 'pending_review' || d.status === 'in_review');
  const approvedDesigns = allDesigns.filter(d => d.status === 'approved');

  const handleApprove = (projectId: string, designId: string) => {
    approveDesign(projectId, designId, 'Approved via Design Reviews');
  };

  const handleChangeRequest = () => {
    if (!selectedDesign || !changeRequest.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide details for your change request.",
        variant: "destructive"
      });
      return;
    }

    addComment(selectedDesign.projectId, selectedDesign.designId, changeRequest.description);
    
    toast({
      title: "Change Request Submitted",
      description: "Your feedback has been sent to the design team.",
    });

    setChangeRequestOpen(false);
    setChangeRequest({ category: 'design', description: '', priority: 'medium' });
    setSelectedDesign(null);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending_review':
        return { label: 'Needs Review', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock };
      case 'in_review':
        return { label: 'In Review', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Eye };
      case 'approved':
        return { label: 'Approved', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle };
      default:
        return { label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FileCheck };
    }
  };

  // Mock change summaries
  const getChangeSummary = (version: string) => {
    if (version === 'v2.0') return 'Increased fume hood capacity, revised emergency exit placement';
    if (version === 'v1.1') return 'Minor layout adjustments based on initial feedback';
    return 'Initial design submission';
  };

  return (
    <DashboardLayout role="customer" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Design Reviews</h1>
          <p className="text-muted-foreground">Review, approve, or request changes to design submissions</p>
        </div>

        {/* Pending Reviews Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-foreground">Pending Reviews</h2>
            {pendingDesigns.length > 0 && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                {pendingDesigns.length} awaiting
              </Badge>
            )}
          </div>

          {pendingDesigns.length > 0 ? (
            <div className="space-y-4">
              {pendingDesigns.map((design) => {
                const statusConfig = getStatusConfig(design.status);
                const changeSummary = getChangeSummary(design.version);

                return (
                  <div key={design.id} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{design.title}</h3>
                            <Badge variant="secondary">{design.version}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{design.projectName}</p>
                        </div>
                        <Badge variant="outline" className={statusConfig.color}>
                          <statusConfig.icon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Change Summary */}
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-primary" />
                          What Changed
                        </h4>
                        <p className="text-sm text-muted-foreground">{changeSummary}</p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Updated {design.uploadedAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {design.customerComments?.length || 0} comments
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Design
                        </Button>
                        
                        <DesignComparisonDialog
                          designTitle={`${design.title} ${design.version}`}
                          trigger={
                            <Button variant="outline" size="sm">
                              <GitCompare className="w-4 h-4 mr-2" />
                              Compare Versions
                            </Button>
                          }
                        />

                        <Dialog open={changeRequestOpen && selectedDesign?.designId === design.id} onOpenChange={(open) => {
                          setChangeRequestOpen(open);
                          if (open) setSelectedDesign({ projectId: design.projectId, designId: design.id, title: design.title });
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Request Changes
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request Changes</DialogTitle>
                              <DialogDescription>
                                Submit structured feedback for {design.title} {design.version}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                                <div className="flex gap-2">
                                  {['design', 'safety', 'layout', 'equipment'].map((cat) => (
                                    <Button
                                      key={cat}
                                      variant={changeRequest.category === cat ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => setChangeRequest(prev => ({ ...prev, category: cat }))}
                                      className="capitalize"
                                    >
                                      {cat}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                                <div className="flex gap-2">
                                  {[
                                    { value: 'low', label: 'Low', color: 'text-gray-600' },
                                    { value: 'medium', label: 'Medium', color: 'text-amber-600' },
                                    { value: 'high', label: 'High', color: 'text-red-600' },
                                  ].map((priority) => (
                                    <Button
                                      key={priority.value}
                                      variant={changeRequest.priority === priority.value ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => setChangeRequest(prev => ({ ...prev, priority: priority.value }))}
                                    >
                                      {priority.label}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Details</label>
                                <Textarea
                                  placeholder="Describe the changes you'd like to see..."
                                  value={changeRequest.description}
                                  onChange={(e) => setChangeRequest(prev => ({ ...prev, description: e.target.value }))}
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setChangeRequestOpen(false)}>Cancel</Button>
                              <Button onClick={handleChangeRequest}>Submit Request</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <ApprovalDialog
                          designTitle={`${design.title} ${design.version}`}
                          onApprove={() => handleApprove(design.projectId, design.id)}
                          trigger={
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 ml-auto">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Design
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Clock}
              title="No designs awaiting your review"
              description="When new design versions are ready, they'll appear here for your approval."
            />
          )}
        </div>

        {/* Approved Designs Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-foreground">Approved Designs</h2>
            {approvedDesigns.length > 0 && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                {approvedDesigns.length} approved
              </Badge>
            )}
          </div>

          {approvedDesigns.length > 0 ? (
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Design</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Project</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Version</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Approved On</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {approvedDesigns.map((design) => (
                    <tr key={design.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-foreground">{design.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{design.projectName}</td>
                      <td className="px-5 py-4">
                        <Badge variant="secondary">{design.version}</Badge>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{design.uploadedAt}</td>
                      <td className="px-5 py-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg border border-border p-6 text-center">
              <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No approved designs yet</p>
              <p className="text-sm text-muted-foreground">Approved versions will be locked and displayed here</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DesignReviews;
