# FinPilot AI — Complete Project Documentation

> **IBM Watson Orchestrate Internship Project**
> AI-powered Financial Wellness Coach built with React, Vite, Tailwind CSS, and IBM watsonx Orchestrate.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Architecture](#6-architecture)
7. [Design System](#7-design-system)
8. [Page Sections](#8-page-sections)
9. [Financial Calculation Engine](#9-financial-calculation-engine)
10. [IBM watsonx Orchestrate Integration](#10-ibm-watsonx-orchestrate-integration)
11. [State Management](#11-state-management)
12. [Routing](#12-routing)
13. [Component Library](#13-component-library)
14. [Build & Deployment](#14-build--deployment)
15. [How It Was Built — Step by Step](#15-how-it-was-built--step-by-step)

---

## 1. Project Overview

**FinPilot AI** is a production-quality fintech SaaS web application. It is not a chatbot website. The IBM watsonx Orchestrate agent is the primary AI experience, embedded directly into the application after the user completes a structured financial assessment.

### What it does

1. The user fills in a financial assessment form (income, expenses, savings, debt, goal).
2. A client-side calculation engine computes a Financial Health Score (0–100), monthly surplus, savings rate, emergency fund coverage, and debt-to-income ratio.
3. Personalised recommendations are generated based on the exact numbers entered.
4. The Dashboard and Hero sections update in real time with the user's live data.
5. The IBM watsonx Orchestrate agent is always visible in the AI Chat section so the user can ask follow-up questions, with their financial summary displayed above the agent for context.

### Design inspiration

Stripe · Mercury · Ramp · Linear · IBM — premium dark glassmorphism fintech aesthetic.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS | 3 |
| Animation | Framer Motion | 12 |
| Icons | Lucide React | 1.24 |
| Routing | React Router DOM | 7 |
| Class utility | clsx + tailwind-merge | latest |
| AI Agent | IBM watsonx Orchestrate | — |
| Linter | oxlint | 1.71 |

**No** Bootstrap, Material UI, Chakra UI, jQuery, TanStack Router, or React Query.

---

## 3. Folder Structure

```
finai/
├── public/                       # Static assets served at root
├── src/
│   ├── assets/                   # Images, SVGs, brand assets
│   │
│   ├── components/
│   │   ├── ui/                   # Reusable primitive components
│   │   │   ├── Badge.jsx         # Status/label indicator (5 variants)
│   │   │   ├── Button.jsx        # Core button (4 variants, 3 sizes)
│   │   │   ├── Card.jsx          # Glass/solid/bordered surface + CardHeader/CardTitle
│   │   │   ├── Section.jsx       # Section, Container, SectionLabel layout primitives
│   │   │   └── StatCard.jsx      # Metric tile with icon, value, trend badge
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Sticky scroll-reactive navbar + mobile drawer
│   │   │   └── Footer.jsx        # 4-column footer with IBM Watson credit
│   │   │
│   │   └── watson/
│   │       └── WatsonChat.jsx    # IBM watsonx Orchestrate embed mount point
│   │
│   ├── context/
│   │   └── FinancialContext.jsx  # Global React context for assessment results
│   │
│   ├── sections/                 # One folder per page section
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   ├── Features/
│   │   │   └── Features.jsx
│   │   ├── HowItWorks/
│   │   │   └── HowItWorks.jsx
│   │   ├── FinancialAssessment/
│   │   │   └── FinancialAssessment.jsx
│   │   ├── DashboardPreview/
│   │   │   └── DashboardPreview.jsx
│   │   ├── AIChat/
│   │   │   └── AIChat.jsx
│   │   └── Footer/               # (placeholder, Footer lives in layout/)
│   │
│   ├── hooks/
│   │   └── useWatson.js          # Watson readiness polling hook
│   │
│   ├── lib/
│   │   ├── finance.js            # Pure financial calculation engine
│   │   └── utils.js              # cn(), formatCurrency(), formatPercent(), truncate()
│   │
│   ├── config/
│   │   └── app.config.js         # App constants, Watson config, feature flags
│   │
│   ├── pages/
│   │   └── LandingPage.jsx       # Assembles all sections in order
│   │
│   ├── routes/
│   │   └── index.jsx             # React Router createBrowserRouter config
│   │
│   ├── styles/
│   │   └── globals.css           # Tailwind directives + global resets + component classes
│   │
│   ├── App.jsx                   # Root — FinancialProvider + RouterProvider
│   └── main.jsx                  # React DOM entry point
│
├── .env.example                  # Documented environment variable template
├── tailwind.config.js            # Full design system token configuration
├── vite.config.js                # Vite config with @ alias and manual chunks
├── postcss.config.js             # PostCSS pipeline (Tailwind + Autoprefixer)
└── package.json
```

---

## 4. Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Himanshu-kroy/FinPilot-AI.git
cd FinPilot-AI

# 2. Install dependencies
npm install

# 3. Start the development server (opens at http://localhost:5173)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Compile production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint static analysis |

---

## 5. Environment Variables

Copy `.env.example` to `.env` and fill in the values if you need per-environment configuration. The live IBM watsonx Orchestrate credentials are currently embedded directly in [`src/components/watson/WatsonChat.jsx`](src/components/watson/WatsonChat.jsx) for simplicity.

```bash
# .env.example

# IBM watsonx Orchestrate Embedded Agent
VITE_WXO_ORCHESTRATION_ID=3f406d595f364fb4bf136b9fc22eab21_fc9579c7-a0d2-46f3-a567-0e2b611b2aee
VITE_WXO_HOST_URL=https://us-south.watson-orchestrate.cloud.ibm.com
VITE_WXO_CRN=crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/...
VITE_WXO_AGENT_ID=92949718-3821-47c4-81bf-8e96c2627bdd
VITE_WXO_AGENT_ENVIRONMENT_ID=45391817-527a-4933-86f2-acfde95f9711

# Application
VITE_APP_URL=https://finpilot.ai
```

All `VITE_` prefixed variables are injected at build time via `import.meta.env` and are safe to include in client-side code.

---

## 6. Architecture

### Data flow

```
User fills Assessment Form
        │
        ▼
validateAssessmentForm()          ← lib/finance.js
        │  (errors → inline field messages)
        ▼
analyzeFinances()                 ← lib/finance.js
        │
        ├── score (0–100)
        ├── surplus / savingsRate / emergencyMonths / debtToIncome
        ├── fmt (pre-formatted display strings)
        ├── recommendations[] (3–5 data-driven strings)
        └── aiSummary (natural language for Watson)
        │
        ▼
setResults(analysis)              ← FinancialContext
        │
        ├── Hero section         → updates score ring + stat cards
        ├── DashboardPreview     → replaces empty state with LiveDashboard
        └── AIChat section       → shows FinancialSummaryCard above Watson embed
```

### Component ownership of shared state

```
App.jsx
└─ FinancialProvider  (owns: results, setResults)
   └─ RouterProvider
      └─ LandingPage
         ├─ Hero               reads  results
         ├─ FinancialAssessment writes results (via setResults)
         ├─ DashboardPreview   reads  results
         └─ AIChat             reads  results
```

---

## 7. Design System

Configured in [`tailwind.config.js`](tailwind.config.js). All tokens are available as Tailwind utility classes.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#09090B` | Page background |
| `bg-secondary` | `#111111` | Alternate section background |
| `bg-card` | `rgba(255,255,255,0.06)` | Glass card surface |
| `border-subtle` | `rgba(255,255,255,0.10)` | Default border |
| `border-strong` | `rgba(255,255,255,0.20)` | Hover/active border |
| `text-primary` | `#FFFFFF` | Headings, values |
| `text-secondary` | `#B3B3B3` | Body text, labels |
| `text-muted` | `#6B7280` | Placeholder, metadata |
| `ibm-blue` | `#0F62FE` | Primary accent, CTAs |
| `ibm-blue-dark` | `#0043CE` | Button hover state |
| `ibm-blue-light` | `#4589FF` | Icons, highlights |
| `success` | `#24A148` | Positive indicators |
| `danger` | `#DA1E28` | Errors, negative |
| `warning` | `#F1C21B` | Caution states |

### Typography

Primary font: **IBM Plex Sans** (loaded from Google Fonts)
Monospace font: **IBM Plex Mono**
Fallback chain: `Inter → ui-sans-serif → system-ui → sans-serif`

### Shadows

| Class | Value |
|---|---|
| `shadow-glass` | `0 4px 24px rgba(0,0,0,0.40)` |
| `shadow-glass-lg` | `0 8px 48px rgba(0,0,0,0.60)` |
| `shadow-ibm-glow` | `0 0 40px rgba(15,98,254,0.20)` |
| `shadow-ibm-glow-sm` | `0 0 16px rgba(15,98,254,0.15)` |

### Reusable CSS component classes (defined in `globals.css`)

| Class | Description |
|---|---|
| `.glass-card` | `bg-bg-card border border-border-subtle backdrop-blur-sm rounded-2xl` |
| `.btn-primary` | IBM Blue filled button |
| `.btn-ghost` | Transparent bordered button |
| `.section-container` | `mx-auto max-w-7xl px-6 lg:px-8` |
| `.section-padding` | `py-20 lg:py-28` |
| `.gradient-divider` | Horizontal fade-out separator line |

---

## 8. Page Sections

The single-page application renders sections in this order inside [`LandingPage.jsx`](src/pages/LandingPage.jsx):

### 8.1 Navbar — `src/components/layout/Navbar.jsx`

- Fixed at top with `z-50`
- Transparent when at page top; gains `backdrop-blur` + border on scroll
- Desktop: horizontal nav links + "Analyze My Finances" CTA button
- Mobile: hamburger → animated slide-down drawer (body scroll locked while open)
- All links use `scrollIntoView({ behavior: "smooth" })` — no page reload
- GitHub link: [https://github.com/Himanshu-kroy/FinPilot-AI](https://github.com/Himanshu-kroy/FinPilot-AI)

### 8.2 Hero — `src/sections/Hero/Hero.jsx`

- Full-viewport height section with ambient IBM Blue glow blobs
- Left: staggered `fadeUp` animation for headline, subtitle, and CTA buttons
- Right: glass dashboard illustration showing a score ring (SVG animated arc) and 4 stat cards
- **Before assessment**: stat cards show `—` pending state; score ring is empty
- **After assessment**: all values update live from `FinancialContext` — score ring animates to real score, stat cards show real surplus/savings rate/emergency fund/debt
- Mini Watson AI insight bar at the bottom of the illustration updates with the first recommendation

### 8.3 Features — `src/sections/Features/Features.jsx`

Three feature cards with `whileInView` stagger animation and hover lift:
1. **Financial Health Analysis** — comprehensive scoring across 4 pillars
2. **Budget & Savings Planning** — goal-based planning and milestone tracking
3. **Powered by IBM watsonx Orchestrate** — enterprise AI coaching

### 8.4 How It Works — `src/sections/HowItWorks/HowItWorks.jsx`

Three-step vertical timeline with animated left-side connector line:
- Step 01: Enter financial details
- Step 02: FinPilot AI analyzes your financial health
- Step 03: Continue with IBM watsonx Orchestrate

### 8.5 Financial Assessment — `src/sections/FinancialAssessment/FinancialAssessment.jsx`

The core functional section. Full form behavior:

**Inputs:**
- Monthly Income (`$`)
- Monthly Expenses (`$`)
- Current Savings (`$`)
- Current Debt (`$`)
- Financial Goal (dropdown — 6 options)

**Form states:**
- `submitting` — 900ms analysis animation with spinner
- `hasAnalyzed` — button changes to "Analyze Again" with `RefreshCw` icon
- `isDirty` — "Unsaved Changes" amber pill appears when form differs from last committed values
- "Clear Form" ghost button appears after first analysis; resets everything including global context

**On submit:**
1. `validateAssessmentForm()` runs — inline field-level errors appear
2. 900ms timeout simulates AI processing
3. `analyzeFinances()` runs — full analysis object computed
4. `setResults(analysis)` — pushes to global context, updating Hero + Dashboard + AIChat
5. `ResultCard` animates in below the form with score ring, 4 metrics, and recommendations
6. Auto-scroll to `#ai-chat` after 1.8s (first analysis only)

### 8.6 Dashboard Preview — `src/sections/DashboardPreview/DashboardPreview.jsx`

**Before assessment:** `EmptyState` component with a "Start Assessment" CTA button.

**After assessment:** `LiveDashboard` renders with:
- Animated SVG score ring (re-animates on each new analysis via `viewport={{ once: false }}`)
- 6 metric cards: Monthly Income, Monthly Expenses, Monthly Surplus, Savings Rate, Emergency Fund, Debt Balance
- Each metric's subtext and color coding (`text-warning` vs `text-text-muted`) is driven by thresholds
- Recommendations panel with `AI Generated` badge

### 8.7 AI Chat — `src/sections/AIChat/AIChat.jsx`

The centrepiece AI experience section:

1. **Hero header** — "🤖 FinPilot AI Assistant" with subtitle and description
2. **Quick Action Cards** — 4 cards (Budget Planning, Save More Money, Debt Management, Financial Goals) with hover lift + click tooltip: *"Start a conversation with FinPilot AI about this topic."*
3. **Glass container** (`max-w-[1100px]`, `rounded-3xl`, `shadow-ibm-glow`) containing:
   - Chrome bar with bot icon and status indicator
   - **Disclaimer banner** — educational guidance notice
   - **Suggested topic chips** — 5 read-only visual hints
   - **Assessment nudge** (if no results) — non-blocking `Info` bar
   - **FinancialSummaryCard** (if results exist) — score, surplus, savings rate, emergency fund, goal
   - **`<WatsonChat />`** — IBM watsonx Orchestrate widget, always rendered

### 8.8 Footer — `src/components/layout/Footer.jsx`

4-column layout: Brand column + Product links + Company links + Technology links
- IBM Watson Orchestrate and IBM Cloud external links
- GitHub repository link
- Copyright with dynamic year

---

## 9. Financial Calculation Engine

All logic lives in [`src/lib/finance.js`](src/lib/finance.js) — pure functions, zero React, zero side effects.

### `analyzeFinances(input)` — main entry point

Takes 5 raw inputs, returns a complete `FinancialAnalysis` object.

**Score formula (weighted, 0–100):**

| Pillar | Max Points | Target | Formula |
|---|---|---|---|
| Savings Rate | 30 | ≥ 20% | `min(30, (savingsRate / 0.20) × 30)` |
| Emergency Fund | 30 | ≥ 6 months | `min(30, (emergencyMonths / 6) × 30)` |
| Debt Ratio (DTI) | 25 | ≤ 36% monthly | `min(25, max(0, (1 − dti/0.36) × 25))` |
| Expense Ratio | 15 | ≤ 70% of income | `min(15, max(0, (1 − (ratio−0.70)/0.30) × 15))` |

**Score labels:**

| Range | Label |
|---|---|
| 85–100 | Excellent |
| 70–84 | Good |
| 50–69 | Fair |
| 30–49 | Needs Work |
| 0–29 | At Risk |

### `validateAssessmentForm(form)` — form validation

Returns `{}` if valid, or `{ fieldName: "error message" }` for each invalid field.

Rules:
- `monthlyIncome` — required, must be > 0
- `monthlyExpenses` — required, must be ≥ 0
- `currentSavings` — required, must be ≥ 0 (enter 0 if none)
- `currentDebt` — required, must be ≥ 0 (enter 0 if none)
- `financialGoal` — required, must select one option

### `generateRecommendations(...)` — internal

Produces 3–5 data-driven, specific recommendation strings. Each recommendation uses real computed values (e.g., exact dollar amounts, months to goal). Topics:
- Emergency fund gap/progress
- Savings rate shortfall or commendation
- Debt management (avalanche method, DTI warning)
- Goal-specific advice (home purchase, retirement, FIRE number)

### `buildAISummary(...)` — internal

Constructs a natural-language paragraph suitable for passing as context to the IBM watsonx Orchestrate agent. Used to pre-populate the `aiSummary` field on the results object.

---

## 10. IBM watsonx Orchestrate Integration

### How the embed works

IBM watsonx Orchestrate uses a different embed format than classic Watson Assistant Web Chat. It uses a proprietary `wxoLoader.js` script and requires a real DOM node to exist before initialization.

**Embed flow:**
1. `window.wxOConfiguration` is set with live credentials before the script loads
2. `wxoLoader.js` is appended to `<head>` via a dynamically created `<script>` tag
3. On script `load` event, `wxoLoader.init()` is called
4. The agent SDK injects its full UI into the element with `id="wxo-chat"`

### `WatsonChat.jsx` — `src/components/watson/WatsonChat.jsx`

The only component that touches the IBM embed. Renders a `<div id="wxo-chat">` as the SDK mount point and manages the one-time script injection lifecycle.

**Guard logic:**
- `window.__wxo_loaded__` flag prevents duplicate injection across React StrictMode double-invocations, HMR reloads, and route transitions
- On script `error`, the flag is reset to `false` to allow retry on next mount
- No cleanup on unmount — removing the script would destroy the running agent session

**Live credentials (embedded in WatsonChat.jsx):**

| Key | Value |
|---|---|
| `orchestrationID` | `3f406d595f364fb4bf136b9fc22eab21_fc9579c7-...` |
| `hostURL` | `https://us-south.watson-orchestrate.cloud.ibm.com` |
| `rootElementID` | `wxo-chat` |
| `deploymentPlatform` | `ibmcloud` |
| `agentId` | `92949718-3821-47c4-81bf-8e96c2627bdd` |
| `agentEnvironmentId` | `45391817-527a-4933-86f2-acfde95f9711` |

### `useWatson.js` — `src/hooks/useWatson.js`

A readiness polling hook available to any component that needs to know when the wxO SDK has fully initialized. Polls `window.wxoLoader` every 300ms and sets `isReady = true` once detected. Does not manage script injection (that is `WatsonChat.jsx`'s responsibility).

---

## 11. State Management

FinPilot AI uses React's built-in Context API — no external state library needed.

### `FinancialContext` — `src/context/FinancialContext.jsx`

```js
// Shape
{
  results: FinancialAnalysis | null,
  setResults: (analysis) => void
}
```

**`results` is `null` until the user submits the assessment form.**

Provided at the root in `App.jsx`, wrapping `RouterProvider` so every section in the tree can read and write results.

| Component | Access | Operation |
|---|---|---|
| `FinancialAssessment` | `setResults` | Writes after successful analysis |
| `Hero` | `results` | Reads to update score ring and stat cards |
| `DashboardPreview` | `results` | Reads to switch between EmptyState and LiveDashboard |
| `AIChat` | `results` | Reads to show FinancialSummaryCard and set status indicator |

---

## 12. Routing

Configured in [`src/routes/index.jsx`](src/routes/index.jsx) using `createBrowserRouter` from React Router v7.

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | Main one-page application |
| `*` | `LandingPage` | Catch-all — no 404 page yet |

Section navigation (Features, How It Works, Assessment, AI Chat) uses smooth-scroll via `scrollIntoView({ behavior: "smooth" })` targeting `id` anchors, not route changes.

**Future routes (planned):**
- `/dashboard` — dedicated financial dashboard
- `/assessment` — standalone assessment page
- `/pricing` — pricing page
- `/docs` — documentation

---

## 13. Component Library

### `Button` — `src/components/ui/Button.jsx`

```jsx
<Button variant="primary" size="md" disabled={false}>
  Label
</Button>
```

| Prop | Options | Default |
|---|---|---|
| `variant` | `primary` `ghost` `outline` `danger` | `primary` |
| `size` | `sm` `md` `lg` | `md` |
| `disabled` | boolean | `false` |
| `type` | `button` `submit` | `button` |

- `primary` — IBM Blue fill, `shadow-ibm-glow-sm` on hover, slight scale press on `active`
- `ghost` — transparent with `border-border-subtle`, text becomes white on hover
- `outline` — IBM Blue border, fills on hover
- `danger` — Red fill

### `Badge` — `src/components/ui/Badge.jsx`

```jsx
<Badge variant="success">Good Standing</Badge>
```

Variants: `default` `success` `danger` `warning` `blue`
Each uses a tinted background + matching border at low opacity.

### `Card` — `src/components/ui/Card.jsx`

```jsx
<Card variant="glass">
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  Content
</Card>
```

Variants: `glass` `solid` `bordered`

### `Section` + `Container` + `SectionLabel` — `src/components/ui/Section.jsx`

```jsx
<Section id="features">
  <Container>
    <SectionLabel>Features</SectionLabel>
    ...
  </Container>
</Section>
```

- `Section` — `py-20 lg:py-28` semantic `<section>` wrapper
- `Container` — `mx-auto max-w-7xl px-6 lg:px-8`
- `SectionLabel` — Small blue eyebrow label above headings

### `StatCard` — `src/components/ui/StatCard.jsx`

```jsx
<StatCard
  label="Savings Rate"
  value="23%"
  change="+3.1%"
  changeType="positive"
  icon={TrendingUp}
/>
```

Used in the Hero dashboard illustration and other metric displays.

---

## 14. Build & Deployment

### Production build

```bash
npm run build
# Output: dist/ directory
```

### Bundle chunks

The Vite config splits the bundle into named chunks for optimal browser caching:

| Chunk | Contents |
|---|---|
| `react` | `react` + `react-dom` |
| `router` | `react-router-dom` |
| `motion` | `framer-motion` |
| `icons` | `lucide-react` |
| `index` | Application code |

### Typical build output sizes

```
dist/assets/react-*.js      ~275 KB  (gzip: ~88 KB)
dist/assets/motion-*.js     ~125 KB  (gzip: ~41 KB)
dist/assets/index-*.js      ~85  KB  (gzip: ~23 KB)
dist/assets/icons-*.js      ~15  KB  (gzip: ~6  KB)
dist/assets/index-*.css     ~24  KB  (gzip: ~5  KB)
```

### Deployment targets

The app is a static SPA — it can be deployed to:
- **Vercel** — zero config, auto-detects Vite
- **Netlify** — set build command `npm run build`, publish dir `dist`
- **IBM Cloud Static Web Apps**
- **GitHub Pages** — requires `base` path in `vite.config.js` if not at root

**Important:** Because the app uses `createBrowserRouter` (HTML5 history API), the host must redirect all requests to `index.html`. On Netlify, add a `_redirects` file:
```
/*  /index.html  200
```

---

## 15. How It Was Built — Step by Step

This section documents the exact sequence of decisions and implementations made during the project.

---

### Phase 1 — Project Initialization

**Goal:** Production-ready scaffold with zero placeholder code.

1. Created a fresh Vite + React project in the workspace root using `npm create vite@latest . -- --template react`.
2. Installed production dependencies: `react-router-dom`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
3. Installed dev dependencies: `tailwindcss@3`, `postcss`, `autoprefixer`.
4. Ran `npx tailwindcss init -p` to generate `tailwind.config.js` and `postcss.config.js`.
5. Built the complete **design system** in `tailwind.config.js` before writing a single component:
   - Color tokens for backgrounds, text, borders, IBM Blue, semantic states
   - Custom `IBM Plex Sans` + `IBM Plex Mono` font families
   - Glass shadow, IBM glow shadow, and backdrop-blur utilities
   - `fade-in`, `fade-in-up`, `pulse-glow` keyframe animations
6. Created the full folder structure (`components/ui`, `components/layout`, `components/watson`, `sections/*`, `hooks`, `lib`, `config`, `pages`, `routes`, `styles`, `context`).
7. Configured `vite.config.js` with:
   - `@` alias pointing to `src/`
   - `manualChunks` function (Rolldown-compatible — object syntax is rejected in Vite 8)
   - `port: 5173`, `open: true`
8. Wrote `globals.css` with `@import` for Google Fonts *above* `@tailwind` directives (PostCSS requires this order), global resets, scrollbar styling, and selection color.
9. Created `App.jsx` (thin root), `routes/index.jsx`, and `pages/ComingSoon.jsx` placeholder. Verified build passes before writing any UI.

---

### Phase 2 — UI Component Library

Built bottom-up: primitives first, then layout, then sections.

**UI Primitives (`src/components/ui/`):**
- `Button.jsx` — `forwardRef` wrapper, 4 variants via a variants map, Tailwind `focus-visible` ring for accessibility
- `Badge.jsx` — 5 color variants using low-opacity tinted backgrounds matching the design system
- `Card.jsx` — glass/solid/bordered variants; `CardHeader` and `CardTitle` sub-components for structured content
- `Section.jsx` — three exports (`Section`, `Container`, `SectionLabel`) to enforce consistent spacing across all sections
- `StatCard.jsx` — reusable metric tile used in Hero illustration and elsewhere

**Layout (`src/components/layout/`):**
- `Navbar.jsx` — scroll listener elevates navbar on `window.scrollY > 16`; `AnimatePresence` drives mobile drawer; all nav links call `scrollIntoView` with `behavior: "smooth"` instead of navigating
- `Footer.jsx` — link columns generated from a data array; dynamic `new Date().getFullYear()` copyright

**Watson placeholder (`src/components/watson/`):**
- `WatsonChat.jsx` — initially `return null` with detailed documentation comments marking the IBM embed slot

---

### Phase 3 — Section by Section

Each section was built as a self-contained module before being assembled in `LandingPage.jsx`.

**Hero:** Two-column grid. Left column uses Framer Motion `stagger` + `fadeUp` variants for headline, subtitle, and CTAs. Right column is a glass-framed "dashboard illustration" built from the `StatCard` and a custom SVG animated circle (score ring). Animated with `strokeDashoffset` driven by `motion.circle`.

**Features:** Three-card grid with `whileInView` + `staggerChildren`. Each card has a `whileHover={{ y: -4 }}` lift and a `radial-gradient` hover glow using `group-hover:opacity-100`.

**HowItWorks:** Vertical timeline with a `bg-gradient-to-b` left connector line. Each step animates in with `initial={{ opacity: 0, x: -24 }}` staggered by `index * 0.12`.

**FinancialAssessment:** Initial build was a static form shell with a placeholder `handleSubmit`. The actual calculation logic was added in Phase 4.

**DashboardPreview:** Initial build used hardcoded placeholder data. Replaced entirely in Phase 4.

**AIChat:** Initial build showed a decorative fake conversation. Replaced entirely in Phase 4 and Phase 5.

---

### Phase 4 — IBM watsonx Orchestrate Integration

The user provided the live embed script. Key insight: this is **IBM watsonx Orchestrate** (wxO), not the older Watson Assistant Web Chat — different global object (`window.wxOConfiguration` not `window.watsonAssistantChatOptions`), different loader URL (`wxoLoader.js`), and critically, requires a real DOM node with `id="wxo-chat"` to exist before `wxoLoader.init()` is called.

Implementation decisions:
- `WatsonChat.jsx` must render a real `<div id="wxo-chat">` — changed from `return null`
- `useEffect` with empty deps runs script injection exactly once after the DOM node mounts
- `window.__wxo_loaded__` guards against React StrictMode's deliberate double-invocation
- Script `error` handler resets the flag to allow retry without refresh
- No cleanup function — removing the script tag would destroy the running agent session
- `App.jsx` was simplified: the Watson component moved from the root level into `AIChat.jsx` so it only mounts when the section is in view

---

### Phase 5 — Functional Implementation

Transformed the static UI into a fully functional application.

**Financial Calculation Engine (`lib/finance.js`):**
- Designed as pure functions with zero React imports — testable in isolation
- Score uses a weighted 4-pillar formula (savings rate 30pts, emergency fund 30pts, debt ratio 25pts, expense ratio 15pts)
- `generateRecommendations()` branches on actual computed values to produce dollar-specific, timeline-specific advice
- `buildAISummary()` formats a natural-language paragraph ready to be pasted or injected into the Watson agent conversation

**Global State (`context/FinancialContext.jsx`):**
- Simple `createContext` + `useState` — no Zustand, Redux, or Jotai needed
- `FinancialProvider` wraps `RouterProvider` in `App.jsx` so every route has access
- `useFinancial()` hook throws a descriptive error if called outside the provider tree

**Assessment form logic:**
- `validateAssessmentForm()` called before `analyzeFinances()` — errors surfaced per field with `role="alert"` for screen readers
- 900ms `setTimeout` creates a perceptible "analyzing" state with a spinner — feels like real computation
- `setResults()` pushes the analysis to context — Hero, Dashboard, and AIChat all re-render immediately
- Auto-scroll to `#ai-chat` fires 1.8s after first analysis (not on re-analysis)

**Dashboard:** `DashboardPreview` switched from hardcoded data to reading `useFinancial()`. Added `EmptyState` component with a CTA when no data exists. `viewport={{ once: false }}` on the score ring SVG allows re-animation on each new analysis.

---

### Phase 6 — Assessment UX Improvements

User requirement: form must stay editable after analysis for scenario testing.

- Removed `submitted` from all `disabled` props — only `submitting` (the 900ms window) disables
- Added `committedForm` state — snapshot of form at moment of last `setResults()` call
- `isDirty = hasAnalyzed && !formsEqual(form, committedForm)` — shallow key comparison
- "Unsaved Changes" amber pill uses `AnimatePresence` with `y: -6 → 0` enter/exit
- "Clear Form" ghost button renders only after `hasAnalyzed`; resets form, errors, localResult, committedForm, and global context to null
- Button label changes: first run "Analyze My Finances" → subsequent runs "Analyze Again" with rotating `RefreshCw` icon on hover
- `ResultCard` receives `isReanalysis` prop: first run shows "Assessment Complete / Scrolling to your AI advisor..." and re-runs show "Analysis Updated / Dashboard and AI advisor have been refreshed..."
- `AnimatePresence mode="wait"` on ResultCard ensures the old card exits before the new one enters
- Recommendation list keys changed from array index to the recommendation string itself — ensures correct React reconciliation when recommendations change between analyses

---

### Phase 7 — GitHub Links

Replaced all `https://github.com` occurrences with `https://github.com/Himanshu-kroy/FinPilot-AI`. Verified with `grep` that no old URL remained. All three links already had `target="_blank"` and `rel="noopener noreferrer"`.

---

### Phase 8 — AI Chat Section Redesign

**Problem:** Watson was gated behind assessment completion; section felt like a support widget.

**Solution:** Rebuilt `AIChat.jsx` to make Watson the primary feature:

1. **Hero header** — promoted the section with a large `lg:text-5xl` heading, subtitle, and description paragraph
2. **Quick Action Cards** — 4-card `staggerChildren` grid (Budget Planning, Save More Money, Debt Management, Financial Goals). Click triggers an `AnimatePresence` tooltip for 2.8s without sending any messages. Keyboard accessible via `Enter` key (`onKeyDown`).
3. **Glass container** expanded from `max-w-3xl` to `max-w-[1100px]`, gained `shadow-ibm-glow`, `rounded-3xl`, padded inner content area
4. **Disclaimer banner** — `🛡️` icon + educational guidance notice
5. **Suggested chips** — 5 visual-only read-only topic pills in a `flex-wrap` row
6. **Watson always visible** — removed the conditional that hid it; `!results` shows a non-blocking `Info` nudge *above* the embed instead of replacing it

**Container height fix:** Removed `min-h-[600px] lg:min-h-[700px]` wrapper that was forcing empty vertical space. Replaced with `w-full` — the wxO SDK controls its own rendered height.

---

### Key Technical Decisions

| Decision | Reason |
|---|---|
| Tailwind CSS v3 (not v4) | v4 has a different config model; v3 is production-proven and stable for this stack |
| `manualChunks` as function not object | Vite 8 uses Rolldown which only accepts the function form |
| `@import` before `@tailwind` in CSS | PostCSS requirement — `@import` must precede all other statements |
| `lucide-react` has no `Github` icon | The package removed it; replaced with `GitBranch` then changed to `GitBranch` visual for navigation |
| Watson credentials in component not `.env` | Simpler for a demo/internship context; `.env.example` documents how to externalise them |
| `window.__wxo_loaded__` flag on `window` not module scope | Survives Vite HMR module replacement and React StrictMode double-invoke |
| `viewport={{ once: false }}` on dashboard score ring | Allows re-animation when the user runs a new analysis and scrolls back |
| `AnimatePresence mode="wait"` on ResultCard | Prevents old and new result cards from overlapping during the exit/enter transition |
| Form validation before analysis, not inside finance.js | Keeps the calculation engine pure; validation is a UI concern |

---

*Documentation generated for FinPilot AI — IBM Watson Orchestrate Internship Project*
*GitHub: https://github.com/Himanshu-kroy/FinPilot-AI*
