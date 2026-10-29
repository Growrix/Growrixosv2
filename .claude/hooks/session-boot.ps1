# SessionStart hook — reads the nearest product's docs/.state.json (if any)
# and prints a one-line status so a fresh session knows what's in flight.
#
# Reads nothing from stdin. Prints a status line to stdout which the harness
# shows to the user as session banner context. Exit 0 always.

$ErrorActionPreference = 'Continue'

$cwd = (Get-Location).Path
$stateFile = $null
$productDir = $null
$search = $cwd
while ($search) {
  $candidate = Join-Path $search 'docs\.state.json'
  if (Test-Path -LiteralPath $candidate) {
    $stateFile = $candidate
    $productDir = $search
    break
  }
  $parent = Split-Path $search -Parent
  if (-not $parent -or $parent -eq $search) { break }
  $search = $parent
}

if (-not $stateFile) {
  Write-Output "[session-boot] No product in progress. Run /new-product <idea> to start one."
  exit 0
}

try {
  $state = Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json
} catch { exit 0 }

$productName = Split-Path $productDir -Leaf
$banner = "[session-boot] Project '$productName' at Phase $($state.phase) · $($state.phase_label). Run /status for details."
Write-Output $banner

exit 0
