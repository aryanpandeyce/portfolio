"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GitHubRepo } from "@/lib/github";
import { retroAudio } from "@/lib/audio";
import { formatDate } from "@/lib/utils";
import {
  Search,
  ExternalLink,
  Star,
  GitFork,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Calendar,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface ProjectsArchiveProps {
  initialProjects: GitHubRepo[];
}

export function ProjectsArchive({ initialProjects }: ProjectsArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");

  // Extract unique languages
  const languages = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.language) set.add(p.language);
    });
    return ["ALL", ...Array.from(set)];
  }, [initialProjects]);

  // Filter and sort
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLanguage =
          selectedLanguage === "ALL" || project.language === selectedLanguage;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
        if (sortBy === "updated") {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  }, [initialProjects, searchQuery, selectedLanguage, sortBy]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search, Language Filter, Sort */}
      <div className="retro-card p-4 sm:p-6 bg-[var(--surface)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[var(--accent)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repos by name, description, topic (e.g. cache, raft, kafka)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] font-mono-code text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-6 flex items-center justify-end gap-2 font-mono-code text-xs">
            <SlidersHorizontal className="w-4 h-4 text-[var(--foreground-muted)]" />
            <span className="text-[var(--foreground-muted)] font-semibold">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                retroAudio.playClick();
                setSortBy(e.target.value as "stars" | "updated" | "name");
              }}
              className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-[var(--accent)] focus:outline-none"
            >
              <option value="stars">Most Starred ★</option>
              <option value="updated">Recently Updated 🕒</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="pt-2 border-t border-[var(--border)] flex flex-wrap items-center gap-1.5 font-mono-code text-xs">
          <span className="text-[var(--foreground-muted)] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            LANGUAGE:
          </span>
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => {
                  retroAudio.playClick();
                  setSelectedLanguage(lang);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                  isSelected
                    ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                    : "bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between font-mono-code text-xs text-[var(--foreground-muted)] px-1">
        <span>
          Showing <strong className="text-[var(--foreground)]">{filteredProjects.length}</strong> of{" "}
          {initialProjects.length} public repositories
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[var(--accent)] underline hover:no-underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="retro-card p-12 text-center bg-[var(--surface)] font-mono-code text-xs text-[var(--foreground-muted)] space-y-3">
          <div className="text-3xl">🔍</div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            No repositories matched your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLanguage("ALL");
            }}
            className="retro-btn px-4 py-2 bg-[var(--accent)] text-white mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((repo) => (
            <div
              key={repo.slug}
              className="retro-card retro-card-interactive flex flex-col justify-between overflow-hidden bg-[var(--surface)]"
            >
              {/* Window Header */}
              <div className="window-titlebar">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="font-mono-code text-xs font-semibold text-[var(--foreground)] truncate max-w-[180px]">
                  {repo.name}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[var(--foreground-muted)]">
                  <Star className="w-3.5 h-3.5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
                  <span>{repo.stargazers_count}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono-code font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30">
                      {repo.language || "Multi"}
                    </span>
                    <span className="text-[10px] font-mono-code text-[var(--foreground-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(repo.updated_at)}
                    </span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {repo.name}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Topic pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-[var(--surface-muted)] text-[var(--foreground-muted)] border border-[var(--border)]"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${repo.slug}`}
                      onClick={() => retroAudio.playClick()}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--surface-muted)] text-[11px] font-mono-code font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>README</span>
                    </Link>

                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => retroAudio.playClick()}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded border border-[var(--accent)]/40 bg-[var(--accent-subtle)] text-[11px] font-mono-code font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => retroAudio.playClick()}
                    title="View GitHub source"
                    className="p-1.5 rounded border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
