#!/usr/bin/env bash
# SessionStart hook — reads the nearest product's docs/.state.json (if any)
# and prints a one-line status so a fresh session knows what's in flight.
# Bash port of session-boot.ps1 for the Replit (Linux) environment.
#
# Reads nothing from stdin. Prints a status line to stdout which the harness
# shows to the user as session banner context. Exit 0 always.

# Sets STATE_FILE and PRODUCT_DIR when a docs/.state.json is found walking up from $PWD.
find_state() {
  local search="$PWD" parent
  while [ -n "$search" ]; do
    if [ -f "$search/docs/.state.json" ]; then
      STATE_FILE="$search/docs/.state.json"
      PRODUCT_DIR="$search"
      return 0
    fi
    parent="$(dirname "$search")"
    [ "$parent" = "$search" ] && break
    search="$parent"
  done
  return 1
}

if ! find_state; then
  echo "[session-boot] No product in progress. Run /new-product <idea> to start one."
  exit 0
fi

command -v jq >/dev/null 2>&1 || exit 0

phase="$(jq -r '.phase // empty' "$STATE_FILE" 2>/dev/null)" || exit 0
label="$(jq -r '.phase_label // empty' "$STATE_FILE" 2>/dev/null)" || exit 0

echo "[session-boot] Project '$(basename "$PRODUCT_DIR")' at Phase $phase · $label. Run /status for details."
exit 0
