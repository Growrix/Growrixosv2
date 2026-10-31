# 02 — Tokens delta: AI Automation main page and demo template

- **Title:** Tokens added for the AI Automation main page and the demo template
- **Status:** review (31 Oct 2026; Stage A)
- **Version:** 1
- **Last-updated:** 2026-10-31
- **Owner-agent:** style-director
- **Depends-on:** `02-tokens.md` v4 (§6a, §6b); `01-art-direction-ai-automation.md` v1.
- **Delta only.** All colours, band scopes, spacing, radii, easings and durations come from `02-tokens.md`. No colour is added. In the prototype these values live in the `<style>` block.

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
