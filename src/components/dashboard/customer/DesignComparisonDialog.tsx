import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCompare, ArrowRight, Square, Shield, DollarSign } from "lucide-react";

interface DesignComparisonDialogProps {
  designTitle: string;
  trigger?: React.ReactNode;
}

const changes = [
  {
    area: "Space Allocation",
    icon: Square,
    previous: "120 sq ft for equipment zone",
    current: "150 sq ft for equipment zone",
    impact: "+25% space for safety clearance",
    impactType: "positive",
  },
  {
    area: "Safety Systems",
    icon: Shield,
    previous: "Standard ventilation",
    current: "Enhanced HEPA filtration",
    impact: "Meets biosafety level 2 requirements",
    impactType: "positive",
  },
  {
    area: "Cost Impact",
    icon: DollarSign,
    previous: "$45,000 estimate",
    current: "$52,000 estimate",
    impact: "+15% due to safety upgrades",
    impactType: "neutral",
  },
];

const DesignComparisonDialog = ({ designTitle, trigger }: DesignComparisonDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <GitCompare className="w-3 h-3 mr-1" />
            Compare
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-primary" />
            Design Comparison: {designTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline" className="bg-muted">v3.1 (Previous)</Badge>
            <ArrowRight className="w-4 h-4" />
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">v3.2 (Current)</Badge>
          </div>

          <div className="space-y-4">
            {changes.map((change, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <change.icon className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-foreground">{change.area}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Previous</p>
                    <p className="text-sm text-foreground">{change.previous}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                    <p className="text-xs text-primary mb-1">Current</p>
                    <p className="text-sm text-foreground">{change.current}</p>
                  </div>
                </div>
                
                <div className={`text-sm px-3 py-2 rounded-md ${
                  change.impactType === "positive" 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "bg-amber-50 text-amber-700"
                }`}>
                  <strong>Impact:</strong> {change.impact}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Why these changes?</p>
            <p>Based on your feedback regarding equipment clearance and updated biosafety requirements, the design has been optimized for better workflow and compliance.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignComparisonDialog;
