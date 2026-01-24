import { Users, FileText, GitBranch, CheckCircle, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Structured Client Onboarding",
    description: "Streamlined intake process with clear milestones and documentation requirements.",
  },
  {
    icon: FileText,
    title: "Single Source of Truth",
    description: "All lab requirements, specifications, and decisions in one centralized location.",
  },
  {
    icon: GitBranch,
    title: "Version-Controlled Designs",
    description: "Track every iteration with complete change history and approval trails.",
  },
  {
    icon: CheckCircle,
    title: "Clear Approvals & Accountability",
    description: "Defined sign-off workflows with role-based permissions and audit logs.",
  },
  {
    icon: MessageSquare,
    title: "Post-Delivery Feedback",
    description: "Capture learnings and client feedback to continuously improve processes.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What This Platform Enables
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A purpose-built system for structured collaboration between your teams and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
