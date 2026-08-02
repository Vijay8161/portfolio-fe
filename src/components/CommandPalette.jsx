import { useContext, useEffect } from "react";
import { Command } from "cmdk";
import {
  Briefcase, Layers, Compass, Wrench, Trophy, Github, FileText, Mail,
  Sun, Moon, Copy, ExternalLink, Linkedin,
} from "lucide-react";
import { toast } from "sonner";
import { ThemeContext } from "@/App";
import { navLinks, profile } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const sectionIcons = {
  experience: Briefcase,
  work: Layers,
  philosophy: Compass,
  skills: Wrench,
  github: Trophy,
  resume: FileText,
  contact: Mail,
};

const CommandPalette = ({ open, setOpen }) => {
  const { theme, toggle } = useContext(ThemeContext);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const run = (fn) => () => {
    fn();
    setOpen(false);
  };

  const copyEmail = run(() => {
    navigator.clipboard.writeText(profile.email);
    toast.success("Email copied to clipboard");
  });

  const itemCls =
    "flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm text-mute transition-colors duration-150 aria-selected:bg-elevated aria-selected:text-ink";

  return (
    <div className="fixed inset-0 z-[80]" data-testid="command-palette">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative mx-auto mt-[14vh] w-[min(92vw,580px)] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        <Command label="Command palette" loop>
          <div className="border-b border-line px-4">
            <Command.Input
              data-testid="command-input"
              placeholder="Jump to a section or run an action…"
              className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-mute"
            />
          </div>
          <Command.List className="max-h-[340px] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-mute">
              No results found.
            </Command.Empty>
            <Command.Group heading={<span className="px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Navigate</span>}>
              {navLinks.map((l) => {
                const Icon = sectionIcons[l.id] || Layers;
                return (
                  <Command.Item
                    key={l.id}
                    value={`go to ${l.label}`}
                    onSelect={run(() => scrollToId(l.id))}
                    className={itemCls}
                    data-testid={`palette-nav-${l.id}`}
                  >
                    <Icon size={15} />
                    {l.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
            <Command.Group heading={<span className="px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Actions</span>}>
              <Command.Item value="toggle theme dark light" onSelect={run(toggle)} className={itemCls} data-testid="palette-action-theme">
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                Switch to {theme === "dark" ? "light" : "dark"} mode
              </Command.Item>
              <Command.Item value="download resume pdf" onSelect={run(() => window.open("/resume.pdf", "_blank"))} className={itemCls} data-testid="palette-action-resume">
                <FileText size={15} />
                Open resume PDF
              </Command.Item>
              <Command.Item value="copy email address" onSelect={copyEmail} className={itemCls} data-testid="palette-action-email">
                <Copy size={15} />
                Copy email address
              </Command.Item>
              <Command.Item value="open github profile" onSelect={run(() => window.open(profile.github, "_blank"))} className={itemCls} data-testid="palette-action-github">
                <Github size={15} />
                Open GitHub
              </Command.Item>
              <Command.Item value="open linkedin profile" onSelect={run(() => window.open(profile.linkedin, "_blank"))} className={itemCls} data-testid="palette-action-linkedin">
                <Linkedin size={15} />
                Open LinkedIn
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-mute">
            <span>↑↓ navigate · ↵ select · esc close</span>
            <span className="flex items-center gap-1">
              <ExternalLink size={10} /> {profile.githubUser}
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
