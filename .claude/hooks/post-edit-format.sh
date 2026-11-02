#!/usr/bin/env bash
# PostToolUse(Edit|Write) — auto-format the touched file if a formatter is available.
# Bash port of post-edit-format.ps1 for the Replit (Linux) environment.
# Reads a JSON hook payload from stdin:
#   { "tool_name": "Edit"|"Write", "tool_input": { "file_path": "..." }, ... }
# Always exits 0 — formatting failures must never block the tool.

command -v jq >/dev/null 2>&1 || exit 0

payload="$(cat)"
[ -z "$payload" ] && exit 0

file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)" || exit 0
[ -z "$file" ] && exit 0
[ -e "$file" ] || exit 0

# Only format files inside the repo working directory.
cwd="$(pwd -P)"
full="$(realpath -- "$file" 2>/dev/null)" || exit 0
case "$full" in
  "$cwd"/*) ;;
  *) exit 0 ;;
esac

ext="$(printf '%s' "${full##*.}" | tr '[:upper:]' '[:lower:]')"
case ".$ext" in
  .ts|.tsx|.js|.jsx|.mjs|.cjs|.json|.css|.scss|.html|.md|.yml|.yaml) ;;
  *) exit 0 ;;
esac

# Only run if the project has a package.json with prettier/eslint deps.
pkg="$cwd/package.json"
[ -f "$pkg" ] || exit 0

has_dep() {
  jq -e --arg d "$1" '((.dependencies // {}) + (.devDependencies // {})) | has($d)' "$pkg" >/dev/null 2>&1
}

if has_dep prettier; then
  npx --no-install prettier --write --log-level error "$full" >/dev/null 2>&1 || true
fi

case ".$ext" in
  .ts|.tsx|.js|.jsx|.mjs|.cjs)
    if has_dep eslint; then
      npx --no-install eslint --fix --quiet "$full" >/dev/null 2>&1 || true
    fi
    ;;
esac

exit 0
