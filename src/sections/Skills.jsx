import { SectionHeader, Chip } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { skills } from "@/data/content";

const Skills = () => (
  <section id="skills" data-testid="skills-section" className="relative">
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeader
        num="04"
        overline="Toolbox"
        title="What I build with"
        desc="Grouped by the problems they solve — not by how well they photograph as badges."
      />

      <div className="border-t border-line">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.03}>
            <div
              data-testid={`skills-group-${group.group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="grid gap-4 border-b border-line py-8 md:grid-cols-[220px_1fr] md:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute md:pt-1.5">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
