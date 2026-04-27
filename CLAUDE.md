# Taxman — Interactive Prototype

## What this is

A single-file HTML prototype of **The Open Course in Irish Taxation** — a free, self-paced 12-week course built entirely on official Irish public sources (Revenue.ie, Citizens Information, the Irish Statute Book). No build step, no npm, no backend.

## File layout

| File | Role |
|------|------|
| `Irish Taxation Course.html` | Entry point. Loads React 18 (UMD) + Babel Standalone, mounts `<App />`. Inline `<script type="text/babel">` at the bottom bootstraps the app. |
| `data.jsx` | Static data only: `WEEKS[]`, `TAG_PILL{}`, `FAQ[]`. No logic. Exports to `window.*`. |
| `app-shell.jsx` | Router (`useRoute`), progress state (`useProgress` → `localStorage`), `Nav`, `MobileMenu`, `HomePage` and all home-page sections. Exports to `window.*`. |
| `app-pages.jsx` | `CalculatorPage` (live 2026 tax calc), `CurriculumPage`, `WeekPage`, `AboutPage`. |
| `module-page.jsx` | Static design canvas for a single week module — used as a reference/mock, not wired into the router yet. |
| `desktop-home.jsx` | Static design canvas for the desktop home — reference only. |
| `mobile-home.jsx` | Static design canvas for the mobile home — reference only. |
| `design-canvas.jsx` | Early exploration canvas — not active. |
| `styles.css` | Design tokens (oklch colour palette, typography scale) and utility classes. |
| `uploads/deep-research-report.md` | Source research report: full 12-week syllabus, worked computations, quiz Q&A, primary source links. **The canonical reference for all content.** |

## Running it

Open `Irish Taxation Course.html` directly in a browser. No server needed — all assets are local or CDN.

## Architecture

- **No bundler.** Babel Standalone transpiles JSX in the browser at runtime. This is intentional for the prototype stage.
- **Hash-based router.** Routes: `''` (home), `curriculum`, `calculator`, `about`, `week/NN` (01–12).
- **Mobile breakpoint.** `isMobile = window.innerWidth < 760`. Passed as a prop through the tree; no CSS media queries in JS.
- **Progress persistence.** `localStorage` key `itx-completed` — an array of week numbers (e.g. `["01","03"]`). `useProgress()` in `app-shell.jsx`.

## Design tokens (styles.css)

All colours use oklch. Key variables:
- `--paper / --paper-2 / --paper-3` — background layers
- `--ink / --ink-2 / --ink-3` — text hierarchy
- `--moss / --moss-deep / --moss-soft` — brand green (progress, CTAs)
- `--rule / --rule-soft` — dividers

Typography: `--serif` (Newsreader), `--sans` (IBM Plex Sans), `--mono` (IBM Plex Mono).

## Content authority

The research report at `uploads/deep-research-report.md` is the ground truth for:
- Week-by-week objectives, readings, exercises, quiz Q&A
- All worked computations (IT, USC, PRSI, VAT3, CGT, CT, CAT)
- 2026 tax rates and thresholds (bands, credits, USC table, PRSI, CAT thresholds)
- Primary source URLs (Revenue.ie, Citizens Information, Irish Statute Book)

When adding or changing week content, verify figures against this report.

## Current state of the prototype

- Home page: fully interactive (hero, marquee, method, curriculum preview, calculator teaser, stats, FAQ, CTA, footer).
- Curriculum page: week list with progress dots.
- Calculator page: live Income Tax + USC + PRSI slider (single PAYE, 2026 rates).
- Week pages (`WeekPage`): wired in router but content is still sparse — each week needs reading list, quiz, and spreadsheet sections populated from the research report.
- `module-page.jsx`: the design target for a fully built week page — use it as the visual/layout spec.

## What to build next

1. **WeekPage content** — populate each of the 12 weeks with reading list, worked example, quiz, and "mark complete" button. Reference `module-page.jsx` for the layout and `uploads/deep-research-report.md` for the content.
2. **About page** — currently a stub.
3. **Cheat-sheet downloads** — linked in the footer but not wired up.
4. **Spreadsheet templates** — one per major tax head (IT, VAT, CGT, CT, CAT).

## Conventions

- All inline styles, no CSS-in-JS library. Keep using the `var(--token)` design tokens.
- Components receive `isMobile` and `go` as props — no context.
- Keep each JSX file independently loadable (global `window.*` exports, no ES module syntax).
- No TypeScript, no tests, no linting — this is a fast-moving prototype.
- Tax figures must cite a source (Revenue page URL or research report section). Don't invent rates.
