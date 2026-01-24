import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { History, ChevronDown, ChevronUp, Upload, CheckCircle, MessageSquare, FileCheck, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CustomerAction, DesignVersion } from "@/context/ProjectContext";

interface ProjectHistoryProps {
  customerActions?: CustomerAction[];
  designs?: (DesignVersion & { projectName?: string })[];
}

const ProjectHistory = ({ customerActions = [], designs = [] }: ProjectHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Combine and sort history items
  const historyItems = [
    ...customerActions.map(action => ({
      id: action.id,
      type: action.type === 'approval' ? 'approval' : action.type === 'comment' ? 'feedback' : 'review',
      title: action.type === 'approval' ? 'Design Approved' : action.type === 'comment' ? 'Comment Added' : 'Feedback Submitted',
      description: action.designTitle || action.content,
      date: action.timestamp,
      actor: action.customerName,
    })),
    ...designs.map(design => ({
      id: `upload-${design.id}`,
      type: 'upload',
      title: 'Design Uploaded',
      description: `${design.title} ${design.version}`,
      date: design.uploadedAt,
      actor: design.uploadedBy,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="w-4 h-4 text-blue-600" />;
      case "approval":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case "review":
        return <FileCheck className="w-4 h-4 text-amber-600" />;
      default:
        return <History className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "upload":
        return "bg-blue-50";
      case "approval":
        return "bg-emerald-50";
      case "feedback":
        return "bg-purple-50";
      case "review":
        return "bg-amber-50";
      default:
        return "bg-muted";
    }
  };

  if (historyItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-5 hover:bg-muted/50 rounded-none"
          >
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">Project History</span>
              <Badge variant="outline" className="text-xs ml-2">
                <Lock className="w-3 h-3 mr-1" />
                Audit Trail
              </Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-5 pb-5">
            <p className="text-sm text-muted-foreground mb-4">
              Complete record of all project activities and decisions for your reference.
            </p>
            <div className="space-y-3">
              {historyItems.map((item, index) => (
                <div key={item.id} className="relative flex gap-3">
                  {index < historyItems.length - 1 && (
                    <div className="absolute left-5 top-10 h-full w-px bg-border" />
                  )}
                  <div className={`shrink-0 w-10 h-10 rounded-full ${getTypeBg(item.type)} flex items-center justify-center`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">By: {item.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProjectHistory;