# Claude-Inspired Retro Developer Portfolio

A production-grade, SEO-optimized, highly responsive developer portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Three Fiber (3D)**.

Designed with a warm **"Claude-inspired palette with a tasteful retro twist"** featuring Fraunces editorial typography, terminal window cards, hard offset shadows, toggleable CRT scanlines, 8-bit sound effects, a head-tracking 3D hero avatar, an interactive projects archive, case study pages with rendered READMEs, and automated build-time data syncing from GitHub and LeetCode.

---

## 🎨 Design Direction

- **Claude Warm Editorial Palette**:
  - **Light Mode**: Warm cream canvas (`#FAF8F5`), ink text (`#1A1917`), Claude terracotta accent (`#D97757`), soft putty surfaces (`#FFFFFF` / `#F2EEE6`).
  - **Dark Mode**: Warm charcoal canvas (`#1E1D1B`), elevated surface (`#272623`), parchment white text (`#EDEAE3`), warm coral terracotta accent (`#E28468`).
- **Typography**:
  - Headings: Editorial serif (`Fraunces` via `next/font/google`)
  - Body: Geometric sans (`Inter`)
  - Code & Metrics: Technical mono (`JetBrains Mono`)
  - Retro Accents: Pixel font (`Press Start 2P`)
- **Retro Computing Touches**:
  - Pixel-art & OS terminal window title bars with red/amber/green window controls
  - Toggleable subtle CRT scanlines & screen vignette
  - Hard offset shadows (`box-shadow: 4px 4px 0px var(--retro-shadow-color)`)
  - Synthesized 8-bit Web Audio API sound effects (no external audio files needed)
  - Skippable retro BIOS boot sequence (runs once per session)
  - Floating bottom status dock with realtime viewport resolution indicator and `Cmd+K` Quick Jump command palette
  - Desktop-only custom retro crosshair cursor

---

## 🚀 Key Features & Pages

1. **Home (`/`)**:
   - **Hero**: Editorial serif headline, animated typewriter discipline tagline, CTA button cluster, and interactive 3D hero computer with cursor head-tracking (plus static SVG fallback for low-power/reduced-motion devices).
   - **About**: Narrative bio, avatar window card, quick metric highlights, and an infinite rolling tech stack marquee.
   - **Experience**: Vertical timeline with milestone nodes, company roles, quantifiable achievements, and technology tags.
   - **Featured Projects (Bento Grid)**: 6 curated showcase projects with live demo links, case study routes, and star counts.
   - **Skills Matrix**: Categorized interactive tabs (Languages, Frontend, Backend & Systems, Cloud & DevOps) with retro stepped proficiency meters.
   - **Coding Profiles & Analytics**: Synced GitHub statistics (stars, repos, followers, contribution heatmap) and LeetCode analytics (solved counters, Easy/Medium/Hard breakdown, global ranking, streak).
   - **Education & Certifications**: Academic degrees and verified cloud credentials.
   - **Interactive Contact Section**: Retro terminal contact form with one-click email copy button and social channels.

2. **Projects Archive (`/projects`)**:
   - Comprehensive archive of all public GitHub repositories.
   - Real-time search query filtering (title, description, topics).
   - Multi-select language filter pills and sort options (Most Starred, Recently Updated, Alphabetical).

3. **Case Study Pages (`/projects/[slug]`)**:
   - Dynamic route statically pre-rendered for every repository via `generateStaticParams()`.
   - Formatted README rendered with `react-markdown` and `remark-gfm` syntax styling.
   - Repository metadata, stargazers, forks, last updated, and topic tags.

4. **Interactive Resume (`/resume`)**:
   - Web-formatted curriculum vitae with dedicated `@media print` styling for 1-click clean PDF printing.
   - Download PDF button linking to `/resume.pdf`.
   - Copy plain text button.

5. **Retro 404 Page (`app/not-found.tsx`)**:
   - "404 - Cartridge Not Found / Kernel Panic" with "Insert Coin / Reboot" button.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- **Export Mode**: Static HTML export (`output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`)
- **Deployment Target**: GitHub Pages (supports user root `username.github.io` and project sub-paths)
- **Styling**: Tailwind CSS v4 with custom CSS variable design tokens
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei` (lazy-loaded with SSR disabled)
- **Motion**: Framer Motion
- **Icons**: Lucide React + custom SVG brand icons
- **Testing**: Playwright End-to-End & Multi-Viewport Responsive Test Suite (375px, 768px, 1280px, 1920px)

---

## 💻 Local Development

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Static Export
```bash
# Build the production static site (emitted to /out)
npm run build

