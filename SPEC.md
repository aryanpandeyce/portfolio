# System Specification: Claude-Inspired Retro Developer Portfolio

## 1. Overview & Vision
A production-grade, SEO-optimized, highly responsive developer portfolio website designed with a **"Claude-inspired palette with a tasteful retro twist"**. The site features a rich aesthetic balancing warm editorial typography (serif + mono + sans), tactile retro UI elements (terminal window chrome, subtle toggleable CRT scanlines, pixel accents, hard offset shadows), and modern engineering (Next.js App Router, Static HTML Export for GitHub Pages, 3D interactive hero avatar via React Three Fiber with static fallback, Framer Motion animations, comprehensive build-time GitHub & LeetCode data sync, and full Playwright e2e testing).

---

## 2. Technical Stack & Architecture

### 2.1 Core Framework & Runtime
- **Next.js 15+ (App Router)** with TypeScript:
  - Static Site Generation (SSG) with `output: 'export'`
  - `images: { unoptimized: true }` for zero-server static hosting compatibility
  - `trailingSlash: true` for clean static directory routing on GitHub Pages
  - Configurable `basePath` and `assetPrefix` via `NEXT_PUBLIC_BASE_PATH` to seamlessly support both user root domains (`username.github.io`) and project pages (`username.github.io/repo-name`).
- **Styling & Design System**:
  - Tailwind CSS v3/v4 configured with CSS variables
  - Curated Claude Warm Editorial Palette (Light & Dark)
  - Custom retro utilities (hard offset shadows `retro-shadow`, dotted grid canvas, scanline overlays, pixel borders)
  - `next-themes` for system-aware, persistent dark/light mode toggle without FOUC (flash of unstyled content)
- **Component Libraries & Animations**:
  - `shadcn/ui` base primitives (radix-ui accessible foundations: dialog, dropdown, tabs, tooltip, badge, sheet)
  - `motion` (Framer Motion) for smooth scroll reveals, layout animations, and micro-interactions
  - Lucide React icons
  - Canvas-confetti for retro celebration effects
- **3D Hero Scene**:
  - React Three Fiber (`@react-three/fiber`) & `@react-three/drei`
  - Lazy-loaded via `next/dynamic` (`ssr: false`) with `<Suspense>`
  - Head-tracking / cursor-following low-poly interactive retro dev scene
  - Draco compression readiness, Frameloop control (pauses when off-screen), DPR capped at `[1, 1.5]`
  - Static SVG/CSS fallback for `prefers-reduced-motion`, low-power devices, or WebGL-unsupported environments
- **Data & Markdown**:
  - Build-time GitHub REST/GraphQL API client (`lib/github.ts`)
  - Build-time LeetCode GraphQL client (`lib/leetcode.ts`) with robust caching in `data/*.json`
  - Manual overrides layer (`data/projects.override.json`) for pinning, custom demo URLs, screenshots, and descriptions
  - Markdown rendering via `react-markdown`, `remark-gfm`, and `rehype-highlight` for project README case studies (`/projects/[slug]`)
- **Testing & Verification**:
  - Playwright test runner configured for multi-device viewport screenshots (375px, 768px, 1280px, 1920px), console error detection, and accessibility assertions.

---

## 3. Design Tokens & Palette ("Claude with a Retro Twist")

### 3.1 Color Palette
| Token Name | Light Theme Value | Dark Theme Value | Purpose |
|---|---|---|---|
| `--background` | `#FAF8F5` (Warm Cream) | `#1E1D1B` (Warm Charcoal) | Page canvas |
| `--surface` | `#FFFFFF` (Alabaster Cream) | `#282724` (Elevated Charcoal) | Card & window surfaces |
| `--surface-muted` | `#F1EDE4` (Soft Putty) | `#33322E` (Subtle Charcoal) | Table headers, secondary blocks |
| `--foreground` | `#1A1917` (Deep Ink) | `#EDEAE3` (Parchment White) | Primary text |
| `--foreground-muted`| `#6B6760` (Muted Umber) | `#A6A198` (Muted Cream) | Secondary text, captions |
| `--border` | `#E3DDD3` (Warm Stone) | `#3D3B36` (Charcoal Border) | UI borders |
| `--border-retro` | `#1A1917` (Deep Ink) | `#EDEAE3` (Parchment) | Retro window outlines & hard shadows |
| `--accent` | `#D97757` (Claude Terracotta) | `#E28468` (Warm Coral) | Primary buttons, active tabs, highlights |
| `--accent-hover` | `#C46445` (Deep Terracotta) | `#F09A80` (Bright Terracotta) | Hover states |
| `--accent-subtle` | `rgba(217, 119, 87, 0.12)` | `rgba(226, 132, 104, 0.18)` | Pill tags, active glows |
| `--accent-secondary`| `#4D7C79` (Vintage Sage) | `#6CA8A5` (Retro Mint) | Success indicators, leetcode easy |
| `--accent-amber` | `#D4973B` (Warm Amber) | `#E5AC54` (Golden Amber) | Leetcode medium, star counters |
| `--accent-rose` | `#C85252` (Retro Crimson) | `#DC6C6C` (Soft Crimson) | Leetcode hard, error alerts |

