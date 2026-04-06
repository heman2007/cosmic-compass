import { motion } from "framer-motion";

const policies = [
  {
    title: "Delivery",
    items: [
      "3–5 days for a single reading",
      "5–7 days for multiple readings",
      "Delays communicated in advance",
    ],
  },
  {
    title: "Urgent Requests",
    items: [
      "Next-day or instant delivery available",
      "25% urgency fee applies",
    ],
  },
  {
    title: "Payment",
    items: [
      "India: UPI / Bank Transfer",
      "International: PayPal / Bank Transfer",
      "Prices are inclusive of all taxes",
    ],
  },
  {
    title: "Refund Policy",
    items: [
      "No refunds after work begins",
      "Refund possible only before reading starts",
    ],
  },
];

const exceptions = [
  "Exact timing (except marriage/spouse)",
  "Detailed medical advice or procedures",
  "Pregnancy, gender prediction, miscarriages",
  "Legal/court cases",
  "Loans, debts, financial liabilities",
];

const PoliciesSection = () => {
  return (
    <section id="policies" className="relative py-32 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">
            Good to Know
          </p>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-foreground">
            Policies & <span className="italic text-primary">Terms</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {policies.map((policy, i) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border/20 bg-card/30"
            >
              <h3 className="font-heading text-xl font-light text-primary mb-4">
                {policy.title}
              </h3>
              <ul className="space-y-2">
                {policy.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Exceptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8 rounded-xl border border-destructive/20 bg-destructive/5 max-w-2xl mx-auto"
        >
          <h3 className="font-heading text-xl font-light text-foreground mb-4 text-center">
            Exceptions — Not Covered
          </h3>
          <ul className="space-y-2">
            {exceptions.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-destructive/40 mt-2 shrink-0" />
                <span className="font-body text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Discounts note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs text-muted-foreground text-center mt-12 max-w-lg mx-auto leading-relaxed"
        >
          Discounts are offered during prominent festivals, special events, and whenever intuition guides.
          All prices are inclusive of taxes.
        </motion.p>
      </div>
    </section>
  );
};

export default PoliciesSection;
