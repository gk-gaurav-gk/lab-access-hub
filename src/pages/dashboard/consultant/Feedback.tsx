import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/components/dashboard/EmptyState";
import { useProjects } from "@/context/ProjectContext";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Target,
  BookOpen
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "Client Projects", href: "/dashboard/consultant/projects", icon: FolderOpen },
  { label: "Requirements", href: "/dashboard/consultant/requirements", icon: FileText },
  { label: "Feedback", href: "/dashboard/consultant/feedback", icon: MessageSquare },
  { label: "Knowledge Hub", href: "/dashboard/consultant/knowledge", icon: BookOpen },
  { label: "Reports", href: "/dashboard/consultant/reports", icon: TrendingUp },
];

// Mock extended feedback data
const feedbackItems = [
  {
    id: 'fb-001',
    projectId: 'proj-002',
    projectName: 'Pharmaceutical Testing Facility',
    customerName: 'Dr. Robert Singh',
    category: 'Design',
    rating: 5,
    comment: 'Excellent work on the clean room design. Very satisfied with the attention to compliance requirements.',
    submittedAt: 'Feb 15, 2024',
    status: 'closed',
    actionOwner: 'James Chen',
    actionTaken: 'Template updated for future clean room projects',
    closedAt: 'Feb 18, 2024'
  },
  {
    id: 'fb-002',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    customerName: 'Dr. Emily Watson',
    category: 'Communication',
    rating: 4,
    comment: 'Communication could be more frequent. Would appreciate weekly updates instead of bi-weekly.',
    submittedAt: 'Feb 12, 2024',
    status: 'in_progress',
    actionOwner: 'Sarah Mitchell',
    actionTaken: 'Implemented weekly status call schedule'
  },
  {
    id: 'fb-003',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    customerName: 'Dr. Emily Watson',
    category: 'Timeline',
    rating: 3,
    comment: 'Initial timeline estimation was optimistic. Had to extend delivery date twice.',
    submittedAt: 'Feb 10, 2024',
    status: 'new',
    actionOwner: null,
    actionTaken: null
  }
];

// Insights derived from feedback
const insights = {
  themes: [
    { theme: 'Communication Frequency', count: 4, trend: 'increasing' },
    { theme: 'Timeline Accuracy', count: 3, trend: 'stable' },
    { theme: 'Design Quality', count: 2, trend: 'decreasing' }
  ],
  highlights: [
    'Clean room design consistently praised',
    'Safety compliance processes well received',
    'Documentation quality appreciated'
  ],
  issues: [
    'Weekly updates preferred over bi-weekly',
    'Timeline estimates need buffer',
    'Earlier stakeholder involvement requested'
  ]
};

const Feedback = () => {
  const { feedback } = useProjects();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredFeedback = selectedStatus 
    ? feedbackItems.filter(f => f.status === selectedStatus)
    : feedbackItems;

  const avgRating = feedbackItems.length > 0
    ? (feedbackItems.reduce((acc, f) => acc + f.rating, 0) / feedbackItems.length).toFixed(1)
    : 'N/A';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">New</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">In Progress</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Closed</Badge>;
      default:
        return null;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} 
      />
    ));
  };

  return (
    <DashboardLayout role="consultant" userName="Sarah Mitchell" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
            <p className="text-muted-foreground">Customer feedback aggregation and action tracking</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-bold text-foreground">{avgRating}</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
          <div 
            className={`bg-card rounded-xl p-4 shadow-card border cursor-pointer transition-colors ${selectedStatus === 'new' ? 'border-blue-500 bg-blue-50' : 'border-border hover:border-blue-300'}`}
            onClick={() => setSelectedStatus(selectedStatus === 'new' ? null : 'new')}
          >
            <p className="text-2xl font-bold text-blue-600">{feedbackItems.filter(f => f.status === 'new').length}</p>
            <p className="text-sm text-muted-foreground">New</p>
          </div>
          <div 
            className={`bg-card rounded-xl p-4 shadow-card border cursor-pointer transition-colors ${selectedStatus === 'in_progress' ? 'border-amber-500 bg-amber-50' : 'border-border hover:border-amber-300'}`}
            onClick={() => setSelectedStatus(selectedStatus === 'in_progress' ? null : 'in_progress')}
          >
            <p className="text-2xl font-bold text-amber-600">{feedbackItems.filter(f => f.status === 'in_progress').length}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div 
            className={`bg-card rounded-xl p-4 shadow-card border cursor-pointer transition-colors ${selectedStatus === 'closed' ? 'border-emerald-500 bg-emerald-50' : 'border-border hover:border-emerald-300'}`}
            onClick={() => setSelectedStatus(selectedStatus === 'closed' ? null : 'closed')}
          >
            <p className="text-2xl font-bold text-emerald-600">{feedbackItems.filter(f => f.status === 'closed').length}</p>
            <p className="text-sm text-muted-foreground">Closed</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-2xl font-bold text-foreground">{feedbackItems.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedStatus ? `${selectedStatus.replace('_', ' ').charAt(0).toUpperCase() + selectedStatus.replace('_', ' ').slice(1)} Feedback` : 'All Feedback'}
              </h3>
              {selectedStatus && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedStatus(null)}>
                  Clear filter
                </Button>
              )}
            </div>
            
            {filteredFeedback.length > 0 ? (
              <div className="space-y-4">
                {filteredFeedback.map((fb) => (
                  <div key={fb.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{fb.projectName}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {fb.customerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {fb.submittedAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{fb.category}</Badge>
                        {getStatusBadge(fb.status)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {getRatingStars(fb.rating)}
                    </div>

                    <p className="text-sm text-foreground bg-secondary/50 p-3 rounded-lg mb-3">
                      "{fb.comment}"
                    </p>

                    {(fb.actionOwner || fb.actionTaken) && (
                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">Action:</span>
                          <span className="text-muted-foreground">{fb.actionTaken || 'Pending assignment'}</span>
                        </div>
                        {fb.actionOwner && (
                          <p className="text-xs text-muted-foreground mt-1">Assigned to {fb.actionOwner}</p>
                        )}
                      </div>
                    )}

                    {fb.status === 'new' && (
                      <div className="pt-3 border-t border-border">
                        <Button size="sm" variant="outline">Assign Action</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={MessageSquare}
                title="No feedback received yet"
                description="Customer feedback will appear here after project interactions."
              />
            )}
          </div>

          {/* Insights Sidebar */}
          <div className="space-y-4">
            {/* Themes */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Common Themes
              </h3>
              <div className="space-y-3">
                {insights.themes.map((theme, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{theme.theme}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{theme.count}</Badge>
                      {theme.trend === 'increasing' && <TrendingUp className="w-4 h-4 text-red-500" />}
                      {theme.trend === 'decreasing' && <TrendingUp className="w-4 h-4 text-emerald-500 rotate-180" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Highlights */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                Positive Highlights
              </h3>
              <ul className="space-y-2">
                {insights.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-emerald-700 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {insights.issues.map((issue, idx) => (
                  <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
