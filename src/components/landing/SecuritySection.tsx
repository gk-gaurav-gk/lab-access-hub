import { Shield, Lock, Eye } from "lucide-react";

const SecuritySection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security & Access Control
            </h2>
            <p className="text-lg text-muted-foreground">
              Your data is protected with enterprise-grade security measures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Granular permissions ensure users only access what they need.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Data Confidentiality</h3>
              <p className="text-sm text-muted-foreground">
                End-to-end encryption protects all sensitive information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Controlled Visibility</h3>
              <p className="text-sm text-muted-foreground">
                Information is shared on a need-to-know basis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
