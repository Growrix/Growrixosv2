# 02 — Tokens delta: AI Automation main page and demo template

- **Title:** Tokens added for the AI Automation main page and the demo template
- **Status:** review (revision 2: tools section added, 31 Oct 2026; Stage A)
- **Version:** 2
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `02-tokens.md` v4 (§6a, §6b); `01-art-direction-ai-automation.md` v2.
- **Delta only.** All colours, band scopes, spacing, radii, easings and durations come from `02-tokens.md`. §4 adds one band scope, which reuses existing values. No new colour value is added. In the prototype these values live in the `<style>` block.

## 1. Added tokens

| Token | Mobile (375 px) | Desktop (1440 px) | Value | Use |
| --- | --- | --- | --- | --- |
| `--text-page-h1` | 38 px | 72 px | `clamp(38px, 5vw, 76px)` | H1 on inner pages, flush left, wrapping. Line height 1.04, tracking −0.03em |
| `--text-answer` | 19 px | 23 px | `clamp(19px, 1.6vw, 24px)` | Answer-first text. Line height 1.5 |
| `--measure-read` | full width | 64 characters | `64ch` | Longest line for reading text |

`--text-lead-lg` (24 px on a phone) is too large for a 50-word answer on a small screen, which is why `--text-answer` exists.

## 2. Existing tokens these pages use

| Use | Token |
| --- | --- |
| Short section H2 | `--text-h2-xl` |
| Long question H2 | `--text-h2-col` |
| Run panel and run log title | `--text-panel` |
| Service H3 on the main page | `--text-slide` |
| Mono labels | `--text-label` |
| Panels | `--radius-panel` |
| Media frames and cards | `--radius-card` |
| Run panel and log fill | `--color-night-raised` |
| Line and stops | `--color-signal`, `--color-signal-faint` |

## 3. Local overrides

Two values differ from the homepage, inside these pages only. The homepage is unchanged.

| Item | Homepage | These pages | Why |
| --- | --- | --- | --- |
| `.flow-nodes li` size below 1024 px | 11 px | 12 px | Readable on a phone |
| Cards on the night surface | `--c-bg` fill | `--color-night-raised` fill, 1 px `--c-border` outline, no shadow | `--c-bg` equals the night surface, so the card would vanish |

## 4. Added for the tools section

**Band scope `board`.** Applied with `data-band="board"` on the ivory board. It holds the light values in both themes, so brand marks always sit on one plain, light ground and only one set of files is needed.

| Token inside the scope | Value, both themes | From |
| --- | --- | --- |
| Band background | `#fffdf8` | `--color-surface` light |
| Text | `#171a1f` | `--color-text` light |
| Muted text | `#5c6470` | `--color-text-muted` light |
| Primary | `#0e6b63` | `--color-primary` light |
| Primary hover | `#0b5e58` | `--color-primary-hover` light |
| On primary | `#fffdf8` | `--color-on-primary` light |
| Border | `#d5ccbb` | `--color-border` light |
| Ghost button border | `#8a7f6c` | `--color-border-control` light |
| Focus | `#0e6b63` | `--color-focus` light |
| Signal | `#c56a3b` | `--color-signal` light |
| Signal faint | `rgba(197,106,59,0.28)` | `--color-signal-faint` light |
| Grid line | `rgba(23,26,31,0.07)` | `--color-grid-line` light |

Contrast carries over from the light theme in `02-tokens.md` §6a: text on ivory is above 15:1, and muted and primary pass 4.5:1. Hand-checked, `ASSUMED` until Stage B.

**Sizes.**

| Token | Value | Use |
| --- | --- | --- |
| `--tool-mark-h` | 36 px at 1200 px and wider, 30 px from 1024 to 1199 px | Mark height on the canvas |
| `--tool-mark-list` | 28 px | Mark height in the tool list |
| `--tool-mark-chain` | 32 px | Mark height in the vertical chain |

Brand marks keep their own colours. Those colours are not tokens (`01-art-direction-ai-automation.md` §13).
