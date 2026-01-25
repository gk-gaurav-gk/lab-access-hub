import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/WorkspaceContext";
import { CustomerForm } from "./CustomerForm";
import { Plus, Search, MoreHorizontal, UserPlus, Eye, FolderKanban } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function CustomersTable() {
  const { customers, teamMembers, getWorkspacesByCustomer, assignCustomerSales, assignCustomerConsultant } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [assigningCustomerId, setAssigningCustomerId] = useState<string | null>(null);
  const [assignType, setAssignType] = useState<"sales" | "consultant" | null>(null);

  const salesMembers = teamMembers.filter((tm) => tm.role === "sales");
  const consultantMembers = teamMembers.filter((tm) => tm.role === "consultant");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>;
      case "onboarding":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Onboarding</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return null;
    }
  };

  const getTeamMemberName = (id: string | null) => {
    if (!id) return null;
    return teamMembers.find((tm) => tm.id === id)?.name || null;
  };

  const handleAssign = (customerId: string, type: "sales" | "consultant", memberId: string) => {
    if (type === "sales") {
      assignCustomerSales(customerId, memberId);
    } else {
      assignCustomerConsultant(customerId, memberId);
    }
    toast({
      title: "Assignment updated",
      description: `${type === "sales" ? "Sales rep" : "Consultant"} has been assigned.`,
    });
    setAssigningCustomerId(null);
    setAssignType(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to the platform. This is the master customer registry.
              </DialogDescription>
            </DialogHeader>
            <CustomerForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Sales Rep</TableHead>
              <TableHead>Consultant</TableHead>
              <TableHead>Workspaces</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => {
              const workspaceCount = getWorkspacesByCustomer(customer.id).length;
              return (
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
                  <TableCell>
                    {assigningCustomerId === customer.id && assignType === "sales" ? (
                      <Select
                        onValueChange={(value) => handleAssign(customer.id, "sales", value)}
                        defaultValue={customer.assignedSalesId || undefined}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {salesMembers.map((tm) => (
                            <SelectItem key={tm.id} value={tm.id}>
                              {tm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <button
                        onClick={() => {
                          setAssigningCustomerId(customer.id);
                          setAssignType("sales");
                        }}
                        className="text-sm hover:underline text-left"
                      >
                        {getTeamMemberName(customer.assignedSalesId) || (
                          <span className="text-muted-foreground">+ Assign</span>
                        )}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    {assigningCustomerId === customer.id && assignType === "consultant" ? (
                      <Select
                        onValueChange={(value) => handleAssign(customer.id, "consultant", value)}
                        defaultValue={customer.assignedConsultantId || undefined}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {consultantMembers.map((tm) => (
                            <SelectItem key={tm.id} value={tm.id}>
                              {tm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <button
                        onClick={() => {
                          setAssigningCustomerId(customer.id);
                          setAssignType("consultant");
                        }}
                        className="text-sm hover:underline text-left"
                      >
                        {getTeamMemberName(customer.assignedConsultantId) || (
                          <span className="text-muted-foreground">+ Assign</span>
                        )}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{workspaceCount}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FolderKanban className="w-4 h-4 mr-2" />
                          View Workspaces
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setAssigningCustomerId(customer.id);
                            setAssignType("sales");
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Assign Sales
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setAssigningCustomerId(customer.id);
                            setAssignType("consultant");
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Assign Consultant
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
