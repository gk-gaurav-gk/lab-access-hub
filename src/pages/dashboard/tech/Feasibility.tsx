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
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Ruler,
  Zap,
  Shield,
  FileCheck,
  DollarSign,
  Clock,
  Eye,
  Edit
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
];

// Mock feasibility data
const feasibilityNotes = [
  {
    id: '1',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.2',
    status: 'feasible',
    constraints: [],
    costImpact: 'none',
    timelineImpact: 'none',
    notes: 'All requirements can be met within current specifications. HVAC system layout approved.',
    createdBy: 'James Chen',
    createdAt: '2024-01-18'
  },
  {
    id: '2',
    projectName: 'Research Center - Phase 1',
    designVersion: 'v2.0',
    status: 'conditional',
    constraints: ['power', 'safety'],
    costImpact: 'medium',
    timelineImpact: 'low',
    notes: 'Additional power capacity required for cleanroom equipment. Safety review pending for chemical storage area. Estimated 15% cost increase for electrical upgrades.',
    createdBy: 'James Chen',
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    projectName: 'Biotech Facility',
    designVersion: 'v1.0',
    status: 'not_feasible',
    constraints: ['space', 'compliance'],
    costImpact: 'high',
    timelineImpact: 'high',
    notes: 'Current floor plan does not accommodate required equipment footprint. Compliance issues with ventilation requirements. Recommend design revision before proceeding.',
    createdBy: 'Mike Wilson',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    projectName: 'Pharma Lab - Building A',
    designVersion: 'v3.1',
    status: 'conditional',
    constraints: ['space'],
    costImpact: 'low',
    timelineImpact: 'none',
    notes: 'Minor adjustments needed for storage room dimensions. Can be addressed in next revision.',
    createdBy: 'James Chen',
    createdAt: '2024-01-12'
  }
];

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle }> = {
  feasible: { label: 'Feasible', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle },
  conditional: { label: 'Conditionally Feasible', className: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle },
  not_feasible: { label: 'Not Feasible', className: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
};

const constraintIcons: Record<string, typeof Ruler> = {
  space: Ruler,
  power: Zap,
  safety: Shield,
  compliance: FileCheck
};

const impactColors: Record<string, string> = {
  none: 'text-emerald-600',
  low: 'text-amber-600',
  medium: 'text-orange-600',
  high: 'text-red-600'
};

const Feasibility = () => {
  const { projects } = useProjects();

  // Calculate stats
  const feasibleCount = feasibilityNotes.filter(f => f.status === 'feasible').length;
  const conditionalCount = feasibilityNotes.filter(f => f.status === 'conditional').length;
  const notFeasibleCount = feasibilityNotes.filter(f => f.status === 'not_feasible').length;

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Feasibility Assessment</h1>
            <p className="text-muted-foreground">Technical feasibility notes and constraint tracking</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>New Feasibility Assessment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Design Version</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v3.2">v3.2</SelectItem>
                      <SelectItem value="v3.1">v3.1</SelectItem>
                      <SelectItem value="v2.0">v2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Feasibility Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feasible">Feasible</SelectItem>
                      <SelectItem value="conditional">Conditionally Feasible</SelectItem>
                      <SelectItem value="not_feasible">Not Feasible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea placeholder="Add detailed feasibility notes..." className="min-h-[100px]" />
                </div>
                <Button className="w-full">Save Assessment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-900">{feasibleCount}</p>
              <p className="text-sm text-emerald-700">Feasible</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-900">{conditionalCount}</p>
              <p className="text-sm text-amber-700">Conditional</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-900">{notFeasibleCount}</p>
              <p className="text-sm text-red-700">Not Feasible</p>
            </div>
          </div>
        </div>

        {/* Visibility Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <Eye className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">Visibility: Consultant & Sales</p>
            <p className="text-sm text-blue-700">Your feasibility assessments are visible to Consultants and Sales team for project planning.</p>
          </div>
        </div>

        {/* Feasibility Cards */}
        {feasibilityNotes.length > 0 ? (
          <div className="space-y-4">
            {feasibilityNotes.map((note) => {
              const status = statusConfig[note.status];
              const StatusIcon = status.icon;
              
              return (
                <div key={note.id} className={`bg-card rounded-xl shadow-card border overflow-hidden ${
                  note.status === 'not_feasible' ? 'border-red-200' :
                  note.status === 'conditional' ? 'border-amber-200' :
                  'border-border'
                }`}>
                  {/* Header */}
                  <div className={`px-5 py-3 border-b ${
                    note.status === 'not_feasible' ? 'bg-red-50 border-red-200' :
                    note.status === 'conditional' ? 'bg-amber-50 border-amber-200' :
                    'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`w-5 h-5 ${
                          note.status === 'not_feasible' ? 'text-red-600' :
                          note.status === 'conditional' ? 'text-amber-600' :
                          'text-emerald-600'
                        }`} />
                        <div>
                          <h3 className="font-semibold text-foreground">{note.projectName}</h3>
                          <Badge variant="outline" className="text-xs mt-1">{note.designVersion}</Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Constraints */}
                    {note.constraints.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Constraints</p>
                        <div className="flex flex-wrap gap-2">
                          {note.constraints.map((constraint) => {
                            const Icon = constraintIcons[constraint] || AlertTriangle;
                            return (
                              <Badge key={constraint} variant="outline" className="bg-secondary">
                                <Icon className="w-3 h-3 mr-1" />
                                {constraint.charAt(0).toUpperCase() + constraint.slice(1)}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Impact Summary */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Cost Impact</span>
                        </div>
                        <p className={`font-medium capitalize ${impactColors[note.costImpact]}`}>
                          {note.costImpact === 'none' ? 'No Impact' : `${note.costImpact} Impact`}
                        </p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Timeline Impact</span>
                        </div>
                        <p className={`font-medium capitalize ${impactColors[note.timelineImpact]}`}>
                          {note.timelineImpact === 'none' ? 'No Impact' : `${note.timelineImpact} Impact`}
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-sm text-foreground">{note.notes}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        By {note.createdBy} • {note.createdAt}
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState 
            icon={Settings}
            title="No feasibility assessments yet"
            description="Feasibility notes will appear here as designs are evaluated."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Feasibility;
