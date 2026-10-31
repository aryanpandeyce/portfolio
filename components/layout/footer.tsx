"use client";

import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { retroAudio } from "@/lib/audio";
import { ArrowUp, Mail, Terminal, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/icons";
import { withBasePath } from "@/lib/utils";

export function Footer() {
  const scrollToTop = () => {
    retroAudio.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t-2 border-[var(--border)] bg-[var(--surface-muted)] mt-24 pb-16 sm:pb-12 text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal Status Card */}
        <div className="mb-10 p-4 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] shadow-[4px_4px_0px_var(--retro-shadow-color)]">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] font-semibold">guest@pandey-station:~$</span>
              <span className="text-[var(--foreground)]">uname -a</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[var(--foreground-muted)]">
              <span>UPTIME: 99.98%</span>
              <span>•</span>
              <span>HOST: GITHUB_PAGES</span>
              <span>•</span>
              <span className="text-[#27C93F] font-bold">KERNEL: ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-heading font-bold text-xl text-[var(--foreground)]">
                {profileData.personal.name}
              </span>
              <span className="text-[10px] font-mono-code bg-[var(--accent-subtle)] text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--accent)]/30 font-semibold">
                PORTFOLIO v2.6
              </span>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] max-w-md leading-relaxed">
              {profileData.personal.headline}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={profileData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => retroAudio.playClick()}
                aria-label="GitHub profile"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => retroAudio.playClick()}
                aria-label="LinkedIn profile"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.personal.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => retroAudio.playClick()}
                aria-label="LeetCode profile"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.personal.email}`}
                onClick={() => retroAudio.playClick()}
                aria-label="Send email"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-mono-code text-xs uppercase font-bold tracking-wider text-[var(--foreground)]">
              Index
            </h4>
            <ul className="space-y-1.5 text-xs font-mono-code">
              <li>
                <Link
                  href="/#about"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; About Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; Projects Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/arcade"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; Retro Arcade
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; Resume / CV
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: System & Meta */}
          <div className="space-y-2">
            <h4 className="font-mono-code text-xs uppercase font-bold tracking-wider text-[var(--foreground)]">
              Meta
            </h4>
            <ul className="space-y-1.5 text-xs font-mono-code text-[var(--foreground-muted)]">
              <li>Next.js App Router (SSG)</li>
              <li>Static HTML Export</li>
              <li>Tailwind CSS + shadcn</li>
              <li>React Three Fiber (3D)</li>
              <li>
                <a
                  href={withBasePath("/sitemap.xml")}
                  target="_blank"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  &gt; sitemap.xml
                </a>
              </li>
              <li>
                <a
                  href={withBasePath("/robots.txt")}
                  target="_blank"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  &gt; robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-[var(--foreground-muted)]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {profileData.personal.name}. Built with</span>
            <Heart className="w-3.5 h-3.5 text-[var(--accent)] inline fill-[var(--accent)]" />
            <span>and retro aesthetics.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
