import { FlaskConical } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-background">SpaceXLab</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">Support</a>
            <a href="#" className="hover:text-background transition-colors">Security & Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-sm text-background/50">
            For authorized users only. © 2024 SpaceXLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
