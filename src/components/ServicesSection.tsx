import { useState } from "react";
import { motion } from "framer-motion";

import birthChart from "@/assets/services/birth-chart.jpg";
import tarotReading from "@/assets/services/tarot-reading.jpg";
import compatibility from "@/assets/services/compatibility.jpg";
import transitReading from "@/assets/services/transit-reading.jpg";
import solarReturn from "@/assets/services/solar-return.jpg";
import lunarReturn from "@/assets/services/lunar-return.jpg";
import synastry from "@/assets/services/synastry.jpg";
import careerReading from "@/assets/services/career-reading.jpg";
import healthReading from "@/assets/services/health-reading.jpg";
import relocation from "@/assets/services/relocation.jpg";
import electional from "@/assets/services/electional.jpg";
import horary from "@/assets/services/horary.jpg";

const services = [
  { name: "Birth Chart", image: birthChart },
  { name: "Tarot Reading", image: tarotReading },
  { name: "Compatibility", image: compatibility },
  { name: "Transit Reading", image: transitReading },
  { name: "Solar Return", image: solarReturn },
  { name: "Lunar Return", image: lunarReturn },
  { name: "Synastry", image: synastry },
  { name: "Career Reading", image: careerReading },
  { name: "Health Reading", image: healthReading },
  { name: "Relocation Chart", image: relocation },
  { name: "Electional", image: electional },
  { name: "Horary", image: horary },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-background">
      {/* Section header */}
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

      {/* Vertical strips container */}
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

export default ServicesSection;
