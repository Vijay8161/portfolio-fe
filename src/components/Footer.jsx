import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

const Footer = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
      <div>
        <p className="text-sm font-medium text-ink">{profile.name}</p>
        <p className="mt-1 font-mono text-xs text-mute">
          © 2026 — Designed & engineered with intent.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a
          data-testid="footer-github-link"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 hover:text-ink"
        >
          <Github size={15} />
        </a>
        <a
          data-testid="footer-linkedin-link"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 hover:text-ink"
        >
          <Linkedin size={15} />
        </a>
        <a
          data-testid="footer-email-link"
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 hover:text-ink"
        >
          <Mail size={15} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
