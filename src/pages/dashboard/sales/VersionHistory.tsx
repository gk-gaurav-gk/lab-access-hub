import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Clock,
  CheckCircle,
  FileCode,
  User,
  Building,
  Calendar,
  ArrowRight,
  Filter,
  Download,
  GitBranch
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

// Mock version history data - commercial traceability
const mockVersionHistory = [
  {
    id: '1',
    projectName: 'Pharma Lab - Building A',
    client: 'PharmaCorp International',
    designVersion: 'v3.2',
    proposalVersion: 'P-2024-001-R2',
    estimationVersion: 'E-2024-001-R3',
    designApprovedAt: '2024-01-15',
    designApprovedBy: 'Dr. Sarah Williams',
    proposalApprovedAt: '2024-01-15',
    proposalApprovedBy: 'Dr. Sarah Williams',
    estimationLockedAt: '2024-01-16',
    estimationLockedBy: 'Internal - Michael Roberts',
    totalValue: '$465,000',
    status: 'current'
  },
  {
    id: '2',
    projectName: 'Pharma Lab - Building A',
    client: 'PharmaCorp International',
    designVersion: 'v3.1',
    proposalVersion: 'P-2024-001-R1',
    estimationVersion: 'E-2024-001-R2',
    designApprovedAt: '2024-01-10',
    designApprovedBy: 'Dr. Sarah Williams',
    proposalApprovedAt: '2024-01-10',
    proposalApprovedBy: 'Dr. Sarah Williams',
    estimationLockedAt: '2024-01-11',
    estimationLockedBy: 'Internal - Michael Roberts',
    totalValue: '$450,000',
    status: 'superseded'
  },
  {
    id: '3',
    projectName: 'Research Center - Phase 1',
    client: 'BioGen Research',
    designVersion: 'v2.0',
    proposalVersion: 'P-2024-002-R1',
    estimationVersion: 'E-2024-002-R1',
    designApprovedAt: '2024-01-12',
    designApprovedBy: 'Prof. James Wilson',
    proposalApprovedAt: '2024-01-14',
    proposalApprovedBy: 'Prof. James Wilson',
    estimationLockedAt: '2024-01-15',
    estimationLockedBy: 'Internal - Michael Roberts',
    totalValue: '$280,000',
    status: 'current'
  },
  {
    id: '4',
    projectName: 'Pharma Lab - Building A',
    client: 'PharmaCorp International',
    designVersion: 'v3.0',
    proposalVersion: 'P-2024-001',
    estimationVersion: 'E-2024-001-R1',
    designApprovedAt: '2024-01-05',
    designApprovedBy: 'Dr. Sarah Williams',
    proposalApprovedAt: '2024-01-05',
    proposalApprovedBy: 'Dr. Sarah Williams',
    estimationLockedAt: '2024-01-06',
    estimationLockedBy: 'Internal - Michael Roberts',
    totalValue: '$430,000',
    status: 'superseded'
  }
];

const VersionHistory = () => {
  const { projects } = useProjects();

  // Group by project
  const projectGroups = mockVersionHistory.reduce((acc, version) => {
    if (!acc[version.projectName]) {
      acc[version.projectName] = {
        projectName: version.projectName,
        client: version.client,
        versions: []
      };
    }
    acc[version.projectName].versions.push(version);
    return acc;
  }, {} as Record<string, { projectName: string; client: string; versions: typeof mockVersionHistory }>);

  const groupedProjects = Object.values(projectGroups);

  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Version History</h1>
            <p className="text-muted-foreground">Full commercial traceability across designs, proposals, and estimations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Commercial Traceability</p>
              <p className="text-sm text-blue-700">
                Track the complete history of design versions, linked proposals, and estimations with approval timestamps. 
                This helps justify pricing changes transparently.
              </p>
            </div>
          </div>
        </div>

        {/* Version History by Project */}
        {groupedProjects.length > 0 ? (
          <div className="space-y-6">
            {groupedProjects.map((project) => (
              <div key={project.projectName} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                {/* Project Header */}
                <div className="bg-secondary/50 px-5 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{project.projectName}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {project.versions.length} version{project.versions.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>

                {/* Version Timeline */}
                <div className="p-5">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    
                    <div className="space-y-6">
                      {project.versions.map((version, idx) => (
                        <div key={version.id} className="relative pl-10">
                          {/* Timeline dot */}
                          <div className={`absolute left-2 w-4 h-4 rounded-full border-2 ${
                            version.status === 'current' 
                              ? 'bg-emerald-500 border-emerald-500' 
                              : 'bg-secondary border-border'
                          }`} />
                          
                          <div className={`rounded-lg border p-4 ${
                            version.status === 'current' 
                              ? 'border-emerald-200 bg-emerald-50/50' 
                              : 'border-border bg-secondary/30'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {version.status === 'current' && (
                                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                    Current
                                  </Badge>
                                )}
                                {version.status === 'superseded' && (
                                  <Badge variant="outline" className="bg-secondary text-muted-foreground">
                                    Superseded
                                  </Badge>
                                )}
                              </div>
                              <span className="text-lg font-bold text-foreground">{version.totalValue}</span>
                            </div>

                            {/* Version Details Grid */}
                            <div className="grid grid-cols-3 gap-4">
                              {/* Design Version */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                  <FileCode className="w-4 h-4" />
                                  Design
                                </div>
                                <div className="bg-card rounded-lg p-3 border border-border">
                                  <p className="font-medium text-foreground">{version.designVersion}</p>
                                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    {version.designApprovedAt}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    {version.designApprovedBy}
                                  </div>
                                </div>
                              </div>

                              {/* Proposal Version */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                  <FileText className="w-4 h-4" />
                                  Proposal
                                </div>
                                <div className="bg-card rounded-lg p-3 border border-border">
                                  <p className="font-medium text-foreground">{version.proposalVersion}</p>
                                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    {version.proposalApprovedAt}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    {version.proposalApprovedBy}
                                  </div>
                                </div>
                              </div>

                              {/* Estimation Version */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                  <DollarSign className="w-4 h-4" />
                                  Estimation
                                </div>
                                <div className="bg-card rounded-lg p-3 border border-border">
                                  <p className="font-medium text-foreground">{version.estimationVersion}</p>
                                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    {version.estimationLockedAt}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    {version.estimationLockedBy}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Clock}
            title="No version history yet"
            description="Version history will build as approvals occur across designs, proposals, and estimations."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default VersionHistory;
