#!/usr/bin/env bash
# UserPromptSubmit hook — injects current project state into every prompt
# so agents don't have to re-read docs/.state.json on every turn.
# Bash port of state-injector.ps1 for the Replit (Linux) environment.
#
# Reads a JSON payload from stdin:
#   { "prompt": "..." , ... }
# Writes an updated prompt to stdout (JSON: { "prompt": "<prompt + injection>" }).
# Exit 0 on success; non-zero to abort the prompt.

command -v jq >/dev/null 2>&1 || exit 0

payload="$(cat)"
[ -z "$payload" ] && exit 0

prompt="$(printf '%s' "$payload" | jq -r '.prompt // empty' 2>/dev/null)" || exit 0
[ -z "$prompt" ] && exit 0

# Sets STATE_FILE when a docs/.state.json is found walking up from $PWD.
find_state() {
  local search="$PWD" parent
  while [ -n "$search" ]; do
    if [ -f "$search/docs/.state.json" ]; then
      STATE_FILE="$search/docs/.state.json"
      return 0
    fi
    parent="$(dirname "$search")"
    [ "$parent" = "$search" ] && break
    search="$parent"
  done
  return 1
}

find_state || exit 0

phase="$(jq -r '.phase // empty' "$STATE_FILE" 2>/dev/null)" || exit 0
label="$(jq -r '.phase_label // empty' "$STATE_FILE" 2>/dev/null)" || exit 0
idea="$(jq -r '.idea // empty' "$STATE_FILE" 2>/dev/null)" || exit 0

inject=$'\n\n'"[project state] phase=$phase · $label; idea=$idea"

db="$(jq -r '.stack.database.provider // empty' "$STATE_FILE" 2>/dev/null)"
[ -n "$db" ] && inject+="; db=$db"

auth="$(jq -r '.stack.auth.provider // empty' "$STATE_FILE" 2>/dev/null)"
[ -n "$auth" ] && inject+="; auth=$auth"

jq -cn --arg p "$prompt$inject" '{prompt: $p}'
exit 0
