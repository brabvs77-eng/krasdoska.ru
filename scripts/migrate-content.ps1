# Migrate WXR export to site/content/ (PowerShell, no Node required)
param(
    [string]$WxrPath = 'D:\Project KD\krashenayadoskaru.WordPress.2026-06-18.xml',
    [string]$SiteRoot = 'D:\Project KD\site'
)

$ErrorActionPreference = 'Stop'

$out = @{
    pages = Join-Path $SiteRoot 'content\pages'
    blog = Join-Path $SiteRoot 'content\blog'
    projects = Join-Path $SiteRoot 'content\projects'
    categories = Join-Path $SiteRoot 'content\catalog\categories'
}
$out.Values | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ | Out-Null }

function Decode-Xml([string]$t) {
    if (-not $t) { return '' }
    $t = $t -replace '<!\[CDATA\[([\s\S]*?)\]\]>', '$1'
    $t = $t -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&' -replace '&quot;', '"' -replace '&#039;', "'"
    return $t.Trim()
}

function Get-Tag([string]$block, [string]$tag) {
    $m = [regex]::Match($block, "<$tag>([\s\S]*?)</$tag>")
    if ($m.Success) { return Decode-Xml $m.Groups[1].Value }
    return ''
}

if (-not (Test-Path $WxrPath)) { throw "WXR not found: $WxrPath" }

Write-Host "Reading WXR..."
$xml = [IO.File]::ReadAllText($WxrPath)
$items = [regex]::Matches($xml, '<item>([\s\S]*?)</item>')

$pages = 0; $blog = 0; $projects = 0

foreach ($m in $items) {
    $block = $m.Groups[1].Value
    $status = Get-Tag $block 'wp:status'
    if ($status -ne 'publish') { continue }

    $type = Get-Tag $block 'wp:post_type'
    $slug = Get-Tag $block 'wp:post_name'
    if (-not $slug) { continue }

    $obj = [ordered]@{
        id = Get-Tag $block 'wp:post_id'
        slug = $slug
        title = Get-Tag $block 'title'
        excerpt = (Get-Tag $block 'excerpt:encoded')
        content = (Get-Tag $block 'content:encoded')
        link = Get-Tag $block 'link'
        seo = @{ title = (Get-Tag $block 'title') }
    }

    $json = $obj | ConvertTo-Json -Depth 5

    switch ($type) {
        'page' {
            Set-Content -Path (Join-Path $out.pages "$slug.json") -Value $json -Encoding UTF8
            $pages++
        }
        'blog-post' {
            Set-Content -Path (Join-Path $out.blog "$slug.json") -Value $json -Encoding UTF8
            $blog++
        }
        'project' {
            Set-Content -Path (Join-Path $out.projects "$slug.json") -Value $json -Encoding UTF8
            $projects++
        }
    }
}

$categoriesPath = Join-Path $PSScriptRoot 'catalog-categories.json'
$categories = Get-Content -Raw -Encoding UTF8 $categoriesPath | ConvertFrom-Json

foreach ($c in $categories) {
    $c | ConvertTo-Json | Set-Content (Join-Path $out.categories "$($c.slug).json") -Encoding UTF8
}

Write-Host "Done: pages=$pages blog=$blog projects=$projects categories=$($categories.Count)"
