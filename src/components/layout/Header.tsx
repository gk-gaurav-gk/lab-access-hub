import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">SpaceXLab</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Button variant="nav" size="sm">Platform Overview</Button>
          <Button variant="nav" size="sm">How Client Onboarding Works</Button>
          <Button variant="nav" size="sm">Security & Compliance</Button>
          <Button variant="nav" size="sm">Support</Button>
        </nav>

        <Link to="/login">
          <Button variant="default" size="sm">Login</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
