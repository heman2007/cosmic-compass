import { motion } from "framer-motion";

const aboutItems = [
  {
    number: "01",
    title: "Vedic & Western Systems",
    text: "Readings primarily use Vedic/Sidereal astrology, with the option for tropical/Western systems based on your preference.",
  },
  {
    number: "02",
    title: "Written Delivery",
    text: "No video or voice calls — readings are delivered in writing via email. Voice note glimpses are available during the process.",
  },
  {
    number: "03",
    title: "Remedies Included",
    text: "Suggested remedies, natal chart observations, and necessary timelines are included within every reading.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">
            About the Readings
          </p>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-foreground">
            How It <span className="italic text-primary">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {aboutItems.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center md:text-left"
            >
              <span className="font-body text-4xl font-extralight text-primary/20 block mb-4">
                {item.number}
              </span>
              <h3 className="font-heading text-2xl font-light text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
