import { Building2 } from "lucide-react";
import { SectionHeader, Chip } from "@/components/chrome";
import { Reveal, Counter } from "@/components/motion";
import { experience } from "@/data/content";

const ArchFlow = ({ steps }) => (
  <ol>
    {steps.map((step, idx) => (
      <li key={idx} className="flex gap-4">
        <div className="flex flex-col items-center">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-mono text-[10px] text-brand">
            {idx + 1}
          </span>
          {idx < steps.length - 1 && <span className="w-px flex-1 bg-line" aria-hidden />}
        </div>
        <p className="pb-6 pt-1 font-mono text-xs leading-relaxed text-mute md:text-sm">{step}</p>
      </li>
    ))}
  </ol>
);

const MetricGrid = ({ metrics, testPrefix }) => (
  <div
    className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 ${
      metrics.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-3"
    }`}
  >
    {metrics.map((m, i) => (
      <div key={i} className="bg-surface p-5 md:p-6" data-testid={`${testPrefix}-metric-${i}`}>
        <Counter
          to={m.to}
          suffix={m.suffix}
          decimals={m.decimals || 0}
          className="block text-3xl font-medium tracking-tight text-ink md:text-4xl"
        />
        <span className="mt-2 block text-[11px] uppercase tracking-wider text-mute">{m.label}</span>
      </div>
    ))}
  </div>
);

const Experience = () => (
  <section id="experience" data-testid="experience-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="01"
        overline="Experience"
        title="Where I've shipped"
        desc="Production observability infrastructure at Garmin — systems that 10+ engineering teams depend on every day."
      />

      <Reveal>
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-l-2 border-brand pl-5">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-medium tracking-tight text-ink">
              <Building2 size={20} className="text-brand" /> {experience.company}
            </h3>
            <p className="mt-1 text-sm text-mute">{experience.role}</p>
          </div>
          <div className="font-mono text-xs text-mute">
            <p>{experience.period}</p>
            <p>{experience.location}</p>
          </div>
        </div>
        <p className="mb-14 max-w-3xl leading-relaxed text-mute">{experience.intro}</p>
      </Reveal>

      <div className="space-y-12">
        {experience.projects.map((prj) => (
          <Reveal key={prj.id} delay={0.05}>
            <article
              data-testid={`experience-${prj.id}`}
              className="rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line md:p-12"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">{prj.index}</p>
              <h4 className="mt-3 text-2xl font-medium tracking-tight text-ink md:text-3xl">{prj.title}</h4>

              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Problem</p>
                  <p className="leading-relaxed text-mute">{prj.problem}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {prj.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Architecture</p>
                  <ArchFlow steps={prj.architecture} />
                </div>
              </div>

              <div className="mt-10">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Impact</p>
                <MetricGrid metrics={prj.metrics} testPrefix={prj.id} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
