import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/context/ProjectContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Download,
  FileSpreadsheet,
  Presentation,
  FileDown,
  Star,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  BookOpen
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: FolderOpen },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Knowledge Hub", href: "/dashboard/consultant/knowledge", icon: BookOpen },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: TrendingUp },
];

// Mock report data
const satisfactionData = [
  { month: 'Oct', score: 4.2 },
  { month: 'Nov', score: 4.4 },
  { month: 'Dec', score: 4.1 },
  { month: 'Jan', score: 4.5 },
  { month: 'Feb', score: 4.6 },
];

const iterationsData = [
  { project: 'Biotech Lab', iterations: 8 },
  { project: 'Pharma Facility', iterations: 5 },
  { project: 'Env Center', iterations: 2 },
];

const approvalTimeData = [
  { month: 'Oct', days: 5 },
  { month: 'Nov', days: 4 },
  { month: 'Dec', days: 6 },
  { month: 'Jan', days: 3 },
  { month: 'Feb', days: 4 },
];

const delayReasonsData = [
  { name: 'Customer Delays', value: 40, color: 'hsl(var(--chart-1))' },
  { name: 'Design Iterations', value: 30, color: 'hsl(var(--chart-2))' },
  { name: 'Resource Constraints', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 10, color: 'hsl(var(--chart-4))' },
];

const chartConfig = {
  score: { label: "Satisfaction", color: "hsl(var(--chart-1))" },
  iterations: { label: "Iterations", color: "hsl(var(--chart-2))" },
  days: { label: "Days", color: "hsl(var(--chart-3))" },
};

const Reports = () => {
  const { projects, feedback } = useProjects();

  // Calculate summary metrics
  const avgSatisfaction = feedback.length > 0
    ? (feedback.reduce((acc, f) => acc + f.ratings.overall, 0) / feedback.length).toFixed(1)
    : 'N/A';

  const totalIterations = projects.reduce((acc, p) => 
    acc + p.designs.reduce((dAcc, d) => dAcc + Math.floor(parseFloat(d.version.replace('v', ''))), 0), 0);

  const avgApprovalTime = '4.2 days';
  const onTimeDelivery = '85%';

  return (
    <DashboardLayout role="consultant" userName="Sarah Mitchell" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Leadership-ready insights and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Presentation className="w-4 h-4 mr-2" />
              Export PPT
            </Button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgSatisfaction}</p>
                <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
              </div>
            </div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +0.2 vs last month
            </p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalIterations}</p>
                <p className="text-sm text-muted-foreground">Total Iterations</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgApprovalTime}</p>
                <p className="text-sm text-muted-foreground">Avg Approval Time</p>
              </div>
            </div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> -1.2 days improvement
            </p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{onTimeDelivery}</p>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </div>
        </div>

        <Tabs defaultValue="satisfaction" className="space-y-4">
          <TabsList>
            <TabsTrigger value="satisfaction">Client Satisfaction</TabsTrigger>
            <TabsTrigger value="iterations">Design Iterations</TabsTrigger>
            <TabsTrigger value="approvals">Approval Turnaround</TabsTrigger>
            <TabsTrigger value="delays">Delay Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="satisfaction">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Client Satisfaction Trend</h3>
              <p className="text-sm text-muted-foreground mb-6">Monthly average satisfaction scores (out of 5)</p>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis domain={[3.5, 5]} className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-800">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Satisfaction has improved by 9.5% over the last 5 months
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="iterations">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Design Iterations by Project</h3>
              <p className="text-sm text-muted-foreground mb-6">Total version iterations per active project</p>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={iterationsData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="project" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="iterations" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-lg font-semibold text-foreground">5.0</p>
                  <p className="text-xs text-muted-foreground">Avg Iterations</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-lg font-semibold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">Min Iterations</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-lg font-semibold text-foreground">8</p>
                  <p className="text-xs text-muted-foreground">Max Iterations</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Approval Turnaround Time</h3>
              <p className="text-sm text-muted-foreground mb-6">Average days from design submission to customer approval</p>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="days" 
                      fill="hsl(var(--chart-3))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Target turnaround time: 3 days. Currently averaging 4.2 days.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delays">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Delay Root Causes</h3>
                <p className="text-sm text-muted-foreground mb-6">Distribution of delay factors across projects</p>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={delayReasonsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {delayReasonsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {delayReasonsData.map((reason, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: reason.color }} />
                        <span className="text-sm text-foreground">{reason.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{reason.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900">Customer Delays Leading Cause</p>
                        <p className="text-sm text-amber-700 mt-1">40% of delays attributed to customer approval bottlenecks. Recommend implementing reminder system.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Iteration Reduction Opportunity</p>
                        <p className="text-sm text-blue-700 mt-1">Projects with early stakeholder alignment average 40% fewer iterations.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-emerald-900">Best Practice</p>
                        <p className="text-sm text-emerald-700 mt-1">Pharmaceutical projects showing best approval times due to clear compliance requirements.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
