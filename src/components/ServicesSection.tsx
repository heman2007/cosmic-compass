import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

import careerReading from "@/assets/services/career-reading.jpg";
import marriage from "@/assets/services/marriage.jpg";
import solarReturn from "@/assets/services/solar-return.jpg";
import karma from "@/assets/services/karma.jpg";
import healthReading from "@/assets/services/health-reading.jpg";
import travel from "@/assets/services/travel.jpg";
import spirituality from "@/assets/services/spirituality.jpg";
import chartInterpretation from "@/assets/services/chart-interpretation.jpg";
import electional from "@/assets/services/electional.jpg";
import vastu from "@/assets/services/vastu.jpg";
import aesthetics from "@/assets/services/aesthetics.jpg";

interface SubService {
  name: string;
  description: string;
  price: string;
}

interface Service {
  name: string;
  image: string;
  sub: string;
  description?: string;
  subServices?: SubService[];
  price?: string;
  bundleName?: string;
  bundlePrice?: string;
  bundleDescription?: string;
}

const services: Service[] = [
  {
    name: "Career Readings",
    image: careerReading,
    sub: "Suitable Career · Wealth & Fame · Job-Related",
    subServices: [
      {
        name: "Suitable Career Options",
        description: "Deep dive into professional paths that resonate with your core purpose. Navigate competitive exams, question your current field, or resolve the tension between a practical choice and a lifelong dream.",
        price: "₹2,199 | $25",
      },
      {
        name: "Money, Wealth & Fame",
        description: "A strategic roadmap to your highest earning potential — identifying sectors that offer the greatest financial reward, plus your unique path to visibility, influence, and public recognition.",
        price: "₹1,899 | $22",
      },
      {
        name: "Job-Related Reading",
        description: "Insights into the theme of your next career move — from office dynamics and colleague temperament to a detailed preview of your next professional chapter.",
        price: "₹1,699 | $20",
      },
    ],
    bundleName: "Ultimate Career Bundle",
    bundlePrice: "₹4,999 | $60",
    bundleDescription: "All three career readings combined — a complete roadmap from soul calling to wealth potential to workplace navigation.",
  },
  {
    name: "Marriage & Compatibility",
    image: marriage,
    sub: "Future Spouse · Compatibility · Marriage",
    subServices: [
      {
        name: "Future Spouse Reading",
        description: "Explore the circumstances of your first encounter, spiritual signs before you meet, your future spouse's personality traits, and the dynamic that will define your relationship.",
        price: "₹2,199 | $25",
      },
      {
        name: "Compatibility Reading",
        description: "Compares energetic blueprints of two individuals — romantic, family, or friends — revealing points of harmony and potential friction with actionable guidance.",
        price: "₹1,999 | $23",
      },
      {
        name: "Marriage Reading",
        description: "A vivid preview of your wedding day — the energy, aesthetic, and location — plus insights into life as a spouse, in-law dynamics, and the path of parenthood.",
        price: "₹2,399 | $28",
      },
    ],
    bundleName: "Sacred Union Bundle",
    bundlePrice: "₹5,999 | $69",
    bundleDescription: "The complete romantic destiny package — from identifying your soulmate to compatibility insights and married life preview.",
  },
  {
    name: "Time & Life Phases",
    image: solarReturn,
    sub: "Solar Return · Lunar Return · Mahadasha",
    subServices: [
      {
        name: "Yearly Solar Return",
        description: "Your definitive roadmap from one birthday to the next — dominant themes, career shifts, finances, health, and relationship milestones with exact timelines.",
        price: "₹2,499 | $29",
      },
      {
        name: "Monthly Lunar Return",
        description: "A precise month-ahead overview based on the Moon's return to its natal position — immediate opportunities, emotional themes, and practical priorities.",
        price: "₹1,299 | $15/month",
      },
      {
        name: "Mahadasha Analysis",
        description: "Deep dive into your current and upcoming planetary periods — long-term karmic themes, major turning points, and how to consciously align with planetary lessons.",
        price: "₹2,999 | $35",
      },
    ],
    bundleName: "Time Traveler Bundle",
    bundlePrice: "₹6,499 | $73",
    bundleDescription: "The ultimate chronological roadmap — past influences, present opportunities, and future potential across all time scales.",
  },
  {
    name: "Karmic & Soul Level",
    image: karma,
    sub: "Pending Karma · Relationship · Children",
    subServices: [
      {
        name: "Pending Karma + Relationship Attachment",
        description: "Explore unresolved karmic patterns from past lifetimes shaping your current attachment styles. Identify repetitive cycles and what needs healing for healthier connections.",
        price: "₹2,999 | $35",
      },
      {
        name: "Children Progeny Reading",
        description: "Insights into the nature and personality of your future or current children, the unique emotional bond you'll share, and how to nurture the next generation with wisdom.",
        price: "₹2,499 | $29",
      },
    ],
    bundleName: "Soul Legacy Bundle",
    bundlePrice: "₹5,499 | $63",
    bundleDescription: "Understand both your ancestral past and generational future — a holistic view of your soul's mission within your family tree.",
  },
  {
    name: "Health & Diseases",
    image: healthReading,
    sub: "Medical Astrology Analysis",
    description: "Uncover the deeper energetic patterns influencing your physical vitality. Identify potential vulnerabilities and the timing of specific health cycles in your chart. A powerful supportive tool alongside professional medical advice.",
    price: "₹1,899 | $22",
  },
  {
    name: "Travel & Relocation",
    image: travel,
    sub: "Relocation & Travel Reading",
    description: "Your personal compass — highlighting specific countries and cities that best support your career, education, or emotional tranquility. Ensure your chosen destination aligns with long-term growth and prosperity.",
    price: "₹2,999 | $35",
  },
  {
    name: "Spirituality & Moksha",
    image: spirituality,
    sub: "Liberation & Spiritual Path",
    description: "Discover the higher purpose behind your human experience. Explore your destined spiritual path, karmic lessons, potential for self-realization, and practices that best support your evolutionary shift.",
    price: "₹1,699 | $20",
  },
  {
    name: "Chart Interpretation",
    image: chartInterpretation,
    sub: "Persona & Transit Charts",
    description: "Specialized analysis of your birth structure and current planetary transits. Understand how ongoing celestial movements are influencing your personality, mindset, and life circumstances.",
    price: "₹2,199 | $25",
  },
  {
    name: "Muhurta & Electional",
    image: electional,
    sub: "Auspicious Timing Selection",
    description: "Identify the most auspicious windows for major events, critical decisions, or new ventures based on planetary strength. Start your next chapter with cosmic favor behind you.",
    price: "₹2,199 | $25",
  },
  {
    name: "Vastu & Space",
    image: vastu,
    sub: "Home Decoration & Energy",
    description: "Bridge your astrological chart with Vastu principles to optimize energy flow. Personalized guidance on spatial arrangements, decor choices, and energy corrections for your living space.",
    price: "₹3,299 | $38",
  },
  {
    name: "Personal Aesthetics",
    image: aesthetics,
    sub: "Fashion · Colour · Style",
    description: "Harmonize your fashion choices, personal style, and color palette with your astrological makeup. Discover how to use color and design to enhance your presence and magnetism.",
    price: "₹1,699 | $20",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { items, addItem } = useCart();

  const isInCart = (id: string) => items.some((i) => i.id === id);

  const handleAddToCart = (name: string, price: string, parentName?: string) => {
    const id = parentName ? `${parentName}-${name}` : name;
    addItem({ id, name, parentName, price, type: "astrology" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const rawProgress = -rect.top / sectionHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(progress);
      setActiveIndex(Math.min(Math.floor(progress * services.length), services.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCards = services.length;
  const cardProgress = (index: number) => {
    const perCard = 1 / totalCards;
    const cardStart = index * perCard;
    return (scrollProgress - cardStart) / perCard;
  };

  return (
    <>
      <section
        id="services"
        ref={sectionRef}
        className="relative bg-background"
        style={{ height: `${(totalCards + 1) * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex">
          {/* Left panel — service list */}
          <div className="hidden md:flex flex-col justify-center w-[320px] shrink-0 pl-10 pr-6 z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-xs tracking-[0.3em] uppercase text-primary/60 mb-8"
            >
              What are you looking for?
            </motion.p>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={s.name}>
                  <button
                    onClick={() => {
                      if (!sectionRef.current) return;
                      const perCard = sectionRef.current.offsetHeight / (totalCards + 1);
                      const target = sectionRef.current.offsetTop + i * perCard;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                    className={`font-body text-sm tracking-wide transition-all duration-500 text-left ${
                      activeIndex === i
                        ? "text-primary translate-x-2"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="mr-3 text-xs text-primary/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel — 3D spiral cards */}
          <div className="flex-1 relative" style={{ perspective: "1200px" }}>
            {services.map((service, index) => {
              const cp = cardProgress(index);
              const isVisible = cp > -1 && cp < 2;
              if (!isVisible) return null;

              const angle = (cp - 0.5) * -60;
              const z = -Math.abs(cp - 0.5) * 400;
              const x = (cp - 0.5) * 300;
              const y = (cp - 0.5) * -80;
              const opacity = cp < 0 ? cp + 1 : cp > 1 ? 2 - cp : 1;
              const scale = 1 - Math.abs(cp - 0.5) * 0.3;

              return (
                <div
                  key={service.name}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`,
                    opacity: Math.max(0, Math.min(1, opacity)),
                    zIndex: 100 - Math.round(Math.abs(cp - 0.5) * 100),
                    transition: "opacity 0.1s ease-out",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="relative w-[340px] h-[460px] md:w-[420px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto border border-border/20 cursor-pointer group"
                    onClick={() => setSelectedService(service)}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary/70 block mb-2">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-2">
                        {service.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground tracking-wide">
                        {service.sub}
                      </p>
                      <p className="font-body text-[10px] text-primary/50 tracking-widest uppercase mt-3">
                        Tap to explore →
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section heading */}
        <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none z-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-light text-foreground text-center"
            style={{ opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - scrollProgress * 10) }}
          >
            Our <span className="italic text-primary">Services</span>
          </motion.h2>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border/30 bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header image */}
              <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 60%)",
                  }}
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                    {selectedService.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Single service (no sub-services) */}
                {selectedService.description && (
                  <div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {selectedService.description}
                    </p>
                    {selectedService.price && (
                      <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="font-body text-sm font-medium text-primary">{selectedService.price}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-services */}
                {selectedService.subServices?.map((sub, i) => (
                  <div key={i} className="border-b border-border/20 pb-5 last:border-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-heading text-xl font-light text-foreground">
                        {sub.name}
                      </h4>
                      <span className="font-body text-xs font-medium text-primary whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full">
                        {sub.price}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                ))}

                {/* Bundle offer */}
                {selectedService.bundleName && (
                  <div className="mt-2 p-5 rounded-xl border border-primary/30 bg-primary/5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/70">
                        Bundle & Save
                      </span>
                    </div>
                    <h4 className="font-heading text-xl font-light text-primary mb-2">
                      {selectedService.bundleName}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                      {selectedService.bundleDescription}
                    </p>
                    <span className="font-body text-sm font-medium text-primary">
                      {selectedService.bundlePrice}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesSection;
