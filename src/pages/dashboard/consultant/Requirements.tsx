import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Calendar,
  User,
  DollarSign,
  Zap,
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

// Mock requirements data
const requirementsData = [
  {
    id: 'req-001',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    category: 'functional',
    title: 'Fume Hood Capacity',
    description: 'Minimum 4 fume hoods with chemical resistance rating',
    status: 'approved',
    linkedDesignId: 'des-001',
    linkedDesignVersion: 'v3.2',
    approvalStatus: 'pending_review'
  },
  {
    id: 'req-002',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    category: 'safety',
    title: 'Emergency Shower Stations',
    description: 'Dual emergency shower stations with eyewash',
    status: 'approved',
    linkedDesignId: 'des-003',
    linkedDesignVersion: 'v1.0',
    approvalStatus: 'in_review'
  },
  {
    id: 'req-003',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    category: 'compliance',
    title: 'ISO 14644 Compliance',
    description: 'Clean room must meet ISO Class 7 standards',
    status: 'pending',
    linkedDesignId: null,
    linkedDesignVersion: null,
    approvalStatus: null
  },
  {
    id: 'req-004',
    projectId: 'proj-002',
    projectName: 'Pharmaceutical Testing Facility',
    category: 'functional',
    title: 'Clean Room HVAC',
    description: 'HEPA filtration with 20 air changes per hour',
    status: 'approved',
    linkedDesignId: 'des-004',
    linkedDesignVersion: 'v4.0',
    approvalStatus: 'approved'
  },
  {
    id: 'req-005',
    projectId: 'proj-003',
    projectName: 'Environmental Analysis Center',
    category: 'customization',
    title: 'Sample Processing Area',
    description: 'Dedicated area for environmental sample processing',
    status: 'pending',
    linkedDesignId: null,
    linkedDesignVersion: null,
    approvalStatus: null
  }
];

// Mock change history
const changeHistory = [
  {
    id: 'ch-001',
    requirementId: 'req-001',
    requirementTitle: 'Fume Hood Capacity',
    projectName: 'Biotech Research Lab',
    change: 'Increased from 3 to 4 fume hoods',
    requestedBy: 'Dr. Emily Watson',
    requestedAt: 'Feb 10, 2024',
    impact: {
      cost: '+$8,000',
      timeline: '+3 days',
      scope: 'Additional ventilation capacity required'
    }
  },
  {
    id: 'ch-002',
    requirementId: 'req-002',
    requirementTitle: 'Emergency Shower Stations',
    projectName: 'Biotech Research Lab',
    change: 'Added second emergency station',
    requestedBy: 'Safety Review Committee',
    requestedAt: 'Feb 8, 2024',
    impact: {
      cost: '+$4,500',
      timeline: '+2 days',
      scope: 'Plumbing modifications needed'
    }
  }
];

const Requirements = () => {
  const { projects } = useProjects();

  const groupedRequirements = {
    functional: requirementsData.filter(r => r.category === 'functional'),
    compliance: requirementsData.filter(r => r.category === 'compliance'),
    safety: requirementsData.filter(r => r.category === 'safety'),
    customization: requirementsData.filter(r => r.category === 'customization')
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'changed': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout role="consultant" userName="Sarah Mitchell" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Requirements</h1>
            <p className="text-muted-foreground">Requirement governance and change tracking</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-2xl font-bold text-foreground">{requirementsData.length}</p>
            <p className="text-sm text-muted-foreground">Total Requirements</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-2xl font-bold text-emerald-600">{requirementsData.filter(r => r.status === 'approved').length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-2xl font-bold text-amber-600">{requirementsData.filter(r => r.status === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-2xl font-bold text-blue-600">{changeHistory.length}</p>
            <p className="text-sm text-muted-foreground">Recent Changes</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Requirements Overview</TabsTrigger>
            <TabsTrigger value="changes">Change Tracking</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Grouped Requirements */}
            {Object.entries(groupedRequirements).map(([category, requirements]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground capitalize flex items-center gap-2">
                  {category === 'functional' && <Zap className="w-5 h-5 text-blue-600" />}
                  {category === 'compliance' && <FileText className="w-5 h-5 text-purple-600" />}
                  {category === 'safety' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  {category === 'customization' && <FolderOpen className="w-5 h-5 text-amber-600" />}
                  {category} Requirements
                  <Badge variant="secondary" className="ml-2">{requirements.length}</Badge>
                </h3>
                
                {requirements.length > 0 ? (
                  <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Requirement</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Linked Design</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {requirements.map((req) => (
                          <tr key={req.id} className="hover:bg-secondary/30">
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-foreground">{req.title}</p>
                                <p className="text-xs text-muted-foreground">{req.description}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{req.projectName}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(req.status)}
                                <Badge variant="outline" className={
                                  req.status === 'approved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                  req.status === 'pending' ? "bg-amber-100 text-amber-700 border-amber-200" :
                                  "bg-blue-100 text-blue-700 border-blue-200"
                                }>
                                  {req.status}
                                </Badge>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {req.linkedDesignVersion ? (
                                <Badge variant="secondary">{req.linkedDesignVersion}</Badge>
                              ) : (
                                <span className="text-sm text-muted-foreground">Not linked</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                    <p className="text-sm text-muted-foreground">No {category} requirements defined yet</p>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="changes" className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Requirement Changes</h3>
            
            {changeHistory.length > 0 ? (
              <div className="space-y-4">
                {changeHistory.map((change) => (
                  <div key={change.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{change.requirementTitle}</h4>
                        <p className="text-sm text-muted-foreground">{change.projectName}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        Changed
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3 bg-secondary/50 p-3 rounded-lg">
                      "{change.change}"
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {change.requestedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {change.requestedAt}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-600 font-medium">
                          <DollarSign className="w-4 h-4" />
                          {change.impact.cost}
                        </div>
                        <p className="text-xs text-muted-foreground">Cost Impact</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-600 font-medium">
                          <Clock className="w-4 h-4" />
                          {change.impact.timeline}
                        </div>
                        <p className="text-xs text-muted-foreground">Timeline Impact</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-foreground">{change.impact.scope}</p>
                        <p className="text-xs text-muted-foreground">Scope Impact</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={FileText}
                title="No requirement changes logged yet"
                description="Change history will appear here when requirements are modified."
              />
            )}
          </TabsContent>

          <TabsContent value="traceability" className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Requirement Traceability</h3>
            <p className="text-sm text-muted-foreground mb-4">Track requirements from definition through design to approval</p>
            
            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Requirement</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3"></th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Design Version</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3"></th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {requirementsData.filter(r => r.linkedDesignId).map((req) => (
                    <tr key={req.id} className="hover:bg-secondary/30">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{req.title}</p>
                          <p className="text-xs text-muted-foreground">{req.projectName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary">{req.linkedDesignVersion}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={
                          req.approvalStatus === 'approved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          req.approvalStatus === 'pending_review' ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-blue-100 text-blue-700 border-blue-200"
                        }>
                          {req.approvalStatus?.replace('_', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {requirementsData.filter(r => !r.linkedDesignId).length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-medium text-amber-900 mb-2">Unlinked Requirements</h4>
                <p className="text-sm text-amber-700">
                  {requirementsData.filter(r => !r.linkedDesignId).length} requirements are not yet linked to design versions
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Requirements;
