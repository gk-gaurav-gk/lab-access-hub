import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding, CustomerOnboarding } from "@/context/OnboardingContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Users,
  FileText,
  TrendingUp,
  Settings,
  Plus,
  Eye,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
  Building2,
  Mail,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: "Overview", href: "/dashboard/sales", icon: TrendingUp },
  { label: "Clients", href: "/dashboard/sales/clients", icon: Users },
  { label: "Onboarding", href: "/dashboard/sales/onboarding", icon: UserPlus },
  { label: "Proposals", href: "/dashboard/sales/proposals", icon: FileText },
  { label: "Settings", href: "/dashboard/sales/settings", icon: Settings },
];

const industries = [
  "Biotechnology",
  "Pharmaceutical",
  "Healthcare",
  "Academic Research",
  "Chemical",
  "Food & Beverage",
  "Environmental",
  "Other",
];

export default function AssistedOnboarding() {
  const { allOnboardings, startOnboarding } = useOnboarding();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    organization: "",
    industry: "",
  });

  const incompleteOnboardings = allOnboardings.filter((o) => !o.isComplete);
  const completedOnboardings = allOnboardings.filter((o) => o.isComplete);

  const getPhaseLabel = (phase: number) => {
    const labels = [
      "Organization",
      "Project Setup",
      "Requirements",
      "Safety & Compliance",
      "Commercial",
    ];
    return labels[phase - 1] || "Unknown";
  };

  const getProgressPercentage = (onboarding: CustomerOnboarding) => {
    return (onboarding.completedPhases.length / 5) * 100;
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({
        title: "Required fields missing",
        description: "Please enter customer name and email.",
        variant: "destructive",
      });
      return;
    }

    const customerId = `customer-${Date.now()}`;
    startOnboarding(customerId, newCustomer.name, newCustomer.email, "sales");

    toast({
      title: "Customer account created",
      description: `Onboarding started for ${newCustomer.name}.`,
    });

    setNewCustomer({ name: "", email: "", organization: "", industry: "" });
    setIsCreateDialogOpen(false);
  };

  return (
    <DashboardLayout
      role="Sales"
      userName="Michael Roberts"
      navItems={navItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Customer Onboarding
            </h1>
            <p className="text-muted-foreground">
              Manage and assist customer onboarding processes
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Customer Account</DialogTitle>
                <DialogDescription>
                  Start an onboarding process on behalf of a new customer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter full name"
                    value={newCustomer.name}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="customer@company.com"
                    value={newCustomer.email}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Company name"
                    value={newCustomer.organization}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        organization: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={newCustomer.industry}
                    onValueChange={(value) =>
                      setNewCustomer({ ...newCustomer, industry: value })
                    }
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
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCustomer}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create & Start Onboarding
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{incompleteOnboardings.length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedOnboardings.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allOnboardings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onboarding Tabs */}
        <Tabs defaultValue="in-progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="in-progress">
              In Progress ({incompleteOnboardings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedOnboardings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-4">
            {incompleteOnboardings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No onboardings in progress
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Create a new customer to start their onboarding journey.
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Customer
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {incompleteOnboardings.map((onboarding) => (
                  <Card key={onboarding.customerId}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Customer Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Building2 className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {onboarding.customerName}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                {onboarding.customerEmail}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge variant="outline">
                              Created by{" "}
                              {onboarding.createdBy === "sales"
                                ? "Sales"
                                : "Customer"}
                            </Badge>
                            <Badge variant="secondary">
                              Phase {onboarding.currentPhase}:{" "}
                              {getPhaseLabel(onboarding.currentPhase)}
                            </Badge>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="lg:w-48">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {onboarding.completedPhases.length}/5 phases
                            </span>
                          </div>
                          <Progress
                            value={getProgressPercentage(onboarding)}
                            className="h-2"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 lg:ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>

                      {/* Phase Progress Indicator */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((phase) => {
                            const isCompleted =
                              onboarding.completedPhases.includes(phase);
                            const isCurrent = onboarding.currentPhase === phase;
                            return (
                              <div
                                key={phase}
                                className="flex-1 flex items-center gap-1"
                              >
                                <div
                                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                                    isCompleted
                                      ? "bg-primary"
                                      : isCurrent
                                      ? "bg-primary/50"
                                      : "bg-muted"
                                  }`}
                                />
                                {phase < 5 && (
                                  <div className="w-1 h-1 rounded-full bg-muted" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Organization
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Commercial
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOnboardings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No completed onboardings yet
                  </h3>
                  <p className="text-muted-foreground">
                    Completed onboardings will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedOnboardings.map((onboarding) => (
                  <Card key={onboarding.customerId}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {onboarding.customerName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {onboarding.data.organization.organizationName ||
                                onboarding.customerEmail}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              Completed
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {onboarding.lastUpdated}
                            </p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                            Active Customer
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/sales/clients`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Assisted Onboarding Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  What you can do:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create customer accounts</li>
                  <li>• Fill organization and project details</li>
                  <li>• Enter commercial and budget information</li>
                  <li>• Track onboarding progress</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  What requires customer action:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Final approval of all details</li>
                  <li>• Safety & compliance confirmation</li>
                  <li>• Design review sign-offs</li>
                  <li>• Commercial agreement acceptance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
