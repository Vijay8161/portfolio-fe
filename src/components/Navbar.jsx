import { useContext, useState } from "react";
import { Moon, Sun, Command, Menu, X } from "lucide-react";
import { ThemeContext } from "@/App";
import { navLinks, profile } from "@/data/content";
import { scrollToId, scrollToTop } from "@/lib/scroll";

const Navbar = ({ onOpenPalette }) => {
  const { theme, toggle } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        data-testid="main-nav"
        className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-line px-4 py-2.5 shadow-lg backdrop-blur-xl"
        style={{ background: "color-mix(in srgb, var(--bg) 74%, transparent)" }}
      >
        <button
          data-testid="nav-logo-btn"
          onClick={scrollToTop}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-xs font-semibold text-ink transition-colors duration-300 hover:border-line"
          aria-label="Back to top"
        >
          VN
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="rounded-full px-3 py-1.5 text-sm text-mute transition-colors duration-300 hover:bg-elevated hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            data-testid="palette-open-btn"
            onClick={onOpenPalette}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mute transition-colors duration-300 hover:text-ink sm:flex"
            aria-label="Open command palette"
          >
            <Command size={13} />
            <span>K</span>
          </button>
          <button
            data-testid="theme-toggle-btn"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            data-testid="mobile-menu-btn"
            onClick={() => setOpen((o) => !o)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-mute md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          data-testid="mobile-menu"
          className="absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-line bg-surface p-3 shadow-xl backdrop-blur-xl md:hidden"
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              data-testid={`mobile-nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm text-mute transition-colors duration-200 hover:bg-elevated hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <a
            data-testid="mobile-nav-github"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl px-4 py-3 text-sm text-mute transition-colors duration-200 hover:bg-elevated hover:text-ink"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
