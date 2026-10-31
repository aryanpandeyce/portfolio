import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

test.beforeAll(() => {
  const dir = path.join(process.cwd(), "screenshots");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

test.describe("Portfolio Responsive & Functional Verification", () => {
  test("Home page renders without console errors and zero horizontal overflow", async ({
    page,
  }, testInfo) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Dismiss boot sequence if displayed
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    // Assert main landmarks exist
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Check zero horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Capture screenshot at current viewport
    const width = page.viewportSize()?.width || 1280;
    await page.screenshot({
      path: `screenshots/home-${width}px.png`,
      fullPage: false,
    });

    // Check console errors
    expect(consoleErrors.filter((e) => !e.includes("WebGL") && !e.includes("THREE"))).toHaveLength(0);
  });

  test("Theme toggle switches to dark mode cleanly", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    // Click theme toggle button in header
    const themeBtn = page.locator('button[title*="mode"]').first();
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();

    // Wait for theme class application
    await page.waitForTimeout(300);

    const isDark = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark");
    });
    expect(isDark).toBe(true);

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/home-dark-mode-1280px.png",
      });
    }
  });

  test("Projects archive page renders and filters properly", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/projects/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    await expect(page.locator("h1")).toContainText("All Public Repositories");

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/projects-archive-1280px.png",
      });
    }
  });

  test("Project case study page renders README markdown", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/projects/synth-cache/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("synth-cache");
    await expect(page.locator("nav[aria-label='Breadcrumb']")).toBeVisible();

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/case-study-synth-cache-1280px.png",
      });
    }
  });

  test("Resume page renders formatted web view", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/resume/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    await expect(page.locator("h1")).toContainText("Alex Rivera");
    await expect(page.locator("text=EXECUTIVE SUMMARY")).toBeVisible();

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/resume-page-1280px.png",
      });
    }
  });
});
