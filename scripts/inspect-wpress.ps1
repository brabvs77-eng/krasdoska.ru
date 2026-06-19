$path = 'D:\Project KD\krashenayadoska-ru-20260618-232914-rprpynbqkzvl.wpress'
$fi = Get-Item -LiteralPath $path
Write-Host "SIZE_MB: $([math]::Round($fi.Length/1MB, 2))"
Write-Host "SIZE_BYTES: $($fi.Length)"

$fs = [System.IO.File]::OpenRead($path)
$buf = New-Object byte[] 512
[void]$fs.Read($buf, 0, 512)
$fs.Close()

$ascii = [Text.Encoding]::ASCII.GetString($buf[0..127])
Write-Host "HEADER_ASCII: $ascii"
Write-Host "HEADER_HEX: $([BitConverter]::ToString($buf[0..31]))"

# Search for key strings in first 50MB
$needles = @(
    'database.sql',
    'package.json',
    'wp-config.php',
    'plugins/',
    'themes/',
    'uploads/',
    'elementor',
    'advanced-custom-fields',
    'all-in-one-wp-migration'
)

$chunkSize = 8MB
$maxScan = 200MB
$stream = [System.IO.File]::OpenRead($path)
$buffer = New-Object byte[] $chunkSize
$offset = 0
$found = @{}
$text = ''

while ($offset -lt [Math]::Min($fi.Length, $maxScan)) {
    $read = $stream.Read($buffer, 0, $chunkSize)
    if ($read -le 0) { break }
    $chunk = [Text.Encoding]::ASCII.GetString($buffer, 0, $read)
    foreach ($n in $needles) {
        if (-not $found.ContainsKey($n) -and $chunk.Contains($n)) {
            $found[$n] = $offset + $chunk.IndexOf($n)
        }
    }
    $offset += $read
}
$stream.Close()

Write-Host "`nSTRING_OFFSETS (first ${maxScan} bytes):"
foreach ($k in $found.Keys | Sort-Object { $found[$_] }) {
    Write-Host "  $k @ $($found[$k])"
}
