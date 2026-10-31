import { test, expect } from "@playwright/test";
import {
  checkAABB,
  calculateBugScore,
  createBugWave,
} from "../lib/arcade/bug-blaster";
import {
  getNextHeadPosition,
  checkGridCollision,
  isOppositeDirection,
} from "../lib/arcade/packet-snake";

test.describe("Arcade Pure Logic Unit Tests", () => {
  test("checkAABB accurately detects rectangular intersection and separation", () => {
    const boxA = { x: 10, y: 10, width: 20, height: 20 };
    const boxB = { x: 25, y: 25, width: 20, height: 20 }; // Intersects at [25..30]
    const boxC = { x: 100, y: 100, width: 20, height: 20 }; // Far away

    expect(checkAABB(boxA, boxB)).toBe(true);
    expect(checkAABB(boxA, boxC)).toBe(false);
  });

  test("calculateBugScore scales with bug hierarchy and wave number", () => {
    const nullScoreW1 = calculateBugScore("NullPointer", 1);
    const raceScoreW1 = calculateBugScore("RaceCondition", 1);
    const leakScoreW1 = calculateBugScore("MemoryLeak", 1);

    expect(nullScoreW1).toBe(100);
    expect(raceScoreW1).toBe(150);
    expect(leakScoreW1).toBe(250);

    // Wave 3 bonus
    const nullScoreW3 = calculateBugScore("NullPointer", 3);
    expect(nullScoreW3).toBe(150); // 100 + (3 - 1) * 25
  });

  test("createBugWave spawns structured grid with MemoryLeak and RaceCondition tiers", () => {
    const wave1 = createBugWave(1);
    expect(wave1.length).toBeGreaterThanOrEqual(12);

    const hasMemoryLeak = wave1.some((b) => b.type === "MemoryLeak");
    const hasRaceCondition = wave1.some((b) => b.type === "RaceCondition");
    const hasNullPointer = wave1.some((b) => b.type === "NullPointer");

    expect(hasMemoryLeak).toBe(true);
    expect(hasRaceCondition).toBe(true);
    expect(hasNullPointer).toBe(true);
  });

  test("getNextHeadPosition updates grid coordinates according to direction", () => {
    const origin = { x: 10, y: 10 };
    expect(getNextHeadPosition(origin, "UP")).toEqual({ x: 10, y: 9 });
    expect(getNextHeadPosition(origin, "DOWN")).toEqual({ x: 10, y: 11 });
    expect(getNextHeadPosition(origin, "LEFT")).toEqual({ x: 9, y: 10 });
    expect(getNextHeadPosition(origin, "RIGHT")).toEqual({ x: 11, y: 10 });
  });

  test("isOppositeDirection prevents 180-degree self-reversal", () => {
    expect(isOppositeDirection("UP", "DOWN")).toBe(true);
    expect(isOppositeDirection("DOWN", "UP")).toBe(true);
    expect(isOppositeDirection("LEFT", "RIGHT")).toBe(true);
    expect(isOppositeDirection("UP", "LEFT")).toBe(false);
  });

  test("checkGridCollision detects perimeter wall boundary limits", () => {
    const cols = 24;
    const rows = 30;
    const safeBody = [{ x: 5, y: 5 }, { x: 5, y: 6 }];

    // Safe point
    expect(checkGridCollision({ x: 10, y: 10 }, cols, rows, safeBody)).toBe(false);

    // Out of bounds
    expect(checkGridCollision({ x: -1, y: 10 }, cols, rows, safeBody)).toBe(true);
    expect(checkGridCollision({ x: 24, y: 10 }, cols, rows, safeBody)).toBe(true);
    expect(checkGridCollision({ x: 10, y: -1 }, cols, rows, safeBody)).toBe(true);
    expect(checkGridCollision({ x: 10, y: 30 }, cols, rows, safeBody)).toBe(true);
  });
});

test.describe("Arcade Playwright Smoke Test", () => {
  test("Open arcade, insert coin, verify canvas mounts, press Esc to exit cleanly", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/arcade", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    // Verify arcade heading exists and is crawlable
    const heading = page.locator("h2").filter({ hasText: /Retro Arcade Cabinet/i });
    await expect(heading).toBeVisible();

    // Verify game canvas mounts (dynamic import resolution)
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible({ timeout: 10000 });

    // Press Escape to test clean exit
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // Verify cabinet exterior returns with "INSERT COIN" button
    const insertBtn = page.locator("#insert-coin-btn");
    await expect(insertBtn).toBeVisible({ timeout: 10000 });

    // Filter out expected benign messages (e.g. dev server HMR or audio context warnings)
    const criticalErrors = consoleErrors.filter(
      (err) =>
        !err.includes("AudioContext") &&
        !err.includes("webpack") &&
        !err.includes("Failed to load resource")
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
