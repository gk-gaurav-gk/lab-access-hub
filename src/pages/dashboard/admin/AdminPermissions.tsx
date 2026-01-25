import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ModuleAccessCards } from "@/components/admin/ModuleAccessCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Grid3X3,
  Shield,
  AlertCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { label: "Workspaces", href: "/dashboard/admin/workspaces", icon: FolderKanban },
  { label: "Role Matrix", href: "/dashboard/admin/matrix", icon: Grid3X3 },
  { label: "Permissions", href: "/dashboard/admin/permissions", icon: Shield },
];

export default function AdminPermissions() {
  const { rolePermissions } = useWorkspace();

  return (
    <DashboardLayout
      role="Platform Admin"
      userName="Admin User"
      navItems={navItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Permissions</h1>
          <p className="text-muted-foreground">
            Module-level access controls that determine what each role can see and do
          </p>
        </div>

        <ModuleAccessCards />

        <Card>
          <CardHeader>
            <CardTitle>Role Permission Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rolePermissions.map((perm) => (
                <Card key={perm.role} className="bg-muted/30">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-medium">{perm.role}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Can View</h4>
                      <div className="flex flex-wrap gap-1">
                        {perm.canView.map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">Can Edit</h4>
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
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">Can Approve</h4>
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
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Permission Enforcement</h4>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Permissions control which sidebar tabs appear after login</li>
                  <li>• Actions are enabled/disabled based on role access level</li>
                  <li>• This prevents "blank page" issues and ensures consistent UX</li>
                  <li>• Changes to permissions affect all users with that role</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
