"use client";

import React, { useEffect, useState } from "react";
import { retroAudio } from "@/lib/audio";

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLines = [
    "BIOS v4.88 (c) KERNEL INIT 2026",
    "CHECKING RAM: 640K CONVENTIONAL ... OK",
    "GPU GRAPHICS PIPELINE: R3F / WEBGL2 ... LOADED",
    "MOUNTING CACHE: GITHUB & LEETCODE ... READY",
    "STARTING RETRO WORKSTATION OS ... OK",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasBooted = sessionStorage.getItem("portfolio-booted");
    if (hasBooted) return;

    setShow(true);
    retroAudio.playPowerUp();

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootLines.length) {
        setLogs((prev) => [...prev, bootLines[step]]);
        setProgress(Math.round(((step + 1) / bootLines.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          dismissBoot();
        }, 400);
      }
    }, 300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismissBoot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const dismissBoot = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio-booted", "true");
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      onClick={dismissBoot}
      className="fixed inset-0 z-[10001] bg-[#0E0E0D] text-[#55EB7C] font-mono p-6 flex flex-col justify-between cursor-pointer select-none"
    >
      <div className="max-w-xl mx-auto w-full pt-12 space-y-3 text-xs sm:text-sm">
        <div className="border border-[#55EB7C]/40 p-4 rounded bg-[#000000]/80 shadow-[0_0_15px_rgba(85,235,124,0.15)]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#55EB7C]/30 text-[10px] text-[#55EB7C]/70">
            <span>TERMINAL BOOT LOADER</span>
            <span className="animate-pulse">● LIVE</span>
          </div>

          <div className="space-y-1.5 min-h-[140px]">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[#55EB7C]/50">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#55EB7C]/30">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span>INITIALIZING SYSTEM</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#1A3320] h-2 rounded overflow-hidden">
              <div
                className="bg-[#55EB7C] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pb-8">
        <button
          onClick={dismissBoot}
          className="px-4 py-2 text-xs border border-[#55EB7C]/50 text-[#55EB7C] hover:bg-[#55EB7C] hover:text-[#0E0E0D] transition-colors rounded uppercase tracking-wider"
        >
          [ Click or Press ESC to Skip ]
        </button>
      </div>
    </div>
  );
}
