import { SectionHeader } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { achievements } from "@/data/content";

const Achievements = () => (
  <section id="achievements" data-testid="achievements-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="05"
        overline="Recognition"
        title="Proof of work"
        desc="Certifications, competitive exams, and the daily reps."
      />

      <ol className="relative ml-2 border-l border-line">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.04}>
            <li data-testid={`achievement-${i}`} className="relative pb-12 pl-9 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-bg"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{a.date}</p>
              <h3 className="mt-2 text-xl font-medium tracking-tight text-ink">{a.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-mute">{a.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Achievements;
