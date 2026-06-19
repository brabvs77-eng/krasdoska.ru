$sql = 'D:\Project KD\extracted\database.sql'
$sr = [IO.StreamReader]::new($sql)
$n = 0
while (-not $sr.EndOfStream) {
    $line = $sr.ReadLine()
    $n++
    if ($line -match "INSERT INTO ``SERVMASK_PREFIX_posts``" -and $line -match 'acf-field|elementor_library') {
        $preview = if ($line.Length -gt 400) { $line.Substring(0, 400) + '...' } else { $line }
        Write-Host "LINE $n LEN=$($line.Length)"
        Write-Host $preview
        Write-Host '---'
    }
    if ($line -match "INSERT INTO ``SERVMASK_PREFIX_postmeta``" -and $line -match "'field_|'_acf") {
        $preview = if ($line.Length -gt 400) { $line.Substring(0, 400) + '...' } else { $line }
        Write-Host "META $n"
        Write-Host $preview
        Write-Host '---'
    }
}
$sr.Close()
Write-Host "Total lines: $n"
