param(
    [string]$WpressPath = 'D:\Project KD\krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress',
    [string]$OutRoot = 'D:\Project KD\extracted',
    [switch]$SkipNestedBackups
)

$ErrorActionPreference = 'Stop'

$FN_LEN = 255
$SIZE_LEN = 14
$MTIME_LEN = 12
$PATH_LEN = 4096
$HEADER_SIZE = $FN_LEN + $SIZE_LEN + $MTIME_LEN + $PATH_LEN

function Get-CleanPath([string]$raw) {
    if ([string]::IsNullOrWhiteSpace($raw)) { return '' }
    $p = $raw.Trim([char]0).Trim()
    $idx = $p.IndexOf([char]0)
    if ($idx -ge 0) { $p = $p.Substring(0, $idx) }
    return $p.Trim()
}

function Get-Entries([string]$path) {
    $fs = [System.IO.File]::OpenRead($path)
    $headerBuf = New-Object byte[] $HEADER_SIZE
    $list = New-Object System.Collections.Generic.List[object]

    for ($i = 0; $i -lt 200000; $i++) {
        if ($fs.Position + $HEADER_SIZE -gt $fs.Length) { break }
        [void]$fs.Read($headerBuf, 0, $HEADER_SIZE)

        $fn = Get-CleanPath([Text.Encoding]::UTF8.GetString($headerBuf, 0, $FN_LEN))
        $sizeStr = Get-CleanPath([Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN, $SIZE_LEN))
        $mtimeStr = Get-CleanPath([Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN + $SIZE_LEN, $MTIME_LEN))
        $dir = Get-CleanPath([Text.Encoding]::UTF8.GetString($headerBuf, $FN_LEN + $SIZE_LEN + $MTIME_LEN, $PATH_LEN))

        if ([string]::IsNullOrWhiteSpace($fn)) { break }
        if ($sizeStr -notmatch '^\d+$') { break }

        $size = [long]$sizeStr
        $rawPath = if ($dir -and $dir -ne '.') { "$dir/$fn" } else { $fn }
        $fullPath = Get-CleanPath $rawPath

        $list.Add([PSCustomObject]@{
            Name = $fullPath
            FileName = $fn
            Size = $size
            DataOffset = $fs.Position
        }) | Out-Null

        if ($size -gt 0) {
            if ($fs.Position + $size -gt $fs.Length) { break }
            $fs.Position += $size
        }
    }

    $fs.Close()
    return $list
}

function Copy-WpressEntry {
    param(
        [string]$Wpress,
        [long]$Offset,
        [long]$Size,
        [string]$DestPath
    )
    $destDir = Split-Path -Parent $DestPath
    if (-not (Test-Path -LiteralPath $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    $inFs = [System.IO.File]::OpenRead($Wpress)
    $outFs = [System.IO.File]::Create($DestPath)
    $inFs.Position = $Offset
    $buf = New-Object byte[] 1MB
    $remaining = $Size
    while ($remaining -gt 0) {
        $toRead = [Math]::Min($buf.Length, $remaining)
        $read = $inFs.Read($buf, 0, [int]$toRead)
        if ($read -le 0) { break }
        $outFs.Write($buf, 0, $read)
        $remaining -= $read
    }
    $outFs.Close()
    $inFs.Close()
}

Write-Host "Indexing wpress..."
$entries = Get-Entries -path $WpressPath
Write-Host "Entries: $($entries.Count)"

$db = $entries | Where-Object { $_.FileName -eq 'database.sql' } | Select-Object -First 1
if (-not $db) { throw 'database.sql not found in archive' }

$dbDest = Join-Path $OutRoot 'database.sql'
Write-Host "Extracting database.sql -> $dbDest ($([math]::Round($db.Size/1MB,2)) MB)"
Copy-WpressEntry -Wpress $WpressPath -Offset $db.DataOffset -Size $db.Size -DestPath $dbDest

$uploadRoot = Join-Path $OutRoot 'uploads'
$uploads = $entries | Where-Object { $_.Name -match '(?:^|/)uploads/' }
Write-Host "Extracting uploads: $($uploads.Count) files -> $uploadRoot"

$done = 0
$skipped = 0
$bytes = 0L
foreach ($u in $uploads) {
    $rel = $u.Name
    if ($rel -match '(?:^|/)uploads/(.+)$') { $rel = $matches[1] } else { continue }
    $rel = Get-CleanPath $rel
    if ([string]::IsNullOrWhiteSpace($rel)) { continue }

    if ($SkipNestedBackups -and $rel -match '\.tar\.gz$') {
        $skipped++
        continue
    }

    $dest = Join-Path $uploadRoot $rel
    Copy-WpressEntry -Wpress $WpressPath -Offset $u.DataOffset -Size $u.Size -DestPath $dest
    $done++
    $bytes += $u.Size
    if ($done % 200 -eq 0) { Write-Host "  $done files..." }
}

Write-Host "Uploads done: $done files, skipped $skipped, $([math]::Round($bytes/1MB,2)) MB"
Write-Host "Output: $OutRoot"
