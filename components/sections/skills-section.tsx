"use client";

import React, { useState } from "react";
import { profileData, SkillCategoryGroup, SkillItem } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import {
  Terminal,
  ExternalLink,
  Server,
  Zap,
} from "lucide-react";

export function SkillsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filterTabs = [
    { id: "all", label: "ALL LOADOUT" },
    { id: "languages", label: "LANGUAGES" },
    { id: "backend", label: "BACKEND & DISTRIBUTED" },
    { id: "cloud", label: "CLOUD & DEVOPS" },
    { id: "databases", label: "DATABASES" },
    { id: "frontend", label: "FRONTEND" },
    { id: "ai-data", label: "AI & DATA" },
    { id: "core-cs", label: "CORE CS" },
  ];

  const handleFilterClick = (filterId: string) => {
    retroAudio.playClick();
    setSelectedFilter(filterId);
  };

  const getTierBadgeStyle = (tier: SkillItem["tier"]) => {
    switch (tier) {
      case "Daily Driver":
        return "bg-[var(--accent)] text-white border-[var(--accent)]";
      case "Production":
        return "bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/40";
      case "Built Projects":
      default:
        return "bg-[var(--surface-muted)] text-[var(--foreground-muted)] border-[var(--border)]";
    }
  };

  // Filter skills based on tab
  const displayedCategories: SkillCategoryGroup[] =
    selectedFilter === "all"
      ? profileData.skillTree
      : profileData.skillTree.filter((cat) => cat.id === selectedFilter);

  const totalSkillCount = profileData.skillTree.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <section id="skills" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>{"// 04. SKILL TREE // LOADOUT"}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
              Evidence-Based Technical Loadout.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] text-xs font-mono-code text-[var(--foreground)] shadow-[2px_2px_0px_var(--retro-shadow-color)] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
              <span>{totalSkillCount} VERIFIED CARTRIDGES</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
            Strictly evidence-backed inventory of technologies used in production systems and verified open-source architectures. No arbitrary percentage bars—each cartridge features tangible project proof.
          </p>
        </div>

        {/* Filter Tabs Bar (Keyboard Accessible) */}
        <div
          role="tablist"
          aria-label="Skill Tree Categories"
          className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-10 overflow-x-auto"
        >
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterClick(tab.id)}
                className={`retro-btn px-3.5 py-2 font-mono-code text-xs transition-all ${
                  isActive
                    ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[2px_2px_0px_var(--retro-shadow-color)]"
                    : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]"
                }`}
              >
                {isActive ? "> " : ""}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Categories Window Panels */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="retro-card p-0 overflow-hidden bg-[var(--surface)]"
            >
              {/* Window Titlebar */}
              <div className="window-titlebar">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <div className="flex items-center gap-2 font-mono-code text-xs font-semibold text-[var(--foreground)]">
                  <Server className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="uppercase">{category.name}</span>
                </div>
                <span className="font-mono-code text-[11px] text-[var(--foreground-muted)]">
                  {category.skills.length} SLOTS
                </span>
              </div>

              {/* Category Info Header */}
              <div className="px-6 py-3.5 bg-[var(--surface-muted)] border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code text-[var(--foreground-muted)]">
                <span>{category.description}</span>
                <span className="text-[var(--accent)] font-semibold shrink-0">
                  PRESS CARTRIDGE FOR PROOF
                </span>
              </div>

              {/* Cartridge Slots Grid (2-column on mobile, up to 4 on desktop) */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === `${category.id}-${skill.name}`;

                  return (
                    <div
                      key={sIdx}
                      tabIndex={0}
                      onMouseEnter={() => {
                        retroAudio.playClick();
                        setHoveredSkill(`${category.id}-${skill.name}`);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(`${category.id}-${skill.name}`)}
                      onBlur={() => setHoveredSkill(null)}
                      className={`relative rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[3px_3px_0px_var(--retro-shadow-color)] transition-all flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                        isHovered
                          ? "-translate-y-1 shadow-[5px_5px_0px_var(--accent)] border-[var(--accent)]"
                          : "hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Cartridge Header Notch + Gold Pins */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border)] mb-3">
                        <span
                          className={`font-mono-code text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${getTierBadgeStyle(
                            skill.tier
                          )}`}
                        >
                          {skill.tier}
                        </span>

                        {/* Gold Connectors */}
                        <div
                          className="flex gap-1 items-center"
                          title="24K Retro Gold Contact Pins"
                        >
                          <span className="w-1 h-2.5 bg-[#D4AF37] rounded-xs" />
                          <span className="w-1 h-2.5 bg-[#D4AF37] rounded-xs" />
                          <span className="w-1 h-2.5 bg-[#D4AF37] rounded-xs" />
                        </div>
                      </div>

                      {/* Cartridge Title */}
                      <div className="space-y-1 mb-3">
                        <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] leading-snug">
                          {skill.name}
                        </h3>
                      </div>

                      {/* Crawlable Proof Section */}
                      <div className="pt-2.5 border-t border-[var(--border)] font-mono-code text-xs">
                        <div className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>{"// VERIFIED PROOF:"}</span>
                          {skill.proofUrl && (
                            <ExternalLink className="w-3 h-3 text-[var(--foreground-muted)]" />
                          )}
                        </div>

                        {skill.proofUrl ? (
                          <a
                            href={skill.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => retroAudio.playClick()}
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors leading-relaxed block text-[11px]"
                          >
                            {skill.proof}
                          </a>
                        ) : (
                          <span className="text-[var(--foreground-muted)] leading-relaxed block text-[11px]">
                            {skill.proof}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Loadout Legend */}
        <div className="mt-12 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-muted)] shadow-[3px_3px_0px_var(--retro-shadow-color)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono-code text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-bold text-[var(--foreground)]">TIER DEFINITIONS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-[var(--accent)] text-white border border-[var(--accent)]">
                Daily Driver
              </span>
              <span className="text-[var(--foreground-muted)]">Core tools used in active development</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/40">
                Production
              </span>
              <span className="text-[var(--foreground-muted)]">Deployed in production environments</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-[var(--surface-muted)] text-[var(--foreground-muted)] border border-[var(--border)]">
                Built Projects
              </span>
              <span className="text-[var(--foreground-muted)]">Implemented in verified system architectures</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
