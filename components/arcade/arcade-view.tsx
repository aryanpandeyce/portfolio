"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BugBlasterGame } from "@/lib/arcade/bug-blaster";
import { PacketSnakeGame, Direction } from "@/lib/arcade/packet-snake";
import {
  getLocalHighScores,
  saveLocalHighScore,
  PerformanceGuard,
  HighScores,
} from "@/lib/arcade/engine";
import { retroAudio } from "@/lib/audio";
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  Gamepad2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ArcadeViewProps {
  onExit: () => void;
  initialGame?: "bugBlaster" | "packetSnake";
}

export function ArcadeView({ onExit, initialGame = "bugBlaster" }: ArcadeViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeGame, setActiveGame] = useState<"bugBlaster" | "packetSnake">(initialGame);
  const [highScores, setHighScores] = useState<HighScores>(getLocalHighScores);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPerfMode, setIsPerfMode] = useState(false);
  const [isMuted, setIsMuted] = useState(retroAudio.isSoundMuted());

  // Game instances
  const bugGameRef = useRef<BugBlasterGame | null>(null);
  const snakeGameRef = useRef<PacketSnakeGame | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const perfGuardRef = useRef<PerformanceGuard>(new PerformanceGuard());

  // Audio callback
  const handleAudio = useCallback((sound: "laser" | "hit" | "powerup" | "explosion" | "coin" | "blip") => {
    switch (sound) {
      case "laser":
      case "blip":
        retroAudio.playClick();
        break;
      case "powerup":
      case "coin":
        retroAudio.playCoin();
        break;
      case "hit":
      case "explosion":
        retroAudio.playError();
        break;
    }
  }, []);

  // Initialize games
  useEffect(() => {
    bugGameRef.current = new BugBlasterGame(handleAudio);
    snakeGameRef.current = new PacketSnakeGame(handleAudio);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleAudio]);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      const deltaMs = Math.min(100, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      perfGuardRef.current.tick();
      if (perfGuardRef.current.isPerformanceMode !== isPerfMode) {
        setIsPerfMode(perfGuardRef.current.isPerformanceMode);
      }

      if (activeGame === "bugBlaster" && bugGameRef.current) {
        const game = bugGameRef.current;
        game.update();
        game.render(ctx, perfGuardRef.current.isPerformanceMode);
        setCurrentScore(game.score);
        if (game.gameOver !== gameOver) setGameOver(game.gameOver);
        if (game.isPaused !== isPaused) setIsPaused(game.isPaused);

        if (game.gameOver && game.score > 0) {
          saveLocalHighScore("bugBlaster", game.score);
          setHighScores(getLocalHighScores());
        }
      } else if (activeGame === "packetSnake" && snakeGameRef.current) {
        const game = snakeGameRef.current;
        game.update(deltaMs);
        game.render(ctx, perfGuardRef.current.isPerformanceMode);
        setCurrentScore(game.score);
        if (game.gameOver !== gameOver) setGameOver(game.gameOver);
        if (game.isPaused !== isPaused) setIsPaused(game.isPaused);

        if (game.gameOver && game.score > 0) {
          saveLocalHighScore("packetSnake", game.score);
          setHighScores(getLocalHighScores());
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeGame, gameOver, isPaused, isPerfMode]);

  const togglePause = useCallback(() => {
    retroAudio.playClick();
    if (activeGame === "bugBlaster" && bugGameRef.current) {
      bugGameRef.current.isPaused = !bugGameRef.current.isPaused;
      setIsPaused(bugGameRef.current.isPaused);
    } else if (activeGame === "packetSnake" && snakeGameRef.current) {
      snakeGameRef.current.isPaused = !snakeGameRef.current.isPaused;
      setIsPaused(snakeGameRef.current.isPaused);
    }
  }, [activeGame]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow escape to exit arcade anytime
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
        return;
      }

      // Pause toggle on 'P'
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePause();
        return;
      }

      // Only capture game keys when canvas or container has focus
      const activeEl = document.activeElement;
      const isInside = containerRef.current?.contains(activeEl);
      if (!isInside) return;

      const keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (keysToPrevent.includes(e.key)) {
        e.preventDefault();
      }

      if (activeGame === "bugBlaster" && bugGameRef.current) {
        const game = bugGameRef.current;
        if (game.gameOver && (e.key === "Enter" || e.key === " ")) {
          game.reset();
          setGameOver(false);
          return;
        }
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          game.moveLeft();
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          game.moveRight();
        } else if (e.key === " " || e.key === "ArrowUp") {
          game.shoot();
        }
      } else if (activeGame === "packetSnake" && snakeGameRef.current) {
        const game = snakeGameRef.current;
        if (game.gameOver && (e.key === "Enter" || e.key === " ")) {
          game.reset();
          setGameOver(false);
          return;
        }
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          game.setDirection("UP");
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          game.setDirection("DOWN");
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          game.setDirection("LEFT");
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          game.setDirection("RIGHT");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGame, onExit, togglePause]);

  // Tab hidden / Visibility change auto-pause
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (activeGame === "bugBlaster" && bugGameRef.current) bugGameRef.current.isPaused = true;
        if (activeGame === "packetSnake" && snakeGameRef.current) snakeGameRef.current.isPaused = true;
        setIsPaused(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [activeGame]);

  // IntersectionObserver auto-pause when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (activeGame === "bugBlaster" && bugGameRef.current) bugGameRef.current.isPaused = true;
            if (activeGame === "packetSnake" && snakeGameRef.current) snakeGameRef.current.isPaused = true;
            setIsPaused(true);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeGame]);

  const handleRestart = () => {
    retroAudio.playCoin();
    if (activeGame === "bugBlaster" && bugGameRef.current) {
      bugGameRef.current.reset();
      setGameOver(false);
      setIsPaused(false);
    } else if (activeGame === "packetSnake" && snakeGameRef.current) {
      snakeGameRef.current.reset();
      setGameOver(false);
      setIsPaused(false);
    }
  };

  const switchGame = (game: "bugBlaster" | "packetSnake") => {
    retroAudio.playClick();
    setActiveGame(game);
    setGameOver(false);
    setIsPaused(false);
  };

  // Mobile virtual d-pad triggers
  const handleVirtualDir = (dir: Direction) => {
    if (activeGame === "packetSnake" && snakeGameRef.current) {
      snakeGameRef.current.setDirection(dir);
    } else if (activeGame === "bugBlaster" && bugGameRef.current) {
      if (dir === "LEFT") bugGameRef.current.moveLeft();
      if (dir === "RIGHT") bugGameRef.current.moveRight();
      if (dir === "UP") bugGameRef.current.shoot();
    }
  };

  const handleVirtualAction = () => {
    if (activeGame === "bugBlaster" && bugGameRef.current) {
      if (bugGameRef.current.gameOver) {
        handleRestart();
      } else {
        bugGameRef.current.shoot();
      }
    } else if (activeGame === "packetSnake" && snakeGameRef.current) {
      if (snakeGameRef.current.gameOver) {
        handleRestart();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="retro-card p-0 overflow-hidden bg-[#181716] border-2 border-[var(--border)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label="Arcade Cabinet Interface"
    >
      {/* Hidden Skip Link for Accessibility */}
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:p-2 focus:bg-[var(--accent)] focus:text-white"
      >
        Skip arcade game to contact section
      </a>

      {/* Screen Reader Score Announcement */}
      <div className="sr-only" aria-live="polite">
        Current score: {currentScore}. Game state: {gameOver ? "Game over" : isPaused ? "Paused" : "Active"}.
      </div>

      {/* Arcade Titlebar */}
      <div className="window-titlebar bg-[#22211F] text-[#FAF8F5] border-b border-[#383531]">
        <div className="window-dots">
          <span className="dot-red" onClick={onExit} title="Close Arcade" />
          <span className="dot-yellow" onClick={togglePause} title="Pause" />
          <span className="dot-green" onClick={handleRestart} title="Reboot" />
        </div>

        <div className="flex items-center gap-2 font-mono-code text-xs font-bold text-[#FAF8F5]">
          <Gamepad2 className="w-4 h-4 text-[var(--accent)]" />
          <span>RETRO ARCADE // CABINET</span>
          {isPerfMode && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--accent-amber)] text-black">
              LOW_GPU
            </span>
          )}
        </div>

        <button
          onClick={onExit}
          className="p-1 rounded text-[#FAF8F5]/60 hover:text-white hover:bg-white/10"
          title="Exit Arcade (Esc)"
          aria-label="Exit Arcade"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Game Selector Tabs */}
      <div className="bg-[#1C1B19] px-4 py-2 border-b border-[#383531] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchGame("bugBlaster")}
            className={`px-3 py-1.5 rounded font-mono-code text-xs font-bold transition-all ${
              activeGame === "bugBlaster"
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "bg-[#282724] text-neutral-300 hover:text-white"
            }`}
          >
            1. BUG BLASTER
          </button>
          <button
            onClick={() => switchGame("packetSnake")}
            className={`px-3 py-1.5 rounded font-mono-code text-xs font-bold transition-all ${
              activeGame === "packetSnake"
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "bg-[#282724] text-neutral-300 hover:text-white"
            }`}
          >
            2. PACKET SNAKE
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono-code text-xs text-neutral-400">
          <span>
            HIGH SCORE:{" "}
            <strong className="text-[var(--accent-amber)]">
              {activeGame === "bugBlaster" ? highScores.bugBlaster : highScores.packetSnake}
            </strong>
          </span>

          <button
            onClick={() => {
              const muted = retroAudio.toggleMute();
              setIsMuted(muted);
            }}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-1.5 rounded bg-[#282724] hover:text-white"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Arcade Screen Area */}
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-[#100F0E]">
        <div className="relative w-full max-w-[480px] aspect-[4/5] bg-black rounded-lg overflow-hidden border-2 border-[#383531] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          <canvas
            ref={canvasRef}
            width={480}
            height={600}
            className="w-full h-full object-contain block select-none"
            style={{ imageRendering: "pixelated" }}
          />

          {/* CRT scanline scan on game screen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 50%)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>

        {/* Game Over "CTA to Projects" Banner */}
        {gameOver && (
          <div className="w-full max-w-[480px] mt-4 p-4 rounded-xl border border-[var(--accent)] bg-[var(--surface)] text-[var(--foreground)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[3px_3px_0px_var(--retro-shadow-color)] animate-fadeIn">
            <div>
              <div className="font-serif-heading font-bold text-sm text-[var(--foreground)]">
                Great Run! You scored {currentScore} points.
              </div>
              <div className="font-mono-code text-xs text-[var(--foreground-muted)]">
                Ready to see how I build production distributed systems?
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="retro-btn px-3 py-1.5 bg-[var(--surface-muted)] text-xs font-mono-code"
              >
                Play Again
              </button>
              <Link
                href="/projects"
                onClick={() => retroAudio.playClick()}
                className="retro-btn px-3 py-1.5 bg-[var(--accent)] text-white text-xs font-mono-code gap-1"
              >
                <span>Check Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Controls Bar & Mobile Touch D-Pad */}
        <div className="w-full max-w-[480px] mt-4 pt-3 border-t border-[#2B2926] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-code text-xs text-neutral-400">
          <div className="hidden sm:block">
            {activeGame === "bugBlaster"
              ? "← → / A D: Move • Space: Fire • P: Pause • Esc: Exit"
              : "↑ ↓ ← → / WASD: Steer • P: Pause • Esc: Exit"}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <button
              onClick={togglePause}
              className="px-3 py-1.5 rounded bg-[#252422] hover:bg-[#32302C] text-[#FAF8F5] text-xs flex items-center gap-1"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? "RESUME" : "PAUSE"}</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-3 py-1.5 rounded bg-[#252422] hover:bg-[#32302C] text-[#FAF8F5] text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REBOOT</span>
            </button>

            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded bg-[#382622] hover:bg-[#4E342E] text-[var(--accent)] text-xs font-bold"
            >
              EXIT (ESC)
            </button>
          </div>
        </div>

        {/* Mobile On-Screen Virtual D-Pad (only visible on touch/mobile widths) */}
        <div className="sm:hidden w-full max-w-[360px] mt-4 grid grid-cols-2 gap-4 items-center bg-[#1C1B19] p-3 rounded-xl border border-[#383531]">
          {/* Directional Pad */}
          <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
            <div />
            <button
              onClick={() => handleVirtualDir("UP")}
              aria-label="Up"
              className="h-9 rounded bg-[#2D2B28] active:bg-[var(--accent)] flex items-center justify-center text-white"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div />

            <button
              onClick={() => handleVirtualDir("LEFT")}
              aria-label="Left"
              className="h-9 rounded bg-[#2D2B28] active:bg-[var(--accent)] flex items-center justify-center text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="h-9 rounded bg-[#201F1D]" />
            <button
              onClick={() => handleVirtualDir("RIGHT")}
              aria-label="Right"
              className="h-9 rounded bg-[#2D2B28] active:bg-[var(--accent)] flex items-center justify-center text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div />
            <button
              onClick={() => handleVirtualDir("DOWN")}
              aria-label="Down"
              className="h-9 rounded bg-[#2D2B28] active:bg-[var(--accent)] flex items-center justify-center text-white"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <div />
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center justify-center gap-1">
            <button
              onClick={handleVirtualAction}
              className="w-16 h-16 rounded-full bg-[var(--accent)] active:bg-[var(--accent-hover)] text-white font-mono-code font-bold text-xs shadow-lg flex items-center justify-center"
            >
              {activeGame === "bugBlaster" ? "FIRE" : "OK"}
            </button>
            <span className="text-[10px] font-mono-code text-neutral-400">ACTION</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArcadeView;
