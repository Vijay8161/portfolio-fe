import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { SectionHeader } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { profile } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}api`;

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-mute/50 focus:border-brand";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Couldn't send right now — email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, testid: "contact-email-link" },
    { icon: Linkedin, label: "LinkedIn", value: "in/" + profile.linkedin.split("/in/")[1], href: profile.linkedin, testid: "contact-linkedin-link" },
    { icon: Github, label: "GitHub", value: `@${profile.githubUser}`, href: profile.github, testid: "contact-github-link" },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          num="08"
          overline="Contact"
          title="Have a hard problem? I like those."
          desc="Open to software engineering roles — backend, distributed systems, and developer tooling."
        />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div>
                <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  Name
                </label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  Email
                </label>
                <input
                  id="contact-email"
                  data-testid="contact-email-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me about the role, the system, or the problem…"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  data-testid={l.testid}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-line"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 group-hover:text-brand">
                      <l.icon size={16} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{l.label}</p>
                      <p className="mt-0.5 text-sm text-ink">{l.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-mute transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </a>
              ))}
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mute">
                  <MapPin size={16} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Based in</p>
                  <p className="mt-0.5 text-sm text-ink">{profile.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Currently</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Shipping observability infrastructure at {profile.role.split("@")[1]?.trim() || "my current team"} and
                looking for teams that care about craft, scale, and systems that stay up.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
