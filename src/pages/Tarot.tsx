import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ShoppingBag, Plus, Check } from "lucide-react";
import tarotHero from "@/assets/tarot-hero.jpg";
import { useCart } from "@/contexts/CartContext";

interface TarotService {
  name: string;
  price: string;
  priceUSD: string;
  description: string;
}

const tarotServices: TarotService[] = [
  {
    name: "1 Question",
    price: "₹369",
    priceUSD: "$7.77",
    description: "A focused pull for one specific question — direct, concise, and channeled just for you.",
  },
  {
    name: "15-Minute In-Depth Reading",
    price: "₹1,499",
    priceUSD: "$24",
    description: "A deeper exploration of your situation with intuitive guidance. Ideal for single-topic clarity.",
  },
  {
    name: "30-Minute In-Depth Reading",
    price: "₹2,499",
    priceUSD: "$36",
    description: "Extended session covering multiple angles of your question with detailed card-by-card interpretation.",
  },
  {
    name: "60-Minute In-Depth Reading",
    price: "₹4,999",
    priceUSD: "$58",
    description: "The most comprehensive reading — a full deep-dive into your situation, past influences, present dynamics, and future trajectory.",
  },
];

const howItWorks = [
  "Share your situation and questions in detail beforehand.",
  "Your reading will be delivered via voice notes on chat.",
  "Time mentioned refers to the depth and duration of the reading, not a live session.",
];

const Tarot = () => {
  const [selectedService, setSelectedService] = useState<TarotService | null>(null);

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tarotHero}
            alt="Tarot cards spread on velvet"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-background/65" />
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-body tracking-[0.3em] uppercase text-sm mb-6 text-[hsl(280,60%,70%)]"
          >
            Intuitive Tarot Guidance
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-[0.9] mb-8"
          >
            That Intuitive
            <br />
            <span className="italic text-[hsl(280,60%,70%)]">Reader</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Receive clarity through the cards. Personalized tarot readings
            delivered via voice notes — intimate, intuitive, and deeply personal.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(280,60%,70%)]/60 mb-4">
              Offerings
            </p>
            <h2 className="font-heading text-5xl md:text-7xl font-light text-foreground">
              Tarot <span className="italic text-[hsl(280,60%,70%)]">Pricelist</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {tarotServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer p-6 md:p-8 rounded-2xl border border-border/20 bg-card/30 hover:border-[hsl(280,60%,50%)]/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground group-hover:text-[hsl(280,60%,70%)] transition-colors">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-1 hidden md:block">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-body text-lg font-medium text-[hsl(280,60%,70%)]">
                      {service.price}
                    </span>
                    <span className="block font-body text-xs text-muted-foreground">
                      {service.priceUSD}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(280,60%,70%)]/60 mb-4">
              Simple Process
            </p>
            <h2 className="font-heading text-5xl md:text-7xl font-light text-foreground">
              How It <span className="italic text-[hsl(280,60%,70%)]">Works</span>
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-5"
              >
                <span className="font-body text-3xl font-extralight text-[hsl(280,60%,70%)]/20 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-muted-foreground leading-relaxed pt-2">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border/20 bg-card/30"
            >
              <h3 className="font-heading text-xl font-light text-[hsl(280,60%,70%)] mb-4">Delivery</h3>
              <p className="font-body text-sm text-muted-foreground">Within 24 hours of payment confirmation.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl border border-border/20 bg-card/30"
            >
              <h3 className="font-heading text-xl font-light text-[hsl(280,60%,70%)] mb-4">Priority Reading</h3>
              <p className="font-body text-sm text-muted-foreground">
                Immediate readings (within a few hours): <span className="text-[hsl(280,60%,70%)]">₹555 | $9.99 extra</span>
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="https://thatintuitivereader.tumblr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[hsl(280,60%,50%)] text-foreground font-body text-sm tracking-widest uppercase hover:bg-[hsl(280,60%,60%)] transition-colors duration-300"
            >
              Book on Tumblr
            </a>
            <p className="font-body text-xs text-muted-foreground mt-4">
              @thatintuitivereader
            </p>
          </motion.div>
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
              className="relative z-10 w-full max-w-md rounded-2xl border border-[hsl(280,60%,50%)]/30 bg-card shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-heading text-3xl font-light text-foreground mb-4">
                {selectedService.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {selectedService.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-lg bg-[hsl(280,60%,50%)]/10 border border-[hsl(280,60%,50%)]/20 font-body text-sm font-medium text-[hsl(280,60%,70%)]">
                  {selectedService.price} | {selectedService.priceUSD}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Tarot;
