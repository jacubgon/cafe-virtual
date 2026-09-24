# Dynamics VR — Design System

This folder is the single source of truth for the look, feel and behaviour of every Dynamics VR product surface — the **Dynamics Platform** clinician web app, the immersive VR experiences (**PainRehab**, **NeuroRehab**, **Patient Experience**), and the **Functional Evaluation Module**.

> **Company in one line**
> Dynamics VR is a healthcare‑technology company building evidence‑based VR rehabilitation, registered as a Class I Medical Device under European MDR. Tagline: *Empowering Active Healing*.

---

## Source materials

Everything in this folder was derived from materials the user provided:

| Source | What it gave us |
| --- | --- |
| `REBRANDING 2025 WEBAPP.fig` (mounted Figma file) | Rebrand-defining colour palette, semantic token names, type scale, spacing scale, radius scale, button + sidebar + input + alert anatomy, plus the live screens for LOGIN, HOME, PATIENTS, EVALUATION, EVOLUTION. The `UI-KIT-STYLE-GUIDE-REBRANDING-2025` page (and its `Variables Guide` frame) is the canonical token board. |
| `uploads/*` | Master logo set — Imagotipo (symbol + wordmark), with tagline and without, positive on light and negative on dark. |
| `fonts/DMSans-*.ttf` (uploaded May 2026) | The full **DM Sans** family the brand specifies, self-hosted under `/fonts/`. |
| Project brief (initial pasted instructions) | Mission, target users, design priorities, anti-patterns to avoid. |

Re-attach these to update the system; if a Figma frame moves, its node id is captured at the top of every pseudocode JSX file.

---

## Index — what's in this folder

| Path | Purpose |
| --- | --- |
| `colors_and_type.css` | All design tokens — primitives, semantics, shadows, spacing, radius, component heights, type scale + semantic type helpers. The single import every other file pulls from. |
| `fonts/` | Self-hosted DM Sans TTFs (Thin → Black, romans + italics) wired up as `@font-face` rules. |
| `assets/` | Brand logos — `logo-positivo.png` (full imagotipo light), `logo-negativo.png` (dark), `logo-tagline-*.png` (with *Empowering Active Healing* tagline), `simbolo-*.png` (symbol only). |
| `preview/` | Small Design-System-tab cards that show off the system one concept at a time. One file = one card. Open the **Design System** tab to see them grouped. |
| `ui_kits/dynamics-platform/` | **The proper UI kit** — every component scoped under `.dvr-*` with all variants and states, plus a reusable `components.css` you can drop into product code. |
| `prototypes/dynamics-platform/` | A *mini prototype* — Inicio · Pacientes · Crear sesiones · Academy · Streaming wired together as a click-through demo of how the components compose. |
| `SKILL.md` | Agent-Skills entry point so this folder can be downloaded and used inside Claude Code. |

There is intentionally no separate UI kit for PainRehab / NeuroRehab / Patient Experience / Functional Evaluation. Those products are immersive VR experiences whose UI rendering lives on-headset; the design system here governs every clinician-facing artefact and is referenced by the VR experiences for tag colours, type and brand assets.

---

## Content fundamentals — how Dynamics writes

The Figma file is Spanish-first (the canonical brand language). The brief asks for an English design system, so the examples below are translated, but **tone and structure are unchanged**.

### Voice
- **Clinical, calm and second-person.** The clinician is the protagonist — copy speaks to *you* (the therapist), about *the patient* in the third person. Never "we." Never marketing-style "your journey." This is medical software, not consumer wellness.
- **Direct, instrumental verbs.** *"Start session", "Reschedule", "Discharge", "Reassess baseline"* — single short verbs win over phrasal alternatives ("Get started", "Reach out").
- **Spanish formality is "usted" by default in patient-facing copy**, "tú" in clinician-only contexts. Headers are sentence case; nav, buttons, table headers and chip labels are Title Case.
- **No exclamation marks. No emoji. No "magic"/"powerful"/"seamless" marketing adjectives.** Adjectives that survive review: *objective, evidence‑based, immersive, guided, functional, structured*.

### Numbers, dates, units
- Always show **units inline and tightly coupled to the number** — `87°`, `24/30`, `+12%`, `3.4 VAS`. Use tabular figures (`.numeric` helper) so columns of numbers line up.
- Dates: `DD/MM/YYYY` short, `21 May 2026` long, never US-style. Times: 24-hour, `09:30`.
- Patient identifiers are monospaced (`PAT-204812`) so they read as data, not prose.

