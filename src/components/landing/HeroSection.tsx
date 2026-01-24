import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, FileCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(199_89%_48%/0.15),_transparent_50%)]" />
      
      <div className="container relative mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in">
            One Platform to Design, Deliver, and Govern Your Lab — Together.
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Centralized onboarding • Controlled design iterations • Transparent collaboration • Secure role-based access
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/login">
              <Button variant="hero" size="xl">
                Login to Workspace
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/onboarding-process">
              <Button variant="heroOutline" size="xl">
                Understand the Onboarding Process
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/70">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Role-Based Access</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/70">
              <FileCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Version Control</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
