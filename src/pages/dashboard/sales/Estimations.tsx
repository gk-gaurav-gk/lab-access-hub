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
  AlertTriangle,
  CheckCircle,
  Lock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Settings,
  FileCheck,
  Calendar,
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

// Mock estimations data
const mockEstimations = [
  {
    id: '1',
    projectName: 'Pharma Lab - Building A',
    client: 'PharmaCorp International',
    designVersion: 'v3.2',
    estimateRange: '$420K - $480K',
    lastApproved: '$450,000',
    current: '$465,000',
    status: 'pending',
    feasibilityApproved: true,
    customerApproved: false,
    changeReason: 'Additional cleanroom requirements',
    changeType: 'requirement',
    costImpact: '+3.3%',
    timelineImpact: '+1 week',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    projectName: 'Research Center - Phase 1',
    client: 'BioGen Research',
    designVersion: 'v2.0',
    estimateRange: '$250K - $300K',
    lastApproved: '$280,000',
    current: '$280,000',
    status: 'approved',
    feasibilityApproved: true,
    customerApproved: true,
    changeReason: null,
    changeType: null,
    costImpact: null,
    timelineImpact: null,
    updatedAt: '2024-01-15'
  },
  {
    id: '3',
    projectName: 'Biotech Facility',
    client: 'NanoTech Labs',
    designVersion: 'v1.0',
    estimateRange: '$300K - $400K',
    lastApproved: null,
    current: '$350,000',
    status: 'pending',
    feasibilityApproved: false,
    customerApproved: false,
    changeReason: null,
    changeType: null,
    costImpact: null,
    timelineImpact: null,
    updatedAt: '2024-01-18'
  },
  {
    id: '4',
    projectName: 'Pharma Lab - Building A',
    client: 'PharmaCorp International',
    designVersion: 'v3.1',
    estimateRange: '$400K - $460K',
    lastApproved: '$430,000',
    current: '$450,000',
    status: 'superseded',
    feasibilityApproved: true,
    customerApproved: true,
    changeReason: 'Design revision - lab layout changes',
    changeType: 'design',
    costImpact: '+4.7%',
    timelineImpact: '+2 weeks',
    updatedAt: '2024-01-12'
  }
];

const Estimations = () => {
  const { projects } = useProjects();

  // Stats
  const pendingCount = mockEstimations.filter(e => e.status === 'pending').length;
  const approvedCount = mockEstimations.filter(e => e.status === 'approved').length;
  const awaitingFeasibility = mockEstimations.filter(e => !e.feasibilityApproved).length;
  const totalApproved = mockEstimations
    .filter(e => e.status === 'approved')
    .reduce((acc, e) => acc + parseInt(e.current.replace(/[^0-9]/g, '')), 0);

  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Estimations</h1>
            <p className="text-muted-foreground">Pricing governance linked to design versions</p>
          </div>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            New Estimation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Locked</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{awaitingFeasibility}</p>
                <p className="text-sm text-muted-foreground">Awaiting Feasibility</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${(totalApproved / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Approved Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Rules */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Estimation Governance</p>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Estimates cannot be finalized without Tech feasibility approval</li>
                <li>• Estimates cannot be locked without customer approval</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Estimations List */}
        {mockEstimations.filter(e => e.status !== 'superseded').length > 0 ? (
          <div className="space-y-4">
            {mockEstimations.filter(e => e.status !== 'superseded').map((estimation) => (
              <div key={estimation.id} className={`bg-card rounded-xl shadow-card border overflow-hidden ${
                estimation.status === 'approved' ? 'border-emerald-200' : 'border-border'
              }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{estimation.projectName}</h3>
                        <Badge variant="outline" className="bg-secondary">
                          {estimation.designVersion}
                        </Badge>
                        {estimation.status === 'approved' && (
                          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{estimation.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{estimation.current}</p>
                      <p className="text-xs text-muted-foreground">Range: {estimation.estimateRange}</p>
                    </div>
                  </div>

                  {/* Change Impact */}
                  {estimation.changeReason && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <RefreshCw className="w-4 h-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-900">Change Impact</p>
                            <p className="text-sm text-amber-700">{estimation.changeReason}</p>
                            <Badge variant="outline" className="text-xs mt-1 bg-amber-100 text-amber-700 border-amber-200">
                              {estimation.changeType === 'design' ? 'Design Change' : 'Requirement Change'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-amber-700">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-medium">{estimation.costImpact}</span>
                            </div>
                            <p className="text-xs text-amber-600">Cost</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-amber-700">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{estimation.timelineImpact}</span>
                            </div>
                            <p className="text-xs text-amber-600">Timeline</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Approval Status */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                    <div className={`rounded-lg p-3 ${estimation.feasibilityApproved ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                      <div className="flex items-center gap-2">
                        {estimation.feasibilityApproved ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-600" />
                        )}
                        <div>
                          <p className={`font-medium ${estimation.feasibilityApproved ? 'text-emerald-900' : 'text-amber-900'}`}>
                            Feasibility
                          </p>
                          <p className={`text-sm ${estimation.feasibilityApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {estimation.feasibilityApproved ? 'Approved by Tech' : 'Awaiting Tech approval'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-lg p-3 ${estimation.customerApproved ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                      <div className="flex items-center gap-2">
                        {estimation.customerApproved ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-600" />
                        )}
                        <div>
                          <p className={`font-medium ${estimation.customerApproved ? 'text-emerald-900' : 'text-amber-900'}`}>
                            Customer
                          </p>
                          <p className={`text-sm ${estimation.customerApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {estimation.customerApproved ? 'Approved by customer' : 'Awaiting customer approval'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comparison with Last Approved */}
                  {estimation.lastApproved && estimation.lastApproved !== estimation.current && (
                    <div className="flex items-center gap-4 py-3 border-t border-border text-sm">
                      <span className="text-muted-foreground">Last Approved:</span>
                      <span className="font-medium text-foreground">{estimation.lastApproved}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-medium text-foreground">{estimation.current}</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        Pending Update
                      </Badge>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Updated {estimation.updatedAt}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      {estimation.status !== 'approved' && (
                        <Button 
                          size="sm" 
                          disabled={!estimation.feasibilityApproved || !estimation.customerApproved}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Lock Estimate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={DollarSign}
            title="No estimations yet"
            description="Estimations will appear once designs are ready for pricing."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Estimations;