### 3.2 Typography System
- **Headings**: `Fraunces` / `Playfair Display` (Warm, editorial serif font via `next/font/google`)
- **Body**: `Inter` / `Plus Jakarta Sans` (Clean, legible geometric sans)
- **Labels, Meta, Metrics**: `JetBrains Mono` / `Space Mono` (Crisp technical monospace)
- **Retro Badges & Accents**: `Press Start 2P` or `Silkscreen` (Pixel font for retro headers, status badges, and Easter eggs)

### 3.3 Retro Signatures
1. **Window Cards**: OS/terminal top bar with title, status pill, and 3 window control dots (red, amber, green).
2. **Hard Offset Shadows**: `box-shadow: 4px 4px 0px var(--border-retro)` for cards and buttons with active `translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_...]`.
3. **Subtle CRT Scanlines & Noise**: Toggleable overlay at 3% opacity with subtle CRT vignette and scanline lines.
4. **Retro Boot Sequence**: Short 1.8-second skippable terminal boot log ("INITIALIZING CORE KERNEL... [OK]"), persisted in `sessionStorage` so it runs once per session.
5. **Interactive Retro Status Bar / Command Deck**: Fixed subtle bottom pill showing sound toggle, CRT toggle, current viewport / git commit tag, and "Press [Cmd+K] / Click for Quick Jump".
6. **Custom Desktop Cursor**: Sleek crosshair/dot cursor on desktop with hover magnification on interactive targets.

---

## 4. Site Structure & Pages

### 4.1 Home Page (`/`)
1. **Boot Screen Modal** (runs once, skippable, keyboard escape).
2. **Retro Header / Navigation**:
   - Branding with pixel avatar icon + status light ("Available for opportunities")
   - Nav links: About, Experience, Projects, Skills, Metrics, Resume, Contact
   - Theme toggle (Sun/Moon), CRT scanline toggle, Sound effect toggle, Mobile Hamburger Drawer.
3. **Hero Section**:
   - Monospace terminal greeting tag: `> SYSTEM.STATUS: ONLINE`
   - Editorial Serif Heading with highlighted name: `"Crafting resilient systems & delightful interfaces"`
   - Typewriter animated sub-headline cycling through core disciplines (Full-Stack Engineer, Cloud Architect, Open Source Contributor)
   - Retro CTA Button cluster: `[Browse Projects ➔]`, `[View Resume 📄]`, `[Get in Touch ✉]`
   - 3D Interactive Hero Canvas: stylized 3D low-poly developer workstation with head-tracking monitor/avatar, ambient lighting, and interactive floating retro floppies/cubes.
4. **About Me & Philosophy**:
   - Personal narrative, photo/avatar window card, core principles (Engineering rigor, user empathy, performance obsession).
   - Infinite rolling tech stack marquee with crisp SVGs.
   - Quick stat counter highlights (Years of exp, GitHub stars, LeetCode solved, production apps shipped).
5. **Experience Timeline**:
   - Vertical retro milestone spine with dot connectors.
   - Expandable cards per role: company, title, dates, location, key quantifiable impact bullets, and tech stack tags.
6. **Featured Projects (Bento Grid)**:
   - 6 curated showcase projects displayed in high-impact bento layout.
   - Live demo links, GitHub repo links, star counts, topic tags, and a "Deep Dive Case Study" trigger.
7. **Skills Matrix**:
   - Interactive grouped tabs: Languages, Frontend, Backend & Databases, Cloud & DevOps, Architecture & Tools.
   - Visual proficiency/comfort bars and tool icons.
8. **Coding Profiles & Live Metrics**:
   - **GitHub Analytics**: Total repos, stars earned, total commits/contributions, top languages chart, followers.
   - **LeetCode Analytics**: Total solved counter, Easy / Medium / Hard visual doughnut/progress bars, global ranking, active streak badge.
9. **Education & Certifications**:
   - Academic background, honors, and verified industry certifications.
10. **Interactive Contact Section**:
    - Retro terminal style contact form integrated with Formspree / Web3Forms fallback.
    - One-click copy email button with animated tooltip / toast feedback.
    - Social links (GitHub, LinkedIn, LeetCode, X/Twitter, Discord).
