import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LogIn, 
  ClipboardList, 
  Layers, 
  Calculator, 
  Truck, 
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Shield,
  Target,
  Clock,
  Users,
  TrendingUp,
  FileCheck
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Secure Login & Role Assignment",
    icon: LogIn,
    whatHappens: [
      "You log in to the SpaceXLab Workspace",
      "Your role (Client, Consultant, Sales, Tech) determines what you can see and do"
    ],
    whatYouDo: [
      "Access your dedicated project workspace"
    ],
    outcome: "Right people see the right information"
  },
  {
    number: 2,
    title: "Client Information & Requirements Capture",
    icon: ClipboardList,
    whatHappens: [
      "You provide: Organization details, Lab purpose & scope, Compliance requirements, Initial constraints",
      "SpaceXLab validates completeness and flags missing or conflicting inputs"
    ],
    whatYouDo: [
      "Complete the requirements form",
      "Upload necessary documents"
    ],
    outcome: "Clean, structured inputs before design begins"
  },
  {
    number: 3,
    title: "Design Iterations & Version Control",
    icon: Layers,
    whatHappens: [
      "Design concepts are shared as controlled versions",
      "Every update is tracked (v1.0, v1.1, v2.0)"
    ],
    whatYouDo: [
      "Review designs",
      "Provide comments",
      "Approve stages formally"
    ],
    outcome: "No confusion about \"latest version\""
  },
  {
    number: 4,
    title: "Estimation & Customization Alignment",
    icon: Calculator,
    whatHappens: [
      "Each approved design version is linked to cost estimate and timeline impact",
      "Custom requests are clearly classified"
    ],
    whatYouDo: [
      "Review cost & timeline",
      "Approve before moving forward"
    ],
    outcome: "Transparent pricing, no last-minute shocks"
  },
  {
    number: 5,
    title: "Delivery Kickoff",
    icon: Truck,
    whatHappens: [
      "Final scope is locked",
      "Delivery teams begin execution",
      "Progress is visible inside the platform"
    ],
    whatYouDo: [
      "Track milestones",
      "Raise queries in one place"
    ],
    outcome: "Predictable delivery"
  },
  {
    number: 6,
    title: "Post-Delivery Feedback & Improvement",
    icon: MessageSquare,
    whatHappens: [
      "You are prompted to give structured feedback",
      "Feedback is reviewed and acted upon"
    ],
    whatYouDo: [
      "Rate experience",
      "Share improvement suggestions"
    ],
    outcome: "You are heard — not ignored after delivery"
  }
];

const expectations = [
  { icon: Target, text: "A single source of truth for your lab project" },
  { icon: FileCheck, text: "Clear approvals and accountability" },
  { icon: Shield, text: "Secure role-based access" },
  { icon: TrendingUp, text: "Reduced rework and faster decisions" },
  { icon: Users, text: "Continuous improvement driven by feedback" }
];

const yourContributions = [
  { icon: Clock, text: "Timely inputs during onboarding" },
  { icon: CheckCircle2, text: "Formal approvals at defined checkpoints" },
  { icon: MessageSquare, text: "Feedback after delivery" }
];

const OnboardingProcess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
                How Onboarding Works at SpaceXLab
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Our onboarding process is designed to give you clarity, control, and transparency from day one — so there are no surprises later.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                A Simple, Structured Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each step is designed to keep you informed and in control of your lab project.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {steps.map((step, index) => (
                <Card 
                  key={step.number} 
                  className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Step Number & Icon */}
                      <div className="md:w-48 bg-primary/5 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Step {step.number}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                          {step.title}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* What Happens */}
                          <div>
                            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                              What Happens
                            </h4>
                            <ul className="space-y-2">
                              {step.whatHappens.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* What You Do */}
                          <div>
                            <h4 className="text-sm font-semibold text-accent-foreground uppercase tracking-wide mb-2">
                              What You Do
                            </h4>
                            <ul className="space-y-2">
                              {step.whatYouDo.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Outcome */}
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">Outcome: {step.outcome}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expectations Sections */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              {/* What You Can Expect */}
              <div className="animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What You Can Expect From Us
                </h2>
                <div className="space-y-4">
                  {expectations.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border/50 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium pt-2">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Expect */}
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What We'll Need From You
                </h2>
                <div className="space-y-4">
                  {yourContributions.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border/50 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span className="text-foreground font-medium pt-2">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Your active participation ensures a smooth, efficient process and the best possible outcome for your lab project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Log in to your workspace or reach out to our support team if you have questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="hero" size="xl">
                    Login to Workspace
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="heroOutline" size="xl">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OnboardingProcess;
