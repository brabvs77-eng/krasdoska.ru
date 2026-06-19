# Copy uploads to site/public/uploads (skip tar.gz)
param(
    [string]$Src = 'D:\Project KD\extracted\uploads',
    [string]$Dest = 'D:\Project KD\site\public\uploads'
)

$ErrorActionPreference = 'Stop'
if (-not (Test-Path $Src)) { throw "Source not found: $Src" }

function Copy-Filtered($from, $to) {
    New-Item -ItemType Directory -Force -Path $to | Out-Null
    foreach ($e in Get-ChildItem -LiteralPath $from) {
        if ($e.Name -like '*.tar.gz') { continue }
        $d = Join-Path $to $e.Name
        if ($e.PSIsContainer) { Copy-Filtered $e.FullName $d }
        else { Copy-Item -LiteralPath $e.FullName -Destination $d -Force }
    }
}

Write-Host "Copying $Src -> $Dest ..."
Copy-Filtered $Src $Dest
$n = (Get-ChildItem $Dest -Recurse -File).Count
Write-Host "Files: $n"