# Run Playwright responsive test suite across viewports (375px, 768px, 1280px, 1920px)
npm test
```

---

## 📝 Customizing Your Data & Replacing Placeholders

All personal and project information is stored in clean TypeScript/JSON files so you can customize everything without editing component code:

### 1. Profile Information (`data/profile.ts`)
Edit `data/profile.ts` to replace placeholder details:
- **`personal`**: Name, role, tagline, location, email, GitHub URL, LinkedIn URL, LeetCode URL, short bio.
- **`stats`**: Years of experience, completed projects count.
- **`experiences`**: Companies, roles, employment dates, quantifiable bullet achievements, technologies.
- **`education`**: Universities, degrees, honors, graduation years.
- **`certifications`**: Title, issuer, date, credential verification links.
- **`skillCategories`**: Skill groups, proficiency percentages.

### 2. Project Overrides (`data/projects.override.json`)
Configure your featured repositories and custom metadata:
- **`pinnedSlugs`**: Order of slugs to display first.
- **`hiddenSlugs`**: Repositories you want to hide from the archive.
- **`overrides`**: Per-repository custom descriptions, live demo URLs (`liveDemo`), architecture tags, or featured badges.

### 3. Syncing Live GitHub & LeetCode Data (`scripts/fetch-data.mjs`)
Run the data sync script locally or let GitHub Actions run it automatically:
```bash
# Set your handles (optional, defaults to profile settings)
export GITHUB_USERNAME="your-github-username"
export LEETCODE_USERNAME="your-leetcode-username"
export GITHUB_TOKEN="ghp_your_optional_token"

# Sync data
npm run sync-data
```
The script updates `data/github.json` and `data/leetcode.json`. If network requests fail or rate limits are reached, the build automatically falls back to the committed snapshot so builds **never fail**.

### 4. Custom 3D Avatar (`public/models/avatar.glb`)
To use your own 3D avatar (e.g. from Ready Player Me or Blender):
1. Place your Draco-compressed model at `public/models/avatar.glb`.
2. The 3D hero scene is ready to receive your GLB model; until provided, it renders the interactive procedural retro computer workstation.

### 5. Resume PDF (`public/resume.pdf`)
Replace `public/resume.pdf` with your actual exported resume document. The `/resume` page download button points directly to this file.

---

## 🚢 Deploying to GitHub Pages

### Option A: Root Domain (`username.github.io`)
1. Create a repository named `username.github.io`.
2. Push this codebase to the `main` branch.
3. In GitHub repo settings: **Settings** > **Pages** > **Build and deployment** > **Source**: Select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build, export static HTML with `.nojekyll`, and deploy your portfolio.

### Option B: Project Subdirectory (`username.github.io/portfolio`)
1. In repository **Settings** > **Secrets and variables** > **Actions** > **Variables**:
   - Add variable `PORTFOLIO_GITHUB_USER` = your GitHub username.
   - Add variable `PORTFOLIO_LEETCODE_USER` = your LeetCode username.
2. In `next.config.ts`, `basePath` automatically detects `NEXT_PUBLIC_BASE_PATH` passed by the GitHub Pages deployment action!

---

## 🔍 SEO & Search Engine Submission

### 1. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property (e.g. `https://your-username.github.io`).
3. Verify ownership via HTML file, DNS, or meta tag.
4. Navigate to **Sitemaps** and submit `https://your-username.github.io/sitemap.xml`.

### 2. Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Import directly from Google Search Console or add your URL.
3. Submit `https://your-username.github.io/sitemap.xml`.

### 3. SEO Checklist Included in this Project
- [x] Canonical URL configured via `metadataBase`
- [x] Structured JSON-LD `Person` & `WebSite` schema
- [x] Dynamic Open Graph & Twitter Card metadata
- [x] Single semantic `<h1>` per page with proper heading hierarchy
- [x] `sitemap.xml` and `robots.txt` generated during static build
- [x] Web App Manifest (`manifest.json`) & `humans.txt`
- [x] Fast Core Web Vitals (zero server latency, static HTML)
