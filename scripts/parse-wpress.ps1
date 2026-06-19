$path = 'D:\Project KD\krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress'
$fi = Get-Item -LiteralPath $path
Write-Host "=== WPRESS ARCHIVE ==="
Write-Host "File: $($fi.Name)"
Write-Host "Size: $([math]::Round($fi.Length/1MB, 2)) MB ($($fi.Length) bytes)"

function Read-UntilNewline($reader) {
    $bytes = New-Object System.Collections.Generic.List[byte]
    while ($true) {
        $b = $reader.ReadByte()
        if ($b -eq -1) { return $null }
        if ($b -eq 10) { break }  # LF
        if ($b -ne 13) { [void]$bytes.Add([byte]$b) }  # skip CR
    }
    if ($bytes.Count -eq 0) { return '' }
    return [Text.Encoding]::UTF8.GetString($bytes.ToArray())
}

$fs = [System.IO.File]::OpenRead($path)
$reader = New-Object System.IO.BinaryReader($fs)

$entries = @()
$maxEntries = 5000
$totalContent = 0

for ($i = 0; $i -lt $maxEntries; $i++) {
    if ($fs.Position -ge $fs.Length) { break }

    $name = Read-UntilNewline $reader
    if ($null -eq $name) { break }
    if ($name -eq '') { continue }

    $sizeLine = Read-UntilNewline $reader
    if ($null -eq $sizeLine -or $sizeLine -eq '') { break }

    if (-not ($sizeLine -match '^\d+$')) {
        Write-Host "WARN: bad size at entry $i, name=$name, sizeLine=$sizeLine, pos=$($fs.Position)"
        break
    }

    $size = [long]$sizeLine
    if ($size -lt 0 -or ($fs.Position + $size) -gt $fs.Length) {
        Write-Host "WARN: invalid size $size at pos $($fs.Position)"
        break
    }

  $entries += [PSCustomObject]@{
        Index = $i
        Name = $name
        Size = $size
        Offset = $fs.Position
    }
    $totalContent += $size
    $fs.Position += $size
}

$reader.Close()
$fs.Close()

Write-Host "Parsed entries: $($entries.Count)"
Write-Host "Content bytes accounted: $totalContent"

# Summaries
$extGroups = $entries | ForEach-Object {
    $ext = [System.IO.Path]::GetExtension($_.Name).ToLower()
    if (-not $ext) { $ext = '(no ext)' }
    $ext
} | Group-Object | Sort-Object Count -Descending

Write-Host "`n=== TOP EXTENSIONS ==="
$extGroups | Select-Object -First 20 | ForEach-Object { Write-Host ("  {0,-12} {1}" -f $_.Name, $_.Count) }

$topFolders = $entries | ForEach-Object {
    $n = $_.Name -replace '\\','/'
    if ($n -match '^([^/]+/[^/]+)/') { $matches[1] }
    elseif ($n -match '^([^/]+)/') { $matches[1] }
    else { '(root)' }
} | Group-Object | Sort-Object Count -Descending

Write-Host "`n=== TOP FOLDERS ==="
$topFolders | Select-Object -First 25 | ForEach-Object { Write-Host ("  {0,-40} {1}" -f $_.Name, $_.Count) }

Write-Host "`n=== KEY FILES ==="
$keys = @('database.sql','package.json','multisite.json','wp-config.php','.htaccess','robots.txt')
foreach ($k in $keys) {
    $hit = $entries | Where-Object { $_.Name -like "*$k" }
    if ($hit) {
        foreach ($h in $hit) { Write-Host ("  FOUND: {0} ({1} bytes)" -f $h.Name, $h.Size) }
    } else {
        Write-Host "  MISSING: $k"
    }
}

Write-Host "`n=== PLUGINS (from paths) ==="
$plugins = $entries | Where-Object { $_.Name -match 'plugins/([^/]+)/' } | ForEach-Object { $matches[1] } | Sort-Object -Unique
$plugins | ForEach-Object { Write-Host "  $_" }

Write-Host "`n=== THEMES ==="
$themes = $entries | Where-Object { $_.Name -match 'themes/([^/]+)/' } | ForEach-Object { $matches[1] } | Sort-Object -Unique
$themes | ForEach-Object { Write-Host "  $_" }

Write-Host "`n=== LARGEST FILES ==="
$entries | Sort-Object Size -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Host ("  {0,10} MB  {1}" -f [math]::Round($_.Size/1MB,2), $_.Name)
}

# Export manifest
$manifestPath = 'D:\Project KD\docs\wpress-manifest.csv'
$entries | Select-Object Index, Name, Size | Export-Csv -Path $manifestPath -NoTypeInformation -Encoding UTF8
Write-Host "`nManifest saved: $manifestPath"
