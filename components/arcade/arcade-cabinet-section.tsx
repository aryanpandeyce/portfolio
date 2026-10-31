"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { retroAudio } from "@/lib/audio";
import { getLocalHighScores, HighScores } from "@/lib/arcade/engine";
import {
  Gamepad2,
  Terminal,
  Trophy,
  Play,
  Sparkles,
} from "lucide-react";

// Dynamically load the heavy ArcadeView ONLY on user request
const LazyArcadeView = dynamic(
  () => import("./arcade-view").then((mod) => mod.ArcadeView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-[#141312] border-2 border-[var(--border)] rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white font-mono-code text-xs">
        <div className="w-12 h-12 rounded-xl border-2 border-[var(--accent)] flex items-center justify-center mb-3 animate-spin">
          <Gamepad2 className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <span>INSERTING COIN &amp; MOUNTING SHADERS...</span>
      </div>
    ),
  }
);

interface ArcadeCabinetSectionProps {
  isStandalonePage?: boolean;
}

export function ArcadeCabinetSection({ isStandalonePage = false }: ArcadeCabinetSectionProps) {
  const [isPlaying, setIsPlaying] = useState(isStandalonePage);
  const [highScores] = useState<HighScores>(getLocalHighScores);

  useEffect(() => {
    // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → b a)
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.key === konamiSequence[konamiIndex] || e.key.toLowerCase() === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          konamiIndex = 0;
          retroAudio.playPowerup();
          setIsPlaying(true);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, []);

  const handlePrefetch = () => {
    // Trigger browser module prefetch on hover or focus of the Insert Coin button
    import("./arcade-view");
  };

  const handleInsertCoin = () => {
    retroAudio.playCoin();
    setIsPlaying(true);
  };

  const handleExitArcade = () => {
    retroAudio.playClick();
    setIsPlaying(false);
  };

  return (
    <section
      id="arcade"
      className={`py-20 sm:py-28 border-t-2 border-[var(--border)] ${
        isStandalonePage ? "bg-[var(--background)] min-h-screen" : "bg-[var(--surface-muted)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Real-Text Crawlable Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>{"// 08. ARCADE // INSERT COIN"}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
              Interactive Retro Arcade Cabinet.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] text-xs font-mono-code text-[var(--foreground)] shadow-[2px_2px_0px_var(--retro-shadow-color)] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse" />
              <span>ORIGINAL 2D CANVAS GAMES</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
            Take a two-minute break to test your reflexes against system concurrency bugs and network data packet streams. Built with pure Canvas 2D and zero game engines for instant 60 FPS performance.
          </p>
        </div>

        {/* Arcade Cabinet Container */}
        <div className="max-w-4xl mx-auto">
          {isPlaying ? (
            <LazyArcadeView onExit={handleExitArcade} />
          ) : (
            /* Exterior Retro Cabinet Card with Reserved Aspect Ratio */
            <div className="retro-card p-0 overflow-hidden bg-[var(--surface)] border-2 border-[var(--border)] shadow-[8px_8px_0px_var(--retro-shadow-color)]">
              {/* Window Chrome Titlebar */}
              <div className="window-titlebar bg-[var(--surface-muted)]">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <div className="flex items-center gap-2 font-mono-code text-xs font-bold text-[var(--foreground)]">
                  <Gamepad2 className="w-4 h-4 text-[var(--accent)]" />
                  <span>CABINET_SLOT_01.EXE</span>
                </div>
                <span className="text-[10px] font-mono-code text-[#27C93F]">
                  ● READY_FOR_COIN
                </span>
              </div>

              {/* Cabinet Marquee Artwork */}
              <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[var(--surface)] to-[var(--surface-muted)] relative overflow-hidden">
                {/* Decorative retro stripes */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-amber)] to-[var(--accent-secondary)]" />

                {/* Cabinet Graphic Badge */}
                <div className="w-20 h-20 rounded-2xl border-2 border-[var(--border-retro)] bg-[var(--surface)] p-2 shadow-[4px_4px_0px_var(--retro-shadow-color)] flex items-center justify-center mb-6">
                  <Gamepad2 className="w-10 h-10 text-[var(--accent)]" />
                </div>

                <h3 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-[var(--foreground)] mb-2">
                  Ready to test your reflexes?
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] max-w-md mb-8 leading-relaxed">
                  Choose between <strong>Bug Blaster</strong> (defend your terminal against NullPointers &amp; Memory Leaks) or <strong>Packet Snake</strong> (route Go &amp; Kafka data streams).
                </p>

                {/* Retro Insert Coin CTA Button */}
                <button
                  id="insert-coin-btn"
                  onClick={handleInsertCoin}
                  onMouseEnter={handlePrefetch}
                  onFocus={handlePrefetch}
                  className="retro-btn px-8 py-4 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] font-mono-code text-base sm:text-lg font-bold gap-3 shadow-[4px_4px_0px_var(--retro-shadow-color)] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>INSERT COIN / PRESS START</span>
                </button>

                {/* Konami Easter Egg Hint */}
                <div className="mt-6 text-[11px] font-mono-code text-[var(--foreground-muted)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                  <span>Pro Tip: Konami code (↑ ↑ ↓ ↓ ← → ← → B A) unlocks cabinet instantly</span>
                </div>
              </div>

              {/* Cabinet Bottom Shelf: High Scores & Rules */}
              <div className="px-6 py-4 bg-[var(--surface-muted)] border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
                  <div>
                    <span className="text-[var(--foreground-muted)] block text-[10px]">
                      BUG BLASTER BEST
                    </span>
                    <strong className="text-[var(--foreground)] text-sm">
                      {highScores.bugBlaster > 0 ? `${highScores.bugBlaster} PTS` : "NO RECORD"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[var(--accent)]" />
                  <div>
                    <span className="text-[var(--foreground-muted)] block text-[10px]">
                      PACKET SNAKE BEST
                    </span>
                    <strong className="text-[var(--foreground)] text-sm">
                      {highScores.packetSnake > 0 ? `${highScores.packetSnake} PTS` : "NO RECORD"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 text-[var(--foreground-muted)] text-[11px]">
                  <span>ZERO ENGINE DEPS • &lt; 15KB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
