import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { CustomersTable } from "@/components/admin/CustomersTable";
import { RoleMatrixTable } from "@/components/admin/RoleMatrixTable";
import { ModuleAccessCards } from "@/components/admin/ModuleAccessCards";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Shield,
  Grid3X3,
  Plus,
  CheckCircle2,
  Clock,
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

export default function AdminDashboard() {
  const { workspaces, customers, teamMembers } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);

  // Stats
  const activeWorkspaces = workspaces.filter((ws) => ws.status === "active").length;
  const draftWorkspaces = workspaces.filter((ws) => ws.status === "draft").length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const onboardingCustomers = customers.filter((c) => c.status === "onboarding").length;

  // Filter workspaces
  const filteredWorkspaces = workspaces.filter(
    (ws) =>
      ws.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Administration</h1>
          <p className="text-muted-foreground">
            Manage customers, workspaces, role assignments, and platform access
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <FolderKanban className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeWorkspaces}</p>
                  <p className="text-sm text-muted-foreground">Active Workspaces</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{draftWorkspaces}</p>
                  <p className="text-sm text-muted-foreground">Draft Workspaces</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCustomers}</p>
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{onboardingCustomers}</p>
                  <p className="text-sm text-muted-foreground">Onboarding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="matrix">Role Matrix</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <CustomersTable />
          </TabsContent>

          {/* Workspaces Tab */}
          <TabsContent value="workspaces" className="space-y-4">
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
              <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
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
                      Set up a common workspace for a customer project. This is the single source of truth for all project data.
                    </DialogDescription>
                  </DialogHeader>
                  <WorkspaceForm onClose={() => setIsCreateWorkspaceOpen(false)} />
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
                      <TableCell>{getStatusBadge(ws.status)}</TableCell>
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

            {/* Workspace linking info */}
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
          </TabsContent>

          {/* Role Matrix Tab */}
          <TabsContent value="matrix" className="space-y-4">
            <RoleMatrixTable />
            
            {/* Role Allocation by Workspace */}
            <Card>
              <CardHeader>
                <CardTitle>Role Allocation by Workspace</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Consultant</TableHead>
                      <TableHead>Tech Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workspaces.map((ws) => (
                      <TableRow key={ws.id}>
                        <TableCell className="font-medium">{ws.projectName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>{ws.customerName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {ws.assignment.sales ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>{ws.assignment.sales.name.split(" ")[0]}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-muted-foreground">Unassigned</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {ws.assignment.consultant ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>{ws.assignment.consultant.name.split(" ")[0]}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-muted-foreground">Unassigned</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {ws.assignment.techTeam.length > 0 ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>
                                {ws.assignment.techTeam.map((t) => t.specialty).join(" + ")}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-muted-foreground">Unassigned</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <ModuleAccessCards />
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Platform Data Hierarchy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium text-foreground mb-2">Data Flow:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>1. <strong>Customers</strong> tab creates the entity</p>
                  <p>2. <strong>Workspaces</strong> tab creates the project container</p>
                  <p>3. <strong>Role Matrix + Permissions</strong> decide visibility</p>
                  <p>4. Other dashboards <strong>consume data</strong>, they don't create it</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Key Principle:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• No customer exists unless created in Customers tab</li>
                  <li>• No project appears unless a workspace exists</li>
                  <li>• Role dashboards are read-only consumers of this data</li>
                  <li>• This ensures enterprise-grade governance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Workspace creation form component
function WorkspaceForm({ onClose }: { onClose: () => void }) {
  const { customers, teamMembers, createWorkspace } = useWorkspace();
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
