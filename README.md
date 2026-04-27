# Open Course in Irish Taxation

A free, self-paced 12-week course covering every major Irish tax head — Income Tax, USC, PRSI, VAT, CGT, Corporation Tax, and CAT — built entirely on official public sources.

## Open it

```
open "Irish Taxation Course.html"
```

No build step. No server. No sign-up. Open the file in any browser.

## What it covers

| Week | Topic | Tax head |
|------|-------|----------|
| 01 | Tax system map, sources & residency | Foundations |
| 02 | Classifying income: schedules, cases & badges of trade | Foundations |
| 03 | Self-employed profits & capital allowances | Income |
| 04 | Employment income, expenses & Benefit-in-Kind | Income |
| 05 | Termination, pensions, rental, dividends & DIRT | Income |
| 06 | Full Income Tax computation + USC & PRSI | Income |
| 07 | VAT foundations & the VAT3 return | VAT |
| 08 | CGT computation, exemptions & pay/file | CGT |
| 09 | CGT reliefs and planning | CGT |
| 10 | Corporation Tax computation & filing | CT |
| 11 | CT losses, group relief & close companies | CT |
| 12 | CAT, thresholds, reliefs & capstone | CAT |

Each week: reading list → worked computation → 3-question self-quiz → mark complete.

## Features

- **Live calculator** — Income Tax + USC + PRSI slider, 2026 rates, recomputes on every keystroke
- **Worked ledgers** — sourced computation tables for each major tax head (VAT3, CGT, CT, CAT, rental profit, BIK)
- **Interactive quiz** — pick an answer, check it, read the explanation
- **Progress tracking** — completions saved to `localStorage`, progress bar on the home page
- **Fully responsive** — single layout component serves mobile and desktop

## Stack

React 18 (UMD) + Babel Standalone, loaded from CDN. No bundler, no npm, no build step. JSX compiled in the browser at runtime.

```
Irish Taxation Course.html   entry point, mounts <App />
data.jsx                     static course data (weeks, FAQ)
app-shell.jsx                router, progress state, home page
app-pages.jsx                week pages, calculator, curriculum, quiz engine
styles.css                   design tokens (oklch palette) + utilities
uploads/deep-research-report.md   source of truth for all tax figures
```

## Sources

All content is derived from Irish public-sector sources, re-usable under the PSI licence (CC BY 4.0):

- [Revenue.ie](https://www.revenue.ie) — Tax & Duty Manuals, Notes for Guidance, forms
- [Citizens Information](https://www.citizensinformation.ie) — plain-English explainers
- [Irish Statute Book](https://www.irishstatutebook.ie) — TCA 1997, VATCA 2010, CATCA 2003

Rates and thresholds are updated for Finance Act 2025 / Budget 2026.

## Disclaimer

This is an educational prototype. It is not an accredited qualification, does not issue a credential, and is not tax advice. For complex situations, consult a registered tax adviser.

## Licence

CC BY 4.0. See footer.
