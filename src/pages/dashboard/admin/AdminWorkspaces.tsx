import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkspace, Workspace } from "@/context/WorkspaceContext";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Grid3X3,
  Shield,
  Plus,
  AlertCircle,
  Eye,
  Edit,
  Search,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { label: "Workspaces", href: "/dashboard/admin/workspaces", icon: FolderKanban },
  { label: "Role Matrix", href: "/dashboard/admin/matrix", icon: Grid3X3 },
  { label: "Permissions", href: "/dashboard/admin/permissions", icon: Shield },
];

export default function AdminWorkspaces() {
  const { workspaces, customers, teamMembers, createWorkspace, updateWorkspace } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredWorkspaces = workspaces.filter(
    (ws) =>
      ws.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (workspaceId: string, newStatus: Workspace["status"]) => {
    updateWorkspace(workspaceId, { status: newStatus });
    if (newStatus === "completed") {
      toast({
        title: "Workspace completed",
        description: "A Knowledge Hub entry has been automatically created for this project.",
      });
    } else {
      toast({
        title: "Status updated",
        description: `Workspace status changed to ${newStatus}.`,
      });
    }
  };

  const getStatusBadge = (status: Workspace["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>;
      case "draft":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Draft</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Completed</Badge>;
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      role="Platform Admin"
      userName="Admin User"
      navItems={navItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workspace Management</h1>
          <p className="text-muted-foreground">
            Single source of truth for all lab projects and role assignments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Set up a common workspace for a customer project
                </DialogDescription>
              </DialogHeader>
              <WorkspaceForm 
                customers={customers}
                teamMembers={teamMembers}
                createWorkspace={createWorkspace}
                onClose={() => setIsCreateOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workspace Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sales Rep</TableHead>
                <TableHead>Consultant</TableHead>
                <TableHead>Tech Team(s)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkspaces.map((ws) => (
                <TableRow key={ws.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ws.projectName}</p>
                      <p className="text-xs text-muted-foreground">{ws.projectId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{ws.customerName}</p>
                      <p className="text-xs text-muted-foreground">{ws.customerOrganization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={ws.status}
                      onValueChange={(value: Workspace["status"]) => handleStatusChange(ws.id, value)}
                    >
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            Draft
                          </span>
                        </SelectItem>
                        <SelectItem value="active">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        </SelectItem>
                        <SelectItem value="completed">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Completed
                          </span>
                        </SelectItem>
                        <SelectItem value="archived">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            Archived
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {ws.assignment.sales ? (
                      <span className="text-sm">{ws.assignment.sales.name}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ws.assignment.consultant ? (
                      <span className="text-sm">{ws.assignment.consultant.name}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ws.assignment.techTeam.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {ws.assignment.techTeam.map((tm) => (
                          <Badge key={tm.id} variant="outline" className="text-xs">
                            {tm.specialty}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">How Workspaces Link to Other Roles</h4>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• <strong>Customer dashboard</strong> → shows only their workspace(s)</li>
                  <li>• <strong>Sales</strong> → sees commercial & approval data from workspace</li>
                  <li>• <strong>Tech</strong> → sees designs & tasks from workspace</li>
                  <li>• <strong>Consultant</strong> → sees requirements, risks, approvals</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  If a workspace is not created here, nothing appears anywhere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Workspace form component
function WorkspaceForm({ 
  customers, 
  teamMembers, 
  createWorkspace, 
  onClose 
}: { 
  customers: any[];
  teamMembers: any[];
  createWorkspace: any;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    customerId: "",
    projectName: "",
    status: "draft" as "draft" | "active",
    salesId: "",
    consultantId: "",
    techIds: [] as string[],
  });

  const salesMembers = teamMembers.filter((tm) => tm.role === "sales");
  const consultantMembers = teamMembers.filter((tm) => tm.role === "consultant");
  const techMembers = teamMembers.filter((tm) => tm.role === "tech");

  const handleSubmit = () => {
    if (!formData.customerId || !formData.projectName) {
      toast({
        title: "Required fields missing",
        description: "Please select a customer and enter a project name.",
        variant: "destructive",
      });
      return;
    }

    const customer = customers.find((c) => c.id === formData.customerId);
    if (!customer) return;

    createWorkspace({
      projectId: `proj-${Date.now()}`,
      projectName: formData.projectName,
      customerId: customer.id,
      customerName: customer.name,
      customerOrganization: customer.organization,
      customerIndustry: customer.industry,
      status: formData.status,
      assignment: {
        sales: teamMembers.find((tm) => tm.id === formData.salesId) || null,
        consultant: teamMembers.find((tm) => tm.id === formData.consultantId) || null,
        techTeam: teamMembers.filter((tm) => formData.techIds.includes(tm.id)),
      },
      createdBy: "Platform Admin",
    });

    toast({
      title: "Workspace created",
      description: `Workspace for "${formData.projectName}" has been created.`,
    });

    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label>Customer *</Label>
        <Select
          value={formData.customerId}
          onValueChange={(value) => setFormData({ ...formData, customerId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name} - {c.organization}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Workspace Name *</Label>
          <Input
            placeholder="e.g., Molecular Research Lab Phase 1"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: "draft" | "active") => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <h4 className="text-sm font-medium mb-3">Role Assignments (Optional)</h4>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Sales / Pre-Sales</Label>
            <Select
              value={formData.salesId}
              onValueChange={(value) => setFormData({ ...formData, salesId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sales rep" />
              </SelectTrigger>
              <SelectContent>
                {salesMembers.map((tm) => (
                  <SelectItem key={tm.id} value={tm.id}>
                    {tm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Consultant</Label>
            <Select
              value={formData.consultantId}
              onValueChange={(value) => setFormData({ ...formData, consultantId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select consultant" />
              </SelectTrigger>
              <SelectContent>
                {consultantMembers.map((tm) => (
                  <SelectItem key={tm.id} value={tm.id}>
                    {tm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label>Tech Team(s)</Label>
          <div className="grid grid-cols-2 gap-2">
            {techMembers.map((tm) => (
              <label
                key={tm.id}
                className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={formData.techIds.includes(tm.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, techIds: [...formData.techIds, tm.id] });
                    } else {
                      setFormData({
                        ...formData,
                        techIds: formData.techIds.filter((id) => id !== tm.id),
                      });
                    }
                  }}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium">{tm.name}</p>
                  <p className="text-xs text-muted-foreground">{tm.specialty}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Plus className="w-4 h-4 mr-2" />
          Create Workspace
        </Button>
      </DialogFooter>
    </div>
  );
}
