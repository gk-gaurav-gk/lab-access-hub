import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CustomersTable } from "@/components/admin/CustomersTable";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Grid3X3,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/admin/customers", icon: Users },
  { label: "Workspaces", href: "/dashboard/admin/workspaces", icon: FolderKanban },
  { label: "Role Matrix", href: "/dashboard/admin/matrix", icon: Grid3X3 },
  { label: "Permissions", href: "/dashboard/admin/permissions", icon: Shield },
];

export default function AdminCustomers() {
  return (
    <DashboardLayout
      role="Platform Admin"
      userName="Admin User"
      navItems={navItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground">
            Master customer registry - create and manage all platform customers
          </p>
        </div>

        <CustomersTable />
      </div>
    </DashboardLayout>
  );
}
