# PostToolUse(Edit/Write) — auto-format the touched file if a formatter is available.
# Reads a JSON hook payload from stdin:
#   { "tool_name": "Edit"|"Write", "tool_input": { "file_path": "..." }, ... }
# Always exits 0 — formatting failures must never block the tool.

$ErrorActionPreference = 'Continue'

$payload = [Console]::In.ReadToEnd()
if (-not $payload) { exit 0 }

try { $json = $payload | ConvertFrom-Json } catch { exit 0 }

$file = [string]$json.tool_input.file_path
if (-not $file) { exit 0 }
if (-not (Test-Path -LiteralPath $file)) { exit 0 }

# Only format files inside the repo working directory.
$cwd = (Get-Location).Path
try { $full = (Resolve-Path -LiteralPath $file).Path } catch { exit 0 }
if (-not $full.StartsWith($cwd, [StringComparison]::OrdinalIgnoreCase)) { exit 0 }

$ext = [IO.Path]::GetExtension($full).ToLower()
$fmtExts = @('.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss', '.html', '.md', '.yml', '.yaml')
if ($fmtExts -notcontains $ext) { exit 0 }

# Only run if the project has a package.json with prettier/eslint deps.
$pkgJson = Join-Path $cwd 'package.json'
if (-not (Test-Path -LiteralPath $pkgJson)) { exit 0 }

try {
  $pkg = Get-Content -LiteralPath $pkgJson -Raw | ConvertFrom-Json
} catch { exit 0 }

$allDeps = @{}
if ($pkg.dependencies)    { $pkg.dependencies.PSObject.Properties    | ForEach-Object { $allDeps[$_.Name] = $true } }
if ($pkg.devDependencies) { $pkg.devDependencies.PSObject.Properties | ForEach-Object { $allDeps[$_.Name] = $true } }

if ($allDeps.ContainsKey('prettier')) {
  try { & npx --no-install prettier --write --log-level error $full 2>$null | Out-Null } catch {}
}
if ($allDeps.ContainsKey('eslint') -and @('.ts','.tsx','.js','.jsx','.mjs','.cjs') -contains $ext) {
  try { & npx --no-install eslint --fix --quiet $full 2>$null | Out-Null } catch {}
}

exit 0
