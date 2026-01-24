import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Clock,
  Building,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  Minus,
  AlertCircle,
  ArrowRight,
  Calendar,
  MessageSquare,
  RefreshCw,
  Eye
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

const Clients = () => {
  const { projects, customerActions, feedback } = useProjects();

  // Get unique clients with aggregated data
  const clientsMap = new Map<string, {
    name: string;
    industry: string;
    projects: typeof projects;
    commercialStatus: 'proposal' | 'active' | 'at_risk';
    approvalDelays: number;
    changeRequests: number;
    feedbackSentiment: 'positive' | 'neutral' | 'concern';
  }>();

  projects.forEach(project => {
    if (!clientsMap.has(project.client)) {
      // Calculate client metrics
      const clientProjects = projects.filter(p => p.client === project.client);
      const pendingActions = clientProjects.reduce((acc, p) => 
        acc + p.pendingActions.filter(a => a.status === 'pending').length, 0);
      const changeCount = clientProjects.reduce((acc, p) => 
        acc + (p.budget.changeImpact ? 1 : 0), 0);
      
      // Get feedback sentiment
      const clientFeedback = feedback.filter(f => 
        clientProjects.some(p => p.id === f.projectId)
      );
      const avgRating = clientFeedback.length > 0 
        ? clientFeedback.reduce((acc, f) => acc + f.ratings.overall, 0) / clientFeedback.length 
        : 3;
      
      // Determine commercial status
      let commercialStatus: 'proposal' | 'active' | 'at_risk' = 'active';
      if (clientProjects.every(p => p.status === 'onboarding')) {
        commercialStatus = 'proposal';
      } else if (pendingActions > 3 || avgRating < 3) {
        commercialStatus = 'at_risk';
      }

      clientsMap.set(project.client, {
        name: project.client,
        industry: project.industry,
        projects: clientProjects,
        commercialStatus,
        approvalDelays: pendingActions,
        changeRequests: changeCount,
        feedbackSentiment: avgRating >= 4 ? 'positive' : avgRating >= 3 ? 'neutral' : 'concern'
      });
    }
  });

  const clients = Array.from(clientsMap.values());

  // Stats
  const activeClients = clients.filter(c => c.commercialStatus === 'active').length;
  const atRiskClients = clients.filter(c => c.commercialStatus === 'at_risk').length;
  const proposalClients = clients.filter(c => c.commercialStatus === 'proposal').length;

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

  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Commercial portfolio view with health indicators</p>
          </div>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeClients}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{proposalClients}</p>
                <p className="text-sm text-muted-foreground">In Proposal</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{atRiskClients}</p>
                <p className="text-sm text-muted-foreground">At Risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Portfolio */}
        {clients.length > 0 ? (
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.name} className={`bg-card rounded-xl shadow-card border overflow-hidden ${
                client.commercialStatus === 'at_risk' ? 'border-red-200' : 'border-border'
              }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                        <Badge variant="outline" className={
                          client.commercialStatus === 'active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                          client.commercialStatus === 'at_risk' ? 'bg-red-100 text-red-700 border-red-200' :
                          'bg-blue-100 text-blue-700 border-blue-200'
                        }>
                          {client.commercialStatus === 'at_risk' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {client.commercialStatus.replace('_', ' ').charAt(0).toUpperCase() + client.commercialStatus.slice(1).replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{client.industry}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {client.projects.length} Project{client.projects.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>

                  {/* Active Projects List */}
                  <div className="space-y-2 mb-4">
                    {client.projects.slice(0, 2).map((project) => (
                      <div key={project.id} className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-foreground">{project.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{getStageLabel(project.status)}</Badge>
                            <span className="text-xs text-muted-foreground">{project.progress}% complete</span>
                          </div>
                        </div>
                        <Progress value={project.progress} className="w-24 h-2" />
                      </div>
                    ))}
                    {client.projects.length > 2 && (
                      <p className="text-xs text-muted-foreground text-center">+{client.projects.length - 2} more projects</p>
                    )}
                  </div>

                  {/* Health Indicators */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className={`w-4 h-4 ${client.approvalDelays > 2 ? 'text-red-600' : client.approvalDelays > 0 ? 'text-amber-600' : 'text-emerald-600'}`} />
                        <p className="text-lg font-semibold text-foreground">{client.approvalDelays}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Approval Delays</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <RefreshCw className={`w-4 h-4 ${client.changeRequests > 2 ? 'text-amber-600' : 'text-muted-foreground'}`} />
                        <p className="text-lg font-semibold text-foreground">{client.changeRequests}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Change Requests</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {client.feedbackSentiment === 'positive' ? (
                          <ThumbsUp className="w-4 h-4 text-emerald-600" />
                        ) : client.feedbackSentiment === 'concern' ? (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                        <p className={`text-sm font-semibold capitalize ${
                          client.feedbackSentiment === 'positive' ? 'text-emerald-600' :
                          client.feedbackSentiment === 'concern' ? 'text-red-600' :
                          'text-muted-foreground'
                        }`}>{client.feedbackSentiment}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Sentiment</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Workspace
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Proposals
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Approvals
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Users}
            title="No clients yet"
            description="Client accounts will appear here as projects are created."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Clients;
