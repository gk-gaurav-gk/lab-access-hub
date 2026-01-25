import { DollarSign, AlertCircle, Lock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommercialSnapshotProps {
  budget?: {
    approved: string;
    current: string;
    changeImpact?: string;
  };
  projectName?: string;
}

const CommercialSnapshot = ({ budget, projectName }: CommercialSnapshotProps) => {
  if (!budget) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Budget Overview</h2>
        </div>
        <Badge variant="outline" className="text-xs">
          <Lock className="w-3 h-3 mr-1" />
          Read Only
        </Badge>
      </div>

      {projectName && (
        <p className="text-sm text-muted-foreground mb-4">{projectName}</p>
      )}

      <div className="space-y-4">
        {/* Customer's approved budget range - this is what they provided */}
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Your Approved Budget Range</p>
          <p className="text-2xl font-bold text-foreground">{budget.approved}</p>
        </div>

        {/* Status indicator - no internal pricing shown */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-medium text-blue-900">Project Status</p>
          </div>
          <p className="text-sm text-blue-700">
            {budget.changeImpact ? 'Your Consultant will discuss any cost implications' : 'Within expected budget range'}
          </p>
        </div>

        {budget.changeImpact && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-700">Consultation Scheduled</p>
              <p className="text-amber-600">
                Recent changes may affect your budget. Your Consultant will contact you to discuss options.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3 mt-0.5" />
          <p>
            Detailed cost discussions are handled by your Consultant during scheduled calls. 
            Final pricing is confirmed at delivery kickoff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommercialSnapshot;