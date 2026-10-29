# Stop hook — reminds the user about uncommitted work when a session ends.
# Reads nothing meaningful from stdin; checks git status. Non-blocking.
#
# Exit 0 (always). The hook outputs a short reminder to stderr if there are
# uncommitted changes; the harness shows it to the user without interrupting.

$ErrorActionPreference = 'Continue'

# Only act inside a git repo
try {
  $repoRoot = git rev-parse --show-toplevel 2>$null
  if (-not $repoRoot) { exit 0 }
} catch { exit 0 }

# Count changed + untracked
$status = git -C $repoRoot status --porcelain 2>$null
if (-not $status) { exit 0 }

$lines = $status | Where-Object { $_ }
if (-not $lines) { exit 0 }

$count = ($lines | Measure-Object).Count
$branch = (git -C $repoRoot branch --show-current 2>$null).Trim()

$msg = "[commit-reminder] $count uncommitted change(s) on branch '$branch'. Commit or stash before switching focus."
[Console]::Error.WriteLine($msg)
exit 0
