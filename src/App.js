import { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { BackToTop, Marquee, Noise, ScrollProgress, Spotlight } from "@/components/chrome";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Philosophy from "@/sections/Philosophy";
import Skills from "@/sections/Skills";
import Achievements from "@/sections/Achievements";
import GitHubSection from "@/sections/GitHubSection";
import ResumeSection from "@/sections/ResumeSection";
import Contact from "@/sections/Contact";

export const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("vn-theme") || "dark");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("vn-theme", theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="min-h-screen bg-bg text-ink">
        <Noise />
        <Spotlight />
        <ScrollProgress />
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        <main className="relative z-[4]">
          <Hero />
          <Marquee />
          <Experience />
          <Projects />
          <Philosophy />
          <Skills />
          <Achievements />
          <GitHubSection />
          <ResumeSection />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <Toaster
          position="bottom-right"
          theme={theme}
          toastOptions={{
            style: {
              background: "var(--surface)",
              border: "1px solid var(--line)",
              color: "var(--text)",
            },
          }}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
