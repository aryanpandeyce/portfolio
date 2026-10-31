# Implementation Tasks Checklist (TASKS.md)

- [x] **Phase 1: Project Initialization & Dependency Scaffolding**
  - [x] Initialize Next.js app with TypeScript, Tailwind CSS, App Router, ESLint (`next.config.ts` configured for `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`, configurable `basePath`).
  - [x] Install dependencies: `lucide-react`, `next-themes`, `framer-motion`, `clsx`, `tailwind-merge`, `canvas-confetti`, `@types/canvas-confetti`, `react-markdown`, `remark-gfm`, `rehype-highlight`, `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`.
  - [x] Install dev dependencies: `@playwright/test`, `prettier`, etc.
  - [x] Configure `next.config.ts` with `output: 'export'`, `trailingSlash: true`, and `basePath` / `assetPrefix` support.
  - [x] Set up Playwright configuration (`playwright.config.ts`) with multi-viewport projects (375px, 768px, 1280px, 1920px).

- [x] **Phase 2: Design System, Tokens & Retro Foundations**
  - [x] Configure Google Fonts (`Fraunces` for serif headings, `Inter` for body sans, `JetBrains Mono` for tech mono, `Press Start 2P` for pixel accents).
  - [x] Define Claude-inspired warm palette and retro tokens in `globals.css` and `tailwind.config.ts` (light warm cream `#FAF8F5`, dark warm charcoal `#1E1D1B`, terracotta accent `#D97757`, retro borders, hard offset shadows).
  - [x] Build retro utility classes: `.retro-card`, `.retro-shadow`, `.retro-btn`, `.retro-badge`, `.scanline-overlay`, `.dotted-bg`, `.animate-marquee`.
  - [x] Implement `ThemeProvider` (`next-themes`) with light, dark, and system modes without FOUC.
  - [x] Implement toggleable CRT scanlines & noise overlay component with persistence in local storage.
  - [x] Implement desktop-only retro crosshair/ring custom cursor with auto-disable on touch screens and outside viewport.
  - [x] Implement retro "Boot Sequence" terminal screen (short, skippable, 1-per-session with `sessionStorage`).

- [x] **Phase 3: Core Layout & Navigation Shell**
  - [x] Build `Header` component:
    - [x] Retro terminal-style top bar with live status indicator ("Available for work")
    - [x] Desktop navigation links with active state indicator
    - [x] Quick Action cluster: Theme toggle, CRT toggle, Sound toggle, Resume link
    - [x] Mobile navigation sheet/drawer with animated hamburger trigger
  - [x] Build `RetroStatusBar` (dock / bottom pill) with quick jump command modal, CRT state, audio toggle, and viewport indicator.
  - [x] Build `Footer` component with retro system uptime, social links, copyright, and back-to-top button.
  - [x] Implement `SkipToContent` accessibility link.

- [x] **Phase 4: Data Layer, Static Storage & Fallbacks**
  - [x] Create `data/profile.ts` with comprehensive typed personal information, experiences, education, certifications, and skills with placeholder fallback values.
  - [x] Create `data/github.json` committed snapshot with realistic high-quality sample repositories and stats.
  - [x] Create `data/leetcode.json` committed snapshot with realistic solved problem distribution and ranking.
  - [x] Create `data/projects.override.json` for custom pin order, custom demo URLs, screenshots, and descriptions.
  - [x] Implement `lib/github.ts` build-time fetcher with error boundary & fallback to `data/github.json`.
  - [x] Implement `lib/leetcode.ts` build-time fetcher with error boundary & fallback to `data/leetcode.json`.
  - [x] Create build sync script `scripts/fetch-data.mjs` for automated GitHub Actions workflows.

