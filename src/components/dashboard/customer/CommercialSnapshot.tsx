import { DollarSign, TrendingUp, AlertCircle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CommercialSnapshot = () => {
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

      <div className="space-y-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Approved Budget Range</p>
          <p className="text-2xl font-bold text-foreground">$180,000 - $220,000</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <p className="text-xs text-emerald-600 mb-1">Last Approved Estimate</p>
            <p className="text-lg font-semibold text-emerald-700">$195,000</p>
            <p className="text-xs text-emerald-600">Feb 8, 2024</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <p className="text-xs text-amber-600 mb-1">Current Estimate</p>
            <p className="text-lg font-semibold text-amber-700">$205,000</p>
            <p className="text-xs text-amber-600">Pending review</p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-700">Change Impact</p>
            <p className="text-blue-600">+$10,000 (5.1%) due to enhanced safety systems in Lab Layout v3.2</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3 mt-0.5" />
          <p>Estimates are subject to change based on design approvals and scope modifications. Final pricing confirmed at delivery kickoff.</p>
        </div>
      </div>
    </div>
  );
};

export default CommercialSnapshot;
