"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { Hero3DWrapper } from "@/components/hero/hero-3d-wrapper";
import { ArrowRight, FileText, Mail, Terminal, Play } from "lucide-react";

const HERO_TITLES = [
  "Backend & Cloud-Native Engineer",
  "Go & Java Distributed Systems",
  "Kubernetes & Cloud Infrastructure",
  "Event-Driven Saga Architectures",
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullTitle = HERO_TITLES[titleIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentFullTitle.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handlePressStart = (e: React.MouseEvent) => {
    retroAudio.playCoin();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#D97757", "#27C93F", "#FFBD2E", "#4D7C79"],
    });
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden dotted-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Terminal Greeting Tag & Open to Opportunities Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] shadow-[2px_2px_0px_var(--retro-shadow-color)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                  &gt; SYSTEM.STATUS: ONLINE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse ml-1" />
              </div>

              {/* Retro Open to Opportunities Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#27C93F]/40 bg-[#27C93F]/10 text-[#27C93F] font-mono-code text-xs font-semibold shadow-[1px_1px_0px_var(--retro-shadow-color)]">
                <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-ping" />
                <span>OPEN TO OPPORTUNITIES</span>
              </div>
            </div>

            {/* Editorial Serif Heading */}
            <h1 className="font-serif-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground)] tracking-tight leading-[1.12]">
              Crafting scalable backends &amp;{" "}
              <span className="text-[var(--accent)] underline decoration-wavy decoration-[var(--border)] decoration-2">
                observable microservices
              </span>
              .
            </h1>

            {/* Animated Typewriter Discipline Tagline */}
            <div className="h-9 flex items-center gap-2 font-mono-code text-lg sm:text-xl text-[var(--foreground)]">
              <span className="text-[var(--accent)] font-bold">&gt;</span>
              <span className="font-semibold">{displayText}</span>
              <span className="inline-block w-2.5 h-5 bg-[var(--accent)] animate-pulse" />
            </div>

            {/* Sub-narrative */}
            <p className="text-base sm:text-lg text-[var(--foreground-muted)] max-w-xl leading-relaxed">
              Hello, I&apos;m{" "}
              <span className="font-semibold text-[var(--foreground)]">
                {profileData.personal.name}
              </span>
              . Full-stack roots in React and Node. Building scalable, observable microservices with
              Go, Java, and Kubernetes.
            </p>

            {/* Retro CTA Button Cluster */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/projects"
                onClick={() => retroAudio.playClick()}
                className="retro-btn px-5 py-3 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-sm gap-2"
              >
                <span>Browse Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/resume"
                onClick={() => retroAudio.playClick()}
                className="retro-btn px-5 py-3 bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] font-mono-code text-sm gap-2"
              >
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                <span>Resume CV</span>
              </Link>

              <a
                href="#contact"
                onClick={() => retroAudio.playClick()}
                className="retro-btn px-4 py-3 bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-sm gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>

              {/* Floating Retro "Press Start" Celebration CTA */}
              <button
                onClick={handlePressStart}
                title="Click for 8-bit coin celebration"
                className="retro-btn px-3 py-3 bg-[var(--surface)] text-[var(--accent-amber)] hover:bg-[var(--surface-muted)] font-mono-code text-xs gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-[var(--accent-amber)]" />
                <span className="hidden sm:inline">PRESS START</span>
              </button>
            </div>

            {/* Quick Skills / Stack Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono-code text-[var(--foreground-muted)]">
              <span className="text-[var(--foreground)] font-semibold">CORE TECH:</span>
              {["Go", "Java 21", "Kubernetes", "Kafka", "PostgreSQL", "Docker", "AWS"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[1px_1px_0px_var(--retro-shadow-color)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg">
              <Hero3DWrapper />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
