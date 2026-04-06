import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const services = [
  { name: "Career Readings", image: careerReading, sub: "Suitable Career · Wealth & Fame · Job-Related" },
  { name: "Marriage & Compatibility", image: marriage, sub: "Future Spouse · Compatibility · Marriage" },
  { name: "Time & Life Phases", image: solarReturn, sub: "Solar Return · Lunar Return · Mahadasha" },
  { name: "Karmic & Soul Level", image: karma, sub: "Pending Karma · Relationship · Children Progeny" },
  { name: "Health & Diseases", image: healthReading, sub: "Medical Astrology Analysis" },
  { name: "Travel & Relocation", image: travel, sub: "Relocation & Travel Reading" },
  { name: "Spirituality & Moksha", image: spirituality, sub: "Liberation & Spiritual Path" },
  { name: "Chart Interpretation", image: chartInterpretation, sub: "Persona & Transit Charts" },
  { name: "Muhurta & Electional", image: electional, sub: "Auspicious Timing Selection" },
  { name: "Vastu & Space", image: vastu, sub: "Home Decoration & Energy" },
  { name: "Personal Aesthetics", image: aesthetics, sub: "Fashion · Colour · Style" },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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
  // Each card occupies a slice of the progress
  const cardProgress = (index: number) => {
    const perCard = 1 / totalCards;
    const cardStart = index * perCard;
    return (scrollProgress - cardStart) / perCard;
  };

  return (
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
            // Card lifecycle: enters from right/rotated, centers, exits left/rotated
            // cp < 0: waiting (behind), cp 0-1: transitioning in, cp > 1: past

            const isVisible = cp > -1 && cp < 2;
            if (!isVisible) return null;

            // Spiral angle — rotates on Y axis
            const angle = (cp - 0.5) * -60; // -30 to +30 range centered
            // Z position — comes forward at center
            const z = -Math.abs(cp - 0.5) * 400;
            // X translation — slides across
            const x = (cp - 0.5) * 300;
            // Y stagger for spiral effect
            const y = (cp - 0.5) * -80;
            // Opacity
            const opacity = cp < 0 ? cp + 1 : cp > 1 ? 2 - cp : 1;
            // Scale
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
                <div className="relative w-[340px] h-[460px] md:w-[420px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto border border-border/20">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.3) 40%, transparent 70%)",
                    }}
                  />
                  {/* Card content */}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section heading — shown briefly at start */}
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
  );
};

export default ServicesSection;
