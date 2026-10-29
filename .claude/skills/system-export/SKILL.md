---
name: system-export
description: Export the latest agentic system (.claude/ agents, commands, hooks, skills, templates, settings) to any destination root the user names, so a new project starts with it. Use when the user runs /system-export <root>, or asks to copy, export or reuse the agentic system in a new project. Dry run first; overwrites and deletions only after the user approves.
---

# system-export

Copies the reusable agentic system from this repo into a destination root. It never edits this repo, never touches `~/.claude/`, and writes outside `<destination>\.claude\` only for the one root file `.mcp.json`.

## Step 1 — Get the destination

Need an absolute path. If the user gave none, ask once. Do not guess.

## Step 2 — Dry run (always first)

    powershell -NoProfile -ExecutionPolicy Bypass -File .claude/skills/system-export/export.ps1 -Destination "<root>"

The dry run writes nothing. It prints:

- NEW: files the destination lacks.
- CHANGED: files that exist at the destination with different content. Applying overwrites them.
- STALE: files in the exported folders that the source no longer has. Applying keeps them unless `-Prune` is passed.
- ROOT .mcp.json: `create` (no file at the destination), `update` (book-mcp or a missing server gets added), or `ok`.
- SECRETS: if any file matches, the script refuses. Report the file and stop.

## Step 3 — Show and ask

Show the three lists. Say which CHANGED files will be overwritten. Approval covers this run only.

## Step 4 — Apply (after approval)

    powershell -NoProfile -ExecutionPolicy Bypass -File .claude/skills/system-export/export.ps1 -Destination "<root>" -Apply

Add `-Prune` only if the user approved deleting STALE files.

## Step 5 — Verify

Run the dry run again. Expect zero NEW, zero CHANGED, and `ROOT .mcp.json: ok`. Report the counts, the `.mcp.json` status, and the commit from `<root>\.claude\EXPORT.md`.

## Root `.mcp.json` (always carried)

- The source `.mcp.json` is copied to `<root>\.mcp.json` when the destination has none.
- If the destination already has one, only the `book-mcp` entry is forced from the source. Other servers the destination added are kept. A source server missing there is added.
- The script refuses if the source has no `book-mcp` entry, and it fails after apply if the destination lacks one. Do not remove or work around that guard.
- The `book-mcp` command path is copied as written. The script warns if that Python path does not exist on this machine. Fix the path on that machine, not in the source.

## Not exported (on purpose)

- Root `CLAUDE.md`, `README.md`, `HANDOVER.md`, `docs/`: project-specific. The new project writes its own.
- `.claude/launch.json`: this project's dev servers.
- `.claude/worktrees/`, `*.local.*`, `tool-results/`.

## Hard rules

1. Dry run before every apply.
2. Never pass `-Apply` or `-Prune` without the user's approval in this conversation.
3. Refuse a destination that is this repo or inside it.
4. Never `git init` or commit in the destination.
5. The copy list lives in `export.ps1` (`$dirs`, `$files`). Change it there, not here.
6. `book-mcp` must be wired in the destination's `.mcp.json` after every apply.
