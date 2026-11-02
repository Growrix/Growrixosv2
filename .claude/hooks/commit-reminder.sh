#!/usr/bin/env bash
# Stop hook — reminds the user about uncommitted work when a session ends.
# Bash port of commit-reminder.ps1 for the Replit (Linux) environment.
# Reads nothing meaningful from stdin; checks git status. Non-blocking.
#
# Exit 0 (always). Writes a short reminder to stderr if there are
# uncommitted changes; the harness shows it to the user without interrupting.

root="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
[ -z "$root" ] && exit 0

status="$(git -C "$root" status --porcelain 2>/dev/null)"
[ -z "$status" ] && exit 0

count="$(printf '%s\n' "$status" | grep -c .)"
branch="$(git -C "$root" branch --show-current 2>/dev/null)"

echo "[commit-reminder] $count uncommitted change(s) on branch '$branch'. Commit or stash before switching focus." >&2
exit 0
