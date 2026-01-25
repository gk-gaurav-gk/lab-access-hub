import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CommercialInputs } from "@/context/OnboardingContext";
import { DollarSign, AlertCircle } from "lucide-react";

interface CommercialStepProps {
  data: CommercialInputs;
  onChange: (data: Partial<CommercialInputs>) => void;
}

const budgetRanges = [
  "Under $100,000",
  "$100,000 - $250,000",
  "$250,000 - $500,000",
  "$500,000 - $750,000",
  "$750,000 - $1,000,000",
  "Over $1,000,000",
  "To be determined",
];

const timelineOptions = [
  "3 months",
  "6 months",
  "9 months",
  "12 months",
  "18 months",
  "24+ months",
  "Flexible",
];

export function CommercialStep({ data, onChange }: CommercialStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-lg bg-primary/10">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Budget Expectations & Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Help us understand your investment expectations
          </p>
        </div>
      </div>

      {/* Information Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-blue-900">About Your Budget Information</p>
          <p className="text-blue-700 mt-1">
            This helps us tailor recommendations to your investment level. Detailed cost discussions 
            will be handled by your dedicated Consultant during project planning calls.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range *</Label>
          <Select
            value={data.budgetRange}
            onValueChange={(value) => onChange({ budgetRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This helps us filter feasible options early
          </p>
        </div>

        {/* Cost Sensitivity */}
        <div className="space-y-3">
          <Label>Cost Sensitivity *</Label>
          <RadioGroup
            value={data.costSensitivity}
            onValueChange={(value) => onChange({ costSensitivity: value as "fixed" | "flexible" })}
            className="grid gap-3"
          >
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="fixed" id="fixed" className="mt-0.5" />
              <div>
                <Label htmlFor="fixed" className="cursor-pointer font-medium">
                  Fixed Budget
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I have a strict budget ceiling that cannot be exceeded.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="flexible" id="flexible" className="mt-0.5" />
              <div>
                <Label htmlFor="flexible" className="cursor-pointer font-medium">
                  Flexible Budget
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I can adjust if justified by quality or timeline benefits.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Priority */}
        <div className="space-y-3">
          <Label>What matters most? *</Label>
          <RadioGroup
            value={data.priority}
            onValueChange={(value) => onChange({ priority: value as "cost" | "speed" | "quality" })}
            className="grid gap-3"
          >
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="cost" id="cost" className="mt-0.5" />
              <div>
                <Label htmlFor="cost" className="cursor-pointer font-medium">
                  Cost Optimization
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Prioritize staying within budget, even if it means longer timelines.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="speed" id="speed" className="mt-0.5" />
              <div>
                <Label htmlFor="speed" className="cursor-pointer font-medium">
                  Fast Delivery
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Time is critical—I'm willing to pay premium for faster completion.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="quality" id="quality" className="mt-0.5" />
              <div>
                <Label htmlFor="quality" className="cursor-pointer font-medium">
                  Premium Quality
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  I want the best materials and equipment, budget is secondary.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline Constraints *</Label>
          <Select
            value={data.timelineConstraints}
            onValueChange={(value) => onChange({ timelineConstraints: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select target timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            When do you need the lab to be operational?
          </p>
        </div>

        <div className="space-y-3">
          <Label>Customization Level *</Label>
          <RadioGroup
            value={data.customizationPreference}
            onValueChange={(value) => onChange({ customizationPreference: value })}
            className="grid gap-3"
          >
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="standard" id="standard" className="mt-0.5" />
              <div>
                <Label htmlFor="standard" className="cursor-pointer font-medium">
                  Standard Package
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Pre-designed layouts and equipment packages. Faster delivery, cost-effective.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="moderate" id="moderate" className="mt-0.5" />
              <div>
                <Label htmlFor="moderate" className="cursor-pointer font-medium">
                  Moderate Customization
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Standard base with selected modifications. Balance of flexibility and efficiency.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="high" id="high" className="mt-0.5" />
              <div>
                <Label htmlFor="high" className="cursor-pointer font-medium">
                  High Customization
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Fully tailored design and equipment integration. Maximum flexibility.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
