import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ApprovalDialogProps {
  designTitle: string;
  trigger?: React.ReactNode;
}

const ApprovalDialog = ({ designTitle, trigger }: ApprovalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [acknowledgements, setAcknowledgements] = useState({
    costImpact: false,
    timelineImpact: false,
    assumptions: false,
  });

  const allAcknowledged = Object.values(acknowledgements).every(Boolean);

  const handleApprove = () => {
    if (!allAcknowledged) {
      toast.error("Please acknowledge all items before approving");
      return;
    }
    toast.success(`"${designTitle}" has been approved`, {
      description: "Your approval has been recorded with all acknowledgements.",
    });
    setOpen(false);
    setApprovalNote("");
    setAcknowledgements({ costImpact: false, timelineImpact: false, assumptions: false });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approve
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Approve Design: {designTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 mt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important</p>
                <p>Your approval is a documented decision. Please review and acknowledge the following before proceeding.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Acknowledgements Required</h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="costImpact"
                  checked={acknowledgements.costImpact}
                  onCheckedChange={(checked) => 
                    setAcknowledgements(prev => ({ ...prev, costImpact: checked as boolean }))
                  }
                />
                <Label htmlFor="costImpact" className="text-sm leading-relaxed cursor-pointer">
                  I understand the <strong>cost impact</strong> of this design version and any changes from previous estimates.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="timelineImpact"
                  checked={acknowledgements.timelineImpact}
                  onCheckedChange={(checked) => 
                    setAcknowledgements(prev => ({ ...prev, timelineImpact: checked as boolean }))
                  }
                />
                <Label htmlFor="timelineImpact" className="text-sm leading-relaxed cursor-pointer">
                  I understand the <strong>timeline impact</strong> and accept the projected delivery schedule.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="assumptions"
                  checked={acknowledgements.assumptions}
                  onCheckedChange={(checked) => 
                    setAcknowledgements(prev => ({ ...prev, assumptions: checked as boolean }))
                  }
                />
                <Label htmlFor="assumptions" className="text-sm leading-relaxed cursor-pointer">
                  I have reviewed the <strong>design assumptions</strong> and confirm they align with our requirements.
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="approvalNote">Approval Note (Optional)</Label>
            <Textarea
              id="approvalNote"
              placeholder="Add any notes or conditions for this approval..."
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={!allAcknowledged}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalDialog;
