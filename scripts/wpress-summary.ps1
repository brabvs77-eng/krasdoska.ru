$outPath = 'D:\Project KD\docs\wpress-summary.txt'
$manifestPath = 'D:\Project KD\docs\wpress-manifest.csv'

$m = Import-Csv -LiteralPath $manifestPath
$lines = @()
$lines += "Total entries: $($m.Count)"

$uploads = $m | Where-Object { $_.Name -match '(?:^|/)uploads/' }
$uploadSize = ($uploads | ForEach-Object { [long]$_.Size } | Measure-Object -Sum).Sum
$lines += "Uploads: $($uploads.Count) files, $([math]::Round($uploadSize/1MB,2)) MB"

$plugins = $m | Where-Object { $_.Name -match '(?:^|/)plugins/' }
$lines += "Plugin files: $($plugins.Count)"

$pluginDirs = $plugins | ForEach-Object {
    if ($_.Name -match '(?:^|/)plugins/([^/]+)/') { $matches[1] }
} | Sort-Object -Unique
$lines += "Plugin packages: $($pluginDirs.Count)"
$lines += "Plugins list:"
$pluginDirs | ForEach-Object { $lines += "  $_" }

$themes = $m | Where-Object { $_.Name -match '(?:^|/)themes/' }
$themeDirs = $themes | ForEach-Object {
    if ($_.Name -match '(?:^|/)themes/([^/]+)/') { $matches[1] }
} | Sort-Object -Unique
$lines += "Themes: $($themeDirs -join ', ')"

$db = $m | Where-Object { $_.Name -like '*database.sql' } | Select-Object -First 1
if ($db) { $lines += "database.sql: $([math]::Round([long]$db.Size/1MB,2)) MB" }

$lines += ""
$lines += "Largest 15 files:"
$m | Sort-Object { [long]$_.Size } -Descending | Select-Object -First 15 | ForEach-Object {
    $lines += ("  {0,10} MB  {1}" -f [math]::Round([long]$_.Size/1MB,2), $_.Name)
}

$lines | Set-Content -Path $outPath -Encoding UTF8
$lines | ForEach-Object { Write-Host $_ }
