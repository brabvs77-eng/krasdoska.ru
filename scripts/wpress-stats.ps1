$manifestPath = 'D:\Project KD\docs\wpress-manifest.csv'
$m = Import-Csv -LiteralPath $manifestPath
Write-Host "Total entries: $($m.Count)"

$uploads = $m | Where-Object { $_.Name -match '(?:^|/)uploads/' }
Write-Host "Uploads: $($uploads.Count)"
$uploadSize = ($uploads | ForEach-Object { [long]$_.Size } | Measure-Object -Sum).Sum
Write-Host ("Uploads size: {0:N2} MB" -f ($uploadSize / 1MB))

$plugins = $m | Where-Object { $_.Name -match '(?:^|/)plugins/' }
Write-Host "Plugin files: $($plugins.Count)"

$themes = $m | Where-Object { $_.Name -match '(?:^|/)themes/' }
Write-Host "Theme files: $($themes.Count)"

$db = $m | Where-Object { $_.Name -like '*database.sql' }
if ($db) {
    Write-Host ("database.sql: {0:N2} MB" -f ([long]$db.Size / 1MB))
}

Write-Host "`nTop upload extensions:"
$uploads | ForEach-Object {
    $base = [IO.Path]::GetFileName($_.Name)
    $e = [IO.Path]::GetExtension($base).ToLower()
    if (-not $e) { '(no ext)' } else { $e }
} | Group-Object | Sort-Object Count -Descending | Select-Object -First 12 | ForEach-Object {
    Write-Host ("  {0,-8} {1}" -f $_.Name, $_.Count)
}
