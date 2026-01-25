import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Eye, Edit, Check, Minus, AlertCircle } from "lucide-react";

const getCapabilityBadge = (capability: string) => {
  switch (capability) {
    case "view":
      return (
        <Badge variant="outline" className="gap-1">
          <Eye className="w-3 h-3" /> View
        </Badge>
      );
    case "create/edit":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 gap-1">
          <Edit className="w-3 h-3" /> Create/Edit
        </Badge>
      );
    case "approve":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1">
          <Check className="w-3 h-3" /> Approve
        </Badge>
      );
    case "approve_internal":
      return (
        <Badge className="bg-purple-100 text-purple-700 border-purple-200 gap-1">
          <Check className="w-3 h-3" /> Approve (Internal)
        </Badge>
      );
    case "validate":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
          <AlertCircle className="w-3 h-3" /> Validate
        </Badge>
      );
    case "submit":
      return (
        <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 gap-1">
          Submit
        </Badge>
      );
    case "track_status":
      return (
        <Badge variant="secondary" className="gap-1">
          Track Status
        </Badge>
      );
    case "input_only":
      return (
        <Badge variant="secondary" className="gap-1">
          Input Only
        </Badge>
      );
    case "—":
      return (
        <span className="text-muted-foreground flex items-center gap-1">
          <Minus className="w-3 h-3" /> No Access
        </span>
      );
    default:
      return <span className="text-muted-foreground">—</span>;
  }
};

export function RoleMatrixTable() {
  const { roleCapabilities } = useWorkspace();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Capability Matrix</CardTitle>
        <CardDescription>
          Defines what each role can view, create/edit, or approve across platform modules.
          This matrix governs sidebar visibility and action permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Module</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Consultant</TableHead>
              <TableHead>Tech Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roleCapabilities.map((cap) => (
              <TableRow key={cap.module}>
                <TableCell className="font-medium">{cap.module}</TableCell>
                <TableCell>{getCapabilityBadge(cap.customer)}</TableCell>
                <TableCell>{getCapabilityBadge(cap.sales)}</TableCell>
                <TableCell>{getCapabilityBadge(cap.consultant)}</TableCell>
                <TableCell>{getCapabilityBadge(cap.tech)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
