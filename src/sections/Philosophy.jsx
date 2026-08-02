import { SectionHeader } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { philosophy } from "@/data/content";

const Philosophy = () => (
  <section id="philosophy" data-testid="philosophy-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="03"
        overline="Engineering Philosophy"
        title="How I think about engineering"
        desc="Six principles I actually build by — a manifesto in chapters."
      />

      <div className="divide-y divide-line border-y border-line">
        {philosophy.map((ch, i) => (
          <Reveal key={ch.num} delay={i * 0.04}>
            <div
              data-testid={`philosophy-chapter-${ch.num}`}
              className="grid gap-3 py-9 md:grid-cols-[90px_1fr] md:gap-8"
            >
              <span className="font-mono text-xl text-brand">{ch.num}</span>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink md:text-2xl">{ch.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-mute">{ch.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Philosophy;
