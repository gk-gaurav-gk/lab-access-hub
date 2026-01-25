import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Shield, Eye, Edit, Lock } from "lucide-react";

const getAccessIcon = (access: string) => {
  switch (access) {
    case "view":
      return <Eye className="w-3 h-3" />;
    case "create/edit":
      return <Edit className="w-3 h-3" />;
    case "full_control":
      return <Shield className="w-3 h-3" />;
    case "none":
      return <Lock className="w-3 h-3" />;
    default:
      return null;
  }
};

const getAccessBadge = (access: string) => {
  switch (access) {
    case "view":
      return (
        <Badge variant="outline" className="gap-1">
          {getAccessIcon(access)} View
        </Badge>
      );
    case "create/edit":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 gap-1">
          {getAccessIcon(access)} Create/Edit
        </Badge>
      );
    case "full_control":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1">
          {getAccessIcon(access)} Full Control
        </Badge>
      );
    case "none":
      return (
        <Badge variant="secondary" className="gap-1 opacity-50">
          {getAccessIcon(access)} No Access
        </Badge>
      );
    default:
      return null;
  }
};

export function ModuleAccessCards() {
  const { moduleAccess } = useWorkspace();

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Module-Level Permissions</h3>
        <p className="text-sm text-muted-foreground">
          Defines which modules are visible and accessible for each role after login.
          This prevents blank pages and ensures consistent user experience.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {moduleAccess.map((roleAccess) => (
          <Card key={roleAccess.role}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                {roleAccess.role}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roleAccess.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-medium">{mod.name}</span>
                    {getAccessBadge(mod.access)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
