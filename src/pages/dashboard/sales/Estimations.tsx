import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/dashboard/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEstimations } from "@/context/EstimationContext";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Clock,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  FileCheck,
  AlertTriangle,
  ShieldAlert,
  Phone,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  tech_review: { label: "Tech Review", color: "bg-blue-100 text-blue-700" },
  consultant_review: { label: "Under Review", color: "bg-purple-100 text-purple-700" },
  approved_for_discussion: { label: "Ready to Discuss", color: "bg-green-100 text-green-700" },
  locked: { label: "Locked", color: "bg-amber-100 text-amber-700" },
};

const Estimations = () => {
  const { estimations, initiateEstimation, canSalesViewEstimate } = useEstimations();
  const { myProjects } = useWorkspaceProjects();

  // Stats - Sales only sees status, not internal numbers
  const pendingCount = estimations.filter(e => 
    e.status === "draft" || e.status === "tech_review" || e.status === "consultant_review"
  ).length;
  const readyForDiscussion = estimations.filter(e => e.status === "approved_for_discussion").length;
  const lockedCount = estimations.filter(e => e.isLocked).length;

  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Estimation Status</h1>
            <p className="text-muted-foreground">Track estimation progress and readiness for client discussions</p>
          </div>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Request Estimation
          </Button>
        </div>

        {/* Important Notice - Sales Visibility */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">Limited Visibility</p>
              <p className="text-sm text-amber-700">
                You can view estimation status but not internal pricing details. 
                Cost discussions with clients must only occur after Consultant approval.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{readyForDiscussion}</p>
                  <p className="text-sm text-muted-foreground">Ready for Client Call</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lockedCount}</p>
                  <p className="text-sm text-muted-foreground">Finalized</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Governance Rules */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Sales Estimation Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <span>You can initiate estimation requests for projects</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span>You cannot view internal pricing, margins, or buffers</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <ShieldAlert className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span>Do NOT discuss costs with clients until status shows "Ready to Discuss"</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Estimations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Estimations</CardTitle>
          </CardHeader>
          <CardContent>
            {estimations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Design Version</TableHead>
                    <TableHead>Customer Budget</TableHead>
                    <TableHead>Tech Feasibility</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estimations.map((estimation) => (
                    <TableRow key={estimation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{estimation.projectName}</p>
                          <p className="text-xs text-muted-foreground">
                            Initiated: {estimation.initiatedAt}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{estimation.designVersion}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{estimation.customerBudgetRange}</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {estimation.customerCostSensitivity}
                            </Badge>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {estimation.customerPriority}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {estimation.techFeasibilityApproved ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[estimation.status].color}>
                          {estimation.isLocked && <Lock className="w-3 h-3 mr-1" />}
                          {statusConfig[estimation.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {canSalesViewEstimate(estimation.id) ? (
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Status
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <EyeOff className="w-3 h-3" />
                            Awaiting approval
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState 
                icon={DollarSign}
                title="No estimations yet"
                description="Request estimations for projects to track their progress."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Estimations;
