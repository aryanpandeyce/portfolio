"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import {
  Code,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Years Experience", value: `${profileData.stats.yearsOfExperience}+`, icon: Zap },
    { label: "GitHub Commits", value: `${profileData.stats.githubContributions}+`, icon: Code },
    { label: "LeetCode Solved", value: `${profileData.stats.leetcodeSolved}+`, icon: Award },
    { label: "Shipped Projects", value: `${profileData.stats.projectsCompleted}+`, icon: Layers },
  ];

  const marqueeTechnologies = [
    "TypeScript", "Go (Golang)", "Next.js", "React 19", "Node.js", "PostgreSQL",
    "Redis", "Apache Kafka", "Docker", "Kubernetes", "AWS Cloud", "GraphQL",
    "Tailwind CSS", "Framer Motion", "Three.js", "Terraform", "Playwright", "Python"
  ];

  const principles = [
    {
      title: "Architectural Rigor",
      desc: "Designing resilient distributed systems with low blast radius, strong types, and graceful degradation.",
      icon: ShieldCheck,
    },
    {
      title: "Performance Obsession",
      desc: "Sub-millisecond API response targets, tight memory profiles, and optimized Core Web Vitals.",
      icon: Zap,
    },
    {
      title: "Tactile User Craft",
      desc: "Marrying retro computing warmth with modern accessibility, micro-animations, and fluid ergonomics.",
      icon: Sparkles,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t-2 border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 01. ABOUT ME</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Crafting software with engineering rigor and editorial care.
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Avatar Window Card */}
          <div className="lg:col-span-4">
            <div className="retro-card p-0 overflow-hidden">
              <div className="window-titlebar">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                  AVATAR_SYS.EXE
                </span>
                <span className="text-[10px] font-mono-code text-[#27C93F]">● OK</span>
              </div>

              {/* Stylized Pixel Avatar Frame */}
              <div className="p-6 bg-[var(--surface)] flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-2xl border-2 border-[var(--border-retro)] bg-[var(--surface-muted)] p-2 shadow-[4px_4px_0px_var(--retro-shadow-color)] flex items-center justify-center mb-4 relative group">
                  {/* Stylized Retro Avatar Graphic */}
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[var(--border)] to-[var(--surface)] flex flex-col items-center justify-center font-mono text-xs text-[var(--accent)] select-none">
                    <span className="text-3xl mb-1">👨‍💻</span>
                    <span className="font-mono-code text-[10px] text-[var(--foreground-muted)]">
                      ALEX.RIVERA
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-heading font-bold text-lg text-[var(--foreground)]">
                  {profileData.personal.name}
                </h3>
                <p className="text-xs font-mono-code text-[var(--accent)] font-semibold mt-0.5">
                  {profileData.personal.role}
                </p>
                <p className="text-xs font-mono-code text-[var(--foreground-muted)] mt-1">
                  📍 {profileData.personal.location}
                </p>

                <div className="w-full mt-4 pt-4 border-t border-[var(--border)] flex justify-around text-xs font-mono-code">
                  <div>
                    <div className="font-bold text-[var(--foreground)]">5+ YRS</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">EXP</div>
                  </div>
                  <div className="border-r border-[var(--border)]" />
                  <div>
                    <div className="font-bold text-[var(--foreground)]">480+</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">LEETCODE</div>
                  </div>
                  <div className="border-r border-[var(--border)]" />
                  <div>
                    <div className="font-bold text-[var(--foreground)]">1.4K</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">COMMITS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Principles */}
          <div className="lg:col-span-8 space-y-6">
            <div className="retro-card p-6 sm:p-8 bg-[var(--surface)] space-y-4">
              <h3 className="font-serif-heading font-bold text-xl sm:text-2xl text-[var(--foreground)]">
                The Narrative
              </h3>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                I am a senior full-stack engineer and cloud architect dedicated to building dependable,
                performant internet software. My journey began tinkering with low-level systems and
                retro terminal protocols, which shaped my conviction that software should feel snappy,
                tactile, and durable under heavy production load.
              </p>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                Over the past half-decade, I have architected streaming backends handling millions of
                daily events, optimized high-traffic database query paths, and built accessible,
                type-safe user interfaces with Next.js and TypeScript. I enjoy writing clean,
                idiomatic code and contributing to open-source developer tooling.
              </p>

              {/* Core Principles */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {principles.map((principle, idx) => {
                  const Icon = principle.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] space-y-1.5"
                    >
                      <div className="w-7 h-7 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-[1px_1px_0px_var(--retro-shadow-color)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-mono-code text-xs font-bold text-[var(--foreground)]">
                        {principle.title}
                      </h4>
                      <p className="text-[11px] text-[var(--foreground-muted)] leading-normal">
                        {principle.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="retro-card p-4 bg-[var(--surface)] flex flex-col items-center text-center space-y-1"
                  >
                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-serif-heading font-extrabold text-2xl text-[var(--foreground)]">
                      {stat.value}
                    </span>
                    <span className="font-mono-code text-[11px] text-[var(--foreground-muted)]">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Infinite Tech Stack Marquee Strip */}
        <div className="retro-card p-4 overflow-hidden bg-[var(--surface)]">
          <div className="flex items-center gap-2 mb-3 px-2 font-mono-code text-xs text-[var(--foreground-muted)]">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-semibold text-[var(--foreground)]">TECHNOLOGY MATRIX:</span>
            <span>Rolling active stack</span>
          </div>

          <div className="relative flex overflow-x-hidden group py-1">
            <div className="animate-marquee flex gap-3 whitespace-nowrap">
              {marqueeTechnologies.concat(marqueeTechnologies).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] font-mono-code text-xs font-medium text-[var(--foreground)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
