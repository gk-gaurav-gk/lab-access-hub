import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import EmptyState from "@/components/dashboard/EmptyState";
import DecisionTimeline from "@/components/dashboard/customer/DecisionTimeline";
import DesignComparisonDialog from "@/components/dashboard/customer/DesignComparisonDialog";
import ApprovalDialog from "@/components/dashboard/customer/ApprovalDialog";
import CommercialSnapshot from "@/components/dashboard/customer/CommercialSnapshot";
import FeedbackDialog from "@/components/dashboard/customer/FeedbackDialog";
import WhatHappensNext from "@/components/dashboard/customer/WhatHappensNext";
import ProjectHistory from "@/components/dashboard/customer/ProjectHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileCheck, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Eye, 
  ThumbsUp, 
  GitCompare,
  FileText
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/customer/projects", icon: FolderOpen },
  { label: "Design Reviews", href: "/dashboard/customer/reviews", icon: FileCheck },
  { label: "Feedback", href: "/dashboard/customer/feedback", icon: MessageSquare },
];

const CustomerDashboard = () => {
  const { 
    currentUser, 
    myProjects, 
    myCustomerActions, 
    approveDesign,
    getWorkspaceForProject 
  } = useWorkspaceProjects();

  const userName = currentUser?.name || "Dr. Emily Watson";
  const currentProject = myProjects[0]; // Primary project
  
  // Calculate stats
  const pendingReviews = myProjects.reduce((acc, p) => 
    acc + p.designs.filter(d => d.status === 'pending_review' || d.status === 'in_review').length, 0);
  const approvedDesigns = myProjects.reduce((acc, p) => 
    acc + p.designs.filter(d => d.status === 'approved').length, 0);
  const feedbackCount = myCustomerActions.filter(a => 
    a.type === 'comment' || a.type === 'feedback'
  ).length;

  // Get all designs for review
  const allDesigns = myProjects.flatMap(project => 
    project.designs.map(design => ({ ...design, projectName: project.name, projectId: project.id }))
  );

  // Get pending actions
  const pendingActions = myProjects.flatMap(p => 
    p.pendingActions.filter(a => a.assignedTo === 'customer' && a.status === 'pending')
  );

  const handleApprove = (projectId: string, designId: string) => {
    approveDesign(projectId, designId, 'Approved via dashboard');
  };

  return (
    <DashboardLayout role="customer" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-navy-deep rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userName.split(' ')[1] || userName}</h2>
          <p className="text-primary-foreground/80">
            {currentProject ? (
              <>Your {currentProject.name} project is {currentProject.progress}% complete. {pendingReviews > 0 ? `${pendingReviews} design${pendingReviews > 1 ? 's are' : ' is'} awaiting your review.` : 'All designs are reviewed.'}</>
            ) : (
              'Your project workspace is ready.'
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Project Progress"
            value={currentProject ? `${currentProject.progress}%` : 'N/A'}
            icon={FolderOpen}
          />
          <StatCard
            title="Pending Reviews"
            value={pendingReviews}
            icon={Clock}
          />
          <StatCard
            title="Approved Designs"
            value={approvedDesigns}
            icon={CheckCircle}
          />
          <StatCard
            title="Feedback Given"
            value={feedbackCount}
            icon={MessageSquare}
          />
        </div>

        {/* Decision Timeline */}
        {pendingActions.length > 0 && (
          <DecisionTimeline actions={pendingActions} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Status & Designs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Designs to Review */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Designs to Review</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all versions</a>
              </div>
              {allDesigns.length > 0 ? (
                <div className="space-y-3">
                  {allDesigns.map((design) => (
                    <div key={design.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{design.title} {design.version}</h3>
                          <p className="text-sm text-muted-foreground">
                            {design.projectName} • Updated {design.uploadedAt}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={
                            design.status === 'approved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            design.status === 'pending_review' ? "bg-amber-100 text-amber-700 border-amber-200" :
                            design.status === 'in_review' ? "bg-blue-100 text-blue-700 border-blue-200" :
                            "bg-secondary text-secondary-foreground border-border"
                          }>
                            {design.status === 'approved' ? 'Approved' : 
                             design.status === 'pending_review' ? 'Needs Review' : 
                             design.status === 'in_review' ? 'In Review' : 'Draft'}
                          </Badge>
                          
                          <DesignComparisonDialog 
                            designTitle={`${design.title} ${design.version}`}
                            trigger={
                              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                                <GitCompare className="w-3 h-3 mr-1" />
                                Compare
                              </Button>
                            }
                          />

                          {(design.status === 'pending_review' || design.status === 'in_review') ? (
                            <>
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                Review
                              </Button>
                              <ApprovalDialog 
                                designTitle={`${design.title} ${design.version}`}
                                onApprove={() => handleApprove(design.projectId, design.id)}
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
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                      {design.customerComments && design.customerComments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">Your comments:</p>
                          <p className="text-sm text-foreground">{design.customerComments[design.customerComments.length - 1]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon={FileText}
                  title="No designs uploaded yet"
                  description="The design team is working on your first design. You'll be notified when it's ready for review."
                />
              )}
            </div>

            {/* What Happens Next */}
            <WhatHappensNext currentStage={currentProject?.status} />

            {/* Commercial Snapshot */}
            {currentProject && (
              <CommercialSnapshot 
                budget={currentProject.budget}
                projectName={currentProject.name}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {pendingReviews > 0 && (
                  <Button className="w-full justify-start" variant="outline">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approve Pending Designs ({pendingReviews})
                  </Button>
                )}
                <FeedbackDialog projectId={currentProject?.id} projectName={currentProject?.name} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
              {myCustomerActions.length > 0 ? (
                <div className="divide-y divide-border">
                  {myCustomerActions
                    .slice(0, 4)
                    .map((action) => (
                      <ActivityItem
                        key={action.id}
                        icon={action.type === 'approval' ? ThumbsUp : action.type === 'comment' ? MessageSquare : FileCheck}
                        title={
                          action.type === 'approval' ? 'You approved' : 
                          action.type === 'comment' ? 'You commented' : 
                          'Activity'
                        }
                        description={action.designTitle || action.content}
                        time={action.timestamp}
                        iconColor={action.type === 'approval' ? 'text-emerald-600' : undefined}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              )}
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

        {/* Project History */}
        <ProjectHistory 
          customerActions={myCustomerActions}
          designs={allDesigns}
        />
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;