import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import EmptyState from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  FileCode, 
  ClipboardList, 
  Settings, 
  Wrench, 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  Upload,
  Lock,
  MessageCircle,
  Eye
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
];

const TechDashboard = () => {
  const { projects, customerActions } = useProjects();

  // Get projects assigned to this tech team member
  const myProjects = projects.filter(p => p.assignedTech.includes('James Chen'));
  
  // Calculate stats
  const totalDesigns = myProjects.reduce((acc, p) => acc + p.designs.length, 0);
  const pendingReviews = myProjects.reduce((acc, p) => 
    acc + p.designs.filter(d => d.status === 'in_review').length, 0);
  const approvedLocked = myProjects.reduce((acc, p) => 
    acc + p.designs.filter(d => d.status === 'approved').length, 0);

  // Get all designs with their project context
  const allDesigns = myProjects.flatMap(project => 
    project.designs.map(design => ({ ...design, projectName: project.name, projectId: project.id }))
  );

  // Get customer comments on designs
  const customerComments = customerActions.filter(a => 
    a.type === 'comment' && myProjects.some(p => p.id === a.projectId)
  );

  // Mock tasks - in real app would come from project data
  const tasks = myProjects.flatMap(project => 
    project.pendingActions
      .filter(a => a.assignedTo === 'tech' || (a.assignedTo === 'customer' && a.type === 'review'))
      .map(action => ({
        ...action,
        projectName: project.name
      }))
  );

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assigned Projects"
            value={myProjects.length}
            icon={ClipboardList}
          />
          <StatCard
            title="Pending Reviews"
            value={pendingReviews}
            icon={Clock}
          />
          <StatCard
            title="Design Versions"
            value={totalDesigns}
            icon={FileCode}
            subtitle="Across all projects"
          />
          <StatCard
            title="Approved & Locked"
            value={approvedLocked}
            icon={Lock}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Designs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Design Versions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Design Versions</h2>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
              {allDesigns.length > 0 ? (
                <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Design</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Updated</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {allDesigns.map((design) => (
                        <tr key={design.id} className="hover:bg-secondary/30">
                          <td className="px-4 py-3">
                            <div>
                              <span className="text-sm font-medium text-foreground">{design.title}</span>
                              <span className="text-xs text-muted-foreground ml-2">{design.version}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{design.projectName}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={
                              design.status === 'approved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                              design.status === 'pending_review' ? "bg-amber-100 text-amber-700 border-amber-200" :
                              design.status === 'in_review' ? "bg-blue-100 text-blue-700 border-blue-200" :
                              "bg-secondary text-secondary-foreground border-border"
                            }>
                              {design.status === 'approved' && <Lock className="w-3 h-3 mr-1" />}
                              {design.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{design.uploadedAt}</td>
                          <td className="px-4 py-3">
                            {design.status === 'approved' ? (
                              <Button size="sm" variant="outline" disabled>
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState 
                  icon={FileCode}
                  title="No designs yet"
                  description="Upload your first design version to get started."
                />
              )}
            </div>

            {/* Customer Review Comments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Customer Review Comments</h2>
              </div>
              {customerComments.length > 0 ? (
                <div className="space-y-3">
                  {customerComments.slice(0, 4).map((comment) => (
                    <div key={comment.id} className="bg-card rounded-xl p-4 shadow-card border border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{comment.designTitle}</h3>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">— {comment.customerName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                  <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No customer comments yet</p>
                  <p className="text-xs text-muted-foreground">Comments will appear when customers review designs</p>
                </div>
              )}
            </div>

            {/* Awaiting Customer Action */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Awaiting Customer Action</h2>
              </div>
              {(() => {
                const awaitingDesigns = allDesigns.filter(d => 
                  d.status === 'pending_review' || d.status === 'in_review'
                );
                return awaitingDesigns.length > 0 ? (
                  <div className="space-y-3">
                    {awaitingDesigns.map((design) => (
                      <div key={design.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <div>
                            <h3 className="font-medium text-amber-900">{design.title} {design.version}</h3>
                            <p className="text-sm text-amber-700">{design.projectName} • Uploaded {design.uploadedAt}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                          Awaiting client approval
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <CheckSquare className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-emerald-700">All designs have been reviewed by customers</p>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
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

            {/* Recent Activity */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Updates</h2>
              <div className="divide-y divide-border">
                {allDesigns.slice(0, 3).map((design) => (
                  <ActivityItem
                    key={design.id}
                    icon={design.status === 'approved' ? Lock : FileCode}
                    title={design.status === 'approved' ? 'Design approved & locked' : `${design.title} ${design.version}`}
                    description={design.projectName}
                    time={design.uploadedAt}
                    iconColor={design.status === 'approved' ? 'text-emerald-600' : undefined}
                  />
                ))}
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TechDashboard;