import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import EmptyState from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Send, 
  Building, 
  Clock, 
  Eye,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  UserPlus
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Onboarding", href: "/dashboard/sales/onboarding", icon: UserPlus },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

const SalesDashboard = () => {
  const { currentUser, myProjects, myCustomerActions } = useWorkspaceProjects();

  const userName = currentUser?.name || "Michael Roberts";
  
  // Calculate stats
  const activeClients = new Set(myProjects.map(p => p.client)).size;
  const pipelineValue = myProjects.reduce((acc, p) => {
    const value = parseInt(p.budget.current.replace(/[^0-9]/g, ''));
    return acc + value;
  }, 0);
  
  // Get recent customer actions for visibility
  const recentCustomerActions = myCustomerActions.slice(0, 5);

  // Get designs pending customer approval
  const pendingApprovalDesigns = myProjects.flatMap(project => 
    project.designs
      .filter(d => d.status === 'pending_review' || d.status === 'in_review')
      .map(d => ({ ...d, projectName: project.name, clientContact: project.clientContact }))
  );

  // Get approved designs that can be shared
  const approvedDesigns = myProjects.flatMap(project => 
    project.designs
      .filter(d => d.status === 'approved')
      .map(d => ({ ...d, projectName: project.name }))
  );

  return (
    <DashboardLayout role="sales" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Clients"
            value={activeClients}
            icon={Building}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Open Projects"
            value={myProjects.length}
            icon={FileText}
          />
          <StatCard
            title="Pipeline Value"
            value={`$${(pipelineValue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            trend={{ value: 22, isPositive: true }}
          />
          <StatCard
            title="Pending Approvals"
            value={pendingApprovalDesigns.length}
            icon={Clock}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Projects & Estimations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Client Projects & Commercial Status</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all</a>
              </div>
              {myProjects.length > 0 ? (
                <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Client</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Budget</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Approval Status</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {myProjects.map((project) => {
                        const pendingCount = project.designs.filter(d => d.status === 'pending_review' || d.status === 'in_review').length;
                        const approvedCount = project.designs.filter(d => d.status === 'approved').length;
                        return (
                          <tr key={project.id} className="hover:bg-secondary/30">
                            <td className="px-4 py-3">
                              <div>
                                <span className="text-sm font-medium text-foreground">{project.client}</span>
                                <p className="text-xs text-muted-foreground">{project.industry}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{project.name}</td>
                            <td className="px-4 py-3">
                              <div>
                                <span className="text-sm font-medium text-foreground">{project.budget.current}</span>
                                {project.budget.changeImpact && (
                                  <p className="text-xs text-amber-600">{project.budget.changeImpact}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {pendingCount > 0 ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                                  {pendingCount} awaiting approval
                                </Badge>
                              ) : approvedCount > 0 ? (
                                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                  {approvedCount} approved
                                </Badge>
                              ) : (
                                <span className="text-sm text-muted-foreground">No designs yet</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState 
                  icon={Building}
                  title="No client projects assigned"
                  description="Client projects will appear here when assigned to you."
                />
              )}
            </div>

            {/* Pending Customer Approvals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Awaiting Customer Approval</h2>
              </div>
              {pendingApprovalDesigns.length > 0 ? (
                <div className="space-y-3">
                  {pendingApprovalDesigns.map((design) => (
                    <div key={design.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-amber-900">{design.title} {design.version}</h3>
                            <p className="text-sm text-amber-700">{design.projectName} • Waiting for {design.clientContact}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                          Follow Up
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <ThumbsUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-emerald-700">All designs have customer approval</p>
                </div>
              )}
            </div>

            {/* Approved Designs - Ready to Share */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Approved Designs - Ready to Share</h2>
              </div>
              {approvedDesigns.length > 0 ? (
                <div className="space-y-3">
                  {approvedDesigns.slice(0, 3).map((design) => (
                    <div key={design.id} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{design.title} {design.version}</h3>
                        <p className="text-sm text-muted-foreground">{design.projectName} • Approved {design.approvedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          Approved
                        </Badge>
                        <Button size="sm">
                          <Send className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No approved designs yet</p>
                  <p className="text-xs text-muted-foreground">Designs will appear here after customer approval</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Recent Customer Actions */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Customer Actions</h2>
              {recentCustomerActions.length > 0 ? (
                <div className="divide-y divide-border">
                  {recentCustomerActions.map((action) => (
                    <ActivityItem
                      key={action.id}
                      icon={action.type === 'approval' ? ThumbsUp : action.type === 'comment' ? MessageCircle : AlertCircle}
                      title={
                        action.type === 'approval' ? 'Design Approved' : 
                        action.type === 'comment' ? 'Comment Added' : 
                        action.type === 'feedback' ? 'Feedback Submitted' :
                        'Action Taken'
                      }
                      description={`${action.customerName} - ${action.designTitle || action.projectName}`}
                      time={action.timestamp}
                      iconColor={action.type === 'approval' ? 'text-emerald-600' : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Waiting for customer activity</p>
                  <p className="text-xs text-muted-foreground">Actions will appear when customers review designs</p>
                </div>
              )}
            </div>

            {/* Change Impact Summary */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Change Impact Summary</h2>
              {myProjects.filter(p => p.budget.changeImpact).length > 0 ? (
                <div className="space-y-3">
                  {myProjects.filter(p => p.budget.changeImpact).map((project) => (
                    <div key={project.id} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{project.name}</h4>
                        <p className="text-xs text-amber-600">{project.budget.changeImpact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center">No change impacts to report</p>
              )}
            </div>

            {/* Permissions info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h3 className="font-semibold text-emerald-900 mb-2">Your Permissions</h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>✓ View and manage client details</li>
                <li>✓ Access proposals and estimations</li>
                <li>✓ View version history</li>
                <li>✓ Share approved designs with clients</li>
                <li>✗ Modify technical specifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;