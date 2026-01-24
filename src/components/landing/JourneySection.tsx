import { UserPlus, Pencil, Calculator, Settings, Package, MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Client Onboarding" },
  { icon: Pencil, label: "Design Iterations" },
  { icon: Calculator, label: "Estimation" },
  { icon: Settings, label: "Customization" },
  { icon: Package, label: "Delivery" },
  { icon: MessageCircle, label: "Feedback" },
];

const JourneySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            High-Level Client Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, step-by-step process from initial engagement to final delivery.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop flow */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 border-2 border-primary/20">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center max-w-[100px]">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground mx-3 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-foreground">{step.label}</span>
                  <div className="text-sm text-muted-foreground">Step {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
