param(
    [Parameter(Mandatory = $true)] [string] $Destination,
    [switch] $Apply,
    [switch] $Prune
)

$ErrorActionPreference = 'Stop'

# Lives at .claude/skills/system-export/, so the repo root is three levels up.
$source     = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..')).Path
$claudeSrc  = Join-Path $source '.claude'
$dest       = [System.IO.Path]::GetFullPath($Destination).TrimEnd('\')
$destClaude = Join-Path $dest '.claude'

# Allowlist: only these parts of .claude/ travel. Add a folder here to ship it.
$dirs    = @('agents', 'commands', 'hooks', 'skills', 'templates', 'output-styles', 'rules', 'workflows')
$files   = @('settings.json')
$exclude = @('*.local.*', 'tool-results', 'node_modules', '*.log')

if ($dest -eq $source -or $dest.StartsWith($source + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw "Destination '$dest' is this repo or inside it. Refusing."
}

$relFiles = @()
foreach ($d in $dirs) {
    $base = Join-Path $claudeSrc $d
    if (Test-Path -LiteralPath $base) {
        $relFiles += Get-ChildItem -LiteralPath $base -Recurse -File |
            ForEach-Object { $_.FullName.Substring($claudeSrc.Length + 1) }
    }
}
$relFiles += $files | Where-Object { Test-Path -LiteralPath (Join-Path $claudeSrc $_) }
$relFiles = @($relFiles | Where-Object {
    $parts = $_ -split '[\\/]'
    $leaf  = $parts[-1]
    -not ($exclude | Where-Object { $leaf -like $_ -or $parts -contains $_ })
})

$new = @(); $changed = @(); $existing = @()
foreach ($rel in $relFiles) {
    $target = Join-Path $destClaude $rel
    if (-not (Test-Path -LiteralPath $target)) {
        $new += $rel
    } elseif ((Get-FileHash -LiteralPath $target).Hash -ne (Get-FileHash -LiteralPath (Join-Path $claudeSrc $rel)).Hash) {
        $changed += $rel
    }
}
foreach ($d in $dirs) {
    $base = Join-Path $destClaude $d
    if (Test-Path -LiteralPath $base) {
        $existing += Get-ChildItem -LiteralPath $base -Recurse -File |
            ForEach-Object { $_.FullName.Substring($destClaude.Length + 1) }
    }
}
$stale = @($existing | Where-Object { $relFiles -notcontains $_ })

# Root .mcp.json travels too: it is how book-mcp (and github) get wired into a new root.
# The book-mcp entry is always forced from the source; other servers already in the
# destination are kept, and source servers missing there are added.
$srcMcpPath = Join-Path $source '.mcp.json'
$dstMcpPath = Join-Path $dest '.mcp.json'
$srcMcp = Get-Content -LiteralPath $srcMcpPath -Raw | ConvertFrom-Json
$bookSrc = $srcMcp.mcpServers.'book-mcp'
if (-not $bookSrc) { throw 'Source .mcp.json has no book-mcp entry. Refusing: book-mcp must always be wired.' }
if (-not (Test-Path -LiteralPath $bookSrc.command)) { Write-Warning "book-mcp command not found on this machine: $($bookSrc.command)" }

$mcpStatus = 'ok'
if (Test-Path -LiteralPath $dstMcpPath) {
    $mcpOut = Get-Content -LiteralPath $dstMcpPath -Raw | ConvertFrom-Json
    if (-not $mcpOut.mcpServers) { $mcpOut | Add-Member -NotePropertyName mcpServers -NotePropertyValue ([pscustomobject]@{}) }
    foreach ($server in $srcMcp.mcpServers.PSObject.Properties) {
        $current = $mcpOut.mcpServers.PSObject.Properties[$server.Name]
        if ($server.Name -eq 'book-mcp') {
            $same = $current -and (($current.Value | ConvertTo-Json -Compress) -eq ($server.Value | ConvertTo-Json -Compress))
            if (-not $same) {
                $mcpOut.mcpServers | Add-Member -NotePropertyName $server.Name -NotePropertyValue $server.Value -Force
                $mcpStatus = 'update'
            }
        } elseif (-not $current) {
            $mcpOut.mcpServers | Add-Member -NotePropertyName $server.Name -NotePropertyValue $server.Value -Force
            $mcpStatus = 'update'
        }
    }
} else {
    $mcpOut = $srcMcp
    $mcpStatus = 'create'
}

$secretPattern = 'sk_(live|test)_[A-Za-z0-9]{8,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|(api[_-]?key|secret|token)\s*[:=]\s*[\x22\x27]?[A-Za-z0-9_\-]{20,}'
$secretHits = @($relFiles | Where-Object {
    Select-String -LiteralPath (Join-Path $claudeSrc $_) -Pattern $secretPattern -Quiet
})
if (Select-String -LiteralPath $srcMcpPath -Pattern $secretPattern -Quiet) { $secretHits += '.mcp.json' }

Write-Host "Source:      $source"
Write-Host "Destination: $destClaude"
Write-Host "Files in export set: $($relFiles.Count)"
Write-Host "NEW ($($new.Count))"
$new | ForEach-Object { Write-Host "  + $_" }
Write-Host "CHANGED ($($changed.Count))"
$changed | ForEach-Object { Write-Host "  ~ $_" }
Write-Host "STALE ($($stale.Count)) - kept unless -Prune"
$stale | ForEach-Object { Write-Host "  - $_" }
Write-Host "ROOT .mcp.json: $mcpStatus (book-mcp always wired)"

if ($secretHits.Count) { throw "Refusing: possible secrets in $($secretHits -join ', ')" }

if (-not $Apply) {
    Write-Host "Dry run only. Nothing written."
    return
}

foreach ($rel in ($new + $changed)) {
    $target = Join-Path $destClaude $rel
    New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
    Copy-Item -LiteralPath (Join-Path $claudeSrc $rel) -Destination $target -Force
}
if ($Prune) {
    foreach ($rel in $stale) { Remove-Item -LiteralPath (Join-Path $destClaude $rel) -Force }
}
if ($mcpStatus -ne 'ok') {
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    # Written without a BOM: strict JSON parsers reject a leading byte-order mark.
    $json = ($mcpOut | ConvertTo-Json -Depth 10) + "`n"
    [System.IO.File]::WriteAllText($dstMcpPath, $json, (New-Object System.Text.UTF8Encoding($false)))
}
$check = Get-Content -LiteralPath $dstMcpPath -Raw | ConvertFrom-Json
if (-not $check.mcpServers.'book-mcp') { throw 'Destination .mcp.json has no book-mcp entry after apply.' }

$sha    = git -C $source rev-parse --short HEAD
$branch = git -C $source rev-parse --abbrev-ref HEAD
New-Item -ItemType Directory -Force -Path $destClaude | Out-Null
@(
    '# Exported agentic system',
    '',
    "- Source: $source",
    "- Branch: $branch",
    "- Commit: $sha",
    "- Exported: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
    "- Files: $($relFiles.Count)",
    '',
    'Written by /system-export. The next export overwrites this file.'
) | Set-Content -LiteralPath (Join-Path $destClaude 'EXPORT.md') -Encoding utf8
Write-Host "Applied. Wrote $destClaude\EXPORT.md"
