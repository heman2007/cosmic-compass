import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import PoliciesSection from "@/components/PoliciesSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BookingSection />
      <PoliciesSection />
    </main>
  );
};

export default Index;
