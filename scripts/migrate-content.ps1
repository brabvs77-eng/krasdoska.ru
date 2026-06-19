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
    products = Join-Path $SiteRoot 'content\catalog\products'
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

function Get-Categories([string]$block) {
    $matches = [regex]::Matches($block, '<category domain="category" nicename="([^"]+)">')
    $cats = @()
    foreach ($m in $matches) { $cats += $m.Groups[1].Value }
    return $cats
}

function Get-PostMeta([string]$block, [string]$key) {
    $m = [regex]::Match($block, "<wp:meta_key><!\[CDATA\[$key\]\]></wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]></wp:meta_value>")
    if ($m.Success) { return Decode-Xml $m.Groups[1].Value }
    return ''
}

function Normalize-UploadUrl([string]$url) {
    if (-not $url) { return '' }
    return $url -replace 'https?://krashenayadoska\.ru/wp-content/uploads/', '/uploads/'
}

function Get-FirstImage([string]$html) {
    if (-not $html) { return '' }
    $m = [regex]::Match($html, 'src="([^"]+/uploads/[^"]+)"')
    if ($m.Success) { return Normalize-UploadUrl $m.Groups[1].Value }
    return ''
}

function Get-ItemImage([string]$block, [string]$content) {
    $thumbId = Get-PostMeta $block '_thumbnail_id'
    if ($thumbId -and $attachments.ContainsKey($thumbId)) {
        return $attachments[$thumbId]
    }
    return Get-FirstImage $content
}

if (-not (Test-Path $WxrPath)) { throw "WXR not found: $WxrPath" }

Write-Host "Reading WXR..."
$xml = [IO.File]::ReadAllText($WxrPath)
$items = [regex]::Matches($xml, '<item>([\s\S]*?)</item>')

Write-Host "Indexing attachments..."
$attachments = @{}
foreach ($m in $items) {
    $block = $m.Groups[1].Value
    if ((Get-Tag $block 'wp:post_type') -ne 'attachment') { continue }
    $id = Get-Tag $block 'wp:post_id'
    $url = Get-Tag $block 'wp:attachment_url'
    if (-not $url) { $url = Get-Tag $block 'link' }
    if ($id -and $url) { $attachments[$id] = Normalize-UploadUrl $url }
}

$pages = 0; $blog = 0; $projects = 0; $products = 0

foreach ($m in $items) {
    $block = $m.Groups[1].Value
    $status = Get-Tag $block 'wp:status'
    if ($status -ne 'publish') { continue }

    $type = Get-Tag $block 'wp:post_type'
    $slug = Get-Tag $block 'wp:post_name'
    if (-not $slug) { continue }

    $content = Get-Tag $block 'content:encoded'

    switch ($type) {
        'page' {
            $obj = [ordered]@{
                id = Get-Tag $block 'wp:post_id'
                slug = $slug
                title = Get-Tag $block 'title'
                excerpt = (Get-Tag $block 'excerpt:encoded')
                content = $content
                link = Get-Tag $block 'link'
                seo = @{ title = (Get-Tag $block 'title') }
            }
            $json = $obj | ConvertTo-Json -Depth 5
            [System.IO.File]::WriteAllText((Join-Path $out.pages "$slug.json"), $json, [System.Text.UTF8Encoding]::new($false))
            $pages++
        }
        'blog-post' {
            $image = Get-ItemImage $block $content
            $obj = [ordered]@{
                id = Get-Tag $block 'wp:post_id'
                slug = $slug
                title = Get-Tag $block 'title'
                excerpt = (Get-Tag $block 'excerpt:encoded')
                content = $content
                link = Get-Tag $block 'link'
                image = $image
                seo = @{ title = (Get-Tag $block 'title') }
            }
            $json = $obj | ConvertTo-Json -Depth 5
            [System.IO.File]::WriteAllText((Join-Path $out.blog "$slug.json"), $json, [System.Text.UTF8Encoding]::new($false))
            $blog++
        }
        'project' {
            $image = Get-ItemImage $block $content
            $obj = [ordered]@{
                id = Get-Tag $block 'wp:post_id'
                slug = $slug
                title = Get-Tag $block 'title'
                excerpt = (Get-Tag $block 'excerpt:encoded')
                content = $content
                link = Get-Tag $block 'link'
                image = $image
                seo = @{ title = (Get-Tag $block 'title') }
            }
            $json = $obj | ConvertTo-Json -Depth 5
            [System.IO.File]::WriteAllText((Join-Path $out.projects "$slug.json"), $json, [System.Text.UTF8Encoding]::new($false))
            $projects++
        }
        'post' {
            $categories = Get-Categories $block
            $primary = $categories | Where-Object { $_ -ne 'uncategorized' } | Select-Object -First 1
            if (-not $primary) { continue }

            $thumbId = Get-PostMeta $block '_thumbnail_id'
            $image = ''
            if ($thumbId -and $attachments.ContainsKey($thumbId)) {
                $image = $attachments[$thumbId]
            } else {
                $image = Get-FirstImage $content
            }

            $obj = [ordered]@{
                id = Get-Tag $block 'wp:post_id'
                slug = $slug
                title = Get-Tag $block 'title'
                excerpt = (Get-Tag $block 'excerpt:encoded')
                content = $content
                link = Get-Tag $block 'link'
                category = $primary
                categories = @($categories | Where-Object { $_ -ne 'uncategorized' })
                image = $image
                seo = @{ title = (Get-Tag $block 'title') }
            }
            $json = $obj | ConvertTo-Json -Depth 5
            [System.IO.File]::WriteAllText((Join-Path $out.products "$slug.json"), $json, [System.Text.UTF8Encoding]::new($false))
            $products++
        }
    }
}

$categoriesPath = Join-Path $PSScriptRoot 'catalog-categories.json'
$categories = Get-Content -Raw -Encoding UTF8 $categoriesPath | ConvertFrom-Json

foreach ($c in $categories) {
    $categoryJson = $c | ConvertTo-Json
    [System.IO.File]::WriteAllText((Join-Path $out.categories "$($c.slug).json"), $categoryJson, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "Done: pages=$pages blog=$blog projects=$projects products=$products categories=$($categories.Count)"
