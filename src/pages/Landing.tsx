import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import landingBg from "@/assets/landing-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import tarotHero from "@/assets/tarot-hero.jpg";

const portals = [
  {
    title: "That Intuitive Speaker",
    subtitle: "Astrology",
    description: "Vedic & Western astrology readings — career, marriage, karma, health, and beyond.",
    image: heroBg,
    path: "/astrology",
    accent: "from-primary/40 to-transparent",
    borderColor: "border-primary/30",
    hoverBorder: "group-hover:border-primary/60",
    textAccent: "text-primary",
  },
  {
    title: "That Intuitive Reader",
    subtitle: "Tarot",
    description: "In-depth tarot readings delivered via voice notes — clarity for any question or situation.",
    image: tarotHero,
    path: "/tarot",
    accent: "from-[hsl(280,60%,50%)]/40 to-transparent",
    borderColor: "border-[hsl(280,60%,50%)]/30",
    hoverBorder: "group-hover:border-[hsl(280,60%,50%)]/60",
    textAccent: "text-[hsl(280,60%,70%)]",
  },
];

const Landing = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={landingBg}
          alt="Celestial archways"
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4"
        >
          Step into the unknown
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-foreground text-center leading-[0.95] mb-4"
        >
          Welcome to <span className="italic text-primary">Healing</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-sm text-muted-foreground mb-16 tracking-wide"
        >
          Choose your path
        </motion.p>

        {/* Two portal cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl">
          {portals.map((portal, i) => (
            <motion.div
              key={portal.path}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
            >
              <Link
                to={portal.path}
                className={`group block relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden border ${portal.borderColor} ${portal.hoverBorder} transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                <img
                  src={portal.image}
                  alt={portal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${portal.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className={`inline-block font-body text-xs font-semibold tracking-[0.35em] uppercase ${portal.textAccent} mb-4 px-3 py-1 rounded-md border ${portal.borderColor} bg-background/40 backdrop-blur-sm`}>
                    {portal.subtitle}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-3">
                    {portal.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 max-w-sm">
                    {portal.description}
                  </p>
                  <span className={`font-body text-xs tracking-widest uppercase ${portal.textAccent} group-hover:tracking-[0.3em] transition-all duration-500`}>
                    Enter →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-body text-[10px] text-muted-foreground/50 tracking-widest uppercase mt-16"
        >
          @thatintuitivespeaker · @thatintuitivereader
        </motion.p>
      </div>
    </main>
  );
};

export default Landing;
