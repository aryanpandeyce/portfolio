"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCRT } from "@/components/retro/crt-effect";
import { retroAudio } from "@/lib/audio";
import {
  Sun,
  Moon,
  Monitor,
  Volume2,
  VolumeX,
  Menu,
  X,
  FileText,
  Sparkles,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { crtEnabled, toggleCRT, audioEnabled, toggleAudio } = useCRT();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Arcade", href: "/arcade" },
    { label: "Metrics", href: "/#metrics" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleNavClick = () => {
    retroAudio.playClick();
    setMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    retroAudio.playClick();
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  const handleCRTToggle = () => {
    retroAudio.playClick();
    toggleCRT();
  };

  const handleAudioToggle = () => {
    toggleAudio();
    retroAudio.playBlip(600);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-[var(--border)] shadow-sm"
          : "bg-[var(--background)]/70 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={() => retroAudio.playClick()}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[var(--surface-muted)] border-2 border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-center font-mono font-bold text-sm text-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]">
            AP
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading font-bold text-base sm:text-lg tracking-tight leading-none text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Aryan Pandey
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
              <span className="font-mono-code text-[11px] text-[var(--foreground-muted)] tracking-wider">
                READY
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive =
              item.href === pathname ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => retroAudio.playClick()}
                className={`px-3 py-1.5 rounded-md font-mono-code text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold border border-[var(--accent)]/40"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio 8-bit Toggle */}
          <button
            onClick={handleAudioToggle}
            title={audioEnabled ? "Disable Retro Sounds" : "Enable 8-Bit Audio"}
            aria-label={audioEnabled ? "Disable Retro Sounds" : "Enable 8-Bit Audio"}
            className={`p-2 rounded-md border text-xs transition-all ${
              audioEnabled
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[2px_2px_0px_var(--retro-shadow-color)]"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={handleCRTToggle}
            title={crtEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
            aria-label={crtEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
            className={`p-2 rounded-md border text-xs transition-all ${
              crtEnabled
                ? "bg-[var(--surface-muted)] border-[var(--accent)] text-[var(--accent)] shadow-[2px_2px_0px_var(--retro-shadow-color)]"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Light/Dark Theme Switcher */}
          <button
            onClick={handleThemeToggle}
            title={`Switch to ${(resolvedTheme || theme) === "dark" ? "light" : "dark"} mode`}
            aria-label={`Switch to ${(resolvedTheme || theme) === "dark" ? "light" : "dark"} mode`}
            className="p-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
            suppressHydrationWarning
          >
            {(resolvedTheme || theme) === "dark" ? (
              <Sun className="w-4 h-4 text-[#FFBD2E]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent)]" />
            )}
          </button>

          {/* Resume Quick Action (Desktop) */}
          <Link
            href="/resume"
            onClick={() => retroAudio.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-[2px_2px_0px_var(--retro-shadow-color)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              retroAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b-2 border-[var(--border)] bg-[var(--surface)] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-[var(--border)] flex items-center justify-between text-xs font-mono-code text-[var(--foreground-muted)]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              NAVIGATION DECK
            </span>
            <span>SYSTEM v2.6</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono-code text-xs font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                &gt; {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 flex gap-2">
            <Link
              href="/resume"
              onClick={handleNavClick}
              className="flex-1 py-2 px-3 rounded-lg bg-[var(--accent)] text-white font-mono-code text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_var(--retro-shadow-color)]"
            >
              <FileText className="w-3.5 h-3.5" />
              View Full Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
