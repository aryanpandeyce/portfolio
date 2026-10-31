"use client";

import React from "react";
import Link from "next/link";
import { GitHubRepo } from "@/lib/github";
import { retroAudio } from "@/lib/audio";
import {
  ExternalLink,
  Star,
  ArrowRight,
  Terminal,
  Code2,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface FeaturedProjectsSectionProps {
  projects: GitHubRepo[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>{"// 03. FEATURED WORKS"}</span>
            </div>
            <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
              Selected Open-Source Projects &amp; Systems.
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl">
              Production distributed engines, developer tools, and tactile web apps built for performance and scale.
            </p>
          </div>

          <Link
            href="/projects"
            onClick={() => retroAudio.playClick()}
            className="retro-btn px-4 py-2.5 bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs sm:text-sm gap-2 self-start md:self-auto"
          >
            <span>View All Repositories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((repo, idx) => {
            // Give first two items larger emphasis on large screens
            const isLarge = idx === 0 || idx === 1;

            return (
              <div
                key={repo.slug}
                className={`retro-card retro-card-interactive flex flex-col justify-between overflow-hidden bg-[var(--surface)] ${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                {/* Window Chrome Header */}
                <div className="window-titlebar">
                  <div className="window-dots">
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>
                  <span className="font-mono-code text-xs font-semibold text-[var(--foreground)] truncate max-w-[200px]">
                    {repo.name}.app
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[var(--foreground-muted)]">
                    <Star className="w-3.5 h-3.5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono-code font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30">
                        {repo.featuredTag || repo.language}
                      </span>
                      {repo.language && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-[var(--surface-muted)] text-[var(--foreground-muted)] border border-[var(--border)]">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-heading font-bold text-xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {repo.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {repo.description}
                    </p>

                    {/* Architecture Badge Row */}
                    {repo.architecture && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono-code font-semibold text-[var(--accent)]">
                          <Code2 className="w-3.5 h-3.5" />
                          <span>ARCHITECTURE:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {repo.architecture.split("/").map((archItem, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                            >
                              {archItem.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Links */}
                  <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/${repo.slug}`}
                        onClick={() => retroAudio.playClick()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] text-xs font-mono-code font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </Link>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => retroAudio.playClick()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--accent)] bg-[var(--accent-subtle)] text-xs font-mono-code font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => retroAudio.playClick()}
                      title="View GitHub source code"
                      className="p-2 rounded-md border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
