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
  }) => {
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

    // Verify Aryan's headline and identity
    await expect(page.locator("h1")).toContainText("Crafting scalable backends");

    // Strict security requirement: Phone number must NOT be in home page DOM
    const bodyContent = await page.content();
    expect(bodyContent).not.toContain("+91-9054454394");

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
    expect(
      consoleErrors.filter((e) => !e.includes("WebGL") && !e.includes("THREE"))
    ).toHaveLength(0);
  });

  test("Theme toggle switches to dark mode cleanly", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/", { waitUntil: "networkidle" });

    const html = page.locator("html");
    const initialClass = (await html.getAttribute("class")) || "";
    const wasDark = initialClass.includes("dark");

    // Click theme toggle button in header
    const themeBtn = page.locator('button[title*="mode"]').first();
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();

    // Verify theme toggles using auto-retrying Playwright assertion
    if (wasDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

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

  test("Project case study page renders FleetPulse architecture summary", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/projects/fleetpulse/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("FleetPulse");
    await expect(page.locator("nav[aria-label='Breadcrumb']")).toBeVisible();

    // Verify Problem -> Approach -> Result mini summary exists
    await expect(page.locator("text=01. The Problem")).toBeVisible();
    await expect(page.locator("text=02. The Approach")).toBeVisible();
    await expect(page.locator("text=03. Verified Result")).toBeVisible();

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/case-study-fleetpulse-1280px.png",
      });
    }
  });

  test("Resume page renders formatted web view and phone number strictly here", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });
    await page.goto("/resume/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);

    await expect(page.locator("h1")).toContainText("Aryan Pandey");
    await expect(page.locator("text=+91-9054454394")).toBeVisible();
    await expect(page.locator("text=EXECUTIVE SUMMARY")).toBeVisible();
    await expect(page.locator("text=Shyam Group (IntelliWorkz)")).toBeVisible();

    const width = page.viewportSize()?.width || 1280;
    if (width === 1280) {
      await page.screenshot({
        path: "screenshots/resume-page-1280px.png",
      });
    }
  });

  test("PerformanceObserver records CLS < 0.1 on home page", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio-booted", "true");
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const clsScore = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let cls = 0;
        try {
          const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const shift = entry as PerformanceEntry & {
                hadRecentInput?: boolean;
                value?: number;
              };
              if (!shift.hadRecentInput && typeof shift.value === "number") {
                cls += shift.value;
              }
            }
          });
          observer.observe({ type: "layout-shift", buffered: true });

          setTimeout(() => {
            observer.disconnect();
            resolve(cls);
          }, 800);
        } catch {
          resolve(0);
        }
      });
    });

    expect(clsScore).toBeLessThan(0.1);
  });
});
