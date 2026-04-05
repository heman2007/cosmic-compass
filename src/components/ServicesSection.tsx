import { useState } from "react";
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
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-background">
      <div className="px-6 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl font-light text-foreground text-center"
        >
          Our <span className="italic text-primary">Services</span>
        </motion.h2>
      </div>

      <div className="flex h-[80vh] md:h-screen w-full overflow-hidden">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            className="relative cursor-pointer overflow-hidden border-r border-border/30 last:border-r-0"
            animate={{
              flex: activeIndex === index ? 4 : activeIndex !== null ? 0.5 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                loading="lazy"
                width={640}
                height={900}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    activeIndex === index
                      ? "linear-gradient(to top, hsl(222 47% 6% / 0.7), transparent 60%)"
                      : "hsl(222 47% 6% / 0.75)",
                }}
              />
            </div>

            {/* Service name */}
            <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
              <div className="flex flex-col items-center gap-2">
                {activeIndex === index && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="font-body text-xs text-primary/80 tracking-widest uppercase text-center max-w-[200px]"
                  >
                    {service.sub}
                  </motion.span>
                )}
                <motion.span
                  className="font-heading text-foreground text-lg md:text-2xl font-light tracking-wide whitespace-nowrap"
                  style={{
                    writingMode: activeIndex === index ? "horizontal-tb" : "vertical-rl",
                    textOrientation: "mixed",
                    transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                >
                  {service.name}
                </motion.span>
              </div>
            </div>

            {/* Number */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <span className="font-body text-xs text-primary/60 tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default function ServicesSection() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const el = horizontalRef.current;

    // Horizontal scroll animation
    gsap.to(el, {
      x: () => -(el.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${el.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });

    // Stagger animation for cards
    gsap.from(".service-card", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="h-screen overflow-hidden">
      <div
        ref={horizontalRef}
        className="flex w-[500vw] h-full"
      >
        {services.map((service, i) => (
          <div
            key={i}
            className="service-card w-screen flex items-center justify-center text-4xl font-bold"
          >
            {service}
          </div>
        ))}
      </div>
    </section>
  );
}
export default ServicesSection;
