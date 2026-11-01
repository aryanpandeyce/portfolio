# Implementation Tasks Checklist (TASKS.md)

## Personalization & Modernization Milestones

- [x] **Phase 1: Identity & Profile Personalization**
  - [x] Update `data/profile.ts` with Aryan Pandey's real data (Headline: "Backend & Cloud-Native Engineer | Go, Java, Distributed Systems", secondary line: "Full-stack roots in React and Node. Building scalable, observable microservices.").
  - [x] Strict phone privacy constraint: Phone number completely removed from all source code, components, JSON-LD, sitemap, meta tags, and DOM elements. Contact routed through email and LinkedIn.
  - [x] Update 3 real experiences: Shyam Group (IntelliWorkz) CRM, Technomine, Techno Hacks Edutech.
  - [x] Update 3 featured projects in `data/projects.override.json`: FleetPulse (Go/Kubernetes), ApexPay (Java 21/Spring Boot/Kafka), LendStrangler (TypeScript/RabbitMQ) with factual Problem -> Approach -> Result summaries and live demo links for ApexPay and LendStrangler.
  - [x] Remove placeholder project "synth-cache" from data, tests, and documentation.
  - [x] Update education: Gujarat Technological University (BE CS, CGPA 9.03/10.0), IIT Madras (BSc Data Science, GPA 6.80/10.0).
  - [x] Update 4 achievements: Dewang Mehta IT Award 2023, HackerRank 5-Star JavaScript, 365-Day LeetCode Streak, GDSC Lead.
  - [x] Update LeetCode profile to `https://leetcode.com/u/aryan_inzy/` with live API sync and custom retro terminal favicon branding.
  - [x] Add direct link to `README.md` repository documentation in web app footer and retro quick jump dock.

- [x] **Phase 2: Hero, About & Experience Polish**
  - [x] Personalize Hero section with animated typewriter rotating specialties, Aryan's headline, and `● OPEN TO OPPORTUNITIES` retro badge.
  - [x] 3D Hero performance gating: automatically falls back to static SVG terminal illustration when WebGL is unavailable, `prefers-reduced-motion` is active, `saveData` is enabled, device memory <= 4GB, concurrency <= 4 cores, or viewport < 768px.
  - [x] Hero heading (real HTML text) serves as the instant Largest Contentful Paint (LCP) element.
  - [x] Rewrite About section narrative (~120 words honest first-person bio with natural SEO keywords).
  - [x] Filter infinite marquee in About to only technologies on Aryan's resume; pause on hover, off-screen, and under `prefers-reduced-motion`.
  - [x] Experience timeline: tech chips per role with interactive mobile collapsible toggle.
  - [x] Dedicated "Trophy Case" card row component (`components/sections/achievements-section.tsx`).

- [x] **Phase 3: Evidence-Based Skill Tree // Loadout**
  - [x] Delete old Technology Matrix with percentage bars.
  - [x] Build retro cartridge-slot UI grouped in window panels: Languages, Backend & Microservices, Cloud & DevOps, Databases, Frontend, AI/Data, Core CS.
  - [x] Evidence tiers: `Daily Driver`, `Production`, `Built Projects`.
  - [x] Crawlable HTML proof links for each technology cartridge.
  - [x] Keyboard-accessible category filter tabs and 2-column mobile layout.

- [x] **Phase 4: Retro Arcade Section & 2 Original Canvas Games**
  - [x] Build **BUG BLASTER**: Space-Invaders-style pixel shooter defending against NullPointers, Race Conditions, and Memory Leaks with Coffee and Try/Catch power-ups.
  - [x] Build **PACKET SNAKE**: Grid data packet stream collecting resume tech tokens (Go, Kafka, K8s, Java, Redis, Docker).
  - [x] Plain HTML5 Canvas 2D + `requestAnimationFrame` with fixed-timestep loop (`< 15KB` gzipped, zero game engine dependencies, procedural pixel sprites).
  - [x] Dynamic lazy-load `import()` triggered only when clicking "Insert Coin" (prefetched on hover/focus).
  - [x] Reserved CSS aspect-ratio container to guarantee zero layout shift (CLS < 0.05).
  - [x] Auto-pause on tab hidden (`visibilitychange`), off-screen (`IntersectionObserver`), or Esc/P key.
  - [x] Konami code easter egg (`↑ ↑ ↓ ↓ ← → ← → B A`) to trigger cabinet.
  - [x] Safe localStorage high score persistence.
  - [x] End screen with CTA to projects: "You scored X, now check out my projects".
  - [x] Standalone linkable page at `/arcade` with full sitemap integration.
  - [x] Unit tests for pure arcade logic (`tests/arcade.test.ts`) and Playwright smoke test.

- [x] **Phase 5: Performance & SEO Optimization**
  - [x] Install and configure `@next/bundle-analyzer` (`npm run analyze`).
  - [x] Below-the-fold `content-visibility: auto` with `contain-intrinsic-size: 1px 700px`.
  - [x] Performance budgets defined in `perf-budget.json`.
  - [x] Lighthouse CI configuration in `lighthouserc.json` and GitHub Actions workflow.
  - [x] PerformanceObserver Playwright test asserting CLS < 0.1.
  - [x] Structured JSON-LD with Person, WebSite, BreadcrumbList, and SoftwareSourceCode schemas.
  - [x] Update sitemap.xml (including `/arcade/`), robots.txt, manifest.json, and humans.txt.

- [x] **Phase 6: Quality Gate & Deployment**
  - [x] `npm run build` static export compiled cleanly.
  - [x] Playwright test suite passing across all viewports (375px, 768px, 1280px, 1920px).
  - [x] Responsive screenshots generated.
  - [x] Git commits structured logically and push to GitHub repository.
