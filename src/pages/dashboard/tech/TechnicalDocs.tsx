import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  FileCode, 
  ClipboardList, 
  Settings, 
  CheckSquare,
  Lock,
  FileText,
  Upload,
  AlertTriangle,
  Wind,
  Zap,
  Shield,
  FileCheck,
  Package,
  Calendar,
  User,
  BookOpen
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
  { label: "Knowledge Hub", href: "/dashboard/tech/knowledge", icon: BookOpen },
];

// Mock technical documents data
const technicalDocs = [
  {
    id: '1',
    name: 'HVAC System Specifications',
    category: 'HVAC',
    projectId: '1',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    status: 'final',
    lastUpdated: '2024-01-18',
    owner: 'James Chen',
    designApproved: true,
    needsUpdate: false
  },
  {
    id: '2',
    name: 'Electrical Layout Plan',
    category: 'Electrical',
    projectId: '1',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    status: 'draft',
    lastUpdated: '2024-01-20',
    owner: 'James Chen',
    designApproved: false,
    needsUpdate: false
  },
  {
    id: '3',
    name: 'Safety Protocol Documentation',
    category: 'Safety',
    projectId: '2',
    projectName: 'Research Center - Phase 1',
    designVersion: 'v2.0',
    status: 'final',
    lastUpdated: '2024-01-15',
    owner: 'James Chen',
    designApproved: true,
    needsUpdate: false
  },
  {
    id: '4',
    name: 'Compliance Checklist',
    category: 'Compliance',
    projectId: '2',
    projectName: 'Research Center - Phase 1',
    designVersion: 'v2.0',
    status: 'draft',
    lastUpdated: '2024-01-19',
    owner: 'James Chen',
    designApproved: false,
    needsUpdate: true
  },
  {
    id: '5',
    name: 'Equipment Specifications',
    category: 'Equipment',
    projectId: '1',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.1',
    status: 'final',
    lastUpdated: '2024-01-12',
    owner: 'Mike Wilson',
    designApproved: true,
    needsUpdate: true
  }
];

const categoryIcons: Record<string, typeof Wind> = {
  'HVAC': Wind,
  'Electrical': Zap,
  'Safety': Shield,
  'Compliance': FileCheck,
  'Equipment': Package
};

const categoryColors: Record<string, string> = {
  'HVAC': 'bg-cyan-100 text-cyan-700',
  'Electrical': 'bg-amber-100 text-amber-700',
  'Safety': 'bg-red-100 text-red-700',
  'Compliance': 'bg-purple-100 text-purple-700',
  'Equipment': 'bg-blue-100 text-blue-700'
};

const TechnicalDocs = () => {
  const { projects } = useProjects();

  // Get category stats
  const categoryStats = Object.keys(categoryIcons).map(cat => ({
    category: cat,
    count: technicalDocs.filter(d => d.category === cat).length
  }));

  const needsUpdateCount = technicalDocs.filter(d => d.needsUpdate).length;
  const lockedCount = technicalDocs.filter(d => d.designApproved && d.status === 'final').length;

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Technical Documentation</h1>
            <p className="text-muted-foreground">Technical specs and documentation linked to design versions</p>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryStats.map(({ category, count }) => {
            const Icon = categoryIcons[category];
            return (
              <div key={category} className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryColors[category]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{category}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {needsUpdateCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-900">{needsUpdateCount} document(s) need update</p>
                <p className="text-sm text-amber-700">Requirements have changed since last update</p>
              </div>
            </div>
          )}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-medium text-emerald-900">{lockedCount} document(s) locked</p>
              <p className="text-sm text-emerald-700">Linked to approved designs</p>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        {technicalDocs.length > 0 ? (
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Document</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Project</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Design Version</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Last Updated</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {technicalDocs.map((doc) => {
                  const Icon = categoryIcons[doc.category] || FileText;
                  const isLocked = doc.designApproved && doc.status === 'final';
                  
                  return (
                    <tr key={doc.id} className="hover:bg-secondary/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {isLocked && <Lock className="w-4 h-4 text-emerald-600" />}
                          {doc.needsUpdate && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                          <div>
                            <span className="text-sm font-medium text-foreground">{doc.name}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              {doc.owner}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={categoryColors[doc.category]}>
                          <Icon className="w-3 h-3 mr-1" />
                          {doc.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{doc.projectName}</td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className="bg-secondary">
                          {doc.designVersion}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className={
                            doc.status === 'final' 
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-amber-100 text-amber-700 border-amber-200'
                          }>
                            {doc.status === 'final' ? 'Final' : 'Draft'}
                          </Badge>
                          {doc.needsUpdate && (
                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                              Needs Update
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {doc.lastUpdated}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {!isLocked && (
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          )}
                          {isLocked && (
                            <Button size="sm" variant="outline" disabled>
                              <Lock className="w-3 h-3 mr-1" />
                              Read Only
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            icon={ClipboardList}
            title="No technical documents yet"
            description="Upload your first technical document to get started."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TechnicalDocs;
