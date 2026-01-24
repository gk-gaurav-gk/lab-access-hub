import { Briefcase, Wrench, TrendingUp, User } from "lucide-react";

const roles = [
  {
    icon: Briefcase,
    title: "Consultants",
    description: "Manage client engagement and solution clarity",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Sales Teams",
    description: "Handle proposals, estimations, and commitments",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Wrench,
    title: "Tech & Engineering Teams",
    description: "Deliver accurate, feasible designs",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: User,
    title: "Clients",
    description: "Review, approve, and track their lab projects",
    color: "bg-purple-500/10 text-purple-600",
  },
];

const RolesSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who Uses This Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Role-based access ensures everyone sees exactly what they need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-full ${role.color} flex items-center justify-center mx-auto mb-4`}>
                <role.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {role.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