- [x] **Phase 5: Home Page Section Implementation**
  - [x] **Hero Section**:
    - [x] Retro terminal badge `> SYSTEM.STATUS: READY`
    - [x] Editorial serif headline with highlighted terracotta typography
    - [x] Dynamic typewriter tagline rotating developer specialties
    - [x] Retro button cluster (Browse Projects, Download Resume, Contact Me, Press Start celebration)
    - [x] 3D Hero interactive canvas (R3F) with low-poly interactive retro computer/avatar, cursor head-tracking, subtle idle float, ambient lighting, and static fallback for reduced-motion/mobile.
  - [x] **About Section**:
    - [x] Narrative bio in editorial layout with personal highlight cards
    - [x] Quick metrics strip (years of experience, repositories, solved problems, contributions)
    - [x] Infinite scrolling tech stack icons marquee with smooth CSS loop
  - [x] **Experience Timeline**:
    - [x] Vertical timeline spine with retro milestone nodes
    - [x] Experience cards featuring company, role, dates, location, achievements, and tech pills
  - [x] **Featured Projects Section**:
    - [x] Bento grid layout featuring top 6 curated projects
    - [x] Interactive cards with retro title bar, tags, star counts, GitHub button, live demo link, and case study link
  - [x] **Skills Matrix**:
    - [x] Categorized tabs: Languages, Frontend, Backend & Database, Cloud & DevOps, Tools
    - [x] Interactive skill cards with proficiency indicators and icons
  - [x] **Coding Profiles & Analytics**:
    - [x] GitHub stats card: total stars, public repos, followers, and visual contribution calendar graph
    - [x] LeetCode stats card: total solved counter, Easy / Medium / Hard progress rings, global rank, and current streak
  - [x] **Education & Certifications Section**:
    - [x] University degrees, coursework, honors, and verified certifications with credential links
  - [x] **Interactive Contact Section**:
    - [x] Retro terminal contact form with Formspree/Web3Forms integration
    - [x] One-click copy email button with toast notification
    - [x] Social profiles grid (GitHub, LinkedIn, LeetCode, Email, Resume)

- [x] **Phase 6: Projects Archive & Case Study Pages**
  - [x] Implement `/projects` page:
    - [x] Search input with instant client-side filtering
    - [x] Multi-select tag/language filter pills
    - [x] Sort dropdown (Stars, Date Updated, Name)
    - [x] Grid of repository cards with live links and case study routes
  - [x] Implement `/projects/[slug]` dynamic case study page:
    - [x] `generateStaticParams()` to pre-render all repository pages
    - [x] Breadcrumb navigation
    - [x] Case study header with metadata badges
    - [x] Markdown renderer (`react-markdown`, `remark-gfm`, `rehype-highlight`) rendering repo README with styled syntax highlighting
    - [x] Project details sidebar (license, language breakdown, forks, issues)

- [x] **Phase 7: Resume Page & Retro 404 Page**
  - [x] Implement `/resume` page:
    - [x] Web-rendered, clean printable resume layout with print stylesheet
    - [x] Download PDF button linking to `/resume.pdf`
    - [x] Print button and copy plain text button
  - [x] Implement `app/not-found.tsx` retro 404 page:
    - [x] Glitch animation, terminal prompt, and "Insert Coin / Reboot" button

- [x] **Phase 8: SEO, Structured Data, Performance & Accessibility**
  - [x] Configure `app/layout.tsx` metadata (title, description, keywords, Open Graph, Twitter cards, metadataBase)
  - [x] Add JSON-LD schema generators (`Person`, `WebSite`, `BreadcrumbList`, `SoftwareSourceCode`)
  - [x] Generate `sitemap.ts` and `robots.ts` for static export
  - [x] Add `humans.txt` and `public/manifest.json`
  - [x] Implement skip-to-content and verify ARIA accessibility throughout all interactive elements

- [x] **Phase 9: Verification, Testing & Responsive Screenshots**
  - [x] Run Next.js production build (`npm run build`) with static export validation (`out/` output)
  - [x] Execute Playwright test suite capturing full-page screenshots at 375px, 768px, 1280px, and 1920px
  - [x] Verify zero console errors, zero horizontal scrollbars, and full theme toggle fidelity

- [x] **Phase 10: GitHub Actions Deployment & Final Documentation**
  - [x] Create `.github/workflows/deploy.yml` with build, static export, `.nojekyll`, and GitHub Pages deployment action
  - [x] Write comprehensive `README.md` with setup instructions, environment variables, instructions for replacing placeholders, adding `avatar.glb`, customizing overrides, and submitting to Google/Bing Webmasters
  - [x] Compile final delivery report with placeholder checklist and deployment instructions
