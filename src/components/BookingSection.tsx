import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Choose", text: "Pick the reading you need from the services above." },
  { step: "02", title: "Pay", text: "Receive a QR code or payment link. UPI/Bank Transfer for India, PayPal for international." },
  { step: "03", title: "Receive", text: "Your reading is delivered to your email within 3–5 business days." },
];

const BookingSection = () => {
  return (
    <section id="booking" className="relative py-32 bg-secondary/30 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">
            Simple Process
          </p>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-foreground">
            Book a <span className="italic text-primary">Reading</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center p-8 rounded-2xl border border-border/20 bg-card/50"
            >
              <span className="font-body text-5xl font-extralight text-primary/15 block mb-4">
                {s.step}
              </span>
              <h3 className="font-heading text-2xl font-light text-foreground mb-2">
                {s.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://thatintuitivespeaker.tumblr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Contact on Tumblr
          </a>
          <p className="font-body text-xs text-muted-foreground mt-4">
            @thatintuitivespeaker
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
