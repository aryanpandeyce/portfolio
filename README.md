# Aryan Pandey — Backend & Cloud-Native Engineer Portfolio

A production-grade, ultra-fast, SEO-optimized developer portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **React Three Fiber (3D)**.

Designed with a warm **"Claude-inspired palette with a tasteful retro computing twist"** featuring Fraunces editorial serif typography, terminal window chrome, hard offset shadows, toggleable CRT scanlines, 8-bit sound effects, evidence-based Skill Tree Loadout, an original Retro 2D Canvas Arcade cabinet, and static HTML pre-rendering.

---

## 🚀 Key Features & Architectural Highlights

1. **Editorial Hero Section**:
   - Semantic `<h1>` heading serving as the instant Largest Contentful Paint (LCP) element.
   - Animated typewriter discipline tagline.
   - Small `● OPEN TO OPPORTUNITIES` retro badge.
   - Interactive 3D hero scene with head-tracking and idle-breathing animation. Automatically gates and falls back to a lightweight SVG terminal illustration on low-memory devices (<= 4GB), low-concurrency devices (<= 4 cores), saveData mode, reduced motion, or mobile widths (< 768px).

2. **Narrative & About**:
   - First-person career narrative: full-stack roots in React and Node transitioning into distributed Go and Java 21 microservices, Kafka/RabbitMQ event pipelines, and Kubernetes orchestration.
   - Infinite tech stack marquee containing only verified technologies from Aryan's resume, paused when off-screen and under `prefers-reduced-motion`.

3. **Experience Timeline**:
   - **Shyam Group (IntelliWorkz)**: 10+ module CRM managing 4,000+ leads, INR 6.3 Cr+ sales, 9-stage pipeline, 6-channel integrations, and local LLM RAG AI assistant (Qwen via Ollama).
   - **Technomine**: 4 business apps (HRMS V1/V2, Travel Booking, Call Log Report Tool) across ASP.NET, React, and multiple databases.
   - **Techno Hacks Edutech**: Responsive front-end applications with REST API integrations.
   - Interactive mobile collapsible cards per role with technology chips.

4. **Featured Projects (Bento Grid)**:
   - **FleetPulse**: Cloud-Native Fleet Management (Go, gRPC, Kubernetes, NATS, AWS, Helm).
   - **ApexPay**: Enterprise Payment Platform (Java 21, Spring Boot 3, Kafka, PostgreSQL, MongoDB, Kubernetes). Includes live demo.
   - **LendStrangler**: Monolith to Microservices via Strangler Fig (TypeScript, Node.js, RabbitMQ, Docker). Includes live demo.
   - Architecture badge row per card; "Problem -> Approach -> Result" summary on each case-study page.

5. **Skill Tree // Loadout (Replaces Old Tech Matrix)**:
   - Retro cartridge-slot UI grouped into window panels: Languages, Backend & Microservices, Cloud & DevOps, Databases, Frontend, AI/Data, Core CS.
   - Strict evidence-based tier labels (`Daily Driver`, `Production`, `Built Projects`) and crawlable HTML proof links.
   - Filter tabs (All, Backend, Cloud, Databases, Frontend, AI/Data, Core CS), keyboard accessible.

6. **Trophy Case & Honors**:
   - Dewang Mehta IT Award 2023 (NASSCOM & GTU)
   - HackerRank 5-Star JavaScript Challenge
   - 365-Day LeetCode Streak
   - Google Developer Student Club Lead

7. **Coding Profiles & Analytics**:
   - GitHub statistics and contribution activity for `aryanpandeyce`.
   - LeetCode analytics showing verified 365-Day Streak and "last synced" timestamps. Zero chart library dependencies (lightweight SVG/CSS).

8. **Retro Arcade // Insert Coin**:
   - Zero-dependency original 2D Canvas games (`< 15KB` gzipped):
     1. **BUG BLASTER**: Space-Invaders-style shooter defending against NullPointers, Race Conditions, and Memory Leaks with Coffee and Try/Catch power-ups.
     2. **PACKET SNAKE**: Data packet stream collecting resume tech tokens (Go, Kafka, K8s, Java, Redis, Docker) on a grid.
   - Lazy-loaded dynamically on "Insert Coin" click (prefetched on hover/focus).
   - Reserved aspect-ratio container (zero layout shift).
   - Konami code easter egg (`↑ ↑ ↓ ↓ ← → ← → B A`) to trigger the arcade.
   - Dedicated standalone page at `/arcade` with full sitemap integration.

9. **Interactive Resume & Print View (`/resume`)**:
   - Comprehensive web resume with print-friendly CSS.
   - Phone number `+91-9054454394` is strictly displayed ONLY on this page.
   - Safe PDF download check: checks for `public/resume.pdf` at build time.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Export Mode**: Static Export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- **Styling**: Tailwind CSS v4 + Custom Retro CSS Variables
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei` (gated and idle-deferred)
- **Audio**: Synthesized Web Audio API 8-bit sound effects
- **Testing**: Playwright test suite (375px, 768px, 1280px, 1920px viewports, dark mode, arcade unit tests, CLS observer)
- **Deployment**: GitHub Pages via GitHub Actions

---

## 💻 Local Setup & Development

### 1. Installation
```bash
git clone https://github.com/aryanpandeyce/portfolio.git
cd portfolio
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Build & Test
```bash
# Static production build (emitted to /out)
npm run build

# Run Playwright responsive and arcade unit tests
npm test

# Run bundle analyzer
npm run analyze
```

---

## 📊 Performance Budgets & Auditing

- **Budget Config**: [`perf-budget.json`](./perf-budget.json) defines max resource size limits (scripts <= 250KB, stylesheets <= 100KB, total <= 1MB).
- **Lighthouse CI**: [`lighthouserc.json`](./lighthouserc.json) enforces:
  - Performance >= 95 (warn on < 90)
  - Accessibility >= 95 (error on < 90)
  - SEO = 100 (error on < 95)
  - CLS < 0.1

---

## 🚢 GitHub Pages Deployment

### Workflow Configuration:
1. Ensure your repository Pages setting is configured to **GitHub Actions**:
   - **Settings** > **Pages** > **Build and deployment** > **Source**: `GitHub Actions`
2. Add repository Variables under **Settings** > **Secrets and variables** > **Actions** > **Variables**:
   - `PORTFOLIO_GITHUB_USER`: `aryanpandeyce`
   - `PORTFOLIO_LEETCODE_USER`: `[LEETCODE_USERNAME]`
3. Push to `main` branch to trigger `.github/workflows/deploy.yml`.

---

## 🔍 SEO Submission
1. **Google Search Console**: Submit `https://aryanpandeyce.github.io/sitemap.xml`.
2. **Bing Webmaster Tools**: Import or submit `https://aryanpandeyce.github.io/sitemap.xml`.