11. **Footer**:
    - Retro system uptime, copyright, back-to-top button, RSS/Sitemap links, and credits.

### 4.2 All Projects Hub (`/projects`)
- Filterable archive of all public GitHub repositories.
- Real-time search query filter (searches title, description, topics, languages).
- Multi-tag filters (e.g. Next.js, Go, Python, React, Cloud).
- Sort options: Most Starred, Recently Updated, Alphabetical.
- Direct links to GitHub, Live Demo, and `/projects/[slug]` case study.

### 4.3 Project Case Study Pages (`/projects/[slug]`)
- Dynamic routes generated statically at build time via `generateStaticParams()`.
- Top breadcrumb navigation (`Home > Projects > [Repo Name]`).
- Project header with live link, repository link, release version, stars, forks.
- Fully formatted README rendering with syntax highlighting, tables, code blocks, images.
- Sidebar with repository metadata (License, Created Date, Last Push, Open Issues, Language Breakdown).

### 4.4 Resume Page (`/resume`)
- Clean, printer-friendly web resume styled to match the Claude warm aesthetic.
- Interactive controls: "Download PDF" (`/resume.pdf`), "Print View", "Copy Plaintext".
- Organized sections: Executive Summary, Experience, Education, Skills, Key Projects, Honors.

### 4.5 Custom 404 Page (`/not-found`)
- Retro game-over / cartridge-ejected terminal design.
- Animated glitch text "404 - SECTOR NOT FOUND".
- "Insert Coin / Press [SPACE] to Return Home" interactive button.

---

## 5. Data Pipeline & Build Process

```
┌────────────────────────────────────────────────────────────────┐
│                        DATA PIPELINE                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [GitHub API] ─────────┐                                      │
│                        ▼                                       │
│                [scripts/fetch-data.mjs] ──► [data/github.json] │
│                        ▲                            │          │
│  [LeetCode API] ───────┤                            ▼          │
│                        │                   [Merged Static]     │
│  [Overrides JSON] ─────┘                            ▲          │
│   (data/projects.override.json)                     │          │
│                                                     ▼          │
│                                            [Next.js App Build] │
│                                                     │          │
│                                                     ▼          │
│                                            [out/ Static HTML]  │
└────────────────────────────────────────────────────────────────┘
```

1. **Static First Guarantee**: Build never crashes if APIs are unreachable; falls back to committed offline snapshots in `data/github.json` and `data/leetcode.json`.
2. **Override Power**: `data/projects.override.json` allows custom pinned order, custom preview screenshots, video demos, enhanced descriptions, or hiding private/work repos.
3. **Automated Refresh**: GitHub Action workflow triggers on push, manual dispatch, and daily cron (`0 0 * * *`) to fetch latest stars, commits, and LeetCode stats.

---

## 6. SEO, Metadata & Schema Strategy

- **Dynamic Metadata**: Every page provides Open Graph title, description, URL, locale, type, and Twitter card summary.
- **JSON-LD Structured Data**:
  - `Person`: Full name, jobTitle, url, sameAs (GitHub, LinkedIn, LeetCode), alumniOf, knowsAbout.
  - `WebSite`: Name, description, author, url.
  - `BreadcrumbList`: Nested hierarchy for `/projects` and `/projects/[slug]`.
  - `SoftwareSourceCode` / `CreativeWork`: For project case studies.
- **Search Engine Discovery**:
  - `sitemap.xml` automatically generated from static routes + project slugs.
  - `robots.txt` allowing full indexing and pointing to sitemap.
  - `humans.txt` recognizing the tech stack and creator.
  - Web App Manifest (`manifest.json`) for PWA installation and mobile bookmarking.

---

## 7. Responsive Viewport Targets & Accessibility

- **Tested Breakpoints**:
  - Mobile Small: 375px (iPhone SE)
  - Mobile Large: 414px (iPhone XR / Modern Android)
  - Tablet: 768px (iPad Mini / Portrait Tablets)
  - Laptop: 1280px (Standard Desktop / MacBook Air)
  - Desktop Ultra: 1920px (Full HD / 4K Scaled)
- **Zero Horizontal Scroll**: Strictly verified on all viewports.
- **Accessibility (a11y)**:
  - Skip to content landmark link.
  - Full keyboard navigability (Tab, Enter, Space, Esc).
  - ARIA attributes on modals, drawers, tabs, and toggles.
  - High contrast ratio conforming to WCAG AA guidelines in both themes.
  - Respects `prefers-reduced-motion` across all Framer Motion and Three.js elements.
