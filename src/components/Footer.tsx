import { Instagram } from "lucide-react";

interface FooterProps {
  variant?: "astrology" | "tarot";
}

const Footer = ({ variant = "astrology" }: FooterProps) => {
  const handle = variant === "tarot" ? "thatintuitivereader" : "thatintuitivespeaker";
  const accentClass = variant === "tarot" ? "text-[hsl(280,60%,70%)]" : "text-primary";
  const hoverClass = variant === "tarot" ? "hover:text-[hsl(280,60%,70%)]" : "hover:text-primary";

  return (
    <footer className="py-12 bg-secondary/30 border-t border-border/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body text-xs tracking-widest uppercase text-muted-foreground ${hoverClass} transition-colors flex items-center gap-2`}
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
          <a
            href={`https://threads.net/@${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body text-xs tracking-widest uppercase text-muted-foreground ${hoverClass} transition-colors`}
          >
            Threads
          </a>
          <a
            href={`https://${handle}.tumblr.com`}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body text-xs tracking-widest uppercase text-muted-foreground ${hoverClass} transition-colors`}
          >
            Tumblr
          </a>
        </div>
        <p className={`font-body text-xs ${accentClass}/60 tracking-widest`}>
          @{handle}
        </p>
        <p className="font-body text-[10px] text-muted-foreground/40 mt-4">
          © {new Date().getFullYear()} {variant === "tarot" ? "That Intuitive Reader" : "That Intuitive Speaker"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
