import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, DollarSign, TrendingUp, Send, Building, Clock, Eye } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Estimations", href: "/dashboard/sales/estimations", icon: DollarSign },
  { label: "Version History", href: "/dashboard/sales/versions", icon: Clock },
];

const clients = [
  { name: "Genomix Corp", industry: "Biotech", status: "active", value: "$450,000" },
  { name: "MediCare Labs", industry: "Pharmaceutical", status: "proposal", value: "$320,000" },
  { name: "EcoTest Inc", industry: "Environmental", status: "negotiation", value: "$180,000" },
];

const proposals = [
  { title: "Advanced Lab Setup", client: "BioGenetics Ltd", status: "pending", date: "Feb 10, 2024" },
  { title: "Research Facility Expansion", client: "NeuraTech", status: "approved", date: "Feb 5, 2024" },
];

const SalesDashboard = () => {
  return (
    <DashboardLayout role="sales" userName="Michael Roberts" navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Clients"
            value={18}
            icon={Building}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Open Proposals"
            value={7}
            icon={FileText}
          />
          <StatCard
            title="Pipeline Value"
            value="$2.4M"
            icon={DollarSign}
            trend={{ value: 22, isPositive: true }}
          />
          <StatCard
            title="Win Rate"
            value="68%"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clients */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Client Overview</h2>
              <a href="#" className="text-sm text-primary hover:underline">View all</a>
            </div>
            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Client</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Industry</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Value</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {clients.map((client) => (
                    <tr key={client.name} className="hover:bg-secondary/30">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{client.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{client.industry}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={
                          client.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          client.status === "proposal" ? "bg-blue-100 text-blue-700 border-blue-200" :
                          "bg-amber-100 text-amber-700 border-amber-200"
                        }>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{client.value}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Proposals */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Proposals</h2>
                <a href="#" className="text-sm text-primary hover:underline">View all</a>
              </div>
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div key={proposal.title} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">{proposal.client} • {proposal.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={
                        proposal.status === "approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                        "bg-amber-100 text-amber-700 border-amber-200"
                      }>
                        {proposal.status}
                      </Badge>
                      {proposal.status === "approved" && (
                        <Button size="sm">
                          <Send className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity & Quick Actions */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="divide-y divide-border">
                <ActivityItem
                  icon={FileText}
                  title="Proposal sent"
                  description="NeuraTech expansion project"
                  time="2h ago"
                />
                <ActivityItem
                  icon={DollarSign}
                  title="Estimation updated"
                  description="Genomix Corp Phase 2"
                  time="Yesterday"
                />
                <ActivityItem
                  icon={Send}
                  title="Design shared"
                  description="MediCare Labs approved v3"
                  time="2 days ago"
                  iconColor="text-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Permissions info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-semibold text-emerald-900 mb-2">Your Permissions</h3>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>✓ View and manage client details</li>
            <li>✓ Access proposals and estimations</li>
            <li>✓ View version history</li>
            <li>✓ Share approved designs with clients</li>
            <li>✗ Modify technical specifications</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;
