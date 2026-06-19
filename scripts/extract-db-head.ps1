# Extract database.sql head and key stats from wpress
$path = 'D:\Project KD\krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress'
$HEADER_SIZE = 255 + 14 + 12 + 4096

$fs = [System.IO.File]::OpenRead($path)
$headerBuf = New-Object byte[] $HEADER_SIZE
$dbOffset = $null
$dbSize = $null

for ($i = 0; $i -lt 200000; $i++) {
    if ($fs.Position + $HEADER_SIZE -gt $fs.Length) { break }
    [void]$fs.Read($headerBuf, 0, $HEADER_SIZE)
    $fn = [Text.Encoding]::UTF8.GetString($headerBuf, 0, 255).Trim([char]0).Trim()
    $sizeStr = [Text.Encoding]::UTF8.GetString($headerBuf, 255, 14).Trim([char]0).Trim()
    if ([string]::IsNullOrWhiteSpace($fn)) { break }
    if ($sizeStr -notmatch '^\d+$') { break }
    $size = [long]$sizeStr
    if ($fn -eq 'database.sql') {
        $dbOffset = $fs.Position
        $dbSize = $size
        break
    }
    if ($size -gt 0) { $fs.Position += $size }
}
$fs.Close()

if (-not $dbOffset) { Write-Host 'database.sql not found'; exit 1 }
Write-Host "database.sql offset=$dbOffset size=$([math]::Round($dbSize/1MB,2)) MB"

$fs = [System.IO.File]::OpenRead($path)
$fs.Position = $dbOffset
$readLen = [Math]::Min(3MB, $dbSize)
$buf = New-Object byte[] $readLen
[void]$fs.Read($buf, 0, $readLen)
$fs.Close()

$text = [Text.Encoding]::UTF8.GetString($buf)
$headPath = 'D:\Project KD\docs\wpress-database-head.sql'
$headLen = [Math]::Min(80000, $text.Length)
Set-Content -Path $headPath -Value $text.Substring(0, $headLen) -Encoding UTF8
Write-Host "Saved $headLen chars to $headPath"

# Stream count CREATE TABLE
$createCount = 0
$fs2 = [System.IO.File]::OpenRead($path)
$fs2.Position = $dbOffset
$chunkSize = 4MB
$chunk = New-Object byte[] $chunkSize
$remaining = $dbSize
$carry = ''
while ($remaining -gt 0) {
    $toRead = [Math]::Min($chunkSize, $remaining)
    $read = $fs2.Read($chunk, 0, [int]$toRead)
    if ($read -le 0) { break }
    $s = $carry + [Text.Encoding]::UTF8.GetString($chunk, 0, $read)
    $createCount += ([regex]::Matches($s, 'CREATE TABLE')).Count
    $carry = if ($s.Length -gt 40) { $s.Substring($s.Length - 40) } else { $s }
    $remaining -= $read
}
$fs2.Close()
Write-Host "CREATE TABLE count: $createCount"

# Post type counts from streamed INSERT INTO wptv_posts
$postTypeCounts = @{}
$fs3 = [System.IO.File]::OpenRead($path)
$fs3.Position = $dbOffset
$remaining = $dbSize
$carry = ''
while ($remaining -gt 0) {
    $toRead = [Math]::Min($chunkSize, $remaining)
    $read = $fs3.Read($chunk, 0, [int]$toRead)
    if ($read -le 0) { break }
    $s = $carry + [Text.Encoding]::UTF8.GetString($chunk, 0, $read)
    foreach ($m in [regex]::Matches($s, "post_type','([^']+)'")) {
        $t = $m.Groups[1].Value
        if (-not $postTypeCounts.ContainsKey($t)) { $postTypeCounts[$t] = 0 }
        $postTypeCounts[$t]++
    }
    $carry = if ($s.Length -gt 80) { $s.Substring($s.Length - 80) } else { $s }
    $remaining -= $read
}
$fs3.Close()

Write-Host "`nPost types (from INSERT rows, approximate):"
$postTypeCounts.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object {
    Write-Host ("  {0,-20} {1}" -f $_.Key, $_.Value)
}
