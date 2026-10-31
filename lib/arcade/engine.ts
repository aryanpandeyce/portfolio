/**
 * Retro Arcade Engine Utilities
 * Shared types, safe local storage for high scores, audio hooks, and performance monitoring.
 */

export interface HighScores {
  bugBlaster: number;
  packetSnake: number;
}

const HIGH_SCORE_KEY = "aryan_portfolio_high_scores_v1";

export function getLocalHighScores(): HighScores {
  if (typeof window === "undefined") {
    return { bugBlaster: 0, packetSnake: 0 };
  }
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (!raw) return { bugBlaster: 0, packetSnake: 0 };
    const parsed = JSON.parse(raw);
    return {
      bugBlaster: typeof parsed.bugBlaster === "number" ? parsed.bugBlaster : 0,
      packetSnake: typeof parsed.packetSnake === "number" ? parsed.packetSnake : 0,
    };
  } catch {
    return { bugBlaster: 0, packetSnake: 0 };
  }
}

export function saveLocalHighScore(game: "bugBlaster" | "packetSnake", score: number): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getLocalHighScores();
    if (score > current[game]) {
      current[game] = score;
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(current));
      return true;
    }
  } catch {
    // Ignore storage quota / privacy mode exceptions
  }
  return false;
}

export class PerformanceGuard {
  private frameTimes: number[] = [];
  private lastTime = performance.now();
  private lowFpsCounter = 0;
  public isPerformanceMode = false;

  public tick(): void {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0) {
      const currentFps = 1000 / delta;
      this.frameTimes.push(currentFps);
      if (this.frameTimes.length > 60) this.frameTimes.shift();

      const avgFps = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      if (avgFps < 30) {
        this.lowFpsCounter++;
        if (this.lowFpsCounter > 120) {
          // Sustained low FPS for ~2 seconds
          this.isPerformanceMode = true;
        }
      } else {
        this.lowFpsCounter = Math.max(0, this.lowFpsCounter - 1);
      }
    }
  }
}
