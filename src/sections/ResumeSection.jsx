import { Download, GraduationCap, BadgeCheck } from "lucide-react";
import { SectionHeader } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { profile } from "@/data/content";

const ResumeSection = () => (
  <section id="resume" data-testid="resume-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="07"
        overline="Resume"
        title="The paper trail"
        desc="Everything above, compressed into one PDF — read it here or take it with you."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface" data-testid="resume-viewer">
            <iframe
              src="/resume.pdf#toolbar=0&view=FitH"
              title="Resume"
              className="h-[72vh] w-full border-0"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                <GraduationCap size={14} className="text-brand" /> Education
              </p>
              <p className="mt-4 font-medium text-ink">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-mute">{profile.education.school}</p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-mute">
                <span>{profile.education.period}</span>
                <span className="text-success">GPA {profile.education.gpa}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                <BadgeCheck size={14} className="text-brand" /> Certifications
              </p>
              <p className="mt-4 text-sm font-medium text-ink">AWS Certified Cloud Practitioner</p>
              <p className="mt-1 font-mono text-xs text-mute">May 2025</p>
            </div>

            <a
              data-testid="resume-download-btn"
              href="/resume.pdf"
              download="Vijay_Neeli_Resume.pdf"
              className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Download size={15} /> Download Resume
            </a>
          </aside>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ResumeSection;
