import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationInfo } from "@/context/OnboardingContext";
import { Building2 } from "lucide-react";

interface OrganizationStepProps {
  data: OrganizationInfo;
  onChange: (data: Partial<OrganizationInfo>) => void;
}

const industries = [
  "Biotechnology",
  "Pharmaceutical",
  "Healthcare",
  "Academic Research",
  "Chemical",
  "Food & Beverage",
  "Environmental",
  "Forensic",
  "Clinical Diagnostics",
  "Other",
];

export function OrganizationStep({ data, onChange }: OrganizationStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Organization & Contact Information</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about your organization and who we'll be working with
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name *</Label>
            <Input
              id="orgName"
              placeholder="Enter your organization name"
              value={data.organizationName}
              onChange={(e) => onChange({ organizationName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select
              value={data.industry}
              onValueChange={(value) => onChange({ industry: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="City, State/Country"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-foreground mb-4">Primary Contact</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactName">Full Name *</Label>
              <Input
                id="contactName"
                placeholder="Enter full name"
                value={data.primaryContactName}
                onChange={(e) => onChange({ primaryContactName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="email@company.com"
                value={data.primaryContactEmail}
                onChange={(e) => onChange({ primaryContactEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={data.primaryContactPhone}
                onChange={(e) => onChange({ primaryContactPhone: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
