import { ArrowRight, CheckCircle, Circle, HelpCircle } from "lucide-react";

interface Step {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

const steps: Step[] = [
  { 
    id: "1", 
    label: "Design Review", 
    status: "current", 
    description: "You review and approve designs" 
  },
  { 
    id: "2", 
    label: "Engineering Validation", 
    status: "upcoming", 
    description: "Technical feasibility check" 
  },
  { 
    id: "3", 
    label: "Delivery Kickoff", 
    status: "upcoming", 
    description: "Scope locked, work begins" 
  },
  { 
    id: "4", 
    label: "Feedback & Closure", 
    status: "upcoming", 
    description: "Final review and handoff" 
  },
];

const WhatHappensNext = () => {
  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "current":
        return <Circle className="w-5 h-5 text-primary fill-primary/20" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 border-emerald-200";
      case "current":
        return "bg-primary/5 border-primary/30 ring-2 ring-primary/20";
      default:
        return "bg-muted/30 border-border";
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">What Happens Next?</h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Your project follows a clear path. Here's where you are and what comes next.
      </p>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className={`flex items-start gap-3 p-3 rounded-lg border ${getStepStyles(step.status)}`}>
              <div className="shrink-0 mt-0.5">
                {getStepIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${
                    step.status === "current" ? "text-primary" : 
                    step.status === "completed" ? "text-emerald-700" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {step.status === "current" && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      You are here
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-full h-3 w-px bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ArrowRight className="w-3 h-3" />
          Questions? Contact your SpaceXLab consultant anytime.
        </p>
      </div>
    </div>
  );
};

export default WhatHappensNext;
