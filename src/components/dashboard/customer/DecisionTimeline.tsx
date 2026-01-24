import { Clock, AlertCircle } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  dueInDays: number;
  type: "review" | "approve" | "feedback";
  priority: "high" | "medium" | "low";
}

const actions: ActionItem[] = [
  { id: "1", title: "Review Lab Layout v3.2", dueInDays: 2, type: "review", priority: "high" },
  { id: "2", title: "Approve Safety Design", dueInDays: 5, type: "approve", priority: "medium" },
  { id: "3", title: "Submit Equipment Feedback", dueInDays: 7, type: "feedback", priority: "low" },
];

const DecisionTimeline = () => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-amber-500 bg-amber-50";
      default:
        return "border-l-muted-foreground bg-muted/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return "👁️";
      case "approve":
        return "✅";
      case "feedback":
        return "💬";
      default:
        return "📋";
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Upcoming Client Actions</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        These items need your attention to keep the project on track.
      </p>
      <div className="space-y-3">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`p-3 rounded-lg border-l-4 ${getPriorityStyles(action.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getTypeIcon(action.type)}</span>
                <span className="font-medium text-foreground">{action.title}</span>
              </div>
              {action.priority === "high" && (
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-7">
              ⏳ Due in {action.dueInDays} day{action.dueInDays !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionTimeline;
