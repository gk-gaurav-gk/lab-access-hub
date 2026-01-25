import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmptyState from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileCheck, 
  MessageSquare,
  Star,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Lightbulb,
  ThumbsUp,
  ArrowRight
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/customer/projects", icon: FolderOpen },
  { label: "Design Reviews", href: "/dashboard/customer/reviews", icon: FileCheck },
  { label: "Feedback", href: "/dashboard/customer/feedback", icon: MessageSquare },
];

interface FeedbackCategory {
  id: string;
  label: string;
  description: string;
}

const feedbackCategories: FeedbackCategory[] = [
  { id: 'design', label: 'Design Quality', description: 'Quality and accuracy of design work' },
  { id: 'process', label: 'Process', description: 'Project management and workflow efficiency' },
  { id: 'communication', label: 'Communication', description: 'Responsiveness and clarity of updates' },
];

const StarRating = ({ value, onChange, disabled = false }: { value: number; onChange: (v: number) => void; disabled?: boolean }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && onChange(star)}
          className={`transition-colors ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            className={`w-6 h-6 ${
              star <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const CustomerFeedback = () => {
  const { currentUser, myProjects, myFeedback, submitFeedback } = useWorkspaceProjects();
  const { toast } = useToast();

  const userName = currentUser?.name || "Dr. Emily Watson";

  const [selectedProject, setSelectedProject] = useState<string>(myProjects[0]?.id || '');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (!selectedProject) {
      toast({ title: "Select a project", description: "Please choose a project to submit feedback for.", variant: "destructive" });
      return;
    }

    const allRated = feedbackCategories.every(cat => ratings[cat.id] > 0);
    if (!allRated) {
      toast({ title: "Complete all ratings", description: "Please rate all categories before submitting.", variant: "destructive" });
      return;
    }

    const project = myProjects.find(p => p.id === selectedProject);
    submitFeedback({
      projectId: selectedProject,
      projectName: project?.name || 'Project',
      customerName: userName,
      ratings: {
        designQuality: ratings['design'],
        communication: ratings['communication'],
        timelines: ratings['process'],
        overall: Math.round((ratings['design'] + ratings['communication'] + ratings['process']) / 3)
      },
      comments
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. It helps us improve our services."
    });

    setRatings({});
    setComments('');
  };

  // Mock status for feedback items based on submission date
  const getFeedbackStatus = (submittedAt: string) => {
    // Mock logic: older feedback is "addressed", recent is "in_progress" or "received"
    if (submittedAt.includes('Jan') || submittedAt.includes('Feb')) return 'addressed';
    if (submittedAt.includes('Mar')) return 'in_progress';
    return 'received';
  };

  const getStatusConfig = (submittedAt: string) => {
    const status = getFeedbackStatus(submittedAt);
    switch (status) {
      case 'received':
        return { label: 'Received', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle };
      case 'in_progress':
        return { label: 'In Progress', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock };
      case 'addressed':
        return { label: 'Addressed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: ThumbsUp };
      default:
        return { label: 'Pending', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Clock };
    }
  };

  const getLinkedImpact = (feedbackId: string) => {
    // Mock data showing what changes resulted from feedback
    const impacts: Record<string, string[]> = {
      'fb-1': ['Updated communication schedule to weekly', 'Added milestone notifications'],
      'fb-2': ['Revised safety protocols in design v2.0'],
    };
    return impacts[feedbackId] || [];
  };

  return (
    <DashboardLayout role="customer" userName={userName} navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
          <p className="text-muted-foreground">Share your experience and track how your feedback drives improvements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submit Feedback */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border shadow-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Submit Feedback
              </h2>

              {/* Project Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Select Project</label>
                <div className="flex gap-2 flex-wrap">
                  {myProjects.map((project) => (
                    <Button
                      key={project.id}
                      variant={selectedProject === project.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      {project.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Rating Categories */}
              <div className="space-y-6 mb-6">
                {feedbackCategories.map((category) => (
                  <div key={category.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-foreground">{category.label}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <StarRating
                        value={ratings[category.id] || 0}
                        onChange={(v) => setRatings(prev => ({ ...prev, [category.id]: v }))}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Additional Comments</label>
                <Textarea
                  placeholder="Share any additional thoughts, suggestions, or specific feedback..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>

          {/* Feedback Stats */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Your Feedback Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Submitted</span>
                  <span className="font-semibold text-foreground">{myFeedback.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Addressed</span>
                  <span className="font-semibold text-emerald-600">
                    {myFeedback.filter(f => getFeedbackStatus(f.submittedAt) === 'addressed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-amber-600">
                    {myFeedback.filter(f => getFeedbackStatus(f.submittedAt) === 'in_progress').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5">
              <Lightbulb className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Your Voice Matters</h3>
              <p className="text-sm text-muted-foreground">
                Every piece of feedback helps us improve our processes and deliver better outcomes for you.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback History */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            Feedback History
          </h2>

          {myFeedback.length > 0 ? (
            <div className="space-y-4">
              {myFeedback.map((item) => {
                const project = myProjects.find(p => p.id === item.projectId);
                const statusConfig = getStatusConfig(item.submittedAt);
                const impacts = getLinkedImpact(item.id);

                return (
                  <div key={item.id} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-foreground">{project?.name || 'Project Feedback'}</h3>
                          <p className="text-sm text-muted-foreground">Submitted {item.submittedAt}</p>
                        </div>
                        <Badge variant="outline" className={statusConfig.color}>
                          <statusConfig.icon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Ratings Summary */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Design</p>
                          <div className="flex justify-center">
                            <StarRating value={item.ratings.designQuality} onChange={() => {}} disabled />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Communication</p>
                          <div className="flex justify-center">
                            <StarRating value={item.ratings.communication} onChange={() => {}} disabled />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                          <div className="flex justify-center">
                            <StarRating value={item.ratings.timelines} onChange={() => {}} disabled />
                          </div>
                        </div>
                      </div>

                      {item.comments && (
                        <div className="bg-muted/30 rounded-lg p-3 mb-4">
                          <p className="text-sm text-foreground">"{item.comments}"</p>
                        </div>
                      )}

                      {/* Linked Improvements */}
                      {impacts.length > 0 && (
                        <div className="border-t border-border pt-4">
                          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-emerald-600" />
                            Changes Made Based on Your Feedback
                          </h4>
                          <ul className="space-y-1">
                            {impacts.map((impact, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                                {impact}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="You haven't submitted feedback yet"
              description="After reviewing designs or project delivery, share your experience to help us improve."
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerFeedback;
