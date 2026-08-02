import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Github, MapPin } from "lucide-react";
import { MaskedLine, EASE } from "@/components/motion";
import { profile } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 150]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0.15]);

  const primaryBtn =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90";
  const secondaryBtn =
    "inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-elevated";

  return (
    <section data-testid="hero-section" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="bg-grid grid-fade absolute inset-0" aria-hidden />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36">
        <MaskedLine>
          <span className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-brand">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            {profile.name} — Software Engineer
          </span>
        </MaskedLine>

        <h1 className="max-w-5xl text-5xl font-medium leading-[1.06] tracking-tighter text-ink md:text-7xl">
          <MaskedLine delay={0.1}>Building scalable backend systems,</MaskedLine>
          <MaskedLine delay={0.22}>distributed applications,</MaskedLine>
          <MaskedLine delay={0.34}>
            and <span className="text-brand">AI-powered</span> developer tools.
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-8 text-lg font-medium text-ink"
          data-testid="hero-role"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
          className="mt-3 max-w-2xl leading-relaxed text-mute"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            data-testid="hero-view-projects-btn"
            onClick={() => scrollToId("work")}
            className={primaryBtn}
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            View Projects <ArrowRight size={15} />
          </button>
          <a data-testid="hero-resume-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
            <FileText size={15} /> Resume
          </a>
          <a data-testid="hero-github-btn" href={profile.github} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
            <Github size={15} /> GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-xs text-mute"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> {profile.location}
          </span>
          <span>GPA {profile.education.gpa}</span>
          <span>400+ LeetCode</span>
          <span>AWS Certified</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-line"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
