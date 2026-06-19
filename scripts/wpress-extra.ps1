$manifestPath = 'D:\Project KD\docs\wpress-manifest.csv'
$m = Import-Csv -LiteralPath $manifestPath

Write-Host "=== CHILD THEME FILES ==="
$m | Where-Object { $_.Name -match 'themes/hello-elementor-child/' } |
    ForEach-Object { $_.Name } |
    Sort-Object

Write-Host "`n=== UPLOAD EXTENSIONS ==="
$uploads = $m | Where-Object { $_.Name -match '(?:^|/)uploads/' }
$uploads | ForEach-Object {
    $leaf = ($_.Name -split '/')[-1]
    $dot = $leaf.LastIndexOf('.')
    if ($dot -lt 0) { '(no ext)' } else { $leaf.Substring($dot).ToLower() }
} | Group-Object | Sort-Object Count -Descending | Select-Object -First 12 | ForEach-Object {
    Write-Host ("  {0,-8} {1}" -f $_.Name, $_.Count)
}

Write-Host "`n=== LARGEST (short names) ==="
$m | Sort-Object { [long]$_.Size } -Descending | Select-Object -First 10 | ForEach-Object {
    $short = if ($_.Name.Length -gt 90) { '...' + $_.Name.Substring($_.Name.Length - 87) } else { $_.Name }
    Write-Host ("  {0,8} MB  {1}" -f [math]::Round([long]$_.Size/1MB,2), $short)
}
