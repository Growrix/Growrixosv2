#!/usr/bin/env bash
# PreToolUse(Write|Edit) guard — defense-in-depth against secret-file edits.
# Bash port of secret-file-guard.ps1 for the Replit (Linux) environment.
# settings.json's deny list covers the common paths; this hook catches edge
# cases (nested .env files, .env.vault, service-account.json, etc.).
#
# Reads a JSON payload from stdin:
#   { "tool_name": "Write"|"Edit", "tool_input": { "file_path": "..." }, ... }
# Exit 0 to allow; exit 2 to BLOCK with a message on stderr.

payload="$(cat)"
[ -z "$payload" ] && exit 0

if ! command -v jq >/dev/null 2>&1; then
  echo "[secret-file-guard] WARNING: jq is not installed; this guard is skipped. The settings.json deny list still applies." >&2
  exit 0
fi

tool="$(printf '%s' "$payload" | jq -r '.tool_name // empty' 2>/dev/null)" || exit 0
case "$tool" in
  Write|Edit) ;;
  *) exit 0 ;;
esac

file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)" || exit 0
[ -z "$file" ] && exit 0

# Lower-case, forward slashes, one leading slash, so the patterns also match relative paths.
lower="$(printf '%s' "$file" | tr '[:upper:]' '[:lower:]' | tr '\\' '/')"
lower="/${lower#/}"

# Explicit allow: documented env templates are safe to track.
if printf '%s' "$lower" | grep -Eq '/\.env\.(example|sample|template)$'; then
  exit 0
fi

patterns=(
  '/\.env$'                    # bare .env
  '/\.env\.'                   # any .env.<something> (templates allowed above)
  '/\.env\.vault$'
  '/service-account.*\.json$'
  '/secrets\.yaml$'
  '/secrets\.yml$'
  '/credentials\.json$'
  '/\.pem$'
  '/\.key$'
  '/id_rsa'
  '/id_ed25519'
)

for p in "${patterns[@]}"; do
  if printf '%s' "$lower" | grep -Eq -- "$p"; then
    echo "[secret-file-guard] BLOCKED: $file is a secret-shaped file." >&2
    echo "[secret-file-guard] Edit it in your shell. Agents should write .env.example instead." >&2
    exit 2
  fi
done

exit 0
