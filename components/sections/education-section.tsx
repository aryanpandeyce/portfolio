"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { GraduationCap, Award, ExternalLink, Terminal, CheckCircle2 } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 06. ACADEMICS &amp; CREDENTIALS</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Education &amp; Industry Certifications.
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl">
            Formal foundations in computer science theory and verified vendor credentials in cloud architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-heading font-bold text-xl text-[var(--foreground)] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
              <span>Academic Degrees</span>
            </h3>

            {profileData.education.map((edu, idx) => (
              <div key={idx} className="retro-card p-6 bg-[var(--surface)] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[var(--border)]">
                  <h4 className="font-serif-heading font-bold text-lg text-[var(--foreground)]">
                    {edu.degree}
                  </h4>
                  <span className="font-mono-code text-xs text-[var(--accent)] font-semibold">
                    {edu.period}
                  </span>
                </div>

                <div className="font-mono-code text-sm font-semibold text-[var(--foreground)]">
                  {edu.institution}
                </div>

                <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)] leading-relaxed pt-1">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-heading font-bold text-xl text-[var(--foreground)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--accent)]" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-4">
              {profileData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="retro-card p-5 bg-[var(--surface)] flex items-center justify-between gap-4 hover:border-[var(--accent)] transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif-heading font-bold text-base text-[var(--foreground)]">
                      {cert.name}
                    </h4>
                    <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--foreground-muted)]">
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span className="text-[var(--accent)]">{cert.date}</span>
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => retroAudio.playClick()}
                      className="retro-btn px-3 py-1.5 bg-[var(--surface-muted)] text-xs font-mono-code font-semibold text-[var(--foreground)] hover:text-[var(--accent)] gap-1 shrink-0"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
