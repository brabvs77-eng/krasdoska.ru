$sql = 'D:\Project KD\extracted\database.sql'
$sr = [IO.StreamReader]::new($sql)
$n = 0
while (-not $sr.EndOfStream -and $n -lt 5000) {
    $line = $sr.ReadLine()
    $n++
    if ($line -match 'postmeta|_options|_posts|elementor|acf-field') {
        $preview = if ($line.Length -gt 300) { $line.Substring(0, 300) + '...' } else { $line }
        Write-Host "LINE $n LEN=$($line.Length)"
        Write-Host $preview
        Write-Host '---'
    }
}
$sr.Close()
