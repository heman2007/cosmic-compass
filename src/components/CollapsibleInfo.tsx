import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleInfoProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const CollapsibleInfo = ({ title, subtitle, children }: CollapsibleInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 md:py-8 px-2 group text-left"
      >
        <div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/60 mb-1">
            {subtitle}
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleInfo;
