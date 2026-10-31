"use client";

import React from "react";
import { profileData, ProfileAchievement } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { Trophy, Star, Flame, Award, Terminal, Sparkles } from "lucide-react";

export function AchievementsSection() {
  const getBadgeIcon = (iconType: ProfileAchievement["badgeIcon"]) => {
    switch (iconType) {
      case "trophy":
        return <Trophy className="w-5 h-5 text-[var(--accent-amber)]" />;
      case "star":
        return <Star className="w-5 h-5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />;
      case "flame":
        return <Flame className="w-5 h-5 text-[var(--accent-rose)] fill-[var(--accent-rose)]" />;
      case "award":
        return <Award className="w-5 h-5 text-[var(--accent)]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--accent-amber)]" />;
    }
  };

  return (
    <section id="achievements" className="py-20 sm:py-24 border-t-2 border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>{"// 05. HONORS & TROPHY CASE"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
              Trophy Case &amp; Key Milestones.
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono-code text-[var(--foreground-muted)] shadow-[1px_1px_0px_var(--retro-shadow-color)] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse" />
              <span>4 VERIFIED MERITS</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl">
            Distinctions spanning competitive programming consistency, academic excellence, and technical leadership.
          </p>
        </div>

        {/* 4-Column Retro Trophy Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.achievements.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => retroAudio.playClick()}
              className="retro-card retro-card-interactive p-5 bg-[var(--surface)] flex flex-col justify-between space-y-4 hover:border-[var(--accent)] transition-all group"
            >
              {/* Card Top: Icon & Year */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border-2 border-[var(--border-retro)] bg-[var(--surface-muted)] flex items-center justify-center shadow-[2px_2px_0px_var(--retro-shadow-color)] group-hover:scale-105 transition-transform">
                  {getBadgeIcon(item.badgeIcon)}
                </div>
                <span className="px-2 py-0.5 rounded font-mono-code text-xs font-bold bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border)]">
                  {item.year}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
                <div className="font-mono-code text-xs font-semibold text-[var(--accent-secondary)]">
                  {item.issuer}
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom status indicator */}
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono-code text-[10px] text-[var(--foreground-muted)]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                  <span>EARNED MERIT</span>
                </span>
                <span className="text-[var(--accent)] font-semibold">#0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
