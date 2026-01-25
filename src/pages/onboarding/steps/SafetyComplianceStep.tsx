import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SafetyCompliance } from "@/context/OnboardingContext";
import { ShieldCheck } from "lucide-react";

interface SafetyComplianceStepProps {
  data: SafetyCompliance;
  onChange: (data: Partial<SafetyCompliance>) => void;
}

const biosafetyLevels = [
  { value: "BSL-1", label: "BSL-1 - Basic Level" },
  { value: "BSL-2", label: "BSL-2 - Moderate Risk" },
  { value: "BSL-3", label: "BSL-3 - High Risk" },
  { value: "BSL-4", label: "BSL-4 - Maximum Containment" },
  { value: "N/A", label: "Not Applicable" },
];

const regulatoryOptions = [
  "ISO 17025",
  "GLP (Good Laboratory Practice)",
  "GMP (Good Manufacturing Practice)",
  "CLIA",
  "CAP",
  "FDA 21 CFR Part 11",
  "EPA Compliance",
  "OSHA Compliance",
  "Local Building Codes",
];

export function SafetyComplianceStep({ data, onChange }: SafetyComplianceStepProps) {
  const handleRegulatoryChange = (standard: string, checked: boolean) => {
    if (checked) {
      onChange({ regulatoryStandards: [...data.regulatoryStandards, standard] });
    } else {
      onChange({
        regulatoryStandards: data.regulatoryStandards.filter((s) => s !== standard),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-lg bg-primary/10">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Safety & Compliance</h3>
          <p className="text-sm text-muted-foreground">
            Define safety requirements and regulatory standards for your lab
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="biosafetyLevel">Biosafety Level</Label>
          <Select
            value={data.biosafetyLevel}
            onValueChange={(value) => onChange({ biosafetyLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select biosafety level" />
            </SelectTrigger>
            <SelectContent>
              {biosafetyLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            If working with biological agents, select the appropriate containment level
          </p>
        </div>

        <div className="space-y-3">
          <Label>Regulatory Standards</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Select all applicable standards and certifications
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {regulatoryOptions.map((standard) => (
              <div
                key={standard}
                className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={standard}
                  checked={data.regulatoryStandards.includes(standard)}
                  onCheckedChange={(checked) =>
                    handleRegulatoryChange(standard, checked as boolean)
                  }
                />
                <Label
                  htmlFor={standard}
                  className="cursor-pointer text-sm font-normal"
                >
                  {standard}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="safetyConstraints">Safety Constraints & Requirements</Label>
          <Textarea
            id="safetyConstraints"
            placeholder="Describe any specific safety requirements (e.g., chemical fume hoods, emergency showers, spill containment, ventilation needs...)"
            value={data.safetyConstraints}
            onChange={(e) => onChange({ safetyConstraints: e.target.value })}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
