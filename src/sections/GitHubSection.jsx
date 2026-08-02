import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, Star, GitFork, Circle } from "lucide-react";
import { SectionHeader } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import { profile } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const LANG_COLORS = {
  Java: "#b07219",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Dockerfile: "#384d54",
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const GitHubSection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/github/overview`)
      .then((r) => setData(r.data))
      .catch(() => setError(true));
  }, []);

  const langEntries = data
    ? Object.entries(data.languages).sort((a, b) => b[1] - a[1]).slice(0, 6)
    : [];
  const langTotal = langEntries.reduce((sum, [, v]) => sum + v, 0);

  return (
    <section id="github" data-testid="github-section" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          num="06"
          overline="GitHub"
          title="GitHub, live"
          desc="Pulled from the GitHub API when this page loads — not a screenshot from six months ago."
        />

        {!data && !error && (
          <div data-testid="github-loading" className="space-y-4">
            <div className="h-24 animate-pulse rounded-2xl bg-elevated" />
            <div className="h-44 animate-pulse rounded-2xl bg-elevated" />
            <div className="grid gap-4 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl bg-elevated" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <Reveal>
            <div data-testid="github-error" className="rounded-2xl border border-line bg-surface p-8 text-center">
              <p className="text-mute">Live GitHub data is unavailable right now.</p>
              <a
                data-testid="github-fallback-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-300 hover:bg-elevated"
              >
                Visit github.com/{profile.githubUser} <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        )}

        {data && (
          <div className="space-y-6">
            <Reveal>
              <div
                data-testid="github-profile-card"
                className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 md:p-8"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={data.user.avatar_url}
                    alt={`${data.user.login} avatar`}
                    className="h-16 w-16 rounded-full border border-line"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-mono text-lg text-ink">@{data.user.login}</p>
                    <p className="mt-1 font-mono text-xs text-mute">
                      {data.user.public_repos} public repos · {data.user.followers} followers · since{" "}
                      {formatDate(data.user.created_at)}
                    </p>
                  </div>
                </div>
                <a
                  data-testid="github-view-profile-btn"
                  href={data.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-elevated"
                >
                  View Profile <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-5 md:p-6">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  Contribution activity
                </p>
                <img
                  data-testid="github-contribution-graph"
                  src={`https://ghchart.rshah.org/3B82F6/${profile.githubUser}`}
                  alt={`GitHub contribution graph for ${profile.githubUser}`}
                  className="min-w-[640px] max-w-none"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.parentElement.style.display = "none";
                  }}
                />
              </div>
            </Reveal>

            {langEntries.length > 0 && (
              <Reveal>
                <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
                  <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                    Languages across repositories
                  </p>
                  <div className="flex h-2 w-full overflow-hidden rounded-full" data-testid="github-language-bar">
                    {langEntries.map(([lang, size]) => (
                      <span
                        key={lang}
                        style={{
                          width: `${(size / langTotal) * 100}%`,
                          background: LANG_COLORS[lang] || "#3B82F6",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {langEntries.map(([lang, size]) => (
                      <span key={lang} className="flex items-center gap-2 font-mono text-xs text-mute">
                        <Circle size={8} fill={LANG_COLORS[lang] || "#3B82F6"} stroke="none" />
                        {lang}
                        <span className="text-mute/60">{Math.round((size / langTotal) * 100)}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.repos.slice(0, 6).map((r) => (
                <Reveal key={r.name}>
                  <a
                    data-testid={`github-repo-${r.name}`}
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-line"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-sm font-medium text-ink group-hover:text-brand">{r.name}</p>
                      <ArrowUpRight size={14} className="shrink-0 text-mute" />
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-mute">
                      {r.description || "Engineering explorations and project work."}
                    </p>
                    <div className="mt-5 flex items-center gap-4 font-mono text-[11px] text-mute">
                      {r.language && (
                        <span className="flex items-center gap-1.5">
                          <Circle size={8} fill={LANG_COLORS[r.language] || "#3B82F6"} stroke="none" />
                          {r.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {r.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} /> {r.forks}
                      </span>
                      <span className="ml-auto">{formatDate(r.pushed_at)}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
