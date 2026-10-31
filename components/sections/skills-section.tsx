"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { Terminal, Layers, CheckCircle2 } from "lucide-react";

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (idx: number) => {
    retroAudio.playClick();
    setActiveTab(idx);
  };

  const currentCategory = profileData.skillCategories[activeTab];

  return (
    <section id="skills" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 04. TECHNICAL MATRIX</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Skills, Languages &amp; Engineering Disciplines.
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl">
            Grouped competencies spanning low-latency distributed backend services to reactive modern user interfaces.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-8">
          {profileData.skillCategories.map((cat, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.name}
                onClick={() => handleTabChange(idx)}
                className={`retro-btn px-4 py-2 font-mono-code text-xs sm:text-sm ${
                  isActive
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {isActive ? "> " : ""}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid for Active Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategory.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="retro-card p-5 bg-[var(--surface)] space-y-3 hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center font-mono text-xs font-bold text-[var(--accent)] shadow-[1px_1px_0px_var(--retro-shadow-color)]">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-mono-code text-sm font-semibold text-[var(--foreground)]">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono-code text-xs text-[var(--accent)] font-bold">
                  {skill.level}%
                </span>
              </div>

              {/* Retro Stepped Progress Bar */}
              <div className="w-full bg-[var(--surface-muted)] h-2.5 rounded border border-[var(--border)] overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-sm transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono-code text-[var(--foreground-muted)]">
                <span>FOUNDATION</span>
                <span>PRODUCTION READY</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Workflow Bar */}
        <div className="mt-12 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-muted)] shadow-[3px_3px_0px_var(--retro-shadow-color)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span className="font-bold text-[var(--foreground)]">DEVELOPMENT WORKFLOW &amp; TOOLING:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Neovim / VS Code", "Git & GitHub", "Linux/WSL2", "Docker", "Postman", "Vitest", "Playwright", "Figma"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] text-[11px]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
