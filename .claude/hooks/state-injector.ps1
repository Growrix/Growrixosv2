# UserPromptSubmit hook — injects current project state into every prompt
# so agents don't have to re-read docs/.state.json on every turn.
#
# Reads a JSON payload from stdin:
#   { "prompt": "..." , ... }
# Writes an updated prompt to stdout (JSON: { "prompt": "<prompt + injection>" }).
# Exit 0 on success; non-zero to abort the prompt.

$ErrorActionPreference = 'Continue'

$payload = [Console]::In.ReadToEnd()
if (-not $payload) { exit 0 }

try { $json = $payload | ConvertFrom-Json } catch { exit 0 }

$prompt = [string]$json.prompt
if (-not $prompt) { exit 0 }

# Hunt for a product's state file. Start at cwd; walk up to the control plane.
$cwd = (Get-Location).Path
$stateFile = $null
$search = $cwd
while ($search) {
  $candidate = Join-Path $search 'docs\.state.json'
  if (Test-Path -LiteralPath $candidate) { $stateFile = $candidate; break }
  $parent = Split-Path $search -Parent
  if (-not $parent -or $parent -eq $search) { break }
  $search = $parent
}

if (-not $stateFile) { exit 0 }

try {
  $state = Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json
} catch { exit 0 }

$inject = "`n`n[project state] phase=$($state.phase) · $($state.phase_label); idea=$($state.idea)"
if ($state.stack -and $state.stack.database -and $state.stack.database.provider) {
  $inject += "; db=$($state.stack.database.provider)"
}
if ($state.stack -and $state.stack.auth -and $state.stack.auth.provider) {
  $inject += "; auth=$($state.stack.auth.provider)"
}

$out = @{ prompt = "$prompt$inject" } | ConvertTo-Json -Compress
Write-Output $out
exit 0
