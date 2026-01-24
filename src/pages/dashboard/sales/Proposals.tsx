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
  Send,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Calendar,
  ArrowRight,
  FileCheck,
  Settings
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

// Mock proposals data
const mockProposals = [
  {
    id: '1',
    name: 'Pharma Lab Complete Design Package',
    client: 'PharmaCorp International',
    projectId: '1',
    projectName: 'Pharma Lab - Building A',
    status: 'approved',
    createdDate: '2024-01-05',
    sentDate: '2024-01-08',
    approvedDate: '2024-01-15',
    value: '$450,000',
    dependencies: [],
    approvalTrail: [
      { action: 'Created', by: 'Michael Roberts', date: '2024-01-05' },
      { action: 'Sent to client', by: 'Michael Roberts', date: '2024-01-08' },
      { action: 'Approved', by: 'Dr. Sarah Williams', date: '2024-01-15' }
    ]
  },
  {
    id: '2',
    name: 'Research Center Phase 1 Proposal',
    client: 'BioGen Research',
    projectId: '2',
    projectName: 'Research Center - Phase 1',
    status: 'sent',
    createdDate: '2024-01-12',
    sentDate: '2024-01-14',
    value: '$280,000',
    dependencies: ['Waiting for design approval'],
    approvalTrail: [
      { action: 'Created', by: 'Michael Roberts', date: '2024-01-12' },
      { action: 'Sent to client', by: 'Michael Roberts', date: '2024-01-14' }
    ]
  },
  {
    id: '3',
    name: 'Biotech Facility Initial Proposal',
    client: 'NanoTech Labs',
    projectId: '3',
    projectName: 'Biotech Facility',
    status: 'draft',
    createdDate: '2024-01-18',
    value: '$350,000',
    dependencies: ['Waiting for feasibility confirmation', 'Waiting for design approval'],
    approvalTrail: [
      { action: 'Created', by: 'Michael Roberts', date: '2024-01-18' }
    ]
  },
  {
    id: '4',
    name: 'Lab Extension Proposal',
    client: 'PharmaCorp International',
    projectId: '1',
    projectName: 'Pharma Lab - Building A',
    status: 'rejected',
    createdDate: '2023-12-01',
    sentDate: '2023-12-05',
    rejectedDate: '2023-12-15',
    rejectedReason: 'Budget constraints - requested revised scope',
    value: '$520,000',
    dependencies: [],
    approvalTrail: [
      { action: 'Created', by: 'Michael Roberts', date: '2023-12-01' },
      { action: 'Sent to client', by: 'Michael Roberts', date: '2023-12-05' },
      { action: 'Rejected', by: 'Dr. Sarah Williams', date: '2023-12-15', reason: 'Budget constraints' }
    ]
  }
];

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle }> = {
  draft: { label: 'Draft', className: 'bg-secondary text-secondary-foreground', icon: Edit },
  sent: { label: 'Sent', className: 'bg-blue-100 text-blue-700 border-blue-200', icon: Send },
  approved: { label: 'Approved', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
};

const Proposals = () => {
  const { projects } = useProjects();

  // Stats
  const draftCount = mockProposals.filter(p => p.status === 'draft').length;
  const sentCount = mockProposals.filter(p => p.status === 'sent').length;
  const approvedCount = mockProposals.filter(p => p.status === 'approved').length;
  const totalValue = mockProposals
    .filter(p => p.status === 'approved')
    .reduce((acc, p) => acc + parseInt(p.value.replace(/[^0-9]/g, '')), 0);

  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Proposals</h1>
            <p className="text-muted-foreground">Manage proposal lifecycle and client submissions</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Edit className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{draftCount}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{sentCount}</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${(totalValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Approved Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        {mockProposals.length > 0 ? (
          <div className="space-y-4">
            {mockProposals.map((proposal) => {
              const status = statusConfig[proposal.status];
              const StatusIcon = status.icon;
              
              return (
                <div key={proposal.id} className={`bg-card rounded-xl shadow-card border overflow-hidden ${
                  proposal.status === 'rejected' ? 'border-red-200 opacity-75' : 'border-border'
                }`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{proposal.name}</h3>
                          <Badge variant="outline" className={status.className}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{proposal.client}</span>
                          <span>•</span>
                          <span>{proposal.projectName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">{proposal.value}</p>
                        <p className="text-xs text-muted-foreground">Proposal Value</p>
                      </div>
                    </div>

                    {/* Dependencies */}
                    {proposal.dependencies.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-900">Dependencies</p>
                            <ul className="text-sm text-amber-700 mt-1">
                              {proposal.dependencies.map((dep, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {dep}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rejected Reason */}
                    {proposal.status === 'rejected' && proposal.rejectedReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-900">Rejection Reason</p>
                            <p className="text-sm text-red-700">{proposal.rejectedReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="flex items-center gap-4 py-3 border-t border-border text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Created {proposal.createdDate}
                      </div>
                      {proposal.sentDate && (
                        <>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-1 text-blue-600">
                            <Send className="w-4 h-4" />
                            Sent {proposal.sentDate}
                          </div>
                        </>
                      )}
                      {proposal.approvedDate && (
                        <>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            Approved {proposal.approvedDate}
                          </div>
                        </>
                      )}
                      {proposal.rejectedDate && (
                        <>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle className="w-4 h-4" />
                            Rejected {proposal.rejectedDate}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      {proposal.status === 'draft' && (
                        <>
                          <Button size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" disabled={proposal.dependencies.length > 0}>
                            <Send className="w-4 h-4 mr-2" />
                            Send to Client
                          </Button>
                        </>
                      )}
                      {proposal.status === 'sent' && (
                        <Button size="sm" variant="outline">
                          <Clock className="w-4 h-4 mr-2" />
                          Awaiting Response
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Approval Trail
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState 
            icon={FileText}
            title="No proposals created yet"
            description="Create your first proposal to start the commercial process."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Proposals;
