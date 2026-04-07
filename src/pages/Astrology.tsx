import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import PoliciesSection from "@/components/PoliciesSection";

const Astrology = () => {
  return (
    <main className="bg-background relative">
      {/* Back button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm px-3 py-2 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BookingSection />
      <PoliciesSection />
    </main>
  );
};

export default Astrology;
