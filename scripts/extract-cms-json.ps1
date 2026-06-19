param(
    [string]$SqlPath = 'D:\Project KD\extracted\database.sql',
    [string]$OutDir = 'D:\Project KD\extracted\cms-json'
)

$ErrorActionPreference = 'Stop'
$metaPrefix = "INSERT INTO ``SERVMASK_PREFIX_postmeta`` VALUES ("
$optPrefix = "INSERT INTO ``SERVMASK_PREFIX_options`` VALUES ("
$postPrefix = "INSERT INTO ``SERVMASK_PREFIX_posts`` VALUES ("

if (-not (Test-Path -LiteralPath $SqlPath)) { throw "SQL not found: $SqlPath" }
if (-not (Test-Path -LiteralPath $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }

function Parse-QuotedFields([string]$body) {
    $fields = New-Object System.Collections.Generic.List[string]
    $i = 0
    $len = $body.Length
    while ($i -lt $len) {
        if ($body[$i] -eq "'") {
            $i++
            $sb = New-Object System.Text.StringBuilder
            while ($i -lt $len) {
                $ch = $body[$i]
                if ($ch -eq "'") {
                    if ($i + 1 -lt $len -and $body[$i + 1] -eq "'") {
                        [void]$sb.Append("'")
                        $i += 2
                        continue
                    }
                    $i++
                    break
                }
                if ($ch -eq '\' -and $i + 1 -lt $len) {
                    $i++
                    [void]$sb.Append($body[$i])
                    $i++
                    continue
                }
                [void]$sb.Append($ch)
                $i++
            }
            $fields.Add($sb.ToString()) | Out-Null
        } else {
            $start = $i
            while ($i -lt $len -and $body[$i] -ne ',') { $i++ }
            $fields.Add($body.Substring($start, $i - $start).Trim()) | Out-Null
        }
        if ($i -lt $len -and $body[$i] -eq ',') { $i++ }
    }
    return $fields
}

function Test-AcfMetaKey([string]$key) {
    if ($key -match '^(_acf|field_)') { return $true }
    if ($key -match '^_(project|post|header-post|post-|text-at|gallery)') { return $true }
    if ($key -match '^(project-|header-post|post-gallery|post-img|post-text|post-video|text-at)') { return $true }
    return $false
}

$postmetaElementor = New-Object System.Collections.Generic.List[object]
$postmetaAcf = New-Object System.Collections.Generic.List[object]
$optionsElementor = New-Object System.Collections.Generic.List[object]
$optionsAcf = New-Object System.Collections.Generic.List[object]
$posts = New-Object System.Collections.Generic.List[object]
$targetTypes = @('acf-field-group', 'acf-field', 'elementor_library', 'page', 'post', 'project', 'blog-post')

Write-Host "Parsing $SqlPath ..."
$lineNo = 0
$sr = [IO.StreamReader]::new($SqlPath, [Text.Encoding]::UTF8, $true, 8MB)
while (-not $sr.EndOfStream) {
    $line = $sr.ReadLine()
    $lineNo++
    if (-not $line) { continue }

    if ($line.StartsWith($metaPrefix) -and $line.EndsWith(');')) {
        $body = $line.Substring($metaPrefix.Length, $line.Length - $metaPrefix.Length - 2)
        $comma1 = $body.IndexOf(',')
        $comma2 = $body.IndexOf(',', $comma1 + 1)
        if ($comma1 -lt 1 -or $comma2 -lt 1) { continue }
        $metaId = [long]$body.Substring(0, $comma1)
        $postId = [long]$body.Substring($comma1 + 1, $comma2 - $comma1 - 1)
        $rest = $body.Substring($comma2 + 1)
        $fields = Parse-QuotedFields $rest
        if ($fields.Count -lt 2) { continue }
        $metaKey = $fields[0]
        $metaValue = $fields[1]

        if ($metaKey -match '^_elementor') {
            $postmetaElementor.Add([ordered]@{ meta_id = $metaId; post_id = $postId; meta_key = $metaKey; meta_value = $metaValue }) | Out-Null
        } elseif (Test-AcfMetaKey $metaKey) {
            $postmetaAcf.Add([ordered]@{ meta_id = $metaId; post_id = $postId; meta_key = $metaKey; meta_value = $metaValue }) | Out-Null
        }
    }
    elseif ($line.StartsWith($optPrefix) -and $line.EndsWith(');')) {
        $body = $line.Substring($optPrefix.Length, $line.Length - $optPrefix.Length - 2)
        $fields = Parse-QuotedFields $body
        if ($fields.Count -lt 4) { continue }
        $optId = [long]$fields[0]
        $name = $fields[1]
        $val = $fields[2]
        $auto = $fields[3]
        if ($name -match '^(elementor|_elementor|widget_elementor)') {
            $optionsElementor.Add([ordered]@{ option_id = $optId; option_name = $name; option_value = $val; autoload = $auto }) | Out-Null
        } elseif ($name -match '^acf') {
            $optionsAcf.Add([ordered]@{ option_id = $optId; option_name = $name; option_value = $val; autoload = $auto }) | Out-Null
        }
    }
    elseif ($line.StartsWith($postPrefix) -and $line -match 'acf-field|elementor_library|''page''|''post''|''project''|''blog-post''') {
        $body = $line.Substring($postPrefix.Length, $line.Length - $postPrefix.Length - 2)
        $fields = Parse-QuotedFields $body
        if ($fields.Count -lt 21) { continue }
        $postType = $fields[20]
        if ($targetTypes -notcontains $postType) { continue }
        $posts.Add([ordered]@{
            ID = [long]$fields[0]
            post_title = $fields[5]
            post_name = $fields[11]
            post_status = $fields[7]
            post_parent = [long]$fields[17]
            post_type = $postType
            post_content = $fields[4]
            guid = $fields[18]
        }) | Out-Null
    }

    if ($lineNo % 10000 -eq 0) {
        Write-Host ("  {0} lines, el={1} acf={2} posts={3}" -f $lineNo, $postmetaElementor.Count, $postmetaAcf.Count, $posts.Count)
    }
}
$sr.Close()

Write-Host "Done parsing: el-meta=$($postmetaElementor.Count) acf-meta=$($postmetaAcf.Count) posts=$($posts.Count)"

$postsById = @{}
foreach ($p in $posts) { $postsById["$($p.ID)"] = $p }

$elementorByPost = @{}
foreach ($pm in $postmetaElementor) {
    $postKey = "$($pm.post_id)"
    if (-not $elementorByPost.ContainsKey($postKey)) {
        $pi = $postsById[$postKey]
        $elementorByPost[$postKey] = [ordered]@{
            post_id = $pm.post_id
            post_title = if ($pi) { $pi.post_title } else { $null }
            post_name = if ($pi) { $pi.post_name } else { $null }
            post_type = if ($pi) { $pi.post_type } else { $null }
            meta = [ordered]@{}
        }
    }
    $elementorByPost[$postKey].meta[$pm.meta_key] = $pm.meta_value
}

$acfByPost = @{}
foreach ($pm in $postmetaAcf) {
    $postKey = "$($pm.post_id)"
    if (-not $acfByPost.ContainsKey($postKey)) {
        $pi = $postsById[$postKey]
        $acfByPost[$postKey] = [ordered]@{
            post_id = $pm.post_id
            post_title = if ($pi) { $pi.post_title } else { $null }
            post_type = if ($pi) { $pi.post_type } else { $null }
            fields = [ordered]@{}
        }
    }
    $acfByPost[$postKey].fields[$pm.meta_key] = $pm.meta_value
}

$acfGroups = @($posts | Where-Object { $_.post_type -eq 'acf-field-group' })
$acfFields = @($posts | Where-Object { $_.post_type -eq 'acf-field' })
$elementorLib = @($posts | Where-Object { $_.post_type -eq 'elementor_library' })

$summary = [ordered]@{
    extracted_at = (Get-Date).ToString('o')
    source = $SqlPath
    counts = [ordered]@{
        elementor_posts_with_meta = $elementorByPost.Count
        elementor_postmeta_rows = $postmetaElementor.Count
        elementor_options = $optionsElementor.Count
        acf_field_groups = $acfGroups.Count
        acf_fields = $acfFields.Count
        acf_postmeta_rows = $postmetaAcf.Count
        acf_options = $optionsAcf.Count
        elementor_library_posts = $elementorLib.Count
        content_posts = @($posts | Where-Object { $_.post_type -in @('page','post','project','blog-post') }).Count
    }
}
$summary | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $OutDir 'summary.json') -Encoding UTF8

