import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RoleMatrixTable } from "@/components/admin/RoleMatrixTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Grid3X3,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { label: "Workspaces", href: "/dashboard/admin/workspaces", icon: FolderKanban },
  { label: "Role Matrix", href: "/dashboard/admin/matrix", icon: Grid3X3 },
  { label: "Permissions", href: "/dashboard/admin/permissions", icon: Shield },
];

export default function AdminRoleMatrix() {
  const { workspaces } = useWorkspace();

  return (
    <DashboardLayout
      role="Platform Admin"
      userName="Admin User"
      navItems={navItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Role Matrix</h1>
          <p className="text-muted-foreground">
            View role capabilities and workspace allocations for governance and audit clarity
          </p>
        </div>

        <RoleMatrixTable />

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
      </div>
    </DashboardLayout>
  );
}
