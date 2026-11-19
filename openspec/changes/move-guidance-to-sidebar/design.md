# Design

## Context

`App.tsx` renders a `<header>` containing an `.intro-block` (title, Accessibility and Load profile tools, intro, privacy line, "How this works" and "Privacy" `<details>`) and a `.nav-block` (step status, progress, stepper), followed by `<main>`, a Back/Continue `<footer class="nav">` and a Sources section. The whole page is a single column (`.app`, max 120rem). See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Side bar left, main panel right, using the existing components unchanged.
- Sticky side bar on wide screens; single column on narrow ones.

**Non-Goals:**
- No new content, no change to state, export, load or storage.
- No collapsible/hideable side bar toggle.

## Decisions

- **CSS grid on `.app`** with columns `minmax(16rem, 22rem) minmax(0, 1fr)` at `min-width: 60rem`; the side bar is `<aside aria-label="Profile Builder">` and wraps the old intro and nav blocks. Alternative (flex) rejected: grid with `minmax(0, 1fr)` stops main content overflowing.
- **Footer and Sources move inside a main-panel wrapper** (`main` plus the Back/Continue bar and Sources) so they sit in the right column. The wrapper is a plain `div`; `<main>` keeps its ref, scroll target and landmark role.
- **Sticky via `position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto`** so a tall side bar (expanded details, open Accessibility panel) remains reachable. Sticky is disabled below 60rem.
- **Stepper becomes vertical in the side bar** (one step per row, 44px targets kept); the horizontal layout is replaced, not duplicated.
- **Title in the side bar stays the page `h1`**; DOM order is side bar then main, matching the spec's tab order.
- **Accessibility and Load profile** stack vertically in the side bar; their panels expand inline.
- **Assumption:** "navigation" means the step navigation; the Back/Continue footer is part of the work flow and stays in the main panel. Side bar width and the 60rem breakpoint are reasonable defaults, adjustable during apply.

## Risks / Trade-offs

- [Narrow screens put a long side bar above the work] → Collapsed-by-default details and a compact stepper keep it short.
- [Section-change scroll/focus logic assumes `<main>` position] → Verify `useStepNavigation` still scrolls to the main panel; adjust if it scrolls to page top.
- [Tests querying `banner`/header may break] → Update them in the same task group.
- [Largest text size in a narrow side bar column] → Use `rem` widths so the bar grows with text; verify at 1280px with Largest.
