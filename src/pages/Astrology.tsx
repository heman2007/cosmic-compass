import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CollapsibleInfo from "@/components/CollapsibleInfo";
import Footer from "@/components/Footer";

const aboutItems = [
  { number: "01", title: "Vedic & Western Systems", text: "Readings primarily use Vedic/Sidereal astrology, with the option for tropical/Western systems based on your preference." },
  { number: "02", title: "Written Delivery", text: "No video or voice calls — readings are delivered in writing via email. Voice note glimpses are available during the process." },
  { number: "03", title: "Remedies Included", text: "Suggested remedies, natal chart observations, and necessary timelines are included within every reading." },
];

const steps = [
  { step: "01", title: "Choose", text: "Pick the reading you need from the services above." },
  { step: "02", title: "Pay", text: "Receive a QR code or payment link. UPI/Bank Transfer for India, PayPal for international." },
  { step: "03", title: "Receive", text: "Your reading is delivered to your email within 3–5 business days." },
];

const policies = [
  { title: "Delivery", items: ["3–5 days for a single reading", "5–7 days for multiple readings", "Delays communicated in advance"] },
  { title: "Urgent Requests", items: ["Next-day or instant delivery available", "25% urgency fee applies"] },
  { title: "Payment", items: ["India: UPI / Bank Transfer", "International: PayPal / Bank Transfer", "Prices are inclusive of all taxes"] },
  { title: "Refund Policy", items: ["No refunds after work begins", "Refund possible only before reading starts"] },
];

const exceptions = [
  "Exact timing (except marriage/spouse)",
  "Detailed medical advice or procedures",
  "Pregnancy, gender prediction, miscarriages",
  "Legal/court cases",
  "Loans, debts, financial liabilities",
];

const Astrology = () => {
  return (
    <main className="bg-background relative">
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm px-3 py-2 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      <HeroSection />

      {/* Collapsible info sections */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <CollapsibleInfo title="How It Works" subtitle="About the Readings">
          <div className="grid md:grid-cols-3 gap-8">
            {aboutItems.map((item) => (
              <div key={item.number} className="text-center md:text-left">
                <span className="font-body text-3xl font-extralight text-primary/20 block mb-3">{item.number}</span>
                <h4 className="font-heading text-xl font-light text-foreground mb-2">{item.title}</h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </CollapsibleInfo>

        <CollapsibleInfo title="Book a Reading" subtitle="Simple Process">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center p-6 rounded-2xl border border-border/20 bg-card/50">
                <span className="font-body text-4xl font-extralight text-primary/15 block mb-3">{s.step}</span>
                <h4 className="font-heading text-xl font-light text-foreground mb-2">{s.title}</h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </CollapsibleInfo>

        <CollapsibleInfo title="Policies & Terms" subtitle="Good to Know">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {policies.map((policy) => (
              <div key={policy.title} className="p-5 rounded-xl border border-border/20 bg-card/30">
                <h4 className="font-heading text-lg font-light text-primary mb-3">{policy.title}</h4>
                <ul className="space-y-2">
                  {policy.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-destructive/20 bg-destructive/5 max-w-xl mx-auto">
            <h4 className="font-heading text-lg font-light text-foreground mb-3 text-center">Exceptions — Not Covered</h4>
            <ul className="space-y-2">
              {exceptions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-destructive/40 mt-2 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleInfo>
      </section>

      <ServicesSection />
      <Footer variant="astrology" />
    </main>
  );
};

export default Astrology;
