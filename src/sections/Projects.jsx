import { ArrowUpRight, ChevronRight, Github, Lock, Globe, GitBranch } from "lucide-react";
import { SectionHeader, Chip } from "@/components/chrome";
import { Reveal, Counter } from "@/components/motion";
import { projects, moreProjects } from "@/data/content";

const LinkBtn = ({ href, icon: Icon, children, testid }) => (
  <a
    data-testid={testid}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-elevated"
  >
    <Icon size={13} /> {children}
  </a>
);

const SubLabel = ({ children }) => (
  <p className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{children}</p>
);

const ProjectBody = ({ p }) => (
  <div>
    <p className="font-mono text-sm text-brand">{p.num}</p>
    <h3 className="mt-2 text-3xl font-medium tracking-tight text-ink md:text-4xl">{p.name}</h3>
    <p className="mt-1.5 text-mute">{p.tagline}</p>
    <p className="mt-5 leading-relaxed text-mute">{p.description}</p>

    {p.features && (
      <>
        <SubLabel>What it does</SubLabel>
        <ul className="space-y-2">
          {p.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-mute">
              <ChevronRight size={15} className="mt-0.5 shrink-0 text-brand" />
              {f}
            </li>
          ))}
        </ul>
      </>
    )}

    {p.pipeline && (
      <>
        <SubLabel>Pipeline</SubLabel>
        <ol className="space-y-2">
          {p.pipeline.map((step, i) => (
            <li key={i} className="flex items-start gap-3 font-mono text-xs leading-relaxed text-mute md:text-sm">
              <span className="shrink-0 text-brand">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </>
    )}

    {p.decisions && (
      <>
        <SubLabel>Design decisions & tradeoffs</SubLabel>
        <ul className="space-y-3">
          {p.decisions.map((d, i) => (
            <li key={i} className="border-l border-line pl-4 text-sm leading-relaxed text-mute">
              {d}
            </li>
          ))}
        </ul>
      </>
    )}

    {p.models && (
      <>
        <SubLabel>Models compared</SubLabel>
        <ul className="space-y-2">
          {p.models.map((m) => (
            <li key={m.name} className="text-sm text-mute">
              <span className="font-mono text-ink">{m.name}</span> — {m.note}
            </li>
          ))}
        </ul>
      </>
    )}

    {p.metrics && (
      <div className="mt-8 flex flex-wrap gap-8">
        {p.metrics.map((m, i) => (
          <div key={i} data-testid={`${p.id}-metric-${i}`}>
            <Counter
              to={m.to}
              suffix={m.suffix}
              className="block text-4xl font-medium tracking-tight text-ink"
            />
            <span className="mt-1 block text-[11px] uppercase tracking-wider text-mute">{m.label}</span>
          </div>
        ))}
      </div>
    )}

    {p.codeBlock && (
      <>
        <SubLabel>Repository shape</SubLabel>
        <pre className="overflow-x-auto rounded-xl border border-line bg-bg p-5 font-mono text-[11px] leading-relaxed text-mute md:text-xs">
          {p.codeBlock}
        </pre>
      </>
    )}

    {p.lessons && (
      <blockquote className="mt-8 border-l-2 border-brand pl-4 text-sm italic leading-relaxed text-mute">
        {p.lessons}
      </blockquote>
    )}

    <div className="mt-8 flex flex-wrap gap-2">
      {p.stack.map((s) => (
        <Chip key={s}>{s}</Chip>
      ))}
    </div>

    <div className="mt-8 flex flex-wrap items-center gap-3">
      {p.github && (
        <LinkBtn href={p.github} icon={Github} testid={`${p.id}-github-link`}>
          View Source
        </LinkBtn>
      )}
      {p.extraLink && (
        <LinkBtn href={p.extraLink.url} icon={GitBranch} testid={`${p.id}-extra-link`}>
          {p.extraLink.label}
        </LinkBtn>
      )}
      {p.demo && (
        <LinkBtn href={p.demo} icon={Globe} testid={`${p.id}-demo-link`}>
          Live Demo
        </LinkBtn>
      )}
      {p.private && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-mute">
          <Lock size={13} /> Private repo — walkthrough on request
        </span>
      )}
    </div>
  </div>
);

const Projects = () => (
  <section id="work" data-testid="projects-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="02"
        overline="Selected Work"
        title="Systems, not demos"
        desc="Each project is a real engineering problem — with the architecture, decisions, and tradeoffs that shaped it."
      />

      <div>
        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <article
              data-testid={`project-${p.id}`}
              className="grid items-center gap-10 border-t border-line py-16 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="group relative overflow-hidden rounded-2xl border border-line">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:opacity-0" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
                    {p.tagline}
                  </span>
                </div>
              </div>
              <ProjectBody p={p} />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-8 border-t border-line pt-14">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            More engineering work
          </p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {moreProjects.map((mp) => (
              <a
                key={mp.name}
                data-testid={`more-project-${mp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                href={mp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-surface p-6 transition-colors duration-300 hover:bg-elevated md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-medium tracking-tight text-ink">{mp.name}</h4>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-mute transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mute">{mp.description}</p>
                <p className="mt-4 font-mono text-[11px] text-mute">{mp.stack.join(" · ")}</p>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Projects;
