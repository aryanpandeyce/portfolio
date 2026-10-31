import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/github";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  AlertCircle,
  Tag,
  Code2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface ProjectCaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Case Study & Engineering Architecture`,
    description: project.description,
    openGraph: {
      title: `${project.name} — Open Source Project by Alex Rivera`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-mono-code text-xs text-[var(--foreground-muted)]"
        >
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)] font-semibold">{project.name}</span>
        </nav>

        {/* Project Header Banner */}
        <div className="retro-card p-6 sm:p-8 bg-[var(--surface)] space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono-code font-bold bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30">
                  {project.language}
                </span>
                {project.featuredTag && (
                  <span className="px-2.5 py-1 rounded text-xs font-mono-code bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]">
                    {project.featuredTag}
                  </span>
                )}
              </div>

              <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight">
                {project.name}
              </h1>

              <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn px-4 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-xs gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Demo</span>
                </a>
              )}

              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn px-4 py-2.5 bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-code text-xs">
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center gap-2.5">
              <Star className="w-4 h-4 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
              <div>
                <div className="font-bold text-[var(--foreground)]">{project.stargazers_count}</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">Stargazers</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center gap-2.5">
              <GitFork className="w-4 h-4 text-[var(--foreground-muted)]" />
              <div>
                <div className="font-bold text-[var(--foreground)]">{project.forks_count}</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">Forks</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[var(--foreground-muted)]" />
              <div>
                <div className="font-bold text-[var(--foreground)]">
                  {formatDate(project.updated_at)}
                </div>
                <div className="text-[10px] text-[var(--foreground-muted)]">Last Push</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-[var(--accent-secondary)]" />
              <div>
                <div className="font-bold text-[var(--foreground)]">{project.open_issues_count}</div>
                <div className="text-[10px] text-[var(--foreground-muted)]">Open Issues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: README + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Markdown Body */}
          <div className="lg:col-span-8">
            <div className="retro-card overflow-hidden bg-[var(--surface)]">
              {/* Window Header */}
              <div className="window-titlebar">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                  README.md — {project.name}
                </span>
                <span className="text-[10px] font-mono-code text-[var(--accent)]">● PARSED_GFM</span>
              </div>

              {/* Rendered Markdown */}
              <div className="p-6 sm:p-10 prose prose-slate dark:prose-invert max-w-none text-[var(--foreground)]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ ...props }) => (
                      <h2
                        className="font-serif-heading font-extrabold text-2xl sm:text-3xl border-b pb-2 mb-4 text-[var(--foreground)]"
                        {...props}
                      />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="font-serif-heading font-bold text-xl sm:text-2xl mt-6 mb-3 text-[var(--foreground)]"
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className="font-serif-heading font-bold text-lg mt-5 mb-2 text-[var(--foreground)]"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <p className="text-sm sm:text-base leading-relaxed mb-4 text-[var(--foreground-muted)]" {...props} />
                    ),
                    code: ({ className, children, ...props }: React.ComponentProps<"code">) => {
                      const isInline = !className;
                      return isInline ? (
                        <code
                          className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--accent)] font-mono-code text-xs border border-[var(--border)]"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className={`block p-4 rounded-lg bg-[#1E1D1B] text-[#55EB7C] font-mono-code text-xs overflow-x-auto my-4 border border-[var(--border-retro)] ${className || ""}`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    table: ({ ...props }) => (
                      <div className="overflow-x-auto my-4">
                        <table
                          className="min-w-full text-xs font-mono-code border border-[var(--border)]"
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ ...props }) => (
                      <th
                        className="p-2 border border-[var(--border)] bg-[var(--surface-muted)] font-bold text-left"
                        {...props}
                      />
                    ),
                    td: ({ ...props }) => (
                      <td className="p-2 border border-[var(--border)]" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="border-l-4 border-[var(--accent)] pl-4 italic my-4 text-[var(--foreground-muted)]"
                        {...props}
                      />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="list-disc pl-5 space-y-1.5 text-sm my-3 text-[var(--foreground-muted)]" {...props} />
                    ),
                  }}
                >
                  {project.readme}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Topic Tags */}
            <div className="retro-card p-6 bg-[var(--surface)] space-y-3">
              <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Repository Topics</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded text-xs font-mono-code bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Card */}
            {project.architecture && (
              <div className="retro-card p-6 bg-[var(--surface)] space-y-2">
                <h3 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Architecture</span>
                </h3>
                <p className="text-xs font-mono-code text-[var(--foreground-muted)] leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-2">
              <Link
                href="/projects"
                className="retro-btn w-full py-2.5 bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Repositories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