### Sample copy that lives in the product

| Surface | Copy |
| --- | --- |
| Greeting | *"Good morning, Dr. Martínez — you have 5 sessions today and 3 patient evaluations waiting for review."* |
| Empty state | *"Select a patient — pick someone on the left to view their record, ROM trend and upcoming sessions."* |
| Error toast | *"Headset disconnected — VR session paused; reconnect within 60 s to keep progress."* |
| Success toast | *"Session saved — Elena Marín's evaluation has been added to her record."* |
| Eyebrow | `CERVICAL · SESSION 14 / 24` |

---

## Visual foundations

### Colour
- **Primary brand colour is electric blue** (`#479DFD` — *Normal*) flanked by `#75B7FF` (*Light / Sky*) and `#3B67B7` (*Dark*). The canonical CTA gradient is `linear-gradient(180deg, #2F76F7 0%, #479DFD 100%)`.
- **Deep Indigo (`#2B3674`)** is the heading colour and the only "dark" the brand uses — body text is the warmer `#3F3F3E`, not black.
- **Backgrounds work in soft tints** drawn from the blue family — `#F4F6FF` (section), `#F4F7FE` (icon chip background), `#F5F7FA` (field background), `#EAF9FF` (turquoise wellness tile), `#E9EDFF` (selected nav / chip). White is reserved for cards and inputs in focus.
- **Each rehabilitation track has its own colour** — Cervical `#6E9EF3`, Lumbar `#4385FA`, Shoulder `#2960C3`, Neuro `#7B6AE2`. These should be used as program tags and chart colour, never as page background.
- **Feedback colours**: Error `#D86761` / `#EE5E5E` icon / `#FFE8E8` bg / `#991B1B` text; Success `#12B76A` icon / `#5CC89B` tag / `#D1FADF` bg; Warning (pending) `#F3A257`; Info uses the primary blue ramp.
- **Charts use a 5-step blue scale** (`#D3F2FF → #0C60AC`) plus `#FABC1E` for star/highlight and `#CFE2E2` for inactive — chosen to print legibly in monochrome reports.

### Typography
- **DM Sans for everything.** Display headings (700), section titles (700/600), body (400/500), labels (500). DM Mono only for IDs / version strings / kbd-style search hints.
- The Figma uses Inter at huge sizes (`160px`) for the style-guide hero numerals — that's a Figma-internal convention, not a product convention. Don't ship Inter in product UI.
- **Type scale is a 1.25 modular ratio**: `40 / 32 / 24 / 20 / 18 / 16 / 14 / 12 / 10`. Body is 14 in dense data surfaces (tables, sidebars), 16 in reading copy.
- **Line height is tight on headings** (1.1–1.25) and relaxed on body (1.45–1.6). Letter-spacing on the 40 px hero is `-0.01em`.
- Eyebrow labels are uppercase, 10–11 px, weight 500, `letter-spacing: 0.08–0.12em`.

### Spacing & rhythm
- **4 px base grid**, 13 steps: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`. Card interior padding is almost always 20–24 px.
- **Component heights are tokenised**: `32 / 36 / 40 / 48 / 52` for controls, `56` for table rows. Stick to the scale.

### Radius
- `4 sm` (buttons, chips, inputs), `8 md` (small cards), `12 lg` (cards), `16 xl` (large cards, modals), `999 full` (avatars, pills). The Figma also defines `30 xxl` for hero panels; use sparingly.

### Backgrounds, surfaces, depth
- The app sits on a **very soft vertical gradient** from `#F4F6FF` to `#ECF1FB`. Sidebar and content cards are white islands floating on it.
- **No glassmorphism.** No blur backdrops, no acrylic. No big hero photography or full-bleed imagery in the dashboard — the only photography appears on the LOGIN screen as a quiet right-rail visual.
- **Repeating patterns / textures: none** in product. The brand symbol's open circle is the only decorative motif and it appears at small scales only.
- **Two shadow tokens**:
  - **Card** — `0 1.7px 10px 0 rgba(112,144,176,0.12)` — applied to every Card, KPI, sidebar.
  - **Modal** — `12px 12px 36px -6px rgba(2,2,70,0.18)` — heavier, blue-tinted, only on overlays.
  - Plus a focus ring — `0 0 0 3px rgba(71,157,253,0.35)` — never use a default browser outline.

