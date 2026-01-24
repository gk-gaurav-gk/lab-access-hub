import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import RolesSection from "@/components/landing/RolesSection";
import JourneySection from "@/components/landing/JourneySection";
import SecuritySection from "@/components/landing/SecuritySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RolesSection />
        <JourneySection />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
