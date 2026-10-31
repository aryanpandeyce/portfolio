"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { Briefcase, Calendar, MapPin, CheckCircle, Terminal } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 02. CAREER &amp; INTERNSHIPS</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Work Experience &amp; Engineering Track Record.
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-2xl">
            A chronological timeline of roles solving scalability, infrastructure, and frontend architecture challenges.
          </p>
        </div>

        {/* Timeline Spine */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--border)] space-y-12">
          {profileData.experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center shadow-[1px_1px_0px_var(--retro-shadow-color)] group-hover:bg-[var(--accent)] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] group-hover:bg-white transition-colors" />
              </div>

              {/* Experience Card */}
              <div className="retro-card p-6 sm:p-7 bg-[var(--surface)] space-y-4">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                  <div>
                    <h3 className="font-serif-heading font-bold text-xl text-[var(--foreground)]">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono-code text-sm text-[var(--accent)] font-semibold mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs text-[var(--foreground-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements list */}
                <ul className="space-y-2.5 text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {exp.achievements.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-1.5">
                  <span className="font-mono-code text-[11px] font-semibold text-[var(--foreground)] mr-1">
                    TECH STACK:
                  </span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
