$path = 'D:\Project KD\krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress'
$fi = Get-Item -LiteralPath $path

# ServMask / All-in-One WP Migration block header (4377 bytes)
$FN_LEN = 255
$SIZE_LEN = 14
$MTIME_LEN = 12
$PATH_LEN = 4096
$HEADER_SIZE = $FN_LEN + $SIZE_LEN + $MTIME_LEN + $PATH_LEN

Write-Host "=== WPRESS FULL BACKUP ==="
Write-Host "File: $($fi.Name)"
Write-Host "Size: $([math]::Round($fi.Length/1MB, 2)) MB"

$fs = [System.IO.File]::OpenRead($path)
$reader = New-Object System.IO.BinaryReader($fs)
$headerBuf = New-Object byte[] $HEADER_SIZE

$entries = New-Object System.Collections.Generic.List[object]
$maxEntries = 100000

for ($i = 0; $i -lt $maxEntries; $i++) {
    if ($fs.Position + $HEADER_SIZE -gt $fs.Length) { break }

    [void]$fs.Read($headerBuf, 0, $HEADER_SIZE)

    $fn = [Text.Encoding]::UTF8.GetString($headerBuf, 0, $FN_LEN).Trim([char]0).Trim()
    $sizeStr = [Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN, $SIZE_LEN).Trim([char]0).Trim()
    $mtimeStr = [Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN + $SIZE_LEN, $MTIME_LEN).Trim([char]0).Trim()
    $dir = [Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN + $SIZE_LEN + $MTIME_LEN, $PATH_LEN).Trim([char]0).Trim()

    if ([string]::IsNullOrWhiteSpace($fn)) { break }
    if ($sizeStr -notmatch '^\d+$') {
        Write-Host "STOP at entry ${i}: invalid size '${sizeStr}' for '${fn}' at pos $($fs.Position - $HEADER_SIZE)"
        break
    }

    $size = [long]$sizeStr
    $fullPath = if ($dir -and $dir -ne '.') { "$dir/$fn" } else { $fn }

    $entries.Add([PSCustomObject]@{
        Index = $i
        Name = $fullPath
        FileName = $fn
        Dir = $dir
        Size = $size
        MTime = $mtimeStr
        DataOffset = $fs.Position
    }) | Out-Null

    if ($size -gt 0) {
        if ($fs.Position + $size -gt $fs.Length) {
            Write-Host "WARN: truncated content for $fullPath"
            break
        }
        $fs.Position += $size
    }
}

$reader.Close()
$fs.Close()

Write-Host "Parsed entries: $($entries.Count)"
$contentBytes = ($entries | Measure-Object -Property Size -Sum).Sum
Write-Host "Content bytes: $([math]::Round($contentBytes/1MB, 2)) MB"

# package.json
$pkg = $entries | Where-Object { $_.FileName -eq 'package.json' } | Select-Object -First 1
if ($pkg) {
    $pfs = [System.IO.File]::OpenRead($path)
    $pfs.Position = $pkg.DataOffset
    $pbuf = New-Object byte[] $pkg.Size
    [void]$pfs.Read($pbuf, 0, $pkg.Size)
    $pfs.Close()
    $jsonText = [Text.Encoding]::UTF8.GetString($pbuf).Trim([char]0)
    # strip optional 8-char hash prefix
    if ($jsonText -match '\{') {
        $jsonText = $jsonText.Substring($jsonText.IndexOf('{'))
    }
    $jsonPath = 'D:\Project KD\docs\wpress-package.json'
    Set-Content -Path $jsonPath -Value $jsonText -Encoding UTF8
    Write-Host "package.json saved: $jsonPath ($($pkg.Size) bytes)"
}

$db = $entries | Where-Object { $_.FileName -eq 'database.sql' } | Select-Object -First 1
if ($db) {
    Write-Host "database.sql: $([math]::Round($db.Size/1MB, 2)) MB"
} else {
    Write-Host "database.sql: NOT FOUND"
}

Write-Host "`n=== PLUGINS (unique top-level) ==="
$plugins = $entries | Where-Object { $_.Name -match '(?:^|/)plugins/([^/]+)/' } | ForEach-Object {
    if ($_.Name -match '(?:^|/)plugins/([^/]+)/') { $matches[1] }
} | Sort-Object -Unique
$plugins | ForEach-Object { Write-Host "  $_" }
Write-Host "Count: $($plugins.Count)"

Write-Host "`n=== THEMES ==="
$themes = $entries | Where-Object { $_.Name -match '(?:^|/)themes/([^/]+)/' } | ForEach-Object {
    if ($_.Name -match '(?:^|/)themes/([^/]+)/') { $matches[1] }
} | Sort-Object -Unique
$themes | ForEach-Object { Write-Host "  $_" }

Write-Host "`n=== UPLOADS STATS ==="
$uploads = $entries | Where-Object { $_.Name -match '(?:^|/)uploads/' }
$uploadsCount = $uploads.Count
$uploadsSize = ($uploads | Measure-Object Size -Sum).Sum
Write-Host "Files: $uploadsCount"
Write-Host "Size: $([math]::Round($uploadsSize/1MB, 2)) MB"

$uploadExt = $uploads | ForEach-Object {
    $e = [IO.Path]::GetExtension($_.FileName).ToLower()
    if (-not $e) { '(no ext)' } else { $e }
} | Group-Object | Sort-Object Count -Descending | Select-Object -First 10
Write-Host "Top extensions:"
$uploadExt | ForEach-Object { Write-Host ("  {0,-8} {1}" -f $_.Name, $_.Count) }

Write-Host "`n=== LARGEST FILES ==="
$entries | Sort-Object Size -Descending | Select-Object -First 20 | ForEach-Object {
    Write-Host ("  {0,10} MB  {1}" -f [math]::Round($_.Size/1MB,2), $_.Name)
}

$manifestPath = 'D:\Project KD\docs\wpress-manifest.csv'
$entries | Select-Object Index, Name, Size, MTime | Export-Csv -Path $manifestPath -NoTypeInformation -Encoding UTF8
Write-Host "`nManifest: $manifestPath ($($entries.Count) rows)"
