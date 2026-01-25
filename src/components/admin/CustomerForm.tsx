import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CustomerFormProps {
  onClose: () => void;
}

const industries = [
  "Biotechnology",
  "Pharmaceutical",
  "Healthcare",
  "Environmental",
  "Research",
  "Academic",
  "Government",
  "Other",
];

export function CustomerForm({ onClose }: CustomerFormProps) {
  const { teamMembers, addCustomer } = useWorkspace();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    industry: "",
    assignedSalesId: "",
    assignedConsultantId: "",
  });

  const salesMembers = teamMembers.filter((tm) => tm.role === "sales");
  const consultantMembers = teamMembers.filter((tm) => tm.role === "consultant");

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.organization || !formData.industry) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addCustomer({
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      industry: formData.industry,
      onboardingStatus: "not_started",
      onboardedBy: null,
      onboardedByRole: null,
      assignedSalesId: formData.assignedSalesId || null,
      assignedConsultantId: formData.assignedConsultantId || null,
      status: "onboarding",
      activeProjectsCount: 0,
    });

    toast({
      title: "Customer created",
      description: `${formData.name} has been added to the platform.`,
    });

    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Customer Name *</Label>
          <Input
            placeholder="e.g., Dr. Jane Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input
            type="email"
            placeholder="jane.smith@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Organization *</Label>
          <Input
            placeholder="e.g., BioTech Research Labs"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Industry *</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => setFormData({ ...formData, industry: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <h4 className="text-sm font-medium mb-3">Role Assignments (Optional)</h4>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Assign Sales Rep</Label>
            <Select
              value={formData.assignedSalesId}
              onValueChange={(value) => setFormData({ ...formData, assignedSalesId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sales rep" />
              </SelectTrigger>
              <SelectContent>
                {salesMembers.map((tm) => (
                  <SelectItem key={tm.id} value={tm.id}>
                    {tm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assign Consultant</Label>
            <Select
              value={formData.assignedConsultantId}
              onValueChange={(value) => setFormData({ ...formData, assignedConsultantId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select consultant" />
              </SelectTrigger>
              <SelectContent>
                {consultantMembers.map((tm) => (
                  <SelectItem key={tm.id} value={tm.id}>
                    {tm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Plus className="w-4 h-4 mr-2" />
          Create Customer
        </Button>
      </DialogFooter>
    </div>
  );
}
