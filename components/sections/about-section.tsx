"use client";

import React from "react";
import { profileData } from "@/data/profile";
import {
  Code,
  Terminal,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Years Experience", value: profileData.stats.yearsOfExperience, icon: Zap },
    { label: "Leads Managed", value: profileData.stats.leadsManaged, icon: Layers },
    { label: "CRM Sales Tracked", value: profileData.stats.crmSalesTracked, icon: ShieldCheck },
    { label: "Shipped Apps", value: profileData.stats.projectsCompleted, icon: Code },
  ];

  const marqueeTechnologies = [
    "Go", "Java 21", "Kubernetes", "Apache Kafka", "PostgreSQL", "Docker",
    "RabbitMQ", "Spring Boot 3", "Spring Security", "Redis", "AWS (S3/SQS)",
    "gRPC", "Terraform", "TypeScript", "Node.js", "Express", "NATS",
    "MongoDB", "MySQL", "ReactJS", "Redux", "Prometheus", "Grafana", "ELK Stack"
  ];

  const principles = [
    {
      title: "Distributed Reliability",
      desc: "Architecting event-driven microservices with Saga compensation, Transactional Outbox, and idempotent processing.",
      icon: ShieldCheck,
    },
    {
      title: "Production Observability",
      desc: "Actionable Prometheus metrics, Grafana dashboards, ELK tracing, and automated k6 load testing.",
      icon: Zap,
    },
    {
      title: "Pragmatic AI & Full-Stack",
      desc: "Delivering self-hosted RAG LLM assistants on private infrastructure married with clean, responsive user interfaces.",
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
            <span>{"// 01. ABOUT ME"}</span>
          </div>
          <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
            Crafting software with engineering rigor and operational observability.
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
                  ARYAN_PANDEY.EXE
                </span>
                <span className="text-[10px] font-mono-code text-[#27C93F]">● OK</span>
              </div>

              {/* Stylized Pixel Avatar Frame */}
              <div className="p-6 bg-[var(--surface)] flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-2xl border-2 border-[var(--border-retro)] bg-[var(--surface-muted)] p-2 shadow-[4px_4px_0px_var(--retro-shadow-color)] flex items-center justify-center mb-4 relative group">
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[var(--border)] to-[var(--surface)] flex flex-col items-center justify-center font-mono text-xs text-[var(--accent)] select-none">
                    <span className="text-3xl mb-1">⚡</span>
                    <span className="font-mono-code text-[10px] text-[var(--foreground-muted)] font-semibold">
                      ARYAN.PANDEY
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
                    <div className="font-bold text-[var(--foreground)]">3+ YRS</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">EXP</div>
                  </div>
                  <div className="border-r border-[var(--border)]" />
                  <div>
                    <div className="font-bold text-[var(--foreground)]">365-DAY</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">STREAK</div>
                  </div>
                  <div className="border-r border-[var(--border)]" />
                  <div>
                    <div className="font-bold text-[var(--foreground)]">10+</div>
                    <div className="text-[10px] text-[var(--foreground-muted)]">MODULES</div>
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
                I am <strong className="text-[var(--foreground)]">Aryan Pandey</strong>, a{" "}
                <strong className="text-[var(--foreground)]">
                  Backend Engineer specializing in Go, Java, and Microservices
                </strong>
                . With strong full-stack roots in React and Node.js, I transitioned deeper into distributed systems, event-driven architectures with Kafka and RabbitMQ, and cloud-native orchestration with Kubernetes and Docker.
              </p>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                At Shyam Group, I architected a 10-module SaaS CRM managing 4,000+ leads and INR 6.3 Cr+ in sales, unifying 6 lead channels and deploying an on-premise RAG AI assistant with Ollama (Qwen) to query live pipeline state privately. I ship production code backed by CI/CD quality gates, TDD, and deep observability.
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
            <span className="font-semibold text-[var(--foreground)]">VERIFIED PRODUCTION STACK:</span>
            <span>Continuous rolling overview</span>
          </div>

          <div className="relative flex overflow-x-hidden group py-1">
            <div className="animate-marquee flex gap-3 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
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
