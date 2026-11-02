#!/usr/bin/env bash
# PreToolUse(Bash) guard — blocks destructive commands.
# Bash port of pre-bash-guard.ps1 for the Replit (Linux) environment.
# Reads a JSON hook payload from stdin:
#   { "tool_name": "Bash", "tool_input": { "command": "..." }, ... }
# Exit 0 = allow. Exit 2 = block with the message written to stderr.
# Prod deploys need DEPLOY_PROD_OK=1 in the environment.
# Unlike the other hooks, this one fails closed: without jq it cannot read the command.

payload="$(cat)"
[ -z "$payload" ] && exit 0

if ! command -v jq >/dev/null 2>&1; then
  echo "[pre-bash-guard] BLOCKED: jq is not installed, so the guard cannot read the command. Install jq, then retry." >&2
  exit 2
fi

tool="$(printf '%s' "$payload" | jq -r '.tool_name // empty' 2>/dev/null)" || exit 0
[ "$tool" != "Bash" ] && exit 0

cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty' 2>/dev/null)" || exit 0
[ -z "$cmd" ] && exit 0

# Extended regexes, matched case-insensitively (PowerShell -match was case-insensitive too).
# patterns[i] and reasons[i] belong together.
patterns=(
  'rm[[:space:]]+-[a-zA-Z]*r[a-zA-Z]*f'
  'git[[:space:]]+push[[:space:]]+.*--force|git[[:space:]]+push[[:space:]]+.*-f([[:space:]]|$)'
  'git[[:space:]]+reset[[:space:]]+--hard'
  'git[[:space:]]+clean[[:space:]]+-[a-zA-Z]*f'
  'git[[:space:]]+push[[:space:]]+(origin[[:space:]]+)?(main|master)([[:space:]]|$|:)'
  'drop[[:space:]]+table|truncate[[:space:]]+table|delete[[:space:]]+from[[:space:]]+[[:alnum:]_]+[[:space:]]*;'
  'supabase[[:space:]]+db[[:space:]]+reset'
)
reasons=(
  'rm -rf is blocked. Delete specific files by name instead.'
  'Force-push is blocked. If you really mean it, run it yourself in a terminal.'
  'git reset --hard is blocked. Stash or commit before resetting.'
  'git clean -f is blocked. It discards untracked work.'
  'Pushing directly to main/master is blocked. Open a PR.'
  'Destructive SQL is blocked. Use the migration-runner agent with the migration-safety-checklist skill.'
  'supabase db reset is blocked — it wipes the DB. Use the migration-runner.'
)

for i in "${!patterns[@]}"; do
  if printf '%s\n' "$cmd" | grep -Eiq -- "${patterns[$i]}"; then
    echo "[pre-bash-guard] BLOCKED: ${reasons[$i]}" >&2
    echo "[pre-bash-guard] Command: $cmd" >&2
    exit 2
  fi
done

# Prod deploy requires an explicit approval env var.
if printf '%s\n' "$cmd" | grep -Eiq 'vercel[[:space:]]+(--prod|deploy[[:space:]]+--prod)|vercel[[:space:]]+.*[[:space:]]--prod'; then
  if [ "${DEPLOY_PROD_OK:-}" != "1" ]; then
    echo "[pre-bash-guard] BLOCKED: production deploy requires DEPLOY_PROD_OK=1 in this session." >&2
    echo "[pre-bash-guard] Set it with: export DEPLOY_PROD_OK=1  (after you have confirmed the preview deploy is healthy)." >&2
    exit 2
  fi
fi

exit 0
