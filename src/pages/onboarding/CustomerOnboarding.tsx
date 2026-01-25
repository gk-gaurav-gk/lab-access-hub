import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { OrganizationStep } from "./steps/OrganizationStep";
import { ProjectSetupStep } from "./steps/ProjectSetupStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { SafetyComplianceStep } from "./steps/SafetyComplianceStep";
import { CommercialStep } from "./steps/CommercialStep";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  FlaskConical,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Save,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const phases = [
  { number: 1, title: "Organization", description: "Contact info" },
  { number: 2, title: "Project", description: "Lab details" },
  { number: 3, title: "Requirements", description: "Operational needs" },
  { number: 4, title: "Safety", description: "Compliance" },
  { number: 5, title: "Commercial", description: "Budget & timeline" },
];

export default function CustomerOnboarding() {
  const navigate = useNavigate();
  const {
    currentOnboarding,
    startOnboarding,
    setCurrentPhase,
    completePhase,
    updateOnboardingData,
    completeOnboarding,
  } = useOnboarding();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Start onboarding for new customer or load existing
    if (!currentOnboarding) {
      startOnboarding(
        "customer-new",
        "New Customer",
        "customer@example.com",
        "customer"
      );
    }
    setIsInitialized(true);
  }, [currentOnboarding, startOnboarding]);

  if (!isInitialized || !currentOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const currentPhase = currentOnboarding.currentPhase;
  const completedPhases = currentOnboarding.completedPhases;

  const canProceed = () => {
    const data = currentOnboarding.data;
    switch (currentPhase) {
      case 1:
        return (
          data.organization.organizationName &&
          data.organization.industry &&
          data.organization.location &&
          data.organization.primaryContactName &&
          data.organization.primaryContactEmail
        );
      case 2:
        return (
          data.project.projectName &&
          data.project.labType &&
          data.project.buildType &&
          data.project.labLocation
        );
      case 3:
        return data.requirements.labUsageType && data.requirements.numberOfUsers;
      case 4:
        return true; // Safety step is optional for some labs
      case 5:
        return (
          data.commercial.budgetRange &&
          data.commercial.costSensitivity &&
          data.commercial.priority &&
          data.commercial.timelineConstraints &&
          data.commercial.customizationPreference
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentPhase < 5) {
      completePhase(currentPhase);
      toast({
        title: "Progress saved",
        description: `Phase ${currentPhase} completed successfully.`,
      });
    }
  };

  const handleBack = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handleComplete = () => {
    completePhase(5);
    completeOnboarding();
    toast({
      title: "Onboarding complete!",
      description: "Welcome to SpaceXLab. Redirecting to your dashboard...",
    });
    setTimeout(() => {
      navigate("/dashboard/customer");
    }, 1500);
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progress saved",
      description: "You can continue onboarding anytime.",
    });
    navigate("/");
  };

  const renderStep = () => {
    switch (currentPhase) {
      case 1:
        return (
          <OrganizationStep
            data={currentOnboarding.data.organization}
            onChange={(data) => updateOnboardingData("organization", data)}
          />
        );
      case 2:
        return (
          <ProjectSetupStep
            data={currentOnboarding.data.project}
            onChange={(data) => updateOnboardingData("project", data)}
          />
        );
      case 3:
        return (
          <RequirementsStep
            data={currentOnboarding.data.requirements}
            onChange={(data) => updateOnboardingData("requirements", data)}
          />
        );
      case 4:
        return (
          <SafetyComplianceStep
            data={currentOnboarding.data.safety}
            onChange={(data) => updateOnboardingData("safety", data)}
          />
        );
      case 5:
        return (
          <CommercialStep
            data={currentOnboarding.data.commercial}
            onChange={(data) => updateOnboardingData("commercial", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">SpaceXLab</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSaveAndExit}>
              <Save className="w-4 h-4 mr-2" />
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Banner */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Let's Set Up Your Lab Project
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Complete these steps so we can understand your needs and create the perfect
            laboratory solution for you.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8 px-4">
          <OnboardingProgress
            currentPhase={currentPhase}
            completedPhases={completedPhases}
            phases={phases}
          />
        </div>

        {/* Form Card */}
        <Card className="mb-6">
          <CardContent className="p-6 sm:p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentPhase === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Step {currentPhase} of 5
            </span>

            {currentPhase < 5 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Onboarding
              </Button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Your progress is saved automatically. You can exit and resume anytime.
        </p>
      </main>
    </div>
  );
}
