import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowUp, Asterisk } from "lucide-react";
import { scrollToTop } from "@/lib/scroll";
import { marqueeItems } from "@/data/content";
import { Reveal } from "@/components/motion";

export const Noise = () => (
  <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 z-[3]" />
);

export const Spotlight = () => {
  useEffect(() => {
    const root = document.documentElement;
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          "radial-gradient(560px circle at var(--mx, 50%) var(--my, 18%), var(--spotlight), transparent 65%)",
      }}
    />
  );
};

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      data-testid="scroll-progress"
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-brand"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      data-testid="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-mute shadow-lg transition-[transform,color,border-color] duration-300 hover:-translate-y-1 hover:border-line hover:text-ink"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export const Marquee = () => {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-line py-8" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap pr-12">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-outline select-none text-4xl font-medium tracking-tight md:text-6xl">
              {item}
            </span>
            <Asterisk className="h-6 w-6 text-brand" />
          </span>
        ))}
      </div>
    </div>
  );
};

export const SectionHeader = ({ num, overline, title, desc }) => (
  <Reveal>
    <div className="mb-14 md:mb-20">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand">
        {num} — {overline}
      </p>
      <h2 className="text-4xl font-medium tracking-tight text-ink md:text-5xl">{title}</h2>
      {desc && <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">{desc}</p>}
    </div>
  </Reveal>
);

export const Chip = ({ children }) => (
  <span className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-mute transition-colors duration-300 hover:border-line hover:text-ink">
    {children}
  </span>
);
