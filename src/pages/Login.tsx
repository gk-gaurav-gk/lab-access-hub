import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlaskConical, ArrowLeft } from "lucide-react";

type Role = "consultant" | "tech" | "sales" | "customer";

const roles: { value: Role; label: string }[] = [
  { value: "consultant", label: "Consultant" },
  { value: "tech", label: "Tech Team" },
  { value: "sales", label: "Sales" },
  { value: "customer", label: "Customer" },
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | "">("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      navigate(`/dashboard/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(199_89%_48%/0.2),_transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-primary-foreground">SpaceXLab</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              Welcome to your workspace
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Access your role-specific dashboard to manage projects, review designs, and collaborate with your team.
            </p>
          </div>

          <p className="text-sm text-primary-foreground/50">
            For authorized users only
          </p>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">SpaceXLab</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Sign in to your account
            </h2>
            <p className="text-muted-foreground">
              Enter your credentials and select your role to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                <SelectTrigger className="h-11 bg-card">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-11" disabled={!role}>
              Login
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need access?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
