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
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code2,
} from "lucide-react";

interface ResumeViewerProps {
  hasPdf?: boolean;
}

export function ResumeViewer({ hasPdf = false }: ResumeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    retroAudio.playClick();
    window.print();
  };

  const handleCopyText = () => {
    retroAudio.playCoin();
    const plainText = `
${profileData.personal.name}
${profileData.personal.headline}
Email: ${profileData.personal.email} | Phone: ${profileData.personal.phone} | Location: ${profileData.personal.location}
GitHub: ${profileData.personal.githubUrl} | LinkedIn: ${profileData.personal.linkedinUrl}

SUMMARY:
${profileData.personal.aboutNarrative}

EXPERIENCE:
${profileData.experiences
  .map(
    (exp) => `
${exp.role} - ${exp.company} (${exp.period})
Location: ${exp.location}
Achievements:
${exp.achievements.map((a) => `• ${a}`).join("\n")}
Tech Stack: ${exp.technologies.join(", ")}
`
  )
  .join("\n")}

FEATURED PROJECTS:
• FleetPulse - Cloud-Native Fleet Management (GoLang, gRPC, Kubernetes, PostgreSQL, NATS, AWS)
• ApexPay - Payment Platform (Java 21, Spring Boot, Kafka, PostgreSQL, MongoDB, React, Kubernetes)
• LendStrangler - Monolith to Microservices (TypeScript, Node.js, RabbitMQ, React, Docker)

EDUCATION:
${profileData.education
  .map(
    (edu) => `
${edu.degree} - ${edu.institution} (${edu.period})
Grade: ${edu.grade}
${edu.details.map((d) => `• ${d}`).join("\n")}
`
  )
  .join("\n")}

HONORS & ACHIEVEMENTS:
${profileData.achievements.map((a) => `• ${a.title} (${a.issuer}, ${a.year}): ${a.description}`).join("\n")}

TECHNICAL LOADOUT:
${profileData.skillTree
  .map(
    (group) => `${group.name}: ${group.skills.map((s) => `${s.name} [${s.tier}]`).join(", ")}`
  )
  .join("\n")}
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
              <span>{copied ? "COPIED PLAIN TEXT!" : "COPY TEXT"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="retro-btn px-3 py-1.5 bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE AS PDF</span>
            </button>

            {/* Download button shown only if compiled PDF exists */}
            {hasPdf ? (
              <a
                href="/resume.pdf"
                download="Aryan_Pandey_Resume.pdf"
                onClick={() => retroAudio.playClick()}
                className="retro-btn px-4 py-1.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-xs gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PDF</span>
              </a>
            ) : (
              <span
                title="Awaiting compiled public/resume.pdf"
                className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--border)] font-mono-code text-[11px] text-[var(--foreground-muted)] flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse" />
                <span>PDF AVAILABLE UPON REQUEST</span>
              </span>
            )}
          </div>
        </div>

        {/* Printable Resume Document Card */}
        <div className="retro-card p-8 sm:p-12 bg-[var(--surface)] text-[var(--foreground)] shadow-[6px_6px_0px_var(--retro-shadow-color)] print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b-2 border-[var(--border)] pb-8 mb-8 space-y-3 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="font-serif-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--foreground)] print:text-black">
                  {profileData.personal.name}
                </h1>
                <p className="font-mono-code text-base font-semibold text-[var(--accent)] print:text-black mt-1">
                  {profileData.personal.headline}
                </p>
                <p className="font-mono-code text-xs text-[var(--foreground-muted)] print:text-gray-700 mt-0.5">
                  {profileData.personal.secondaryLine}
                </p>
              </div>
            </div>

            {/* Contact line: Phone is STRICTLY displayed here ONLY */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-code text-xs text-[var(--foreground-muted)] print:text-black pt-2">
              <span className="flex items-center gap-1 font-semibold text-[var(--foreground)] print:text-black">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] print:text-black" />
                {profileData.personal.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)] print:text-black" />
                {profileData.personal.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] print:text-black" />
                {profileData.personal.location}
              </span>
              <span>•</span>
              <a
                href={profileData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] underline"
              >
                github.com/aryanpandeyce
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
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black">
              {"// EXECUTIVE SUMMARY"}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] print:text-black">
              {profileData.personal.aboutNarrative}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-8 space-y-6">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{"// PROFESSIONAL EXPERIENCE"}</span>
            </h2>

            <div className="space-y-6">
              {profileData.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-2 border-b border-[var(--border)] pb-6 last:border-none print:border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="font-serif-heading font-bold text-lg text-[var(--foreground)] print:text-black">
                        {exp.role}
                      </h3>
                      <div className="font-mono-code text-xs font-semibold text-[var(--foreground)] print:text-black">
                        {exp.company} — {exp.location}
                      </div>
                    </div>
                    <span className="font-mono-code text-xs text-[var(--foreground-muted)] print:text-gray-700">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--foreground-muted)] print:text-black leading-relaxed pt-1">
                    {exp.achievements.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="pt-1.5 text-[11px] font-mono-code text-[var(--foreground-muted)] print:text-gray-700">
                    <strong className="text-[var(--foreground)] print:text-black">Technologies:</strong>{" "}
                    {exp.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Architecture Projects */}
          <div className="mb-8 space-y-4">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>{"// FEATURED ARCHITECTURE PROJECTS"}</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] print:bg-white print:border-gray-300 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] print:text-black">
                    FleetPulse — Cloud-Native Fleet Management
                  </h3>
                  <span className="font-mono-code text-xs text-[var(--accent)] print:text-black">
                    Go / gRPC / Kubernetes / NATS
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] print:text-black leading-relaxed">
                  Scalable SaaS of Go microservices (gRPC + REST). Core DSA paths: consistent hashing for device sharding, min-heap job scheduler, token-bucket rate limiter, LRU cache, and EWMA/z-score anomaly detection with leader election and dead-letter queues. Provisioned on Kubernetes with Helm and HPA; automated via GitHub Actions with 80%+ coverage gate.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] print:bg-white print:border-gray-300 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] print:text-black">
                    ApexPay — Payment Platform
                  </h3>
                  <span className="font-mono-code text-xs text-[var(--accent)] print:text-black">
                    Java 21 / Spring Boot / Kafka
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] print:text-black leading-relaxed">
                  6 Spring Boot microservices across an 8-module Maven architecture using choreographed Sagas across 4 Kafka topics, Transactional Outbox pattern, idempotency keys, and dead-letter topics. Spring Security with BCrypt(12), rotating JWTs, and rate limiting. 6-stage GitLab CI/CD with SonarQube quality gate and Trivy scanner.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] print:bg-white print:border-gray-300 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] print:text-black">
                    LendStrangler — Monolith to Microservices
                  </h3>
                  <span className="font-mono-code text-xs text-[var(--accent)] print:text-black">
                    TypeScript / Node.js / RabbitMQ
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] print:text-black leading-relaxed">
                  Decomposed legacy lending monolith into 3 microservices via Strangler Fig. Shadow mode reached 0.00% response diff before canary routing 5% to 100%. 5-event Saga with compensating transactions over RabbitMQ, Transactional Outbox, and idempotent consumers; cut underwriting latency by 77% (85ms to 19ms).
                </p>
              </div>
            </div>
          </div>

          {/* Technical Loadout Summary */}
          <div className="mb-8 space-y-4">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{"// TECHNICAL SKILLS & LOADOUT"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
              {profileData.skillTree.map((cat) => (
                <div key={cat.id} className="p-3 rounded border border-[var(--border)] bg-[var(--surface-muted)] print:bg-white print:border-gray-300">
                  <span className="font-bold text-[var(--foreground)] print:text-black block mb-1">
                    {cat.name}:
                  </span>
                  <span className="text-[var(--foreground-muted)] print:text-gray-800 leading-relaxed">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 space-y-4">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{"// EDUCATION"}</span>
            </h2>

            {profileData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-serif-heading font-bold text-base text-[var(--foreground)] print:text-black">
                    {edu.degree}
                  </h3>
                  <span className="font-mono-code text-xs font-semibold text-[var(--accent)] print:text-black">
                    {edu.period}
                  </span>
                </div>
                <div className="font-mono-code text-xs font-medium text-[var(--foreground)] print:text-black">
                  {edu.institution} — <strong>{edu.grade}</strong>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-[var(--foreground-muted)] print:text-black pt-1">
                  {edu.details.map((d, dIdx) => (
                    <li key={dIdx}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Honors & Achievements */}
          <div className="space-y-3">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-black flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>{"// HONORS & ACHIEVEMENTS"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code">
              {profileData.achievements.map((item, idx) => (
                <div key={idx} className="p-3 rounded border border-[var(--border)] bg-[var(--surface-muted)] print:bg-white print:border-gray-300">
                  <div className="font-bold text-[var(--foreground)] print:text-black flex justify-between">
                    <span>{item.title}</span>
                    <span className="text-[var(--accent)] print:text-black">{item.year}</span>
                  </div>
                  <div className="text-[var(--foreground-muted)] print:text-gray-700 text-[11px] mt-0.5">
                    {item.issuer} — {item.description}
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
