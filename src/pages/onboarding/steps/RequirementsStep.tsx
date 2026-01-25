import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FunctionalRequirements } from "@/context/OnboardingContext";
import { Cog } from "lucide-react";

interface RequirementsStepProps {
  data: FunctionalRequirements;
  onChange: (data: Partial<FunctionalRequirements>) => void;
}

const usageTypes = [
  "Molecular Biology Research",
  "Cell Culture",
  "Analytical Chemistry",
  "Microbiology",
  "Biochemistry",
  "Quality Control / QA",
  "Teaching & Training",
  "Clinical Testing",
  "Drug Development",
  "Other",
];

const userCounts = [
  "1-5",
  "6-10",
  "11-20",
  "21-50",
  "50+",
];

export function RequirementsStep({ data, onChange }: RequirementsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-lg bg-primary/10">
          <Cog className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Functional & Operational Requirements</h3>
          <p className="text-sm text-muted-foreground">
            Help us understand how you'll use this laboratory
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="usageType">Lab Usage Type *</Label>
            <Select
              value={data.labUsageType}
              onValueChange={(value) => onChange({ labUsageType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary usage" />
              </SelectTrigger>
              <SelectContent>
                {usageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfUsers">Number of Users *</Label>
            <Select
              value={data.numberOfUsers}
              onValueChange={(value) => onChange({ numberOfUsers: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user count" />
              </SelectTrigger>
              <SelectContent>
                {userCounts.map((count) => (
                  <SelectItem key={count} value={count}>
                    {count} users
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipment">Equipment List</Label>
          <Textarea
            id="equipment"
            placeholder="List major equipment you'll need (e.g., PCR machines, centrifuges, biosafety cabinets, freezers...)"
            value={data.equipmentList}
            onChange={(e) => onChange({ equipmentList: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            A high-level list helps us plan space and utilities
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workflow">Workflow Preferences</Label>
          <Textarea
            id="workflow"
            placeholder="Describe your preferred workflow layout (e.g., open floor plan, separate clean rooms, dedicated sample prep areas...)"
            value={data.workflowPreferences}
            onChange={(e) => onChange({ workflowPreferences: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            How do you envision the lab workflow and space organization?
          </p>
        </div>
      </div>
    </div>
  );
}
