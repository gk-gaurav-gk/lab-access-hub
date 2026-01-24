import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Calendar } from "lucide-react";

interface ProjectCardProps {
  title: string;
  client: string;
  status: "active" | "pending" | "review" | "completed";
  dueDate: string;
  progress?: number;
}

const statusConfig = {
  active: { label: "Active", className: "bg-blue-100 text-blue-700 border-blue-200" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
  review: { label: "In Review", className: "bg-purple-100 text-purple-700 border-purple-200" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const ProjectCard = ({ title, client, status, dueDate, progress }: ProjectCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{client}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className={cn("text-xs", statusInfo.className)}>
          {statusInfo.label}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {dueDate}
        </div>
      </div>

      {progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
