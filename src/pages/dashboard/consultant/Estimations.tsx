import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEstimations, InternalEstimation } from "@/context/EstimationContext";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Calculator,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Users,
  BookOpen,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: Briefcase },
  { label: "Estimations", href: "/dashboard/consultant/estimations", icon: Calculator },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Knowledge Hub", href: "/dashboard/consultant/knowledge", icon: BookOpen },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: BarChart3 },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700", icon: Clock },
  tech_review: { label: "Tech Review", color: "bg-blue-100 text-blue-700", icon: Users },
  consultant_review: { label: "Consultant Review", color: "bg-purple-100 text-purple-700", icon: Eye },
  approved_for_discussion: { label: "Ready for Discussion", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  locked: { label: "Locked", color: "bg-amber-100 text-amber-700", icon: Lock },
};

const Estimations = () => {
  const { estimations, updateInternalEstimate, approveForDiscussion, lockEstimation } = useEstimations();
  const { myProjects } = useWorkspaceProjects();
  const [selectedEstimation, setSelectedEstimation] = useState<InternalEstimation | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    internalEstimateMin: 0,
    internalEstimateMax: 0,
    marginPercentage: 0,
    benchmarkAdjustment: 0,
    riskBuffer: 0,
    consultantNotes: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleEditClick = (estimation: InternalEstimation) => {
    setSelectedEstimation(estimation);
    setEditForm({
      internalEstimateMin: estimation.internalEstimateMin,
      internalEstimateMax: estimation.internalEstimateMax,
      marginPercentage: estimation.marginPercentage,
      benchmarkAdjustment: estimation.benchmarkAdjustment,
      riskBuffer: estimation.riskBuffer,
      consultantNotes: estimation.consultantNotes || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEstimate = () => {
    if (selectedEstimation) {
      updateInternalEstimate(selectedEstimation.id, editForm);
      toast({
        title: "Estimation Updated",
        description: "Internal estimates have been saved successfully.",
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleApprove = (estimation: InternalEstimation) => {
    approveForDiscussion(estimation.id, "Sarah Mitchell");
    toast({
      title: "Approved for Discussion",
      description: "This estimation is now ready for client discussion.",
    });
  };

  const handleLock = (estimation: InternalEstimation) => {
    lockEstimation(estimation.id, "Sarah Mitchell");
    toast({
      title: "Estimation Locked",
      description: "This estimation has been locked and cannot be modified.",
    });
  };

  // Summary stats
  const totalEstimations = estimations.length;
  const pendingReview = estimations.filter(e => e.status === "consultant_review").length;
  const approvedCount = estimations.filter(e => e.status === "approved_for_discussion").length;
  const lockedCount = estimations.filter(e => e.isLocked).length;

  return (
    <DashboardLayout role="consultant" userName="Sarah Mitchell" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Estimation Management</h1>
            <p className="text-muted-foreground">
              Review, validate, and approve internal project estimations
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Consultant Owner
          </Badge>
        </div>

        {/* Governance Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Internal-Only Data</p>
              <p className="text-sm text-muted-foreground">
                Estimation details including margins and buffers are never visible to customers. 
                Only you can approve estimates for client discussion.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEstimations}</p>
                  <p className="text-sm text-muted-foreground">Total Estimations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingReview}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Ready for Discussion</p>
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
                  <p className="text-sm text-muted-foreground">Locked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estimations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              All Estimations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Design Ver.</TableHead>
                  <TableHead>Customer Budget</TableHead>
                  <TableHead>Internal Estimate</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estimations.map((estimation) => {
                  const StatusIcon = statusConfig[estimation.status].icon;
                  return (
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
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {estimation.customerCostSensitivity}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {estimation.customerPriority}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {estimation.internalEstimateMin > 0 ? (
                          <div>
                            <p className="font-medium text-foreground">
                              {formatCurrency(estimation.internalEstimateMin)} - {formatCurrency(estimation.internalEstimateMax)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Buffer: {formatCurrency(estimation.riskBuffer)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not set</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {estimation.marginPercentage > 0 ? (
                          <Badge className="bg-emerald-100 text-emerald-700">
                            {estimation.marginPercentage}%
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[estimation.status].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[estimation.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!estimation.isLocked && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(estimation)}
                            >
                              Edit
                            </Button>
                          )}
                          {estimation.techFeasibilityApproved && !estimation.consultantApproved && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(estimation)}
                            >
                              Approve
                            </Button>
                          )}
                          {estimation.consultantApproved && !estimation.isLocked && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleLock(estimation)}
                            >
                              <Lock className="w-3 h-3 mr-1" />
                              Lock
                            </Button>
                          )}
                          {estimation.isLocked && (
                            <Badge variant="outline">
                              <Lock className="w-3 h-3 mr-1" />
                              Locked
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Edit Internal Estimation
              </DialogTitle>
              <DialogDescription>
                {selectedEstimation?.projectName} - {selectedEstimation?.designVersion}
              </DialogDescription>
            </DialogHeader>

            {selectedEstimation && (
              <div className="space-y-6">
                {/* Customer Reference */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Customer Budget Reference</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="font-medium">{selectedEstimation.customerBudgetRange}</p>
                    </div>
                    <Badge variant="secondary">{selectedEstimation.customerCostSensitivity}</Badge>
                    <Badge variant="secondary">{selectedEstimation.customerPriority}</Badge>
                  </div>
                </div>

                {/* Tech Inputs Summary */}
                {selectedEstimation.techEffortInputs.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm font-medium text-blue-900 mb-2">Tech Team Inputs</p>
                    <div className="space-y-2">
                      {selectedEstimation.techEffortInputs.map((input) => (
                        <div key={input.id} className="flex justify-between text-sm">
                          <span className="text-blue-700">{input.category}</span>
                          <span className="font-medium text-blue-900">
                            {input.effortHours}h ({input.complexityLevel})
                          </span>
                        </div>
                      ))}
                    </div>
                    {selectedEstimation.techFeasibilityApproved && (
                      <p className="text-xs text-blue-600 mt-2">
                        ✓ Feasibility approved by {selectedEstimation.techFeasibilityBy}
                      </p>
                    )}
                  </div>
                )}

                {/* Estimation Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estimate Min ($)</Label>
                    <Input
                      type="number"
                      value={editForm.internalEstimateMin}
                      onChange={(e) => setEditForm({ ...editForm, internalEstimateMin: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimate Max ($)</Label>
                    <Input
                      type="number"
                      value={editForm.internalEstimateMax}
                      onChange={(e) => setEditForm({ ...editForm, internalEstimateMax: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Margin (%)</Label>
                    <Input
                      type="number"
                      value={editForm.marginPercentage}
                      onChange={(e) => setEditForm({ ...editForm, marginPercentage: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">Not visible to Tech/Sales</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Benchmark Adj ($)</Label>
                    <Input
                      type="number"
                      value={editForm.benchmarkAdjustment}
                      onChange={(e) => setEditForm({ ...editForm, benchmarkAdjustment: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Risk Buffer ($)</Label>
                    <Input
                      type="number"
                      value={editForm.riskBuffer}
                      onChange={(e) => setEditForm({ ...editForm, riskBuffer: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Consultant Notes</Label>
                  <Textarea
                    placeholder="Add validation notes, benchmark references, or risk justifications..."
                    value={editForm.consultantNotes}
                    onChange={(e) => setEditForm({ ...editForm, consultantNotes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEstimate}>
                Save Estimation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Governance Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Estimation Governance Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Tech Team must approve feasibility before Consultant can validate estimate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Only Consultant can mark estimate as "Approved for Discussion"</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Sales cannot discuss costs with clients until estimate is approved</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Margin percentages are never visible to Tech or Sales roles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Locked estimations require a new version for any changes</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Estimations;