### Borders
- Default border is `#E4E6E8` — neutral, slightly cool. Subtle border (for dividers inside a card) is `#EEEFF1`. Strong border for tables is `#D9D9D9`.
- **Inputs swap from filled (`#F5F7FA`) to white on focus**, gaining a 1 px `#2F76F7` border + the focus ring.

### Hover, press, motion
- Buttons: hover lifts the shadow (`0 4 → 0 6` blur, +`translateY(-1px)`); press snaps back to `translateY(0)`. Transition `120 ms ease`.
- Nav items: hover paints the row with `#F4F6FF`; **active state is a soft chip `#E9EDFF` + navy text + blue icon** (NOT a gradient fill — the gradient is reserved for the primary CTA and brand symbol).
- Cards: do not animate on hover. Clinical density.
- No bounces, no easter-egg micro-interactions, no spring physics. Every transition is a 120–200 ms ease curve.

### Imagery
- Patient avatars are **initials on a soft duotone gradient** keyed off a few brand-adjacent hues — blue, violet (neuro), green (ok), orange (warning), red (alert). Real photos may appear in the patient record but never in dashboards or lists.
- The two large product photos in the LOGIN frame are warm-cool blue-tinted clinic / VR-headset shots. If you need stock imagery, that is the vibe — cool, clinical, never staged-stocky.

### Layout rules
- Sidebar is **fixed 264 px**, floating as a 20 px-radius card with a 24 px gutter on all sides — it never bleeds to the edge.
- Topbar lives **inside the main column**, not above the sidebar.
- Page content uses 16–20 px gaps; the grid is fluid, not column-snapped.
- Modals are radius-16, max-width ~640 px, with the heavy "Modal" shadow above a dark `rgba(0,0,0,0.5)` scrim.

---

## Iconography

- **Primary set: Iconoir + Material Symbols (Sharp · Outline).** Both appear in the Figma; both are CDN-available; both share a 24 px grid and ~1.8 px stroke. We did not redraw any icons — the kit references inline SVG paths in the canonical Iconoir / MS style.
- **Stroke icons (1.8 px), not filled.** Active states may swap to filled (e.g. the notification bell).
- **Wrapper** — when an icon needs visual weight, place it in a 44 × 44 chip with `background: #F4F7FE` and `color: #2F76F7`. That's the canonical "feature icon" treatment.
- **Brand symbol** (open ring with progressing dots) is in `assets/simbolo-*.png` — use it as the sidebar avatar at 32 px, or as a hero mark at 64–120 px.
- **Emoji: never** in product. Status uses coloured chips with a dot, not an emoji.
- **Unicode glyphs** are fine in mono contexts (`▲ ▼ ✓ × ! ↻`) for trend deltas, alert glyphs and notification icons inside small badges.
- We deliberately did **not** ship a custom icon font. If a missing icon is needed, install [Iconoir](https://iconoir.com/) (`npm i iconoir-react`) and import directly.

---

## Where to start

- **Designing a new clinician screen** → open `ui_kits/dynamics-platform/index.html`, copy the closest layout, swap content, keep the tokens.
- **Need a colour** → check `colors_and_type.css`. If your colour isn't there, it shouldn't be in the design.
- **Doing a one-off mock for a deck or marketing** → import the logos from `assets/`, pull `colors_and_type.css`, lean on the type helpers (`.h1`, `.eyebrow`, `.numeric`).
- **Working in Claude Code** → see `SKILL.md`.

---

## Known gaps / things to verify

- **Slide / deck templates were not provided**, so no `slides/` folder was generated. If you want a deck template (clinical study, internal all-hands, sales), ask and we'll create one rooted in these tokens.
- **DM Mono and Inter are still Google-Fonts loaded** because the brand only uploaded DM Sans. If self-hosted DM Mono is required for compliance, upload the files and we'll inline them.
- **VR-side UI** (headset overlays, gaze pointers, etc.) is not represented here. That belongs in a separate `ui_kits/vr-experiences/` kit once the VR design artefacts are available.
- **Functional Evaluation Module** has dedicated screens in the Figma (`02-26_EVALUACION-Y-PERFIL`) we did not build into a kit — flag if a recreation of the evaluation workflow is needed.
