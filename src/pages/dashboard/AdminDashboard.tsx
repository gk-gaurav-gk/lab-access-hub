import { useState } from "react";
import { Link } from "react-router-dom";
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
import { useWorkspace, Workspace, TeamMember } from "@/context/WorkspaceContext";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Shield,
  Grid3X3,
  Plus,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
  Settings,
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
  const { workspaces, customers, teamMembers, rolePermissions } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);

  // Stats
  const activeWorkspaces = workspaces.filter((ws) => ws.status === "active").length;
  const draftWorkspaces = workspaces.filter((ws) => ws.status === "draft").length;
  const completedOnboardings = customers.filter((c) => c.onboardingStatus === "completed").length;
  const pendingOnboardings = customers.filter((c) => c.onboardingStatus === "in_progress").length;

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

  const getOnboardingBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>;
      case "not_started":
        return <Badge variant="secondary">Not Started</Badge>;
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
            Manage workspaces, role assignments, and platform access
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
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
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
                  <p className="text-2xl font-bold">{completedOnboardings}</p>
                  <p className="text-sm text-muted-foreground">Onboarded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="workspaces" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="matrix">Role Matrix</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

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
                      Set up a common workspace for a customer project
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
                    <TableHead>Project</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Consultant</TableHead>
                    <TableHead>Tech Team</TableHead>
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
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Onboarding</TableHead>
                    <TableHead>Onboarded By</TableHead>
                    <TableHead>Active Projects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {customer.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.organization}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.industry}</Badge>
                      </TableCell>
                      <TableCell>{getOnboardingBadge(customer.onboardingStatus)}</TableCell>
                      <TableCell>
                        {customer.onboardedBy ? (
                          <div>
                            <p className="text-sm">{customer.onboardedBy}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              ({customer.onboardedByRole})
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Self</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{customer.activeProjectsCount}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Role Matrix Tab */}
          <TabsContent value="matrix" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role Allocation Matrix</CardTitle>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rolePermissions.map((perm) => (
                <Card key={perm.role}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      {perm.role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Can View</h4>
                      <div className="flex flex-wrap gap-1">
                        {perm.canView.map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Can Edit</h4>
                      <div className="flex flex-wrap gap-1">
                        {perm.canEdit.length > 0 ? (
                          perm.canEdit.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">Read-only</span>
                        )}
                      </div>
                    </div>
                    {perm.canApprove.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Can Approve</h4>
                        <div className="flex flex-wrap gap-1">
                          {perm.canApprove.map((item) => (
                            <Badge key={item} className="text-xs bg-emerald-100 text-emerald-700">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Platform Admin Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium text-foreground mb-2">What you manage:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create and manage project workspaces</li>
                  <li>• Assign Sales, Consultants, and Tech to projects</li>
                  <li>• Monitor role allocations and visibility</li>
                  <li>• Ensure correct access across the platform</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What you don't do:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Design labs or review specifications</li>
                  <li>• Handle customer communications</li>
                  <li>• Manage sales or commercial decisions</li>
                  <li>• Perform technical feasibility assessments</li>
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
    salesId: "",
    consultantId: "",
    techIds: [] as string[],
  });

  const salesMembers = teamMembers.filter((tm) => tm.role === "sales");
  const consultantMembers = teamMembers.filter((tm) => tm.role === "consultant");
  const techMembers = teamMembers.filter((tm) => tm.role === "tech");

  const selectedCustomer = customers.find((c) => c.id === formData.customerId);

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
      status: "draft",
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

      <div className="space-y-2">
        <Label>Project Name *</Label>
        <Input
          placeholder="e.g., Molecular Research Lab Phase 1"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
        />
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
          <Label>Tech Team</Label>
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
