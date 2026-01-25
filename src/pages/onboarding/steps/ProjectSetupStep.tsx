import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProjectSetup } from "@/context/OnboardingContext";
import { FlaskConical } from "lucide-react";

interface ProjectSetupStepProps {
  data: ProjectSetup;
  onChange: (data: Partial<ProjectSetup>) => void;
}

const labTypes = [
  "Research Laboratory",
  "Clinical Laboratory",
  "QC Laboratory",
  "Teaching Laboratory",
  "Analytical Laboratory",
  "Biocontainment Laboratory",
  "Clean Room",
  "Pilot Plant",
  "Other",
];

export function ProjectSetupStep({ data, onChange }: ProjectSetupStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-lg bg-primary/10">
          <FlaskConical className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Project Setup</h3>
          <p className="text-sm text-muted-foreground">
            Define the basic parameters of your lab project
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="e.g., Molecular Research Lab Phase 1"
            value={data.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            A descriptive name to identify this project
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="labType">Lab Type *</Label>
          <Select
            value={data.labType}
            onValueChange={(value) => onChange({ labType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select lab type" />
            </SelectTrigger>
            <SelectContent>
              {labTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Build Type *</Label>
          <RadioGroup
            value={data.buildType}
            onValueChange={(value: "new" | "renovation") =>
              onChange({ buildType: value })
            }
            className="grid gap-3 sm:grid-cols-2"
          >
            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="new" id="new" />
              <div>
                <Label htmlFor="new" className="cursor-pointer font-medium">
                  New Build
                </Label>
                <p className="text-xs text-muted-foreground">
                  Building a new laboratory from scratch
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="renovation" id="renovation" />
              <div>
                <Label htmlFor="renovation" className="cursor-pointer font-medium">
                  Renovation
                </Label>
                <p className="text-xs text-muted-foreground">
                  Upgrading or modifying an existing space
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="labLocation">Lab Location *</Label>
          <Input
            id="labLocation"
            placeholder="e.g., Building A, Floor 3"
            value={data.labLocation}
            onChange={(e) => onChange({ labLocation: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Where will this lab be located within your facility?
          </p>
        </div>
      </div>
    </div>
  );
}
