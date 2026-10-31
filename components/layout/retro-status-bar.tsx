"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { retroAudio } from "@/lib/audio";
import { useCRT } from "@/components/retro/crt-effect";
import { Command, Search, X, ArrowRight, CornerDownLeft } from "lucide-react";

export function RetroStatusBar() {
  const router = useRouter();
  const { crtEnabled, audioEnabled } = useCRT();
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const quickLinks = [
    { label: "Home (Hero)", href: "/", category: "Navigation" },
    { label: "About & Principles", href: "/#about", category: "Section" },
    { label: "Work Experience Timeline", href: "/#experience", category: "Section" },
    { label: "Featured Projects (Bento)", href: "/#projects", category: "Section" },
    { label: "All Repositories Archive", href: "/projects", category: "Page" },
    { label: "Skill Tree // Loadout", href: "/#skills", category: "Section" },
    { label: "Trophy Case // Merits", href: "/#achievements", category: "Section" },
    { label: "Coding Profiles (GitHub & LeetCode)", href: "/#metrics", category: "Section" },
    { label: "Education & Certifications", href: "/#education", category: "Section" },
    { label: "Retro Arcade // Insert Coin", href: "/arcade", category: "Page" },
    { label: "Interactive Resume", href: "/resume", category: "Page" },
    { label: "Contact Form", href: "/#contact", category: "Section" },
  ];

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        retroAudio.playClick();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredLinks = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (href: string) => {
    retroAudio.playCoin();
    setCmdOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <>
      {/* Floating Retro Status Dock */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border-2 border-[var(--border)] text-xs font-mono-code text-[var(--foreground-muted)] shadow-[3px_3px_0px_var(--retro-shadow-color)] transition-all">
        {/* Status indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
          <span className="font-semibold text-[var(--foreground)]">STATUS: OK</span>
        </div>

        <span className="text-[var(--border)]">|</span>

        {/* Viewport size */}
        <div className="text-[11px]">
          <span>RES: </span>
          <span className="text-[var(--accent)] font-semibold">{viewportWidth}px</span>
        </div>

        <span className="text-[var(--border)]">|</span>

        {/* Quick jump command palette trigger */}
        <button
          onClick={() => {
            retroAudio.playClick();
            setCmdOpen(true);
          }}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] border border-[var(--border)] transition-colors"
          title="Press Cmd+K or Click to Jump"
        >
          <Command className="w-3 h-3" />
          <span className="text-[10px] font-bold">K QUICK JUMP</span>
        </button>

        <span className="text-[var(--border)]">|</span>

        {/* CRT & Audio status */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className={crtEnabled ? "text-[var(--accent)]" : "opacity-40"}>CRT</span>
          <span className={audioEnabled ? "text-[var(--accent)]" : "opacity-40"}>SND</span>
        </div>
      </div>

      {/* Command Palette Modal */}
      {cmdOpen && (
        <div
          onClick={() => setCmdOpen(false)}
          className="fixed inset-0 z-[10003] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[var(--surface)] border-2 border-[var(--border-retro)] rounded-xl shadow-[8px_8px_0px_var(--retro-shadow-color)] overflow-hidden"
          >
            {/* Window title bar */}
            <div className="window-titlebar">
              <div className="window-dots">
                <span className="dot-red" onClick={() => setCmdOpen(false)} />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
                TERMINAL COMMAND PALETTE [CMD+K]
              </span>
              <button
                onClick={() => setCmdOpen(false)}
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-[var(--border)] flex items-center gap-2 bg-[var(--background)]">
              <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a section name or page to jump..."
                className="w-full bg-transparent font-mono-code text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none"
              />
              <span className="text-[10px] font-mono-code text-[var(--foreground-muted)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                ESC
              </span>
            </div>

            {/* Filtered Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredLinks.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono-code text-[var(--foreground-muted)]">
                  No matching destinations found.
                </div>
              ) : (
                filteredLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs font-mono-code hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors" />
                      <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[var(--foreground-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                        {item.category}
                      </span>
                      <CornerDownLeft className="w-3 h-3 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between text-[11px] font-mono-code text-[var(--foreground-muted)]">
              <span>Use ↵ to navigate</span>
              <span>RetroOS v2.6</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
