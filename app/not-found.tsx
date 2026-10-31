"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { retroAudio } from "@/lib/audio";
import { Home, RotateCcw } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    retroAudio.playBlip(220, "sawtooth");
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full retro-card overflow-hidden bg-[var(--surface)] text-center shadow-[8px_8px_0px_var(--retro-shadow-color)]">
        {/* Terminal Titlebar */}
        <div className="window-titlebar">
          <div className="window-dots">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <span className="font-mono-code text-xs font-semibold text-[var(--foreground)]">
            KERNEL_PANIC: 0x404
          </span>
          <span className="text-[10px] font-mono-code text-[var(--accent-rose)] font-bold">
            FAULT
          </span>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
          {/* Glitch 404 Display */}
          <div className="space-y-1">
            <div className="font-serif-heading font-extrabold text-6xl sm:text-7xl text-[var(--accent)] tracking-tighter">
              404
            </div>
            <div className="font-mono-code text-xs text-[var(--accent-rose)] uppercase font-bold tracking-widest animate-pulse">
              [ SECTOR / CARTRIDGE NOT FOUND ]
            </div>
          </div>

          {/* Terminal Error Diagnostic */}
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-left font-mono-code text-xs space-y-1 text-[var(--foreground-muted)]">
            <div>&gt; MEMORY TRACE: ADDR 0x7FFF00404</div>
            <div>&gt; REQUESTED ROUTE: INVALID_TARGET</div>
            <div>&gt; CARTRIDGE READ ERROR: CRC_CHECK_FAIL</div>
            <div className="text-[var(--accent)] font-semibold">&gt; SYSTEM HALTED. REBOOT RECOMMENDED.</div>
          </div>

          {/* Reboot Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              onClick={() => retroAudio.playCoin()}
              className="retro-btn w-full sm:w-auto px-5 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-xs gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>INSERT COIN / REBOOT</span>
            </Link>

            <Link
              href="/projects"
              onClick={() => retroAudio.playClick()}
              className="retro-btn w-full sm:w-auto px-4 py-2.5 bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--accent)] font-mono-code text-xs gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Browse Projects</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-[var(--border)] bg-[var(--surface-muted)] text-[10px] font-mono-code text-[var(--foreground-muted)]">
          Press [ESC] or Click Above to Return to Safe Mode
        </div>
      </div>
    </div>
  );
}