# Compact exports without huge _elementor_data blobs in one file
$elementorIndex = @($elementorByPost.Values | ForEach-Object {
    $hasData = $_.meta.Keys -contains '_elementor_data'
    [ordered]@{
        post_id = $_.post_id
        post_title = $_.post_title
        post_name = $_.post_name
        post_type = $_.post_type
        template_type = $_.meta['_elementor_template_type']
        edit_mode = $_.meta['_elementor_edit_mode']
        has_elementor_data = $hasData
        meta_keys = @($_.meta.Keys)
    }
})
$elementorIndex | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $OutDir 'elementor-index.json') -Encoding UTF8

$optionsElementor | ConvertTo-Json -Depth 4 | Set-Content (Join-Path $OutDir 'elementor-options.json') -Encoding UTF8
$elementorLib | ConvertTo-Json -Depth 4 | Set-Content (Join-Path $OutDir 'elementor-library-posts.json') -Encoding UTF8

$acfExport = [ordered]@{
    field_groups = $acfGroups
    fields = $acfFields
    options = $optionsAcf
    post_field_values = @($acfByPost.Values)
}
$acfExport | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $OutDir 'acf-export.json') -Encoding UTF8

$tplDir = Join-Path $OutDir 'elementor-templates'
if (Test-Path $tplDir) { Remove-Item $tplDir -Recurse -Force }
New-Item -ItemType Directory -Path $tplDir | Out-Null

