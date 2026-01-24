import { DollarSign, TrendingUp, AlertCircle, Lock } from "lucide-react";
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
          <h2 className="text-lg font-semibold text-foreground">Commercial Summary</h2>
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
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Approved Budget Range</p>
          <p className="text-2xl font-bold text-foreground">{budget.approved}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <p className="text-xs text-emerald-600 mb-1">Current Estimate</p>
            <p className="text-lg font-semibold text-emerald-700">{budget.current}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-blue-600 mb-1">Status</p>
            <p className="text-lg font-semibold text-blue-700">
              {budget.changeImpact ? 'Review Required' : 'On Track'}
            </p>
          </div>
        </div>

        {budget.changeImpact && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-700">Change Impact</p>
              <p className="text-amber-600">{budget.changeImpact}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3 mt-0.5" />
          <p>Estimates are subject to change based on design approvals and scope modifications. Final pricing confirmed at delivery kickoff.</p>
        </div>
      </div>
    </div>
  );
};

export default CommercialSnapshot;