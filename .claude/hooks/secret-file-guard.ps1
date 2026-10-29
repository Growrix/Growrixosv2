# PreToolUse(Write|Edit) guard — defense-in-depth against secret-file edits.
# settings.json's deny list covers the common paths; this hook catches edge
# cases (nested .env files, .env.vault, service-account.json, etc.).
#
# Reads a JSON payload from stdin:
#   { "tool_name": "Write"|"Edit", "tool_input": { "file_path": "..." }, ... }
# Exit 0 to allow; exit 2 to BLOCK with a message on stderr.

$ErrorActionPreference = 'Stop'

$payload = [Console]::In.ReadToEnd()
if (-not $payload) { exit 0 }

try { $json = $payload | ConvertFrom-Json } catch { exit 0 }

if ($json.tool_name -ne 'Write' -and $json.tool_name -ne 'Edit') { exit 0 }

$file = [string]$json.tool_input.file_path
if (-not $file) { exit 0 }

$lower = $file.ToLower().Replace('\', '/')

# Explicit allow: documented env templates are safe to track.
if ($lower -match '/\.env\.(example|sample|template)$') { exit 0 }

$patterns = @(
  '/\.env$',                                      # bare .env
  '/\.env\.',                                     # any .env.<something> (templates allowed above)
  '/\.env\.vault$',
  '/service-account.*\.json$',
  '/secrets\.yaml$',
  '/secrets\.yml$',
  '/credentials\.json$',
  '/\.pem$',
  '/\.key$',
  '/id_rsa',
  '/id_ed25519'
)

foreach ($p in $patterns) {
  if ($lower -match $p) {
    [Console]::Error.WriteLine("[secret-file-guard] BLOCKED: $file is a secret-shaped file.")
    [Console]::Error.WriteLine("[secret-file-guard] Edit it in your shell. Agents should write .env.example instead.")
    exit 2
  }
}

exit 0