$written = 0
foreach ($kv in $elementorByPost.GetEnumerator()) {
    if (-not ($kv.Value.meta.Keys -contains '_elementor_data')) { continue }
    $slug = if ($kv.Value.post_name) { $kv.Value.post_name } else { "id-$($kv.Key)" }
    $slug = ($slug -replace '[^\w\-]', '_')
    if ($slug.Length -gt 60) { $slug = $slug.Substring(0, 60) }
    $out = [ordered]@{
        post_id = $kv.Value.post_id
        post_title = $kv.Value.post_title
        post_name = $kv.Value.post_name
        post_type = $kv.Value.post_type
        template_type = $kv.Value.meta['_elementor_template_type']
        page_settings = $kv.Value.meta['_elementor_page_settings']
        elementor_data = $kv.Value.meta['_elementor_data']
    }
    $file = Join-Path $tplDir ("{0}__{1}.json" -f $kv.Key, $slug)
    # Write raw JSON string for elementor_data (already JSON in DB)
    $json = ($out | ConvertTo-Json -Depth 3 -Compress)
    # For elementor_data keep as embedded string in manual JSON build to avoid re-parse
    $dataRaw = $kv.Value.meta['_elementor_data']
    $settingsRaw = $kv.Value.meta['_elementor_page_settings']
    $manual = @"
{
  "post_id": $($kv.Value.post_id),
  "post_title": $(if ($kv.Value.post_title) { '"' + ($kv.Value.post_title -replace '"','\"') + '"' } else { 'null' }),
  "post_name": $(if ($kv.Value.post_name) { '"' + ($kv.Value.post_name -replace '"','\"') + '"' } else { 'null' }),
  "post_type": $(if ($kv.Value.post_type) { '"' + $kv.Value.post_type + '"' } else { 'null' }),
  "template_type": $(if ($kv.Value.meta['_elementor_template_type']) { '"' + $kv.Value.meta['_elementor_template_type'] + '"' } else { 'null' }),
  "elementor_data": $dataRaw,
  "elementor_page_settings": $(if ($settingsRaw) { $settingsRaw } else { 'null' })
}
"@
    Set-Content -Path $file -Value $manual -Encoding UTF8
    $written++
}

Write-Host "Written summary, elementor-index, elementor-options, acf-export"
Write-Host "Elementor templates: $written files in $tplDir"
