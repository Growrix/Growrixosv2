# PreToolUse(Bash) guard — blocks destructive commands.
# Reads a JSON hook payload from stdin:
#   { "tool_name": "Bash", "tool_input": { "command": "..." }, ... }
# Exit 0 = allow. Exit 2 = block with the message written to stderr.
# A session must contain the literal token "approved: deploy prod"
# in the last user message to allow vercel --prod. We approximate by
# requiring an environment variable DEPLOY_PROD_OK=1 for prod deploys.

$ErrorActionPreference = 'Stop'

$payload = [Console]::In.ReadToEnd()
if (-not $payload) { exit 0 }

try { $json = $payload | ConvertFrom-Json } catch { exit 0 }

if ($json.tool_name -ne 'Bash') { exit 0 }

$cmd = [string]$json.tool_input.command
if (-not $cmd) { exit 0 }

$blockers = @(
  @{ pattern = 'rm\s+-[a-zA-Z]*r[a-zA-Z]*f'; reason = 'rm -rf is blocked. Delete specific files by name instead.' },
  @{ pattern = 'git\s+push\s+.*--force|git\s+push\s+.*-f(\s|$)'; reason = 'Force-push is blocked. If you really mean it, run it yourself in a terminal.' },
  @{ pattern = 'git\s+reset\s+--hard'; reason = 'git reset --hard is blocked. Stash or commit before resetting.' },
  @{ pattern = 'git\s+clean\s+-[a-zA-Z]*f'; reason = 'git clean -f is blocked. It discards untracked work.' },
  @{ pattern = 'git\s+push\s+(origin\s+)?(main|master)(\s|$|:)'; reason = 'Pushing directly to main/master is blocked. Open a PR.' },
  @{ pattern = 'drop\s+table|truncate\s+table|delete\s+from\s+\w+\s*;'; reason = 'Destructive SQL is blocked. Use the migration-runner agent with the migration-safety-checklist skill.' },
  @{ pattern = 'supabase\s+db\s+reset'; reason = 'supabase db reset is blocked — it wipes the DB. Use the migration-runner.' }
)

foreach ($b in $blockers) {
  if ($cmd -match $b.pattern) {
    [Console]::Error.WriteLine("[pre-bash-guard] BLOCKED: $($b.reason)")
    [Console]::Error.WriteLine("[pre-bash-guard] Command: $cmd")
    exit 2
  }
}

# Prod deploy requires an explicit approval env var.
if ($cmd -match 'vercel\s+(--prod|deploy\s+--prod)' -or $cmd -match 'vercel\s+.*\s+--prod') {
  if ($env:DEPLOY_PROD_OK -ne '1') {
    [Console]::Error.WriteLine("[pre-bash-guard] BLOCKED: production deploy requires DEPLOY_PROD_OK=1 in this session.")
    [Console]::Error.WriteLine("[pre-bash-guard] Set it with: `$env:DEPLOY_PROD_OK = '1'  (after you have confirmed the preview deploy is healthy).")
    exit 2
  }
}

exit 0
