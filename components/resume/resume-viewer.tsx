"use client";

import React, { useState } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import {
  Download,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  Mail,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";

export function ResumeViewer() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    retroAudio.playClick();
    window.print();
  };

  const handleCopyText = () => {
    retroAudio.playCoin();
    const plainText = `
${profileData.personal.name}
${profileData.personal.role}
Email: ${profileData.personal.email} | Location: ${profileData.personal.location}
GitHub: ${profileData.personal.githubUrl} | LinkedIn: ${profileData.personal.linkedinUrl}

SUMMARY:
${profileData.personal.shortBio}

EXPERIENCE:
${profileData.experiences
  .map(
    (exp) => `
${exp.role} - ${exp.company} (${exp.period})
Location: ${exp.location}
Achievements:
${exp.achievements.map((a) => `• ${a}`).join("\n")}
Tech: ${exp.technologies.join(", ")}
`
  )
  .join("\n")}

EDUCATION:
${profileData.education
  .map(
    (edu) => `
${edu.degree} - ${edu.institution} (${edu.period})
${edu.details.map((d) => `• ${d}`).join("\n")}
`
  )
  .join("\n")}

CERTIFICATIONS:
${profileData.certifications.map((c) => `• ${c.name} (${c.issuer}, ${c.date})`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Action Bar (Hidden on print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => retroAudio.playClick()}
            className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&lt; Back to Home</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyText}
              className="retro-btn px-3 py-1.5 bg-[var(--surface)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#27C93F]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED TEXT!" : "COPY TEXT"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="retro-btn px-3 py-1.5 bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT VIEW</span>
            </button>

            <a
              href="/resume.pdf"
              download="Alex_Rivera_Resume.pdf"
              onClick={() => retroAudio.playClick()}
              className="retro-btn px-4 py-1.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>

        {/* Printable Resume Document Card */}
        <div className="retro-card p-8 sm:p-12 bg-[var(--surface)] text-[var(--foreground)] shadow-[6px_6px_0px_var(--retro-shadow-color)] print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="border-b-2 border-[var(--border)] pb-8 mb-8 space-y-3">
            <h1 className="font-serif-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--foreground)]">
              {profileData.personal.name}
            </h1>
            <p className="font-mono-code text-base font-semibold text-[var(--accent)]">
              {profileData.personal.role}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-code text-xs text-[var(--foreground-muted)] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profileData.personal.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {profileData.personal.email}
              </span>
              <span>•</span>
              <a
                href={profileData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] underline"
              >
                GitHub Profile
              </a>
              <span>•</span>
              <a
                href={profileData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] underline"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8 space-y-2">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              // EXECUTIVE SUMMARY
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
              {profileData.personal.shortBio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-8 space-y-6">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>// PROFESSIONAL EXPERIENCE</span>
            </h2>

            <div className="space-y-6">
              {profileData.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="font-serif-heading font-bold text-lg text-[var(--foreground)]">
                        {exp.role}
                      </h3>
                      <div className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                        {exp.company} — {exp.location}
                      </div>
                    </div>
                    <span className="font-mono-code text-xs text-[var(--foreground-muted)]">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--foreground-muted)] leading-relaxed pt-1">
                    {exp.achievements.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="pt-1 text-[11px] font-mono-code text-[var(--foreground-muted)]">
                    <strong className="text-[var(--foreground)]">Technologies:</strong>{" "}
                    {exp.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 space-y-4">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>// EDUCATION</span>
            </h2>

            {profileData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)]">
                    {edu.degree}
                  </h3>
                  <span className="font-mono-code text-xs text-[var(--foreground-muted)]">
                    {edu.period}
                  </span>
                </div>
                <div className="font-mono-code text-xs font-medium text-[var(--foreground-muted)]">
                  {edu.institution}
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-[var(--foreground-muted)] pt-1">
                  {edu.details.map((d, dIdx) => (
                    <li key={dIdx}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>// CERTIFICATIONS &amp; CREDENTIALS</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-[var(--foreground-muted)]">
              {profileData.certifications.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded border border-[var(--border)] bg-[var(--surface-muted)]">
                  <div className="font-bold text-[var(--foreground)]">{c.name}</div>
                  <div>
                    {c.issuer} — {c.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
